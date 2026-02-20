import { useMemo } from "react";
import type { GameSnapshot } from "@/packages/tetris-engine/src";

interface BoardProps {
  snap: GameSnapshot;
}

export const Board = ({ snap }: BoardProps) => {
  const { width, height, hiddenRows } = snap;

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
          className={`w-6 h-6 border border-gray-800 ${
            filled ? "bg-cyan-500" : "bg-gray-900"
          }`}
        />
      );
    }
    rows.push(
      <div key={y} className="flex">
        {cells}
      </div>
    );
  }

  return (
    <div className="inline-block bg-black p-2 rounded-lg shadow-2xl border-2 border-gray-700">
      {rows}
    </div>
  );
}
