import { Board, type BoardConfig } from "../board";
import { filled, type TetrominoType } from "../types";
import { Piece } from "../pieces/piece";
import { NextQueue } from "../random/next-queue";
import { SevenBagGenerator } from "../random/seven-bag-generator";
import { MovementService } from "../movement/movement-service";
import { SimpleRotationSystem } from "../rotation/simple-rotation-system";
import type { RotateDirection } from "../rotation/rotation-system";
import { GameSnapshot } from "../../application/snapshot";

export type GameStatus = "Running" | "Paused" | "GameOver";

export type GameCommand =
    | { type: "MoveLeft" }
    | { type: "MoveRight" }
    | { type: "RotateCW" }
    | { type: "RotateCCW" }
    | { type: "SoftDropStart" }
    | { type: "SoftDropStop" }
    | { type: "HardDrop" }
    | { type: "Hold" }
    | { type: "Pause" }
    | { type: "Resume" }
    | { type: "Restart" };

export interface GameConfig extends BoardConfig {
    readonly nextQueueSize: number;     // e.g. 5
    readonly lockDelayMs: number;       // e.g. 300
    readonly linesPerLevel: number;     // e.g. 10
    readonly fallIntervalsMs: readonly number[]; // level->ms
    readonly fallIntervalCapMs: number; // e.g. 100
}

export class Game {
    private status: GameStatus = "Running";

    private board: Board;
    private active: Piece;
    private queue: NextQueue;

    private hold: TetrominoType | null = null;
    private canHold = true;

    private score = 0;
    private level = 0;
    private lines = 0;

    private softDrop = false;

    // timing
    private fallAccumulatorMs = 0;
    private lockAccumulatorMs = 0;
    private isTouchingGround = false;

    // services (MVP: concrete instances)
    private move = new MovementService();
    private rot = new SimpleRotationSystem();

    constructor(private readonly config: GameConfig, queue?: NextQueue, board?: Board) {
        this.board = board ?? Board.create(config);
        this.queue =
            queue ?? new NextQueue(new SevenBagGenerator(), config.nextQueueSize);

        this.active = this.spawnPieceOrGameOver(this.queue.popNext());
    }

    // -------- Public API --------

    getStatus(): GameStatus {
        return this.status;
    }

    getBoard(): Board {
        return this.board;
    }

    getActivePiece(): Piece {
        return this.active;
    }

    getNextQueue(): readonly TetrominoType[] {
        return this.queue.peek();
    }

    getHold(): { hold: TetrominoType | null; canHold: boolean } {
        return { hold: this.hold, canHold: this.canHold };
    }

    getStats(): { score: number; level: number; lines: number } {
        return { score: this.score, level: this.level, lines: this.lines };
    }

    dispatch(cmd: GameCommand): void {
        if (cmd.type === "Pause") {
            if (this.status === "Running") this.status = "Paused";
            return;
        }
        if (cmd.type === "Resume") {
            if (this.status === "Paused") this.status = "Running";
            return;
        }
        if (cmd.type === "Restart") {
            this.restart();
            return;
        }

        if (this.status !== "Running") return;

        switch (cmd.type) {
            case "MoveLeft":
                this.tryMove(-1, 0);
                break;
            case "MoveRight":
                this.tryMove(1, 0);
                break;
            case "RotateCW":
                this.tryRotate("CW");
                break;
            case "RotateCCW":
                this.tryRotate("CCW");
                break;
            case "SoftDropStart":
                this.softDrop = true;
                break;
            case "SoftDropStop":
                this.softDrop = false;
                break;
            case "HardDrop":
                this.hardDrop();
                break;
            case "Hold":
                this.holdSwap();
                break;
        }
    }

    update(dtMs: number): void {
        if (this.status !== "Running") return;

        // apply gravity based on fall interval
        const interval = this.getFallIntervalMs();
        this.fallAccumulatorMs += dtMs;

        while (this.fallAccumulatorMs >= interval) {
            this.fallAccumulatorMs -= interval;

            const movedDown = this.move.tryMove(this.active, 0, 1, this.board);
            if (movedDown === this.active) {
                // can't move down -> touching ground
                this.isTouchingGround = true;
                break;
            } else {
                this.active = movedDown;
                this.isTouchingGround = false;
                this.lockAccumulatorMs = 0;
            }
        }

        // lock delay
        if (this.isTouchingGround) {
            this.lockAccumulatorMs += dtMs;

            if (this.lockAccumulatorMs >= this.config.lockDelayMs) {
                this.lockPieceAndContinue();
            }
        }
    }

    // -------- Internals --------

