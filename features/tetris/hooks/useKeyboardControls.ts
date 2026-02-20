import { useEffect } from "react";
import type { Game } from "@/packages/tetris-engine/src";

export function useKeyboardControls(
  game: Game,
  status: "Running" | "Paused" | "GameOver",
  onUpdate: () => void
) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      switch (e.key) {
        case "ArrowLeft":
          game.dispatch({ type: "MoveLeft" });
          break;
        case "ArrowRight":
          game.dispatch({ type: "MoveRight" });
          break;
        case "ArrowUp":
          game.dispatch({ type: "RotateCW" });
          break;
        case "z":
        case "Z":
          game.dispatch({ type: "RotateCCW" });
          break;
        case "ArrowDown":
          game.dispatch({ type: "SoftDropStart" });
          break;
        case " ":
          e.preventDefault();
          game.dispatch({ type: "HardDrop" });
          break;
        case "c":
        case "C":
          game.dispatch({ type: "Hold" });
          break;
        case "p":
        case "P":
          game.dispatch({
            type: status === "Paused" ? "Resume" : "Pause",
          } as any);
          break;
        case "r":
        case "R":
          game.dispatch({ type: "Restart" });
          break;
      }

      onUpdate();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        game.dispatch({ type: "SoftDropStop" });
        onUpdate();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [game, status, onUpdate]);
}
