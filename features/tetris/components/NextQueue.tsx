import { memo } from "react";
import type { TetrominoType } from "@/packages/tetris-engine/src";
import { useTheme, themeConfig } from "../context/ThemeContext";

interface NextQueueProps {
  next: readonly TetrominoType[];
}

export const NextQueue = memo(({ next }: NextQueueProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];

  return (
    <div className={`${colors.card} rounded-md p-2 sm:p-4 border ${colors.border} flex-1 sm:flex-none`}>
      <p className={`text-xs ${colors.textSecondary} mb-1`}>Next</p>
      <ol className={`space-y-0.5 list-decimal list-inside text-xs ${colors.text}`}>
        {next.map((t, idx) => (
          <li key={`${t}-${idx}`} className="text-sm font-medium">
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
});
