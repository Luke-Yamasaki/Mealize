"use client";

import { useState } from "react";

import { trpc } from "@/lib/trpc/react";

export function MealizeMessageReplyForm({ boardId }: { boardId: number }) {
  const [content, setContent] = useState("");
  const utils = trpc.useUtils();
  const reply = trpc.message.reply.useMutation({
    onSuccess: () => {
      setContent("");
      void utils.message.boardDetail.invalidate({ boardId });
    },
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    reply.mutate({ boardId, content: trimmed });
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 border-t border-zinc-200 pt-4">
      <label className="text-sm font-bold text-zinc-800">
        Reply
        <textarea
          required
          maxLength={500}
          rows={3}
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-2 text-sm font-semibold"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a message…"
        />
      </label>
      {reply.error ? <p className="text-xs text-red-600">{reply.error.message}</p> : null}
      <button
        type="submit"
        disabled={reply.isPending}
        className="self-start rounded-lg bg-[#28a690] px-4 py-2 text-sm font-extrabold text-white disabled:opacity-50"
      >
        {reply.isPending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
