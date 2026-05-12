"use client";

import type { ReactNode } from "react";

import { MealizeLogoMedium } from "./mealize-logo-medium";

/** Gradient mark above Clerk sign-in / sign-up (matches welcome marketing). */
export function MealizeAuthBranding({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full max-w-[420px] flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <MealizeLogoMedium className="h-16 w-auto shrink-0 sm:h-18" />
        <span className="sr-only">Mealize</span>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
