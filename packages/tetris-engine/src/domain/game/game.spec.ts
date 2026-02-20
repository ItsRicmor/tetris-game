import { Game } from "./game";
import { NextQueue } from "../random/next-queue";
import type { PieceGenerator } from "../random/piece-generator";
import type { TetrominoType } from "../types";
import { Board } from "../board";
import { filled } from "../types";

const config = {
  width: 10,
  height: 24,
  hiddenRows: 4,
  nextQueueSize: 5,
  lockDelayMs: 300,
  linesPerLevel: 10,
  fallIntervalsMs: [800, 720, 630, 550, 470, 380, 300, 220, 130],
  fallIntervalCapMs: 100,
} as const;

class FakeGen implements PieceGenerator {
  private i = 0;
  constructor(private seq: TetrominoType[]) {}
  next(): TetrominoType {
    const v = this.seq[this.i % this.seq.length];
    this.i++;
    return v;
  }
}

describe("Game (MVP)", () => {
  it("spawns an active piece on start", () => {
    const q = new NextQueue(new FakeGen(["T", "I", "O"]), 5);
    const g = new Game(config, q);

    expect(g.getStatus()).toBe("Running");
    expect(g.getActivePiece().type).toBe("T");
  });

  it("goes GameOver if spawn collides", () => {
    // Create a board with blocks where spawn would collide
    let b = Board.create(config);
    // Force fill some likely spawn area around (3,0). We'll place a filled cell that O/T might use.
    b = b.withCell({ x: 4, y: 1 }, filled("I"));

    const q = new NextQueue(new FakeGen(["O", "I", "T"]), 5);
    const g = new Game(config, q, b);

    expect(g.getStatus()).toBe("GameOver");
  });

  it("hard drop increases score and locks piece (board gets filled)", () => {
    const q = new NextQueue(new FakeGen(["I", "O", "T"]), 5);
    const g = new Game(config, q);

    const beforeScore = g.getStats().score;
    g.dispatch({ type: "HardDrop" });

    const afterScore = g.getStats().score;
    expect(afterScore).toBeGreaterThan(beforeScore);

    // Board should have some filled cells now
    const matrix = g.getBoard().toMatrix();
    const filledCount = matrix.flat().filter((c) => c.kind === "filled").length;
    expect(filledCount).toBeGreaterThan(0);
  });

  it("pause prevents updates from moving the piece", () => {
    const q = new NextQueue(new FakeGen(["T", "I", "O"]), 5);
    const g = new Game(config, q);

    const startY = g.getActivePiece().position.y;

    g.dispatch({ type: "Pause" });
    g.update(5000); // lots of time
    expect(g.getActivePiece().position.y).toBe(startY);

    g.dispatch({ type: "Resume" });
    g.update(1000);
    expect(g.getActivePiece().position.y).toBeGreaterThanOrEqual(startY);
  });
});