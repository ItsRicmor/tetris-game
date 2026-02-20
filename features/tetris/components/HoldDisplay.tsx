import type { TetrominoType } from "@/packages/tetris-engine/src";
import { useTheme, themeConfig } from "../context/ThemeContext";

interface HoldDisplayProps {
  hold: TetrominoType | null;
  canHold: boolean;
}

export const HoldDisplay = ({ hold, canHold }: HoldDisplayProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];

  return (
    <div className={`${colors.card} rounded-md p-3 sm:p-4 border ${colors.border} flex-1 sm:flex-none`}>
      <h3 className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-2`}>
        Hold
      </h3>
      <div className="flex items-center justify-between">
        <span className={`text-lg sm:text-xl font-semibold ${colors.text}`}>
          {hold ?? "—"}
        </span>
        {!canHold && (
          <span className={`text-xs ${colors.textSecondary}`}>(locked)</span>
        )}
      </div>
    </div>
  );
}
