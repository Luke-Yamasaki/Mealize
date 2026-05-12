"use client";

import Link from "next/link";

import { trpc } from "@/lib/trpc/react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

import { MealizeMessageReplyForm } from "./mealize-message-reply-form";

export function MealizeMessageThread({ boardId }: { boardId: number }) {
  const { theme } = useMealizeTheme();
  const q = trpc.message.boardDetail.useQuery({ boardId });
  const text = theme === "light" ? "#191919" : "#fff";
  const muted = theme === "light" ? "#444" : "#ccc";
  const border = theme === "light" ? "#B2B2B2" : "#616161";

  if (q.isLoading) {
    return (
      <p className="p-6 text-sm" style={{ color: muted }}>
        Loading thread…
      </p>
    );
  }
  if (q.error || !q.data) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">Could not load this conversation.</p>
        <Link href="/messages" className="mt-4 inline-block text-sm font-bold text-[#28a690]">
          Back to messages
        </Link>
      </div>
    );
  }

  const board = q.data;

  return (
    <div className="flex max-w-[720px] flex-col gap-4 p-6" style={{ color: text }}>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-black">
          {board.userOneRel.firstName} {board.userOneRel.lastName} · {board.userTwoRel.firstName}{" "}
          {board.userTwoRel.lastName}
        </h1>
        <Link href="/messages" className="text-sm font-bold text-[#28a690] no-underline">
          All messages
        </Link>
      </div>
      <ul className="flex flex-col gap-3">
        {board.messages.map((m) => (
          <li
            key={m.id}
            className="rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: border }}
          >
            <div className="mb-1 text-xs font-bold opacity-80">
              {m.sender.firstName} {m.sender.lastName}
            </div>
            <div className="font-semibold">{m.content}</div>
          </li>
        ))}
      </ul>
      <MealizeMessageReplyForm boardId={boardId} />
    </div>
  );
}
