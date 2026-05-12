"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

export type MealizeTheme = "light" | "dark";

export type FeedFilter =
  | "available"
  | "unavailable"
  | "favorites"
  | "items"
  | "requests"
  | "dairy"
  | "vegetables"
  | "fruits"
  | "grains"
  | "protein";

export type MealizeContrast = "normal" | "high";

type MealizeUiState = {
  theme: MealizeTheme;
  filter: FeedFilter;
  brandHex: string;
  contrast: MealizeContrast;
  saturation: number;
  dyslexicFont: boolean;
  locationLabel: string;
  setTheme: (theme: MealizeTheme) => void;
  setFilter: (filter: FeedFilter) => void;
  setBrandHex: (hex: string) => void;
  setContrast: (contrast: MealizeContrast) => void;
  setSaturation: (saturation: number) => void;
  setDyslexicFont: (on: boolean) => void;
  setLocationLabel: (label: string) => void;
};

export const useMealizeUiStore = create<MealizeUiState>()(
  persist(
    (set) => ({
      theme: "light",
      filter: "available",
      brandHex: "#28a690",
      contrast: "normal",
      saturation: 100,
      dyslexicFont: false,
      locationLabel: "",
      setTheme: (theme) => set({ theme }),
      setFilter: (filter) => set({ filter }),
      setBrandHex: (brandHex) => set({ brandHex }),
      setContrast: (contrast) => set({ contrast }),
      setSaturation: (saturation) => set({ saturation }),
      setDyslexicFont: (dyslexicFont) => set({ dyslexicFont }),
      setLocationLabel: (locationLabel) => set({ locationLabel }),
    }),
    {
      name: "mealize-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        theme: s.theme,
        filter: s.filter,
        brandHex: s.brandHex,
        contrast: s.contrast,
        saturation: s.saturation,
        dyslexicFont: s.dyslexicFont,
        locationLabel: s.locationLabel,
      }),
      skipHydration: true,
    },
  ),
);

/** Theme + setter (stable reference via useShallow). */
export function useMealizeTheme() {
  return useMealizeUiStore(
    useShallow((s) => ({
      theme: s.theme,
      setTheme: s.setTheme,
    })),
  );
}

export function useMealizeFilter() {
  return useMealizeUiStore(
    useShallow((s) => ({
      filter: s.filter,
      setFilter: s.setFilter,
    })),
  );
}

/** Color / contrast / saturation / dyslexic / location (legacy React contexts). */
export function useMealizeAccessibility() {
  return useMealizeUiStore(
    useShallow((s) => ({
      brandHex: s.brandHex,
      contrast: s.contrast,
      saturation: s.saturation,
      dyslexicFont: s.dyslexicFont,
      locationLabel: s.locationLabel,
      setBrandHex: s.setBrandHex,
      setContrast: s.setContrast,
      setSaturation: s.setSaturation,
      setDyslexicFont: s.setDyslexicFont,
      setLocationLabel: s.setLocationLabel,
    })),
  );
}
