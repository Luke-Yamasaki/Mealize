"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronDown, Map, MessageSquare, Radio, ShieldCheck, Sparkles, Truck } from "lucide-react";

type Status = "live" | "beta" | "planned";

const CAPABILITIES: { title: string; status: Status; detail: string; icon: LucideIcon }[] = [
  {
    title: "Need / surplus feed & favorites",
    status: "live",
    detail: "Structured posts, filters, and starred posts for managers and volunteers.",
    icon: Radio,
  },
  {
    title: "Rule-based match suggestions",
    status: "live",
    detail: "Surfaces opposite-type listings in your state, with a wider pool when local inventory is thin.",
    icon: Map,
  },
  {
    title: "Impact estimates on org profiles",
    status: "live",
    detail: "Goodwill counts from deliveries and open posts until weigh-in data exists.",
    icon: ShieldCheck,
  },
  {
    title: "Exportable delivery log (CSV)",
    status: "live",
    detail: "Download deliveries you can see for audits, grants, and internal ops.",
    icon: Truck,
  },
  {
    title: "Post-delivery feedback (1–5 + note)",
    status: "live",
    detail: "Parties on a delivery can leave one rating each to close the loop.",
    icon: MessageSquare,
  },
  {
    title: "Trust & food safety copy helpers",
    status: "live",
    detail: "Checklist guidance and a donation acknowledgment template you can paste into email.",
    icon: ShieldCheck,
  },
  {
    title: "Verification badges (admin-set)",
    status: "beta",
    detail: "Nonprofit and commercial-kitchen flags on profiles when your team marks them verified.",
    icon: ShieldCheck,
  },
  {
    title: "Radius / route-aware discovery",
    status: "planned",
    detail: "Drive-time polygons and map clustering instead of state-level heuristics.",
    icon: Map,
  },
  {
    title: "Recurring pickups & slot booking",
    status: "planned",
    detail: "Standing appointments and capacity reservations per window.",
    icon: Truck,
  },
  {
    title: "Partial fulfillment & split runs",
    status: "planned",
    detail: "Share one post across multiple nonprofits with quantity accounting.",
    icon: Truck,
  },
  {
    title: "SMS / email digests & broadcasts",
    status: "planned",
    detail: "Quiet-hours aware nudges and partner-wide announcements.",
    icon: Radio,
  },
  {
    title: "ICS feeds & outbound webhooks",
    status: "planned",
    detail: "Calendar subscriptions and Zapier-style event hooks.",
    icon: MessageSquare,
  },
  {
    title: "Referrals & partner SLAs",
    status: "planned",
    detail: "Preferred partner lists with response-time expectations.",
    icon: MessageSquare,
  },
  {
    title: "AI-assisted ranking",
    status: "planned",
    detail: "Embeddings + policy-safe reranking on top of explicit rules.",
    icon: Sparkles,
  },
];

const statusLabel: Record<Status, string> = {
  live: "Live in web app",
  beta: "Beta / admin-gated",
  planned: "Planned",
};

const statusClass: Record<Status, string> = {
  live: "border-emerald-500/30 bg-emerald-50 text-emerald-950 dark:border-emerald-500/25 dark:bg-emerald-950/45 dark:text-emerald-100",
  beta: "border-amber-500/35 bg-amber-50 text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-100",
  planned: "border-neutral-300 bg-neutral-50 text-neutral-800 dark:border-white/15 dark:bg-zinc-900/60 dark:text-zinc-200",
};

export function MealizePlatformRoadmap() {
  return (
    <section
      id="platform"
      className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 pb-16 sm:px-6"
      aria-labelledby="platform-roadmap-heading"
    >
      <details open className="group rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900/50">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#28a690]">Platform</p>
            <h2 id="platform-roadmap-heading" className="mt-1 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
              Capabilities & roadmap
            </h2>
            <p className="mt-2 max-w-xl text-sm font-medium text-neutral-600 dark:text-zinc-300">
              What is shipping today versus what still needs infrastructure (maps, carriers, billing, or model
              governance).
            </p>
          </div>
          <ChevronDown
            className="size-6 shrink-0 text-neutral-500 transition-transform group-open:rotate-180 dark:text-zinc-400"
            aria-hidden
          />
        </summary>
        <div className="space-y-3 border-t border-neutral-200 px-5 py-4 dark:border-white/10">
            {CAPABILITIES.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.title}
                  className="flex gap-3 rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-3 dark:border-white/10 dark:bg-zinc-950/40"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#28a690] shadow-sm ring-1 ring-neutral-200 dark:bg-zinc-900 dark:ring-white/10">
                    <Icon className="size-4" strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-black dark:text-zinc-50">{row.title}</p>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusClass[row.status]}`}
                      >
                        {statusLabel[row.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-neutral-600 dark:text-zinc-400">
                      {row.detail}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </details>
    </section>
  );
}
