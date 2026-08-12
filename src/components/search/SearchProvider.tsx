"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { SearchModal } from "./SearchModal";

type SearchContextValue = {
  open: () => void;
  close: () => void;
};

const SearchContext = createContext<SearchContextValue>({ open: () => {}, close: () => {} });

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <SearchContext.Provider value={{ open, close }}>
      {children}
      <SearchModal open={isOpen} onClose={close} />
    </SearchContext.Provider>
  );
}