    private restart() {
        this.status = "Running";
        this.board = Board.create(this.config);
        this.queue = new NextQueue(new SevenBagGenerator(), this.config.nextQueueSize);

        this.hold = null;
        this.canHold = true;

        this.score = 0;
        this.level = 0;
        this.lines = 0;

        this.softDrop = false;
        this.fallAccumulatorMs = 0;
        this.lockAccumulatorMs = 0;
        this.isTouchingGround = false;

        this.active = this.spawnPieceOrGameOver(this.queue.popNext());
    }

    private getFallIntervalMs(): number {
        // soft drop = faster fall (10x)
        const base =
            this.config.fallIntervalsMs[this.level] ??
            this.config.fallIntervalCapMs;

        const capped = Math.max(base, this.config.fallIntervalCapMs);
        return this.softDrop ? Math.max(1, Math.floor(capped * 0.1)) : capped;
    }

    private tryMove(dx: number, dy: number) {
        const before = this.active;
        const next = this.move.tryMove(this.active, dx, dy, this.board);
        this.active = next;

        // If movement lifts from ground, reset lock delay
        if (before !== next) {
            const down = this.move.tryMove(this.active, 0, 1, this.board);
            const touching = down === this.active;
            this.isTouchingGround = touching;
            if (!touching) this.lockAccumulatorMs = 0;
        }
    }

    private tryRotate(direction: RotateDirection) {
        const before = this.active;
        const next = this.rot.tryRotate(this.active, direction, this.board);
        this.active = next;

        if (before !== next) {
            const down = this.move.tryMove(this.active, 0, 1, this.board);
            const touching = down === this.active;
            this.isTouchingGround = touching;
            if (!touching) this.lockAccumulatorMs = 0;
        }
    }

    private hardDrop() {
        let dropped = 0;
        while (true) {
            const next = this.move.tryMove(this.active, 0, 1, this.board);
            if (next === this.active) break;
            this.active = next;
            dropped++;
        }

        // scoring hard drop (2 per cell)
        this.score += dropped * 2;

        // lock immediately
        this.lockPieceAndContinue(true);
    }

    private holdSwap() {
        if (!this.canHold) return;

        this.canHold = false;

        const currentType = this.active.type;
        if (this.hold === null) {
            this.hold = currentType;
            this.active = this.spawnPieceOrGameOver(this.queue.popNext());
        } else {
            const swap = this.hold;
            this.hold = currentType;
            this.active = this.spawnPieceOrGameOver(swap);
        }

        this.isTouchingGround = false;
        this.lockAccumulatorMs = 0;
    }

    private lockPieceAndContinue(fromHardDrop: boolean = false) {
        // Place current piece blocks into board
        const type = this.active.type;
        const cells = this.active.cells();

        // if it collides here, it's a serious bug — but keep safe
        if (this.board.collides(cells)) {
            this.status = "GameOver";
            return;
        }

        this.board = this.board.place(cells, () => filled(type));

        // Allow hold again after lock
        this.canHold = true;

        // Clear lines
        const res = this.board.clearFullLines();
        this.board = res.board;

        if (res.cleared > 0) {
            this.lines += res.cleared;
            this.score += this.scoreForLines(res.cleared, this.level);

            const newLevel = Math.floor(this.lines / this.config.linesPerLevel);
            this.level = newLevel;
        }

        // Spawn next
        this.active = this.spawnPieceOrGameOver(this.queue.popNext());

        this.isTouchingGround = false;
        this.lockAccumulatorMs = 0;
        if (!fromHardDrop) this.fallAccumulatorMs = 0; // optional: keeps feel consistent
    }

    private spawnPieceOrGameOver(type: TetrominoType): Piece {
        // spawn position (MVP)
        const spawn = new Piece({
            type,
            rotation: 0,
            position: { x: 3, y: 0 },
        });

        if (this.board.collides(spawn.cells())) {
            this.status = "GameOver";
            return spawn;
        }

        return spawn;
    }

    private scoreForLines(cleared: number, level: number): number {
        const mult = level + 1;
        switch (cleared) {
            case 1: return 100 * mult;
            case 2: return 300 * mult;
            case 3: return 500 * mult;
            case 4: return 800 * mult;
            default: return 0;
        }
    }

    getSnapshot(): GameSnapshot {
        const { score, level, lines } = this.getStats();
        const { hold, canHold } = this.getHold();

        return {
            status: this.status,
            score,
            level,
            lines,

            width: this.config.width,
            height: this.config.height,
            hiddenRows: this.config.hiddenRows,

            board: this.board.toMatrix(),
            active: {
                type: this.active.type,
                rotation: this.active.rotation,
                position: this.active.position,
                cells: this.active.cells(),
            },

            hold,
            canHold,
            next: [...this.queue.peek()],
        };
    }
}