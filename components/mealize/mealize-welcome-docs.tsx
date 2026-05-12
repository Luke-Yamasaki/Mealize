"use client";

import Link from "next/link";

import { MEALIZE_WIKI_BASE_PATH, PORTFOLIO_WIKI_ROOT, WIKI_PAGE_META, WIKI_SLUGS } from "@/lib/mealize-wiki";

import { WikiSectionLabel, wikiProse } from "./mealize-wiki-shell";

export function MealizeWelcomeDocs() {
  return (
    <article
      className="border-y border-neutral-200 bg-zinc-50/80 py-6 dark:border-white/10 dark:bg-zinc-900/35"
      aria-label="Mealize product wiki"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <header id="docs" className="scroll-mt-24 pb-4 pt-2">
          <WikiSectionLabel>Docs</WikiSectionLabel>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-black dark:text-zinc-50">Mealize wiki</h2>
          <p className={`mt-4 max-w-2xl ${wikiProse}`}>
            Full wiki pages now live on dedicated routes that follow the same URL pattern as the portfolio site (for
            example{" "}
            <Link href={`${MEALIZE_WIKI_BASE_PATH}/database-diagram`} prefetch={false} className="font-semibold">
              /work/mealize/wiki/database-diagram
            </Link>{" "}
            and{" "}
            <Link href={`${MEALIZE_WIKI_BASE_PATH}/design-thinking`} prefetch={false} className="font-semibold">
              /work/mealize/wiki/design-thinking
            </Link>
            ), mirroring{" "}
            <a href={PORTFOLIO_WIKI_ROOT} target="_blank" rel="noopener noreferrer">
              lukeyamasaki.com/work/mealize/wiki
            </a>
            . Use the <strong className="font-semibold text-black dark:text-zinc-200">Docs</strong> tab in the
            navigation bar, or open a page below.
          </p>
          <nav
            aria-label="Wiki table of contents"
            className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-950/50"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">All wiki pages</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={MEALIZE_WIKI_BASE_PATH}
                  prefetch={false}
                  className="text-sm font-semibold text-[#28a690] underline decoration-1 underline-offset-2 hover:opacity-[0.85]"
                >
                  Overview
                </Link>
                <span className="ml-2 text-xs text-zinc-500">{WIKI_PAGE_META.index.description}</span>
              </li>
              {WIKI_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`${MEALIZE_WIKI_BASE_PATH}/${slug}`}
                    prefetch={false}
                    className="text-sm font-semibold text-[#28a690] underline decoration-1 underline-offset-2 hover:opacity-[0.85]"
                  >
                    {WIKI_PAGE_META[slug].title}
                  </Link>
                  <span className="ml-2 text-xs text-zinc-500">{WIKI_PAGE_META[slug].description}</span>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>
    </article>
  );
}
