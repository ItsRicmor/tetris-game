import { useMemo } from "react";
import type { GameSnapshot } from "@/packages/tetris-engine/src";
import { useTheme, themeConfig, TETROMINO_COLORS } from "../context/ThemeContext";

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

  const ghostSet = useMemo(() => {
    const s = new Set<string>();
    if (snap.ghostCells) {
      for (const p of snap.ghostCells) s.add(`${p.x},${p.y}`);
    }
    return s;
  }, [snap.ghostCells]);

  const getBlockColor = (x: number, y: number, isActive: boolean) => {
    if (isActive) {
      return TETROMINO_COLORS[snap.active.type][theme];
    }
    const cell = snap.board[y][x];
    if (cell.kind === "filled") {
      return TETROMINO_COLORS[cell.type][theme];
    }
    return colors.blockEmpty;
  };

  const rows = [];
  for (let y = hiddenRows; y < height; y++) {
    const cells = [];
    for (let x = 0; x < width; x++) {
      const key = `${x},${y}`;
      const isActive = activeSet.has(key);
      const isGhost = !isActive && ghostSet.has(key);
      const base = snap.board[y][x];
      const filled = isActive || base.kind === "filled";

      const ghostColor = TETROMINO_COLORS[snap.active.type][theme];

      cells.push(
        <div
          key={key}
          className={`w-[calc((100vw-2rem)/10)] max-w-8 h-[calc((100vw-2rem)/10)] max-h-8 md:w-8 md:h-8 box-border ${
            isGhost 
              ? `border-2 border-dashed ${ghostColor.replace('bg-', 'border-')} opacity-60`
              : filled 
                ? `border ${getBlockColor(x, y, isActive)} ${colors.boardBorder}`
                : `border ${colors.blockEmpty} ${colors.boardBorder}`
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
    <div className={`inline-block ${colors.boardBg} p-1 rounded-md border ${colors.boardBorder}`}>
      {rows}
    </div>
  );
}
