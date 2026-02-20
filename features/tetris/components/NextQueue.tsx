import type { TetrominoType } from "@/packages/tetris-engine/src";
import { useTheme, themeConfig } from "../context/ThemeContext";

interface NextQueueProps {
  next: readonly TetrominoType[];
}

export const NextQueue = ({ next }: NextQueueProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];

  return (
    <div className={`${colors.card} rounded-md p-3 sm:p-4 border ${colors.border} flex-1 sm:flex-none`}>
      <h3 className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-2`}>
        Next
      </h3>
      <ol className={`space-y-1 list-decimal list-inside ${colors.text}`}>
        {next.map((t, idx) => (
          <li key={`${t}-${idx}`} className="text-sm font-medium">
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}
