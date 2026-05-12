"use client";

import { trpc } from "@/lib/trpc/react";

import { MealizePostCard, type MealizePostListItem } from "./mealize-post-card";
import { MealizeSidebarFilters } from "./mealize-sidebar-filters";
import { useMealizeFilter, useMealizeTheme } from "@/stores/mealize-ui-store";

const CATEGORY_BY_FILTER: Record<string, string> = {
  dairy: "Dairy",
  vegetables: "Vegetables",
  fruits: "Fruits",
  grains: "Grains",
  protein: "Protein",
};

export function MealizeHome() {
  const { theme } = useMealizeTheme();
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

  const bg = theme === "light" ? "#E8E8E8" : "#232323";
  const border = theme === "light" ? "#B2B2B2" : "#616161";
  const favoritePostIds = new Set(favorites.map((f) => f.postId));

  return (
    <div
      className="flex w-[calc(100vw-50px)] max-w-[1284px] flex-row flex-wrap justify-start gap-[75px] px-6 py-5 pb-12 shadow-[0px_1px_3px_rgba(0,0,0,0.35)]"
      style={{
        minHeight: "calc(100vh - 50px)",
        background: bg,
        border: `1px solid ${border}`,
      }}
    >
      <MealizeSidebarFilters />
      <section className="flex min-w-0 max-w-[900px] flex-1 flex-col" style={{ width: "calc(100vw - 125px)" }}>
        <h2
          className="mb-4 mt-2 text-base font-extrabold"
          style={{ color: theme === "light" ? "#191919" : "white" }}
        >
          Posts
        </h2>

        {postsQuery.isLoading ? (
          <p className="text-sm" style={{ color: theme === "light" ? "#444" : "#ccc" }}>
            Loading…
          </p>
        ) : postsQuery.error ? (
          <p className="text-sm text-red-600">
            Could not load posts. Set `DATABASE_URL` and run migrations plus seed.
          </p>
        ) : filter === "favorites" && favoritePosts.length === 0 ? (
          <div className="flex max-w-[1000px] flex-col items-center gap-4 py-8">
            <p
              className="text-center text-base font-bold"
              style={{ color: theme === "light" ? "#191919" : "white" }}
            >
              You do not have any favorites yet. Use the star on a post to save it here.
            </p>
          </div>
        ) : list.length === 0 ? (
          <p className="text-sm" style={{ color: theme === "light" ? "#444" : "#ccc" }}>
            No posts match this filter.
          </p>
        ) : (
          <div className="flex max-w-[820px] flex-row flex-wrap gap-x-6 gap-y-5">
            {list.map((p) => (
              <MealizePostCard
                key={p.id}
                post={p}
                theme={theme}
                isFavorite={favoritePostIds.has(p.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
