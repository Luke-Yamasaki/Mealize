import { notFound } from "next/navigation";

import { MealizeWikiPage } from "@/components/mealize/mealize-wiki-page";
import { isWikiSlug } from "@/lib/mealize-wiki";

type Props = { params: Promise<{ slug: string }> };

/** Wiki subpages — mirrors https://www.lukeyamasaki.com/work/mealize/wiki/{slug} */
export default async function MealizeWikiSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!isWikiSlug(slug)) notFound();
  return <MealizeWikiPage slug={slug} />;
}
