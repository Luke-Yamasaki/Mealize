"use client";

import { MapPin } from "lucide-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { useMealizeAccessibility, useMealizeTheme } from "@/stores/mealize-ui-store";

import { MealizeLocationSettings } from "./mealize-location-settings";
import { Popover } from "./ui/popover";

export function MealizeLocationStrip() {
  const { locationLabel } = useMealizeAccessibility();
  const { theme } = useMealizeTheme();
  const isDark = theme === "dark";
  const trimmed = locationLabel.trim();

  return (
    <div className="border-b border-border bg-card px-4 py-2.5 sm:px-6">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-2">
        <MapPin
          className="size-4 shrink-0 text-primary-readable"
          aria-hidden
        />
        <Popover.Root>
          <Popover.Trigger
            type="button"
            aria-label={trimmed ? `Edit pickup area: ${trimmed}` : "Set a pickup area"}
            className={cn(
              "min-w-0 max-w-full cursor-pointer truncate text-center text-sm font-semibold underline decoration-from-font underline-offset-4 transition",
              "hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              trimmed ? "text-primary-readable" : "text-muted-foreground",
            )}
          >
            {trimmed ? `Pick up at ${trimmed}` : "Set a pickup area"}
          </Popover.Trigger>
          <Popover.Content
            align="center"
            side="bottom"
            sideOffset={8}
            className={cn(
              "w-[min(22rem,calc(100vw-2rem))] p-4",
              isDark ? "bg-zinc-900 text-white" : "bg-white text-zinc-950",
            )}
            style={
              isDark
                ? ({
                    ["--foreground"]: "#ffffff",
                    ["--muted-foreground"]: "#f4f4f5",
                    ["--card"]: "#27272a",
                    ["--card-foreground"]: "#ffffff",
                    ["--muted"]: "#3f3f46",
                    ["--border"]: "rgba(255, 255, 255, 0.16)",
                    ["--primary"]: "#5eead4",
                    ["--primary-readable"]: "#5eead4",
                  } as CSSProperties)
                : undefined
            }
          >
            <div className="mb-3 space-y-1">
              <Popover.Title className="text-base font-semibold tracking-tight text-foreground">
                Pickup location
              </Popover.Title>
              <Popover.Description className="text-xs leading-snug text-muted-foreground">
                Choose where you typically pick up or receive surplus food.
              </Popover.Description>
            </div>
            <MealizeLocationSettings />
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}
