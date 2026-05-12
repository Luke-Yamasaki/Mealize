"use client";

import Link from "next/link";

import { trpc } from "@/lib/trpc/react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

export function MealizeMessagesList() {
  const { theme } = useMealizeTheme();
  const q = trpc.message.listBoards.useQuery();
  const text = theme === "light" ? "#191919" : "#fff";
  const muted = theme === "light" ? "#444" : "#ccc";

  if (q.isLoading) {
    return (
      <p className="p-6 text-sm" style={{ color: muted }}>
        Loading conversations…
      </p>
    );
  }
  if (q.error) {
    return (
      <p className="p-6 text-sm text-red-600">
        Could not load messages. Ensure you are signed in and your profile exists in the database.
      </p>
    );
  }
  const boards = q.data ?? [];
  if (boards.length === 0) {
    return (
      <div className="p-6" style={{ color: text }}>
        <p className="text-base font-bold">No conversations yet</p>
        <p className="mt-2 text-sm" style={{ color: muted }}>
          Start a thread from a post or user profile once that flow is wired in the UI.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex max-w-[720px] flex-col gap-2 p-6">
      {boards.map((b) => (
        <li key={b.id}>
          <Link
            href={`/messages/${b.id}`}
            className="block rounded-lg border px-4 py-3 no-underline transition-colors hover:bg-black/5"
            style={{
              borderColor: theme === "light" ? "#B2B2B2" : "#616161",
              color: text,
            }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-extrabold">
                {b.peer.firstName} {b.peer.lastName}
              </span>
              {b.lastMessage ? (
                <span className="line-clamp-2 text-sm font-semibold opacity-90">{b.lastMessage.content}</span>
              ) : (
                <span className="text-sm italic opacity-70">No messages</span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
