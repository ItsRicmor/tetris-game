"use client";

import { Game, GameSnapshot } from "@/packages/tetris-engine/src";
import { useEffect, useMemo, useRef, useState } from "react";

const GAME_CONFIG = {
  width: 10,
  height: 24,
  hiddenRows: 4,
  nextQueueSize: 5,
  lockDelayMs: 300,
  linesPerLevel: 10,
  fallIntervalsMs: [800, 720, 630, 550, 470, 380, 300, 220, 130],
  fallIntervalCapMs: 100,
} as const;

export default function TetrisClient() {
  const game = useMemo(() => new Game(GAME_CONFIG), []);
  const [snap, setSnap] = useState<GameSnapshot>(() => game.getSnapshot());

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // Game loop
  useEffect(() => {
    const loop = (t: number) => {
      const last = lastRef.current ?? t;
      const dt = t - last;
      lastRef.current = t;

      game.update(dt);
      setSnap(game.getSnapshot());

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [game]);

  // Keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      switch (e.key) {
        case "ArrowLeft":
          game.dispatch({ type: "MoveLeft" });
          break;
        case "ArrowRight":
          game.dispatch({ type: "MoveRight" });
          break;
        case "ArrowUp":
          game.dispatch({ type: "RotateCW" });
          break;
        case "z":
        case "Z":
          game.dispatch({ type: "RotateCCW" });
          break;
        case "ArrowDown":
          game.dispatch({ type: "SoftDropStart" });
          break;
        case " ":
          e.preventDefault();
          game.dispatch({ type: "HardDrop" });
          break;
        case "c":
        case "C":
          game.dispatch({ type: "Hold" });
          break;
        case "p":
        case "P":
          game.dispatch({ type: snap.status === "Paused" ? "Resume" : "Pause" } as any);
          break;
        case "r":
        case "R":
          game.dispatch({ type: "Restart" });
          break;
      }

      setSnap(game.getSnapshot());
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        game.dispatch({ type: "SoftDropStop" });
        setSnap(game.getSnapshot());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [game, snap.status]);

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      <BoardView snap={snap} />
      <Hud snap={snap} />
    </div>
  );
}

function BoardView({ snap }: { snap: GameSnapshot }) {
  const { width, height, hiddenRows } = snap;

  // Build a render grid that overlays the active piece on top of the locked board
  const activeSet = useMemo(() => {
    const s = new Set<string>();
    for (const p of snap.active.cells) s.add(`${p.x},${p.y}`);
    return s;
  }, [snap.active.cells]);

  const rows = [];
  for (let y = hiddenRows; y < height; y++) {
    const cells = [];
    for (let x = 0; x < width; x++) {
      const key = `${x},${y}`;
      const isActive = activeSet.has(key);
      const base = snap.board[y][x];
      const filled = isActive || base.kind === "filled";

      cells.push(
        <div
          key={key}
          style={{
            width: 22,
            height: 22,
            border: "1px solid #222",
            background: filled ? "#888" : "transparent",
            boxSizing: "border-box",
          }}
        />
      );
    }
    rows.push(
      <div key={y} style={{ display: "flex" }}>
        {cells}
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 8, opacity: 0.8, fontSize: 12 }}>
        Controls: ← → rotate(↑/Z) drop(Space) hold(C) pause(P) restart(R)
      </div>
      <div style={{ display: "inline-block", background: "#111", padding: 6 }}>
        {rows}
      </div>
      {snap.status === "GameOver" && (
        <div style={{ marginTop: 10, color: "#c33" }}>
          Game Over — press R to restart
        </div>
      )}
      {snap.status === "Paused" && (
        <div style={{ marginTop: 10, color: "#cc3" }}>
          Paused — press P to resume
        </div>
      )}
    </div>
  );
}

function Hud({ snap }: { snap: GameSnapshot }) {
  return (
    <div style={{ minWidth: 220 }}>
      <div style={{ marginBottom: 12 }}>
        <div><b>Status:</b> {snap.status}</div>
        <div><b>Score:</b> {snap.score}</div>
        <div><b>Level:</b> {snap.level}</div>
        <div><b>Lines:</b> {snap.lines}</div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div><b>Hold:</b> {snap.hold ?? "—"} {snap.canHold ? "" : "(locked)"}</div>
      </div>

      <div>
        <div style={{ marginBottom: 6 }}><b>Next:</b></div>
        <ol style={{ margin: 0, paddingLeft: 18 }}>
          {snap.next.map((t, idx) => (
            <li key={`${t}-${idx}`}>{t}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}