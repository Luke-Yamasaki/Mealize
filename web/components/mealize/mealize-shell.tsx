"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

import {
  useMealizeAccessibility,
  useMealizeBackground,
  useMealizeTheme,
} from "@/stores/mealize-ui-store";

export function MealizeShell({ children }: { children: ReactNode }) {
  const { theme } = useMealizeTheme();
  const { showPattern } = useMealizeBackground();
  const { brandHex, contrast, saturation, dyslexicFont } = useMealizeAccessibility();

  const patternUrl = 'url("https://mealize.s3.amazonaws.com/Pattern_10.png")';
  const lightBand = "linear-gradient(rgba(118, 217, 126, 0.75), rgba(40, 166, 144, 0.75))";
  const darkBand = "linear-gradient(rgba(25, 25, 25, 0.85), rgba(25, 25, 25, 0.85))";

  let backgroundImage: string;
  if (theme === "light" && showPattern) {
    backgroundImage = `${lightBand}, ${patternUrl}`;
  } else if (theme === "light") {
    backgroundImage = lightBand;
  } else if (showPattern) {
    backgroundImage = `${darkBand}, ${patternUrl}`;
  } else {
    backgroundImage = darkBand;
  }

  return (
    <div
      className={clsx("mealize-root flex min-h-screen w-full flex-row justify-center")}
      data-mealize-theme={theme}
      data-mealize-contrast={contrast}
      data-mealize-dyslexic={dyslexicFont ? "true" : "false"}
      style={{
        backgroundImage,
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        ["--mealize-brand" as string]: brandHex,
        filter: saturation !== 100 ? `saturate(${saturation}%)` : undefined,
      }}
    >
      <div className="flex w-screen max-w-[1336px] flex-col items-center">{children}</div>
    </div>
  );
}
