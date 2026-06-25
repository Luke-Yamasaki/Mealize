import { MealizeSearchResults } from "@/components/mealize/mealize-search-results";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ searchword: string }>;
}) {
  const { searchword } = await params;
  const decoded = decodeURIComponent(searchword);

  return <MealizeSearchResults query={decoded} />;
}
