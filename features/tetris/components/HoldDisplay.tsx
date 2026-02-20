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
    <div className={`${colors.card} rounded-md p-2 sm:p-4 border ${colors.border} flex-1 sm:flex-none`}>
      <p className={`text-xs ${colors.textSecondary} mb-1`}>Hold</p>
      <div className="flex items-center justify-center">
        <span className={`text-base sm:text-xl font-semibold ${colors.text}`}>
          {hold ?? "—"}
        </span>
      </div>
    </div>
  );
}
