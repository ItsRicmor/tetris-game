"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  const { isFullscreen, toggleFullscreen, isSupported: isFullscreenSupported } = useFullscreen();
  const [mounted, setMounted] = useState(false);
  const game = useMemo(() => new Game(GAME_CONFIG), []);
  const [snap, setSnap] = useState(() => game.getSnapshot());
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const handleBackToHome = () => {
    const themeParam = searchParams.get("theme");
    const homeUrl = themeParam ? `/?theme=${themeParam}` : "/";
    router.push(homeUrl);
  };

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
      <div className="h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0f] dark:via-[#0f0f1a] dark:to-[#0a0a0f] flex flex-col">
        <div className="p-3 pb-0">
          <div className="flex gap-2 mb-2">
            <button
              onClick={handleBackToHome}
              className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-all"
              title="Back to Home"
            >
              <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Lines</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{snap.lines}</span>
              </div>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 flex-[2]">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-semibold">Next</p>
              <div className="flex gap-2 text-gray-900 dark:text-white text-xs font-bold">
                {snap.next.slice(0, 5).map((t, idx) => (
                  <span key={`${t}-${idx}`}>{t}</span>
                ))}
              </div>
            </div>
            {isFullscreenSupported && (
              <button
                onClick={toggleFullscreen}
                className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-all"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isFullscreen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  )}
                </svg>
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Hold</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{snap.hold ?? "—"}</span>
              </div>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Score</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{snap.score}</span>
              </div>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Level</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{snap.level}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-4 px-3 overflow-hidden min-h-0">
          <div className="flex flex-col items-center gap-3 h-full justify-center max-h-full">
            <div className="flex-shrink min-h-0">
              <Board snap={snap} isMobile={true} />
            </div>
            <GameStatus status={snap.status} />
          </div>
        </div>

        <div className="p-3 pt-0">
          <TouchControls game={game} onUpdate={updateSnapshot} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0f] dark:via-[#0f0f1a] dark:to-[#0a0a0f] flex items-center justify-center p-6">
      <div className="flex gap-8 items-start">
        <div className="flex flex-col gap-5 w-56">
          <button
            onClick={handleBackToHome}
            className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            title="Back to Home"
          >
            <svg className="w-5 h-5 text-gray-900 dark:text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Hold</h3>
            <div className="text-center">
              <span className="text-5xl font-black text-gray-900 dark:text-white">
                {snap.hold ?? "—"}
              </span>
            </div>
          </div>
          
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Score</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{snap.score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Level</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{snap.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Lines</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{snap.lines}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center py-4">
          <Board snap={snap} isMobile={false} />
          <GameStatus status={snap.status} />
        </div>

        <div className="flex flex-col gap-5 w-56">
          {isFullscreenSupported && (
            <button
              onClick={toggleFullscreen}
              className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 hover:from-purple-700 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-blue-600 rounded-xl p-3 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <svg className="w-5 h-5 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
            </button>
          )}
          
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Next Pieces</h3>
            <ol className="space-y-2.5 list-decimal list-inside text-gray-900 dark:text-white">
              {snap.next.map((t, idx) => (
                <li key={`${t}-${idx}`} className="text-lg font-bold">
                  {t}
                </li>
              ))}
            </ol>
          </div>
          
          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Controls</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-semibold">
              <div className="flex justify-between">
                <span className="font-mono">← →</span>
                <span>Move</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">↑ / Z</span>
                <span>Rotate</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">↓</span>
                <span>Soft Drop</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">Space</span>
                <span>Hard Drop</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">C</span>
                <span>Hold</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">P</span>
                <span>Pause</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">R</span>
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