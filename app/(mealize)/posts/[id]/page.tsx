import { PostDetailClient } from "./post-detail-client";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number.parseInt(id, 10);

  return <PostDetailClient postId={postId} />;
}
