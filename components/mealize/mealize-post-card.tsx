"use client";

import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import { categoryAccentHex } from "./category-styles";
import { formatExpDate, formatOrganizationAddress } from "./post-utils";

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
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};

function clampStyleId(categoryId: number): 1 | 2 | 3 | 4 | 5 {
  if (categoryId >= 1 && categoryId <= 5) return categoryId as 1 | 2 | 3 | 4 | 5;
  return 1;
}

function availabilityLabel(post: MealizePostListItem) {
  if (post.status === 0) return post.isItem ? "Open" : "Open request";
  if (post.status === 1 && post.isItem) return "Reserved";
  if (post.status === 2 && post.isItem) return "Confirmed";
  return "Completed";
}

const statusToneClass = (post: MealizePostListItem) => {
  if (post.status === 0) {
    return "border-border bg-muted text-foreground dark:border-border dark:bg-muted/70 dark:text-foreground";
  }
  if (post.status === 1) {
    return "border-amber-500/35 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-950/45 dark:text-amber-100";
  }
  if (post.status === 2) {
    return "border-emerald-600/30 bg-emerald-50 text-emerald-950 dark:border-emerald-400/25 dark:bg-emerald-950/50 dark:text-emerald-100";
  }
  return "border-border bg-muted/80 text-muted-foreground";
};

function postDetailCta(post: MealizePostListItem): { label: string; variant: "default" | "outline" } {
  if (post.status === 0 && post.isItem) {
    return { label: "Reserve", variant: "default" };
  }
  if (post.status === 0 && !post.isItem) {
    return { label: "Respond", variant: "default" };
  }
  return { label: "View details", variant: "outline" };
}

export function MealizePostCard({
  post,
  isFavorite = false,
  variant = "grid",
}: {
  post: MealizePostListItem;
  isFavorite?: boolean;
  /** `grid`: truncated description + equal card heights in grids. `detail`: full description on the post page. */
  variant?: "grid" | "detail";
}) {
  const hoverable = post.status === 0;
  const categoryKey = clampStyleId(post.categoryId);
  const accent = categoryAccentHex[categoryKey];
  const cta = postDetailCta(post);
  const orgAddress = formatOrganizationAddress(post.organization);
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
      className={cn(
        hoverable && "transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md",
        variant === "grid" && "h-full",
      )}
    >
      <Card
        size="sm"
        className={cn(
          "gap-0 overflow-hidden border-border/80 py-0 shadow-sm ring-1 ring-black/4 data-[size=sm]:gap-0 data-[size=sm]:py-0 dark:ring-white/10",
          variant === "grid" && "h-full",
        )}
      >
        <div className="relative shrink-0">
          <Link href={`/posts/${post.id}`} prefetch={false} className="block leading-none no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt=""
              className="aspect-4/3 w-full object-cover"
              width={400}
              height={300}
            />
          </Link>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/60 via-black/25 to-transparent"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 pt-12">
            <div className="pointer-events-auto max-w-[min(72%,14rem)] shrink rounded-full bg-linear-to-r from-[#76D97E] to-[#28A690] p-[2px] shadow-md">
              <Badge
                variant="outline"
                className="block w-full truncate rounded-full border-0 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-zinc-900 backdrop-blur-sm dark:bg-zinc-950/90 dark:text-zinc-50"
              >
                Expires {formatExpDate(new Date(post.expDate))}
              </Badge>
            </div>
            <button
              type="button"
              title={isFavorite ? "Remove from favorites" : "Save to favorites"}
              onClick={toggleFavorite}
              disabled={addFav.isPending || removeFav.isPending}
              className={cn(
                "pointer-events-auto flex size-10 shrink-0 items-center justify-center rounded-full border-0 bg-white/95 text-zinc-600 shadow-md ring-1 ring-black/10 backdrop-blur-sm transition",
                "hover:bg-white hover:text-rose-600",
                "disabled:pointer-events-none disabled:opacity-50",
                "dark:bg-zinc-950/90 dark:text-zinc-300 dark:ring-white/15 dark:hover:bg-zinc-900 dark:hover:text-rose-400",
                isFavorite && "text-rose-600 dark:text-rose-400",
              )}
            >
              <Heart className={cn("size-4.5", isFavorite && "fill-current")} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        <CardContent
          className={cn(
            "flex flex-col gap-0 px-3 pb-3 pt-3",
            variant === "grid" && "min-h-0 flex-1",
          )}
        >
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <Link
              href={`/posts/${post.id}`}
              prefetch={false}
              className="min-w-0 flex-1 text-pretty text-lg font-bold leading-snug tracking-tight text-foreground no-underline hover:underline"
            >
              {post.title}
            </Link>
            <p className="shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">{post.quantity}</p>
          </div>

          <p
            className={cn(
              "mb-3 text-sm leading-snug text-muted-foreground",
              variant === "grid" &&
                "line-clamp-2 min-h-[2.45rem] wrap-anywhere hyphens-auto",
              variant === "detail" && "text-pretty wrap-anywhere",
            )}
          >
            {post.description}
          </p>

          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className={cn("text-[11px] font-semibold", statusToneClass(post))}>
              {availabilityLabel(post)}
            </Badge>
            <Badge
              variant="outline"
              className="border font-semibold text-[11px]"
              style={{ borderColor: accent, color: accent }}
            >
              {post.category.category}
            </Badge>
          </div>

          {variant === "grid" ? <div className="min-h-0 flex-1" aria-hidden /> : null}

          <div className="flex flex-col gap-3 border-t border-border/60 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <Link
                href={`/organizations/${post.organization.id}`}
                prefetch={false}
                className="shrink-0 no-underline"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.organization.logoUrl}
                  alt=""
                  className="size-9 rounded-full object-cover ring-1 ring-border/80"
                />
              </Link>
              <div className="min-w-0">
                <Link
                  href={`/organizations/${post.organization.id}`}
                  prefetch={false}
                  className="block truncate text-sm font-bold text-foreground no-underline hover:underline"
                >
                  {post.organization.name}
                </Link>
                <div className="mt-0.5 flex min-w-0 items-center gap-1.5">
                  <MapPin
                    className="size-3.5 shrink-0 text-muted-foreground"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="min-w-0 flex-1 truncate text-xs font-medium text-muted-foreground" title={orgAddress}>
                    {orgAddress}
                  </p>
                </div>
              </div>
            </div>
            <Link
              href={`/posts/${post.id}`}
              prefetch={false}
              className={cn(
                "inline-flex h-9 w-full shrink-0 items-center justify-center rounded-lg border px-3 text-sm font-bold transition sm:w-auto sm:min-w-30",
                cta.variant === "default"
                  ? "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {cta.label}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
