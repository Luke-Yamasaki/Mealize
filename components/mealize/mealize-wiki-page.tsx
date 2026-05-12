"use client";

import { WIKI_PAGE_META, type WikiSlug } from "@/lib/mealize-wiki";

import { WikiBody } from "./mealize-wiki-bodies";
import { MealizeWikiShell } from "./mealize-wiki-shell";

export function MealizeWikiPage({ slug }: { slug: WikiSlug | null }) {
  const key = slug === null ? "index" : slug;
  const meta = WIKI_PAGE_META[key];
  return (
    <MealizeWikiShell portfolioPath={meta.portfolioPath} kicker={meta.kicker} title={meta.title}>
      <WikiBody slug={slug} />
    </MealizeWikiShell>
  );
}
