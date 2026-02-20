import { memo } from "react";
import { useTheme, themeConfig } from "../context/ThemeContext";

interface GameStatusProps {
  status: "Running" | "Paused" | "GameOver";
}

export const GameStatus = memo(({ status }: GameStatusProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];

  if (status === "Running") return null;

  return (
    <div className="text-center">
      {status === "GameOver" && (
        <div className={`px-4 py-2 ${colors.card} border ${colors.border} rounded-md`}>
          <p className={`text-sm font-medium ${colors.text}`}>Game Over</p>
          <p className={`text-xs ${colors.textSecondary} mt-1`}>Press R to restart</p>
        </div>
      )}
      {status === "Paused" && (
        <div className={`px-4 py-2 ${colors.card} border ${colors.border} rounded-md`}>
          <p className={`text-sm font-medium ${colors.text}`}>Paused</p>
          <p className={`text-xs ${colors.textSecondary} mt-1`}>Press P to resume</p>
        </div>
      )}
    </div>
  );
});
