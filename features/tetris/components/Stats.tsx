import { useTheme, themeConfig } from "../context/ThemeContext";

interface StatsProps {
  status: string;
  score: number;
  level: number;
  lines: number;
}

export const Stats = ({ status, score, level, lines }: StatsProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];

  return (
    <div className={`${colors.card} rounded-md p-3 sm:p-4 border ${colors.border} flex-1 sm:flex-none`}>
      <h3 className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-2`}>
        Stats
      </h3>
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${colors.textSecondary}`}>Status</span>
          <span className={`text-sm font-medium ${colors.text}`}>{status}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-sm ${colors.textSecondary}`}>Score</span>
          <span className={`text-sm font-medium ${colors.text}`}>{score}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-sm ${colors.textSecondary}`}>Level</span>
          <span className={`text-sm font-medium ${colors.text}`}>{level}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-sm ${colors.textSecondary}`}>Lines</span>
          <span className={`text-sm font-medium ${colors.text}`}>{lines}</span>
        </div>
      </div>
    </div>
  );
}
