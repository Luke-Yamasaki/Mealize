"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import type { MealizePostListItem } from "./mealize-post-card";

export function MealizeMatchesStrip() {
  const q = trpc.match.suggestedForMe.useQuery();

  if (q.isLoading || q.error || !q.data) {
    return null;
  }

  const posts = q.data.posts as MealizePostListItem[];
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mb-8 min-w-0" aria-labelledby="match-suggestions-heading">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2
            id="match-suggestions-heading"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <Sparkles className="size-5 text-primary-readable dark:text-primary" aria-hidden />
            Suggested for you
          </h2>
          <p className="mt-1 max-w-2xl text-sm font-medium text-muted-foreground">{q.data.caption}</p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            prefetch={false}
            className={cn(
              "w-[min(260px,calc(100vw-3rem))] shrink-0 no-underline",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-readable/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-primary/40",
            )}
          >
            <Card className="h-full overflow-hidden border-border/80 transition-shadow hover:shadow-md hover:ring-1 hover:ring-primary-readable/20 dark:hover:ring-primary/25">
              <CardContent className="flex gap-3 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt=""
                  className="size-14 shrink-0 rounded-lg border border-border/80 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-bold leading-snug text-foreground">{post.title}</p>
                  <p className="mt-1 truncate text-xs font-semibold text-muted-foreground">{post.organization.name}</p>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-primary-readable dark:text-primary">
                    {post.isItem ? "Surplus item" : "Request"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
