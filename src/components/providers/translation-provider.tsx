'use client';

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const TranslationContext = createContext<Dictionary | null>(null);

export function TranslationProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useDictionary must be used within a TranslationProvider");
  }

  return context;
}
