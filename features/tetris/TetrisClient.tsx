"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Game } from "@/packages/tetris-engine/src";
import { useGameLoop } from "./hooks/useGameLoop";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { Board } from "./components/Board";
import { GameStatus } from "./components/GameStatus";
import { Stats } from "./components/Stats";
import { HoldDisplay } from "./components/HoldDisplay";
import { NextQueue } from "./components/NextQueue";
import { Controls } from "./components/Controls";
import { ThemeProvider, useTheme, themeConfig } from "./context/ThemeContext";

const GAME_CONFIG = {
  width: 10,
  height: 24,
  hiddenRows: 4,
  nextQueueSize: 5,
  lockDelayMs: 300,
  linesPerLevel: 10,
  fallIntervalsMs: [800, 720, 630, 550, 470, 380, 300, 220, 130],
  fallIntervalCapMs: 100,
} as const;

const TetrisClientContent = () => {
  const { theme } = useTheme();
  const colors = themeConfig[theme];
  const [mounted, setMounted] = useState(false);
  const game = useMemo(() => new Game(GAME_CONFIG), []);
  const [snap, setSnap] = useState(() => game.getSnapshot());

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateSnapshot = useCallback(() => {
    setSnap(game.getSnapshot());
  }, [game]);

  useGameLoop(game, updateSnapshot);
  useKeyboardControls(game, snap.status, updateSnapshot);

  if (!mounted) {
    return (
      <div className={`min-h-screen ${colors.bg} flex items-center justify-center`}>
        <div className={colors.text}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colors.bg} flex items-center justify-center p-3 sm:p-4`}>
      <div className="w-full max-w-6xl">
        <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center items-start">
            <div className="flex gap-2 w-full sm:w-auto justify-between sm:flex-col sm:order-1">
              <HoldDisplay hold={snap.hold} canHold={snap.canHold} />
              <Stats
                status={snap.status}
                score={snap.score}
                level={snap.level}
                lines={snap.lines}
              />
            </div>

            <div className="flex flex-col gap-2 items-center sm:order-2">
              <Board snap={snap} />
              <GameStatus status={snap.status} />
            </div>

            <div className="flex gap-2 w-full sm:w-auto justify-between sm:flex-col sm:order-3">
              <NextQueue next={snap.next} />
              <Controls />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TetrisClient = () => {
  return (
    <ThemeProvider>
      <TetrisClientContent />
    </ThemeProvider>
  );
};

export default TetrisClient;