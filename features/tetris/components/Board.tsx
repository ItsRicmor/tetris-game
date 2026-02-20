import { useMemo } from "react";
import type { GameSnapshot } from "@/packages/tetris-engine/src";
import { useTheme, themeConfig } from "../context/ThemeContext";

interface BoardProps {
  snap: GameSnapshot;
}

export const Board = ({ snap }: BoardProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];
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
          className={`w-6 h-6 md:w-7 md:h-7 border ${
            filled ? colors.block : colors.blockEmpty
          } ${colors.boardBorder}`}
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
    <div className={`inline-block ${colors.boardBg} p-1 rounded-md border ${colors.boardBorder}`}>
      {rows}
    </div>
  );
}
