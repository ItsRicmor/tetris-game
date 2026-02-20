"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const themeParam = params.get("theme");
      if (themeParam === "light" || themeParam === "dark") {
        setTheme(themeParam);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const TETROMINO_COLORS = {
  I: { light: "bg-cyan-500", dark: "bg-cyan-400" },
  O: { light: "bg-yellow-500", dark: "bg-yellow-400" },
  T: { light: "bg-purple-500", dark: "bg-purple-400" },
  S: { light: "bg-green-500", dark: "bg-green-400" },
  Z: { light: "bg-red-500", dark: "bg-red-400" },
  J: { light: "bg-blue-500", dark: "bg-blue-400" },
  L: { light: "bg-orange-500", dark: "bg-orange-400" },
} as const;

export const themeConfig = {
  light: {
    bg: "bg-white",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    border: "border-gray-200",
    card: "bg-gray-50",
    hover: "hover:bg-gray-100",
    accent: "text-blue-600",
    block: "bg-blue-500",
    blockEmpty: "bg-gray-100",
    boardBg: "bg-gray-50",
    boardBorder: "border-gray-300",
  },
  dark: {
    bg: "bg-[#0a0a0f]",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    border: "border-gray-800",
    card: "bg-gray-900/50",
    hover: "hover:bg-gray-800",
    accent: "text-blue-400",
    block: "bg-blue-400",
    blockEmpty: "bg-gray-900",
    boardBg: "bg-black",
    boardBorder: "border-gray-800",
  },
};
