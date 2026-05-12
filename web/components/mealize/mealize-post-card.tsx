"use client";

import Link from "next/link";

import { trpc } from "@/lib/trpc/react";

import { categoryCardStyle } from "./category-styles";
import {
  daysAgoLabel,
  expirationFlagTone,
  formatExpDate,
} from "./post-utils";
import type { MealizeTheme } from "@/stores/mealize-ui-store";

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

const flagGradients = {
  green: "linear-gradient(#46a843, #a4dba3)",
  yellow: "linear-gradient(#d49524, #e9c990)",
  red: "linear-gradient(#c2462a, #e0a193)",
} as const;

function clampStyleId(categoryId: number): 1 | 2 | 3 | 4 | 5 {
  if (categoryId >= 1 && categoryId <= 5) return categoryId as 1 | 2 | 3 | 4 | 5;
  return 1;
}

export function MealizePostCard({
  post,
  theme,
  isFavorite = false,
}: {
  post: MealizePostListItem;
  theme: MealizeTheme;
  isFavorite?: boolean;
}) {
  const style = categoryCardStyle[theme][clampStyleId(post.categoryId)];
  const tone = expirationFlagTone(new Date(post.expDate));
  const flagGradient = flagGradients[tone];
  const showReservedStrip = post.status > 0;
  const hoverable = post.status === 0;
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
      className={`flex max-w-[250px] flex-col items-center justify-center ${hoverable ? "transition-transform duration-100 hover:-translate-y-[4.5px] hover:scale-[1.02]" : ""}`}
    >
      <div className="mb-[-3px] flex h-[35px] w-[250px] flex-row items-center justify-start gap-2.5">
        <div className="flex flex-col items-center">
          <div
            className="h-3 w-5 rounded-sm"
            style={{ background: flagGradient }}
          />
          <div
            className="h-4 w-0.5 rounded-sm"
            style={{ background: flagGradient }}
          />
        </div>
        <div className="flex h-[30px] w-[120px] flex-row items-center gap-1 p-0">
          <span
            className="text-[0.7em] font-extrabold tracking-wide"
            style={{ color: theme === "light" ? "#191919" : "white" }}
          >
            Expires:
          </span>
          <span
            className="text-[0.6em] font-bold tracking-wide"
            style={{ color: theme === "light" ? "#191919" : "white" }}
          >
            {formatExpDate(new Date(post.expDate))}
          </span>
        </div>
      </div>

      <div
        className="flex w-[250px] flex-col items-center gap-1.5 rounded-[5px] py-1.5"
        style={{
          background: style.background,
          border: style.border,
          cursor: hoverable ? "pointer" : "default",
          minHeight: post.status > 0 ? "350px" : "390px",
        }}
      >
        {showReservedStrip ? (
          <div className="flex h-6 w-[230px] items-center justify-center rounded bg-black/25 text-xs font-bold text-white">
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
          className="flex h-[25px] w-[235px] flex-row items-center justify-start gap-1 no-underline"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.organization.logoUrl}
            alt=""
            className="h-[25px] w-[25px] rounded-full object-cover"
          />
          <span className="flex h-[25px] w-[180px] items-center text-left text-[0.8em] font-bold text-[#191919] hover:underline">
            {post.organization.name.length <= 25
              ? post.organization.name
              : `${post.organization.name.slice(0, 25)}...`}
          </span>
          <span className="max-w-[60px] shrink-0 text-[10px] text-[#191919]">
            {daysAgoLabel(post)}
          </span>
        </Link>

        <Link href={`/posts/${post.id}`} prefetch={false} className="leading-none no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt=""
            className="h-[200px] w-[250px] cursor-pointer object-cover"
            width={250}
            height={200}
          />
        </Link>

        <div className="flex w-[235px] flex-row items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-col">
            <span
              className="truncate font-bold"
              style={{ color: theme === "light" ? "#191919" : "white" }}
            >
              {post.title}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: theme === "light" ? "#191919" : "white" }}
            >
              ({post.quantity})
            </span>
          </div>
          <button
            type="button"
            title={isFavorite ? "Remove favorite" : "Add favorite"}
            onClick={toggleFavorite}
            disabled={addFav.isPending || removeFav.isPending}
            className="shrink-0 rounded border border-black/10 bg-white/80 px-2 py-1 text-xs font-black text-amber-600 hover:bg-white"
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div className="w-[235px] px-1">
          <p
            className="text-left text-[13px] leading-snug"
            style={{ color: theme === "light" ? "#191919" : "white" }}
          >
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
}
