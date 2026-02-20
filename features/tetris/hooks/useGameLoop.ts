import { useEffect, useRef } from "react";
import type { Game } from "@/packages/tetris-engine/src";

export function useGameLoop(game: Game, onUpdate: () => void) {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    const loop = (t: number) => {
      const last = lastRef.current ?? t;
      const dt = t - last;
      lastRef.current = t;

      game.update(dt);
      onUpdate();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
  }, [game, onUpdate]);
}
