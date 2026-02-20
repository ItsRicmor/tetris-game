import type { Metadata } from "next";
import { Suspense } from "react";
import TetrisClient from "@/features/tetris/TetrisClient";

export const metadata: Metadata = {
  title: "Play Tetris - Classic Block Puzzle Game",
  description: "Play Tetris online for free. Classic block-stacking puzzle game with modern controls, responsive design, and fullscreen mode. Works on mobile and desktop.",
  openGraph: {
    title: "Play Tetris - Classic Block Puzzle Game",
    description: "Play Tetris online for free. Mobile-friendly with touch controls.",
    images: ["/api/og"],
  },
  twitter: {
    images: ["/api/og"],
  },
};

export default function TetrisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0a0a0f] dark:via-[#0f0f1a] dark:to-[#0a0a0f] flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    }>
      <TetrisClient />
    </Suspense>
  );
}