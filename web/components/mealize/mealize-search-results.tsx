"use client";

import { useAuth } from "@clerk/nextjs";

import { trpc } from "@/lib/trpc/react";

import { MealizePostCard, type MealizePostListItem } from "./mealize-post-card";
import { useMealizeTheme } from "@/stores/mealize-ui-store";

export function MealizeSearchResults({ query }: { query: string }) {
  const { theme } = useMealizeTheme();
  const { isSignedIn, isLoaded } = useAuth();
  const me = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!isSignedIn,
    retry: false,
  });
  const q = trpc.post.search.useQuery(
    { q: query },
    { enabled: query.trim().length > 0 },
  );
  const text = theme === "light" ? "#191919" : "#fff";
  const muted = theme === "light" ? "#444" : "#ccc";
  const favoritePostIds = new Set((me.data?.favorites ?? []).map((f) => f.postId));

  if (!query.trim()) {
    return <p className="p-6 text-sm text-zinc-600">Enter a search term.</p>;
  }
  if (q.isLoading) {
    return (
      <p className="p-6 text-sm" style={{ color: muted }}>
        Searching…
      </p>
    );
  }
  if (q.error) {
    return <p className="p-6 text-sm text-red-600">Search failed.</p>;
  }
  const posts = (q.data ?? []) as MealizePostListItem[];
  if (posts.length === 0) {
    return (
      <p className="p-6 text-sm font-semibold" style={{ color: muted }}>
        No posts matched &ldquo;{query}&rdquo;.
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-black" style={{ color: text }}>
        Results for &ldquo;{query}&rdquo;
      </h1>
      <div className="flex max-w-[900px] flex-row flex-wrap gap-6">
        {posts.map((p) => (
          <MealizePostCard
            key={p.id}
            post={p}
            theme={theme}
            isFavorite={favoritePostIds.has(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
