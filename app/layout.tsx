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
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  title: "Tetris Game - Classic Block Puzzle Game",
  description: "Play the classic Tetris block-stacking puzzle game. Built with Next.js, TypeScript, and modern web technologies. Features responsive design, touch controls, and theme support.",
  keywords: ["tetris", "puzzle game", "block game", "classic game", "web game", "next.js", "typescript"],
  authors: [{ name: "Ricardo Morales" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon',
  },
  openGraph: {
    title: "Tetris Game - Classic Block Puzzle Game",
    description: "Play the classic Tetris block-stacking puzzle game online. Free, fast, and mobile-friendly.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Tetris Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tetris Game - Classic Block Puzzle Game",
    description: "Play the classic Tetris block-stacking puzzle game online.",
    images: ["/api/og"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
