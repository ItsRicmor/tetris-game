import type { Metadata } from "next";
import TetrisClient from "@/features/tetris/TetrisClient";

export const metadata: Metadata = {
  title: "Play Tetris - Classic Block Puzzle Game",
  description: "Play Tetris online for free. Classic block-stacking puzzle game with modern controls, responsive design, and fullscreen mode. Works on mobile and desktop.",
  openGraph: {
    title: "Play Tetris - Classic Block Puzzle Game",
    description: "Play Tetris online for free. Mobile-friendly with touch controls.",
  },
};

export default function TetrisPage() {
  return <TetrisClient />;
}