"use client";

import { useAuth } from "@clerk/nextjs";

import { trpc } from "@/lib/trpc/react";

import { MealizePostCard, type MealizePostListItem } from "./mealize-post-card";

export function MealizeSearchResults({ query }: { query: string }) {
  const { isSignedIn, isLoaded } = useAuth();
  const me = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!isSignedIn,
    retry: false,
  });
  const q = trpc.post.search.useQuery(
    { q: query },
    { enabled: query.trim().length > 0 },
  );
  const favoritePostIds = new Set((me.data?.favorites ?? []).map((f) => f.postId));

  if (!query.trim()) {
    return <p className="p-6 text-sm text-muted-foreground">Enter a search term.</p>;
  }
  if (q.isLoading) {
    return <p className="p-6 text-sm text-muted-foreground">Searching…</p>;
  }
  if (q.error) {
    return <p className="p-6 text-sm text-destructive">Search failed.</p>;
  }
  const posts = (q.data ?? []) as MealizePostListItem[];
  if (posts.length === 0) {
    return (
      <p className="p-6 text-sm font-semibold text-muted-foreground">
        No posts matched &ldquo;{query}&rdquo;.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-lg font-bold tracking-tight text-foreground">
        Results for &ldquo;{query}&rdquo;
      </h1>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((p) => (
          <MealizePostCard
            key={p.id}
            post={p}
            isFavorite={favoritePostIds.has(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
