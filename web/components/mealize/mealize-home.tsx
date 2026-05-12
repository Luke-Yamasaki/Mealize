"use client";

import { trpc } from "@/lib/trpc/react";

import { MealizePostCard, type MealizePostListItem } from "./mealize-post-card";
import { MealizeFilterDropdown } from "./mealize-filter-dropdown";
import { useMealizeFilter } from "@/stores/mealize-ui-store";

const CATEGORY_BY_FILTER: Record<string, string> = {
  dairy: "Dairy",
  vegetables: "Vegetables",
  fruits: "Fruits",
  grains: "Grains",
  protein: "Protein",
};

export function MealizeHome() {
  const { filter } = useMealizeFilter();
  const postsQuery = trpc.post.list.useQuery();
  const meQuery = trpc.user.me.useQuery();

  const posts = (postsQuery.data ?? []) as MealizePostListItem[];
  const favorites = meQuery.data?.favorites ?? [];

  const availableArr = posts.filter((p) => p.status === 0);
  const unavailableArr = posts.filter((p) => p.status !== 0);
  const itemsArr = posts.filter((p) => p.isItem);
  const requestsArr = posts.filter((p) => !p.isItem);

  const categoryName = CATEGORY_BY_FILTER[filter];
  const categoryArr = categoryName
    ? posts.filter((p) => p.category.category === categoryName)
    : [];

  const favoritePosts: MealizePostListItem[] = favorites
    .map((f) => posts.find((p) => p.id === f.postId))
    .filter((p): p is MealizePostListItem => p != null);

  let list: MealizePostListItem[] = [];
  switch (filter) {
    case "available":
      list = [...availableArr].reverse();
      break;
    case "unavailable":
      list = unavailableArr;
      break;
    case "items":
      list = [...itemsArr].reverse();
      break;
    case "requests":
      list = [...requestsArr].reverse();
      break;
    case "favorites":
      list = favoritePosts;
      break;
    default:
      if (categoryName) list = categoryArr;
      break;
  }

  const favoritePostIds = new Set(favorites.map((f) => f.postId));

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-6 pb-14 sm:px-6 lg:px-8">
      <section className="flex min-w-0 flex-col">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Posts</h2>
          <MealizeFilterDropdown align="end" />
        </div>

        {postsQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : postsQuery.error ? (
          <p className="text-sm text-destructive">
            Could not load posts. Set `DATABASE_URL` and run migrations plus seed.
          </p>
        ) : filter === "favorites" && favoritePosts.length === 0 ? (
          <div className="flex max-w-[1000px] flex-col items-center gap-4 py-12">
            <p className="text-center text-base font-semibold text-foreground">
              You do not have any favorites yet. Use the star on a post to save it here.
            </p>
          </div>
        ) : list.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts match this filter.</p>
        ) : (
          <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <MealizePostCard
                key={p.id}
                post={p}
                isFavorite={favoritePostIds.has(p.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
