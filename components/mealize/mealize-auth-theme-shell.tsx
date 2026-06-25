"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { useMealizeAccessibility, useMealizeTheme } from "@/stores/mealize-ui-store";
import { useMealizeUiStore } from "@/stores/mealize-ui-store";

/**
 * Wraps Clerk auth routes so they use the same persisted Mealize theme as the main app.
 * Adds `mealize-root` + `data-mealize-theme` so Tailwind `dark:` (see globals.css) applies.
 * Page background matches {@link MealizeWelcome}: white / zinc-950 + the same faint grid and teal
 * radial wash as `WelcomeAtmosphere`. Green corner blurs match the original auth marketing
 * treatment and do not change with theme.
 */
export function MealizeAuthThemeShell({ children }: { children: ReactNode }) {
  const { theme } = useMealizeTheme();
  const { brandHex, contrast, saturation, dyslexicFont } = useMealizeAccessibility();
  const isLight = theme === "light";

  useEffect(() => {
    void useMealizeUiStore.persist.rehydrate();
  }, []);

  return (
    <div
      className={clsx(
        "mealize-auth mealize-root relative isolate flex min-h-full flex-col bg-white font-sans text-black scheme-light dark:bg-zinc-950 dark:text-zinc-50 dark:scheme-dark",
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
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        {/* Corner washes — same in light and dark (do not theme-tweak). */}
        <div className="absolute -top-40 -right-28 h-[min(78vh,760px)] w-[min(115vw,920px)] rounded-full bg-linear-to-bl from-[#76d97e]/55 via-[#28a690]/32 to-transparent blur-3xl" />
        <div className="absolute -bottom-36 -left-32 h-[min(72vh,700px)] w-[min(110vw,880px)] rounded-full bg-linear-to-tr from-[#28a690]/48 via-[#76d97e]/38 to-transparent blur-3xl" />
        {/* Faint grid — same as `WelcomeAtmosphere` on the welcome page */}
        <div
          className={
            isLight
              ? "absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-size-[52px_52px]"
              : "absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-size-[52px_52px] opacity-90"
          }
        />
        {/* Soft radial wash — same as `WelcomeAtmosphere` */}
        <div
          className={
            isLight
              ? "absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_16%,rgba(40,166,144,0.1),transparent_65%)]"
              : "absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_14%,rgba(40,166,144,0.2),transparent_60%)]"
          }
        />
      </div>
      {children}
    </div>
  );
}
