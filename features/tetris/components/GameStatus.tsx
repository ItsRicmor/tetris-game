import { memo } from "react";
import { useTheme, themeConfig } from "../context/ThemeContext";

interface GameStatusProps {
  status: "Running" | "Paused" | "GameOver";
  onRestart?: () => void;
}

export const GameStatus = memo(({ status, onRestart }: GameStatusProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];

  if (status === "Running") return null;

  return (
    <div className="text-center">
      {status === "GameOver" && (
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-3">Game Over</p>
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 hover:from-purple-700 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Restart Game
          </button>
        </div>
      )}
      {status === "Paused" && (
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Paused</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Press P to resume</p>
        </div>
      )}
    </div>
  );
});
