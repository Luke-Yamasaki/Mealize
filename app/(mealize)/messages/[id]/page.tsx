import { MealizeMessageThread } from "@/components/mealize/mealize-message-thread";

export default async function MessageThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boardId = Number.parseInt(id, 10);
  if (Number.isNaN(boardId)) {
    return <p className="p-6 text-sm text-red-600">Invalid conversation id.</p>;
  }
  return <MealizeMessageThread boardId={boardId} />;
}
