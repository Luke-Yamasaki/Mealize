"use client";

import { ArrowRight, Building2, HeartHandshake, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  DEMO_PERSONA_IDS,
  type DemoPersonaId,
} from "@/lib/demo-personas";

import { useDemoSignIn } from "./mealize-demo-sign-in-buttons";

const PERSONA_CARD: Record<
  DemoPersonaId,
  { title: string; blurb: string; icon: LucideIcon; accent: string }
> = {
  nonprofit_manager: {
    title: "Food bank manager",
    blurb: "Post requests, approve pickups, and keep your site’s pipeline moving.",
    icon: Building2,
    accent: "from-[#156b5c]/15 to-[#28a690]/10",
  },
  volunteer: {
    title: "Food bank volunteer",
    blurb: "Browse the feed, flag strong fits, and loop in your manager fast.",
    icon: HeartHandshake,
    accent: "from-[#76d97e]/20 to-[#28a690]/10",
  },
  business_manager: {
    title: "Business manager",
    blurb: "List surplus, review pickup requests, and clear the dock in one place.",
    icon: Store,
    accent: "from-[#28a690]/12 to-[#76d97e]/15",
  },
};

type MealizeWelcomePersonaPickerProps = {
  isLight: boolean;
};

export function MealizeWelcomePersonaPicker({ isLight }: MealizeWelcomePersonaPickerProps) {
  const { startDemo, pending, error, ready, busy } = useDemoSignIn();

  return (
    <div id="demo" className="w-full scroll-mt-24">
      <div className="grid w-full gap-3 sm:grid-cols-3 sm:gap-4">
          {DEMO_PERSONA_IDS.map((id) => {
          const card = PERSONA_CARD[id];
          const Icon = card.icon;
          const isPending = pending === id;

          return (
            <button
              key={id}
              type="button"
              disabled={!ready || busy}
              onClick={() => void startDemo(id)}
              className={`group flex flex-col rounded-2xl border p-5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28a690] disabled:cursor-not-allowed disabled:opacity-50 ${
                isLight
                  ? "border-neutral-200 bg-white shadow-sm hover:border-[#28a690]/40 hover:shadow-md"
                  : "border-white/10 bg-white/4 hover:border-[#9af2c0]/35 hover:bg-white/6"
              } ${isPending ? "ring-2 ring-[#28a690]/45" : ""}`}
            >
              <span
                className={`mb-4 flex size-12 items-center justify-center rounded-xl bg-linear-to-br ${card.accent} text-[#156b5c] ring-1 ring-[#28a690]/15 transition duration-300 group-hover:scale-105 dark:text-[#9af2c0] dark:ring-white/10`}
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-base font-bold tracking-tight text-black dark:text-zinc-50">
                {isPending ? "Signing in…" : card.title}
              </span>
              <span className="mt-1.5 flex-1 text-sm font-medium leading-relaxed text-black/75 dark:text-zinc-400">
                {card.blurb}
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#156b5c] dark:text-[#9af2c0]">
                {isPending ? "Starting demo" : "Enter demo"}
                <ArrowRight
                  className="size-3.5 transition group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </span>
            </button>
          );
        })}
      </div>
      {!ready ? (
        <p className="mt-4 text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Loading demo sign-in…
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 text-center text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
