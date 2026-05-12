"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

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
    const cardBg = theme === "light" ? "rgba(255,255,255,0.92)" : "rgba(35,35,35,0.85)";
    const cardBorder = theme === "light" ? "#B2B2B2" : "#616161";
    const iconBg =
      theme === "light"
        ? "linear-gradient(155deg, #e8faf0 0%, #d4f4e4 45%, #b8ead4 100%)"
        : "linear-gradient(155deg, #1e4038 0%, #15332d 50%, #0f2622 100%)";
    const iconColor = theme === "light" ? "#28a690" : "#8ae8b2";

    return (
      <div className="flex w-full justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div
          className="flex w-full max-w-[440px] flex-col items-center rounded-2xl px-8 py-10 text-center shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] sm:px-10 sm:py-12"
          style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            color: text,
          }}
        >
          <div
            className="mb-5 flex size-18 items-center justify-center rounded-2xl sm:size-20"
            style={{
              background: iconBg,
              boxShadow:
                theme === "light"
                  ? "0 10px 28px -8px rgba(40, 166, 144, 0.35)"
                  : "0 10px 28px -8px rgba(0, 0, 0, 0.5)",
            }}
            aria-hidden
          >
            <MessageCircle className="size-10 sm:size-11" strokeWidth={1.65} style={{ color: iconColor }} />
          </div>
          <h1 className="text-xl font-black tracking-tight sm:text-2xl">No conversations yet</h1>
          <p className="mt-3 max-w-[34ch] text-sm font-semibold leading-relaxed sm:text-[0.9375rem]" style={{ color: muted }}>
            When you message someone about a post, your threads will show up here. Browse the feed to find food
            to coordinate on.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#28a690] px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#22967f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28a690]"
            >
              Browse posts
            </Link>
            <Link
              href="/welcome"
              prefetch={false}
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#28a690] bg-transparent px-6 text-sm font-extrabold text-[#1a6b5c] transition hover:bg-black/4 dark:text-[#8ae8b2] dark:hover:bg-white/6"
            >
              How Mealize works
            </Link>
          </div>
        </div>
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
