"use client";

import Link from "next/link";

import { useMealizeTheme } from "@/stores/mealize-ui-store";
import { cn } from "@/lib/utils";

import { MealizeNavLogo } from "../mealize-nav-logo";

export function BrandLogo({ href = "/", className }: { href?: string; className?: string }) {
  const { theme } = useMealizeTheme();

  return (
    <Link
      href={href}
      aria-label="Mealize home"
      className={cn(
        "flex min-w-0 shrink-0 flex-row items-center gap-2 font-black text-white no-underline dark:text-black",
        className,
      )}
      style={{
        fontFamily: "motiva-sans, sans-serif",
        fontWeight: 900,
        fontStyle: "normal",
        fontSize: "28px",
        marginTop: "2px",
      }}
    >
      <span
        id="mealize-splash-logo-target"
        className="flex size-[40px] shrink-0 items-center justify-center sm:size-[45px]"
        aria-hidden
        data-mealize-splash-logo-target
      >
        <MealizeNavLogo theme={theme} className="block" />
      </span>
      <span className="truncate leading-none max-[380px]:hidden sm:inline">Mealize</span>
    </Link>
  );
}
