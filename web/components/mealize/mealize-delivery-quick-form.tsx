"use client";

import { useState } from "react";

import { trpc } from "@/lib/trpc/react";

/** Minimal delivery request form (legacy `createDelivery` parity for core fields). */
export function MealizeDeliveryQuickForm() {
  const me = trpc.user.me.useQuery();
  const posts = trpc.post.list.useQuery();
  const utils = trpc.useUtils();
  const create = trpc.delivery.create.useMutation({
    onSuccess: () => {
      void utils.delivery.listMine.invalidate();
    },
  });

  const [postId, setPostId] = useState<number>(1);
  const [businessId, setBusinessId] = useState<number>(1);
  const [nonprofitId, setNonprofitId] = useState<number>(12);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("Morning");
  const [isDropoff, setIsDropoff] = useState(false);

  const org = me.data?.organization;
  const rows = posts.data ?? [];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    create.mutate({
      isDropoff,
      postId,
      businessId,
      nonprofitId,
      date: new Date(date),
      time,
      completed: 0,
    });
  }

  if (!me.data) return null;

  return (
    <div className="border-t border-zinc-200 px-6 py-6">
      <h2 className="mb-2 text-lg font-black text-zinc-900">Create delivery (demo)</h2>
      <p className="mb-4 text-xs font-semibold text-zinc-600">
        Wire your org IDs and post from the live UI; this form sends the same payload as the legacy app&apos;s
        <code className="mx-1 rounded bg-zinc-100 px-1">createDelivery</code> thunk.
      </p>
      <form onSubmit={submit} className="grid max-w-xl grid-cols-1 gap-3 text-sm">
        <label className="font-bold text-zinc-800">
          Post id
          <select
            className="mt-1 w-full rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value))}
          >
            {rows.slice(0, 30).map((p) => (
              <option key={p.id} value={p.id}>
                #{p.id} — {p.title}
              </option>
            ))}
          </select>
        </label>
        <label className="font-bold text-zinc-800">
          Business org id
          <input
            type="number"
            className="mt-1 w-full rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={businessId}
            onChange={(e) => setBusinessId(Number(e.target.value))}
          />
        </label>
        <label className="font-bold text-zinc-800">
          Nonprofit org id
          <input
            type="number"
            className="mt-1 w-full rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={nonprofitId}
            onChange={(e) => setNonprofitId(Number(e.target.value))}
          />
        </label>
        <label className="font-bold text-zinc-800">
          Date
          <input
            type="date"
            className="mt-1 w-full rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="font-bold text-zinc-800">
          Time label
          <input
            className="mt-1 w-full rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 font-bold text-zinc-800">
          <input type="checkbox" checked={isDropoff} onChange={(e) => setIsDropoff(e.target.checked)} />
          Drop-off
        </label>
        {create.error ? <p className="text-xs text-red-600">{create.error.message}</p> : null}
        {create.isSuccess ? <p className="text-xs font-bold text-green-700">Created.</p> : null}
        <button
          type="submit"
          disabled={create.isPending}
          className="rounded-lg bg-[#28a690] px-4 py-2 font-extrabold text-white disabled:opacity-50"
        >
          {create.isPending ? "Submitting…" : "Create delivery"}
        </button>
      </form>
      {org ? (
        <p className="mt-3 text-xs text-zinc-500">
          Your org: {org.name} (id {org.id}, {me.data.isNonprofit ? "nonprofit" : "business"}).
        </p>
      ) : null}
    </div>
  );
}
