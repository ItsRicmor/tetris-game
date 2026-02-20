import { memo } from "react";
import { useTheme, themeConfig } from "../context/ThemeContext";

export const Controls = memo(() => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];
  return (
    <div className={`${colors.card} rounded-md p-3 border ${colors.border} flex-1 sm:flex-none`}>
      <p className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-2`}>Controls</p>
      <div className={`grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs ${colors.textSecondary}`}>
        <span>← → Move</span>
        <span>↑ / Z Rotate</span>
        <span>↓ Soft Drop</span>
        <span>Space Drop</span>
        <span>C Hold</span>
        <span>P Pause</span>
        <span>R Restart</span>
      </div>
    </div>
  );
});
