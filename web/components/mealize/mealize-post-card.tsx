"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";

import { categoryAccentHex } from "./category-styles";
import { daysAgoLabel, expirationFlagTone, formatExpDate } from "./post-utils";

export type MealizePostListItem = {
  id: number;
  isItem: boolean;
  organizationId: number;
  userId: number;
  title: string;
  description: string;
  quantity: string;
  categoryId: number;
  imageUrl: string;
  expDate: Date;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  category: { id: number; category: string };
  organization: {
    id: number;
    name: string;
    logoUrl: string;
    isNonprofit: boolean;
  };
};

function clampStyleId(categoryId: number): 1 | 2 | 3 | 4 | 5 {
  if (categoryId >= 1 && categoryId <= 5) return categoryId as 1 | 2 | 3 | 4 | 5;
  return 1;
}

function listRecencyLabel(post: MealizePostListItem) {
  const l = daysAgoLabel(post);
  if (l === "now") return "Just now";
  return `${l} ago`;
}

const expirationToneClass: Record<"green" | "yellow" | "red", string> = {
  green:
    "border-emerald-500/35 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-100",
  yellow:
    "border-amber-500/40 bg-amber-50 text-amber-950 dark:border-amber-500/35 dark:bg-amber-950/40 dark:text-amber-100",
  red: "border-red-500/40 bg-red-50 text-red-900 dark:border-red-500/35 dark:bg-red-950/45 dark:text-red-100",
};

export function MealizePostCard({
  post,
  isFavorite = false,
}: {
  post: MealizePostListItem;
  isFavorite?: boolean;
}) {
  const tone = expirationFlagTone(new Date(post.expDate));
  const showReservedStrip = post.status > 0;
  const hoverable = post.status === 0;
  const categoryKey = clampStyleId(post.categoryId);
  const accent = categoryAccentHex[categoryKey];
  const utils = trpc.useUtils();
  const addFav = trpc.favorite.add.useMutation({
    onSuccess: () => void utils.user.me.invalidate(),
  });
  const removeFav = trpc.favorite.removeByPostId.useMutation({
    onSuccess: () => void utils.user.me.invalidate(),
  });

  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFav.mutate({ postId: post.id });
    } else {
      addFav.mutate({ postId: post.id });
    }
  }

  return (
    <div
      className={
        hoverable
          ? "transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md"
          : undefined
      }
    >
      <Card
        size="sm"
        className="overflow-hidden border-border/80 py-0 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/10"
      >
        <CardHeader className="gap-2 border-b border-border/60 px-3 py-3 pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className={expirationToneClass[tone]}>
              Expires {formatExpDate(new Date(post.expDate))}
            </Badge>
            <Badge
              variant="outline"
              className="border font-semibold"
              style={{ borderColor: accent, color: accent }}
            >
              {post.category.category}
            </Badge>
          </div>
          {showReservedStrip ? (
            <div className="rounded-lg bg-muted px-2 py-1.5 text-center text-xs font-bold text-foreground">
              {post.status === 1 && post.isItem
                ? "Reserved"
                : post.status === 2 && post.isItem
                  ? "Confirmed"
                  : "Completed"}
            </div>
          ) : null}
          <Link
            href={`/organizations/${post.organization.id}`}
            prefetch={false}
            className="flex min-w-0 flex-row items-center gap-2 text-left no-underline"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.organization.logoUrl}
              alt=""
              className="size-7 shrink-0 rounded-full object-cover ring-1 ring-border"
            />
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-foreground hover:underline">
              {post.organization.name}
            </span>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{daysAgoLabel(post)}</span>
          </Link>
        </CardHeader>

        <Link href={`/posts/${post.id}`} prefetch={false} className="block leading-none no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt=""
            className="aspect-[5/4] w-full cursor-pointer object-cover"
            width={400}
            height={320}
          />
        </Link>

        <CardContent className="space-y-2 pt-3 pb-2">
          <div className="flex flex-row items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link
                href={`/posts/${post.id}`}
                prefetch={false}
                className="block truncate text-base font-bold text-foreground no-underline hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-sm font-semibold text-muted-foreground">{post.quantity}</p>
            </div>
            <button
              type="button"
              title={isFavorite ? "Remove favorite" : "Add favorite"}
              onClick={toggleFavorite}
              disabled={addFav.isPending || removeFav.isPending}
              className="shrink-0 rounded-full border border-border bg-card px-2.5 py-1 text-sm font-bold text-amber-600 shadow-sm transition hover:bg-muted disabled:opacity-50"
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
          <p className="text-sm leading-snug text-muted-foreground">{post.description}</p>
        </CardContent>

        <CardFooter className="border-t border-border/60 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
          Listed {listRecencyLabel(post)}
        </CardFooter>
      </Card>
    </div>
  );
}
