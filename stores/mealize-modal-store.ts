"use client";

import type { ReactNode } from "react";
import { create } from "zustand";

type MealizeModalState = {
  node: ReactNode | null;
  open: (node: ReactNode) => void;
  close: () => void;
};

export const useMealizeModalStore = create<MealizeModalState>((set) => ({
  node: null,
  open: (node) => set({ node }),
  close: () => set({ node: null }),
}));
