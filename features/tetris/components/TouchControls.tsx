import { useTheme, themeConfig } from "../context/ThemeContext";
import type { Game } from "@/packages/tetris-engine/src";

interface TouchControlsProps {
  game: Game;
  onUpdate: () => void;
}

export const TouchControls = ({ game, onUpdate }: TouchControlsProps) => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];

  const handleAction = (action: string) => {
    switch (action) {
      case "left":
        game.dispatch({ type: "MoveLeft" });
        break;
      case "right":
        game.dispatch({ type: "MoveRight" });
        break;
      case "rotate":
        game.dispatch({ type: "RotateCW" });
        break;
      case "down":
        game.dispatch({ type: "SoftDropStart" });
        setTimeout(() => {
          game.dispatch({ type: "SoftDropStop" });
          onUpdate();
        }, 100);
        break;
      case "drop":
        game.dispatch({ type: "HardDrop" });
        break;
      case "hold":
        game.dispatch({ type: "Hold" });
        break;
    }
    onUpdate();
  };

  const buttonClass = `${colors.card} ${colors.border} border rounded-lg p-4 active:scale-95 transition-transform font-semibold ${colors.text}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-2">
        <button
          onTouchStart={() => handleAction("hold")}
          className={`${buttonClass} col-span-2 text-sm`}
        >
          Hold (C)
        </button>
        <button
          onTouchStart={() => handleAction("rotate")}
          className={`${buttonClass} col-span-2 text-sm`}
        >
          Rotate (↑)
        </button>

        <button
          onTouchStart={() => handleAction("left")}
          className={buttonClass}
        >
          ←
        </button>
        <button
          onTouchStart={() => handleAction("down")}
          className={buttonClass}
        >
          ↓
        </button>
        <button
          onTouchStart={() => handleAction("right")}
          className={buttonClass}
        >
          →
        </button>
        <button
          onTouchStart={() => handleAction("drop")}
          className={`${buttonClass} bg-blue-500/20 border-blue-500`}
        >
          Drop
        </button>
      </div>
    </div>
  );
};
