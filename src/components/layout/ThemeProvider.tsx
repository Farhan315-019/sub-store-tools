"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "sst-theme";

let currentTheme: Theme = "dark";
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function applyTheme(next: Theme, persist: boolean) {
  currentTheme = next;
  document.documentElement.setAttribute("data-theme", next);
  if (persist) {
    localStorage.setItem(STORAGE_KEY, next);
  }
  notifyListeners();
}

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let stored: Theme = "dark";
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      stored = value === "light" ? "light" : "dark";
    } catch {
      stored = "dark";
    }
    applyTheme(stored, false);
  }, []);

  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark", true);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
