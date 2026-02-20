"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Game } from "@/packages/tetris-engine/src";
import { useGameLoop } from "./hooks/useGameLoop";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useIsMobile } from "./hooks/useIsMobile";
import { useFullscreen } from "./hooks/useFullscreen";
import { Board } from "./components/Board";
import { GameStatus } from "./components/GameStatus";
import { Stats } from "./components/Stats";
import { HoldDisplay } from "./components/HoldDisplay";
import { NextQueue } from "./components/NextQueue";
import { Controls } from "./components/Controls";
import { TouchControls } from "./components/TouchControls";
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
  const isMobile = useIsMobile();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
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

  if (isMobile) {
    return (
      <div className={`h-screen ${colors.bg} flex flex-col`}>
        <div className="p-2 pb-0">
          <div className="flex gap-1.5 mb-1.5">
            <div className={`${colors.card} rounded-md p-2 border ${colors.border} flex-1`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${colors.textSecondary}`}>Hold</span>
                <span className={`text-base font-semibold ${colors.text}`}>{snap.hold ?? "—"}</span>
              </div>
            </div>
            <div className={`${colors.card} rounded-md p-2 border ${colors.border} flex-1`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${colors.textSecondary}`}>Score</span>
                <span className={`text-sm font-semibold ${colors.text}`}>{snap.score}</span>
              </div>
            </div>
            <div className={`${colors.card} rounded-md p-2 border ${colors.border} flex-1`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${colors.textSecondary}`}>Level</span>
                <span className={`text-sm font-semibold ${colors.text}`}>{snap.level}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className={`${colors.card} rounded-md p-2 border ${colors.border} flex-1`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${colors.textSecondary}`}>Lines</span>
                <span className={`text-sm font-semibold ${colors.text}`}>{snap.lines}</span>
              </div>
            </div>
            <div className={`${colors.card} rounded-md p-2 border ${colors.border} flex-[2]`}>
              <p className={`text-xs ${colors.textSecondary} mb-0.5`}>Next</p>
              <div className={`flex gap-1.5 ${colors.text} text-xs font-medium`}>
                {snap.next.slice(0, 5).map((t, idx) => (
                  <span key={`${t}-${idx}`}>{t}</span>
                ))}
              </div>
            </div>
            <button
              onClick={toggleFullscreen}
              className={`${colors.card} rounded-md p-2 border ${colors.border} active:scale-95 transition-transform`}
            >
              <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-2 overflow-hidden">
          <div className="flex flex-col items-center gap-2">
            <Board snap={snap} />
            <GameStatus status={snap.status} />
          </div>
        </div>

        <div className="p-2 pt-0">
          <TouchControls game={game} onUpdate={updateSnapshot} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colors.bg} flex items-center justify-center p-6`}>
      <button
        onClick={toggleFullscreen}
        className={`fixed top-6 right-6 ${colors.card} rounded-lg p-3 border ${colors.border} hover:bg-opacity-80 transition-all z-10`}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isFullscreen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          )}
        </svg>
      </button>
      <div className="flex gap-8 items-start">
        <div className="flex flex-col gap-4 w-48">
          <div className={`${colors.card} rounded-lg p-4 border ${colors.border}`}>
            <h3 className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-3`}>Hold</h3>
            <div className="text-center">
              <span className={`text-3xl font-bold ${colors.text}`}>
                {snap.hold ?? "—"}
              </span>
            </div>
          </div>
          
          <div className={`${colors.card} rounded-lg p-4 border ${colors.border}`}>
            <h3 className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-3`}>Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${colors.textSecondary}`}>Score</span>
                <span className={`text-base font-semibold ${colors.text}`}>{snap.score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${colors.textSecondary}`}>Level</span>
                <span className={`text-base font-semibold ${colors.text}`}>{snap.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${colors.textSecondary}`}>Lines</span>
                <span className={`text-base font-semibold ${colors.text}`}>{snap.lines}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Board snap={snap} />
          <GameStatus status={snap.status} />
        </div>

        <div className="flex flex-col gap-4 w-48">
          <div className={`${colors.card} rounded-lg p-4 border ${colors.border}`}>
            <h3 className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-3`}>Next</h3>
            <ol className={`space-y-2 list-decimal list-inside ${colors.text}`}>
              {snap.next.map((t, idx) => (
                <li key={`${t}-${idx}`} className="text-base font-semibold">
                  {t}
                </li>
              ))}
            </ol>
          </div>
          
          <div className={`${colors.card} rounded-lg p-4 border ${colors.border}`}>
            <h3 className={`text-xs font-medium ${colors.textSecondary} uppercase tracking-wider mb-3`}>Controls</h3>
            <div className={`space-y-1 text-sm ${colors.textSecondary}`}>
              <div className="flex justify-between">
                <span>← →</span>
                <span>Move</span>
              </div>
              <div className="flex justify-between">
                <span>↑ / Z</span>
                <span>Rotate</span>
              </div>
              <div className="flex justify-between">
                <span>↓</span>
                <span>Soft Drop</span>
              </div>
              <div className="flex justify-between">
                <span>Space</span>
                <span>Hard Drop</span>
              </div>
              <div className="flex justify-between">
                <span>C</span>
                <span>Hold</span>
              </div>
              <div className="flex justify-between">
                <span>P</span>
                <span>Pause</span>
              </div>
              <div className="flex justify-between">
                <span>R</span>
                <span>Restart</span>
              </div>
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