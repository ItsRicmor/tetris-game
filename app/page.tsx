import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Tetris Game
          </h1>
          <p className="text-xl text-gray-400 max-w-md mx-auto">
            Classic block-stacking puzzle game built with Next.js
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/tetris"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Play Tetris</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
