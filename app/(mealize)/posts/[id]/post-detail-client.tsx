"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { MealizePostCard } from "@/components/mealize/mealize-post-card";
import { MealizeReserveDialog } from "@/components/mealize/mealize-reserve-dialog";
import { trpc } from "@/lib/trpc/react";

export function PostDetailClient({ postId }: { postId: number }) {
  const searchParams = useSearchParams();
  const openReserveParam = searchParams.get("reserve") === "1";
  const [reserveOpen, setReserveOpen] = useState(openReserveParam);
  const q = trpc.post.getById.useQuery({ id: postId });

  if (Number.isNaN(postId) || postId < 1) {
    return (
      <div className="w-full px-6 py-10">
        <Link href="/" className="text-sm font-semibold text-[#0f766e] underline">
          ← Back to feed
        </Link>
        <p className="mt-4 text-sm text-red-600">Invalid post id.</p>
      </div>
    );
  }

  if (q.isLoading) {
    return <div className="w-full px-6 py-10 text-sm text-zinc-600">Loading…</div>;
  }
  if (q.error || !q.data) {
    return (
      <div className="w-full px-6 py-10">
        <Link href="/" className="text-sm font-semibold text-[#0f766e] underline">
          ← Back to feed
        </Link>
        <p className="mt-4 text-sm text-red-600">Post not found.</p>
      </div>
    );
  }

  const canOpenReserve = q.data.status === 0 && q.data.isItem;

  return (
    <div className="flex w-full flex-col items-center px-6 py-10">
      <Link
        href="/"
        className="mb-6 self-start text-sm font-semibold text-[#0f766e] underline decoration-2 underline-offset-2"
      >
        ← Back to feed
      </Link>
      <div className="w-full max-w-lg">
        <MealizePostCard
          post={q.data}
          variant="detail"
          onCtaClick={canOpenReserve ? () => setReserveOpen(true) : undefined}
        />
      </div>
      {canOpenReserve ? (
        <MealizeReserveDialog
          post={q.data}
          open={reserveOpen}
          onOpenChange={setReserveOpen}
        />
      ) : null}
    </div>
  );
}
