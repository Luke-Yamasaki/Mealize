"use client";

import type { ReactNode } from "react";

import { MealizeChrome } from "@/components/mealize/mealize-chrome";

/** Shared shell (navbar, footer, background) for all Mealize routes — mirrors legacy `App.jsx`. */
export default function MealizeLayout({ children }: { children: ReactNode }) {
  return <MealizeChrome>{children}</MealizeChrome>;
}
