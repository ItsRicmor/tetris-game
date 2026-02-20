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

const TetrisClient = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          <div className="flex flex-col gap-4">
            <Controls />
            <Board snap={snap} />
            <GameStatus status={snap.status} />
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-64">
            <Stats
              status={snap.status}
              score={snap.score}
              level={snap.level}
              lines={snap.lines}
            />
            <HoldDisplay hold={snap.hold} canHold={snap.canHold} />
            <NextQueue next={snap.next} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisClient;