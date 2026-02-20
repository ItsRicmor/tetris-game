"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");
  const tetrisHref = theme ? `/tetris?theme=${theme}` : "/tetris";

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0f] dark:via-[#0f0f1a] dark:to-[#0a0a0f] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-cyan-400 dark:bg-cyan-500 rounded animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-400 dark:bg-yellow-500 rounded animate-bounce" style={{ animationDelay: '100ms' }} />
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-400 dark:bg-purple-500 rounded animate-bounce" style={{ animationDelay: '200ms' }} />
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-400 dark:bg-green-500 rounded animate-bounce" style={{ animationDelay: '300ms' }} />
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-400 dark:bg-red-500 rounded animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tight">
                TETRIS
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-lg mx-auto px-4">
                Stack blocks, clear lines, beat your high score
              </p>
            </div>

            <div className="pt-4 sm:pt-6">
              <Link
                href={tetrisHref}
                className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white text-lg sm:text-xl font-bold rounded-2xl hover:from-purple-700 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-blue-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Play Now
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 sm:pt-12 px-4">
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl sm:text-3xl mb-1">🎮</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Classic</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Gameplay</div>
              </div>
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl sm:text-3xl mb-1">📱</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Mobile</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Optimized</div>
              </div>
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl sm:text-3xl mb-1">⚡</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Lightning</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Fast</div>
              </div>
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-2xl sm:text-3xl mb-1">🎨</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Modern</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 sm:py-8 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
            <div className="flex gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span>⌨️ Keyboard</span>
              <span>👆 Touch</span>
              <span>🎯 Fullscreen</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
