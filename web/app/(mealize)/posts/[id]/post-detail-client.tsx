"use client";

import Link from "next/link";

import { MealizePostCard } from "@/components/mealize/mealize-post-card";
import { trpc } from "@/lib/trpc/react";
import { useMealizeTheme } from "@/stores/mealize-ui-store";

export function PostDetailClient({ postId }: { postId: number }) {
  const { theme } = useMealizeTheme();
  const q = trpc.post.getById.useQuery({ id: postId });

  if (Number.isNaN(postId) || postId < 1) {
    return (
      <div className="mx-auto max-w-[1284px] px-6 py-10">
        <Link href="/" className="text-sm font-semibold text-[#0f766e] underline">
          ← Back to feed
        </Link>
        <p className="mt-4 text-sm text-red-600">Invalid post id.</p>
      </div>
    );
  }

  if (q.isLoading) {
    return <div className="mx-auto max-w-[1284px] px-6 py-10 text-sm text-zinc-600">Loading…</div>;
  }
  if (q.error || !q.data) {
    return (
      <div className="mx-auto max-w-[1284px] px-6 py-10">
        <Link href="/" className="text-sm font-semibold text-[#0f766e] underline">
          ← Back to feed
        </Link>
        <p className="mt-4 text-sm text-red-600">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[1284px] flex-col items-center px-6 py-10">
      <Link
        href="/"
        className="mb-6 self-start text-sm font-semibold text-[#0f766e] underline decoration-2 underline-offset-2"
      >
        ← Back to feed
      </Link>
      <MealizePostCard post={q.data} theme={theme} />
    </div>
  );
}
