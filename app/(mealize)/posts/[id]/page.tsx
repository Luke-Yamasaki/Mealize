import { Suspense } from "react";

import { PostDetailClient } from "./post-detail-client";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number.parseInt(id, 10);

  return (
    <Suspense
      fallback={
        <div className="w-full px-6 py-10 text-sm text-zinc-600">Loading…</div>
      }
    >
      <PostDetailClient postId={postId} />
    </Suspense>
  );
}
