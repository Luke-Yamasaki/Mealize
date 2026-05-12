"use client";

import type { ReactNode } from "react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

import { portfolioWikiUrl } from "@/lib/mealize-wiki";

export const wikiProse =
  "text-sm font-medium leading-relaxed text-black dark:text-zinc-300 [&_a]:font-semibold [&_a]:text-[#28a690] [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[3px] [&_a]:hover:opacity-[0.85]";

export function WikiSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#156b5c] dark:text-[#9af2c0]">
      {children}
    </p>
  );
}

export function WikiOpenOriginal({ portfolioPath }: { portfolioPath: string }) {
  const href = portfolioWikiUrl(portfolioPath);
  return (
    <p className="not-prose mb-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold text-[#28a690] underline decoration-1 underline-offset-[3px] transition hover:opacity-[0.85]"
      >
        Open original on lukeyamasaki.com
      </a>
    </p>
  );
}

export function WikiRemoteImg({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`space-y-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote portfolio wiki assets */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-2xl border border-neutral-200 bg-white object-contain shadow-sm ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/8"
      />
      {caption ? (
        <figcaption className="text-xs font-medium leading-snug text-black/70 dark:text-zinc-400">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function WikiAtmosphere({ isLight }: { isLight: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className={
          isLight
            ? "absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-size-[52px_52px]"
            : "absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-size-[52px_52px] opacity-90"
        }
      />
      <div
        className={
          isLight
            ? "absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_16%,rgba(40,166,144,0.08),transparent_65%)]"
            : "absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_14%,rgba(40,166,144,0.16),transparent_60%)]"
        }
      />
    </div>
  );
}

export function MealizeWikiShell({
  portfolioPath,
  kicker,
  title,
  children,
}: {
  portfolioPath: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  const { theme } = useMealizeTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`relative isolate flex min-h-[50vh] w-full flex-col font-sans ${isLight ? "bg-white text-black" : "bg-zinc-950 text-zinc-50"}`}
    >
      <WikiAtmosphere isLight={isLight} />
      <article
        className="border-y border-neutral-200 bg-zinc-50/80 py-8 dark:border-white/10 dark:bg-zinc-900/35"
        aria-label={title}
      >
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <WikiOpenOriginal portfolioPath={portfolioPath} />
          <WikiSectionLabel>{kicker}</WikiSectionLabel>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">{title}</h1>
          <div className={`mt-8 space-y-6 ${wikiProse}`}>{children}</div>
        </div>
      </article>
    </div>
  );
}
