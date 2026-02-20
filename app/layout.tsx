import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tetris Game - Classic Block Puzzle Game",
  description: "Play the classic Tetris block-stacking puzzle game. Built with Next.js, TypeScript, and modern web technologies. Features responsive design, touch controls, and theme support.",
  keywords: ["tetris", "puzzle game", "block game", "classic game", "web game", "next.js", "typescript"],
  authors: [{ name: "Ricardo Morales" }],
  openGraph: {
    title: "Tetris Game - Classic Block Puzzle Game",
    description: "Play the classic Tetris block-stacking puzzle game online. Free, fast, and mobile-friendly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tetris Game - Classic Block Puzzle Game",
    description: "Play the classic Tetris block-stacking puzzle game online.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
