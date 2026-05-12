"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { trpc } from "@/lib/trpc/react";

export function MealizeNewPostForm() {
  const router = useRouter();
  const me = trpc.user.me.useQuery();
  const categories = trpc.category.list.useQuery();
  const create = trpc.post.create.useMutation({
    onSuccess: (row) => {
      void router.push(`/posts/${row.id}`);
    },
  });

  const orgId = me.data?.organizationId ?? 0;

  const [isItem, setIsItem] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [categoryId, setCategoryId] = useState(1);
  const [imageUrl, setImageUrl] = useState("https://mealize.s3.amazonaws.com/item.png");
  const [expDate, setExpDate] = useState(() => new Date().toISOString().slice(0, 10));

  const cats = categories.data ?? [];

  useEffect(() => {
    if (cats.length && !cats.some((c) => c.id === categoryId)) {
      setCategoryId(cats[0]!.id);
    }
  }, [cats, categoryId]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId) return;
    create.mutate({
      isItem,
      organizationId: orgId,
      title: title.trim().slice(0, 25),
      description: description.trim().slice(0, 120),
      quantity: quantity.trim().slice(0, 12),
      categoryId,
      imageUrl: imageUrl.trim(),
      expDate: new Date(expDate),
      status: 0,
    });
  }

  if (me.isLoading) {
    return <p className="p-6 text-sm text-zinc-600">Loading…</p>;
  }
  if (!me.data?.isManager) {
    return (
      <p className="p-6 text-sm font-semibold text-zinc-800">
        Only managers can create posts. Ask your organization manager for access.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-8">
      <h1 className="mb-6 text-2xl font-black text-zinc-900">New post</h1>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-800">
          <input type="checkbox" checked={isItem} onChange={(e) => setIsItem(e.target.checked)} />
          Item (uncheck for request)
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Title (max 25)
          <input
            required
            maxLength={25}
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Description (max 120)
          <textarea
            required
            maxLength={120}
            rows={3}
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Quantity
          <input
            required
            maxLength={12}
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Category
          <select
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {cats.map((c) => (
              <option key={c.id} value={c.id}>
                {c.category}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Image URL
          <input
            required
            type="url"
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Expiration date
          <input
            required
            type="date"
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
          />
        </label>
        {create.error ? <p className="text-sm text-red-600">{create.error.message}</p> : null}
        <button
          type="submit"
          disabled={create.isPending}
          className="rounded-lg bg-[#28a690] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-50"
        >
          {create.isPending ? "Publishing…" : "Publish"}
        </button>
      </form>
    </div>
  );
}
