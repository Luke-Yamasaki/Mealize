"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

import { useMealizeAccessibility, useMealizeTheme } from "@/stores/mealize-ui-store";

/** Food-glyph tile from `react-app/src/Assets/Images/Pattern.png` (copied to `public/mealize/pattern.png`). */
const PATTERN_URL = 'url("/mealize/pattern.png")';

export function MealizeShell({ children }: { children: ReactNode }) {
  const { theme } = useMealizeTheme();
  const { brandHex, contrast, saturation, dyslexicFont } = useMealizeAccessibility();

  return (
    <div
      className={clsx(
        "mealize-root scheme-light relative flex min-h-screen w-full flex-col bg-background text-foreground dark:scheme-dark",
        theme === "dark" && "dark",
      )}
      data-mealize-theme={theme}
      data-mealize-contrast={contrast}
      data-mealize-dyslexic={dyslexicFont ? "true" : "false"}
      style={{
        ["--mealize-brand" as string]: brandHex,
        ["--primary" as string]: brandHex,
        ["--ring" as string]: brandHex,
        filter: saturation !== 100 ? `saturate(${saturation}%)` : undefined,
      }}
    >
      <div
        aria-hidden
        className={clsx(
          "pointer-events-none absolute inset-0 z-0 mix-blend-multiply opacity-[0.22] contrast-[1.45] brightness-[1.2] dark:mix-blend-normal dark:opacity-[0.28] dark:contrast-100 dark:brightness-100",
          theme === "dark" && "invert",
        )}
        style={{
          backgroundImage: PATTERN_URL,
          backgroundRepeat: "repeat",
          backgroundSize: "min(260px, 28vw)",
        }}
      />
      <div className="relative z-[1] flex min-h-0 w-full min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
