import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              Tetris
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Classic block-stacking puzzle game. Clean, minimal, fast.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/tetris"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Play Game
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-600">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
