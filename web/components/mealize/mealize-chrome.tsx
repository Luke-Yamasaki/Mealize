"use client";

import { useEffect, type ReactNode } from "react";

import { useMealizeUiStore } from "@/stores/mealize-ui-store";

import { MealizeFooter } from "./mealize-footer";
import { MealizeLocationStrip } from "./mealize-location-strip";
import { MealizeModalRoot } from "./mealize-modal-root";
import { MealizeNavbar } from "./mealize-navbar";
import { MealizeShell } from "./mealize-shell";

/** Shared shell (background, navbar, footer) for `/` and other Mealize routes. */
export function MealizeChrome({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useMealizeUiStore.persist.rehydrate();
  }, []);

  return (
    <MealizeShell>
      <MealizeNavbar />
      <MealizeLocationStrip />
      {children}
      <MealizeFooter />
      <MealizeModalRoot />
    </MealizeShell>
  );
}
