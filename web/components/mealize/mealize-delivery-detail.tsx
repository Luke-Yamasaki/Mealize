"use client";

import Link from "next/link";

import { trpc } from "@/lib/trpc/react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(d));
}

export function MealizeDeliveryDetail({ deliveryId }: { deliveryId: number }) {
  const { theme } = useMealizeTheme();
  const q = trpc.delivery.byId.useQuery({ id: deliveryId });
  const text = theme === "light" ? "#191919" : "#fff";
  const muted = theme === "light" ? "#444" : "#ccc";
  const border = theme === "light" ? "#B2B2B2" : "#616161";

  if (q.isLoading) {
    return (
      <p className="p-6 text-sm" style={{ color: muted }}>
        Loading delivery…
      </p>
    );
  }
  if (q.error || !q.data) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">Delivery not found or not accessible.</p>
        <Link href="/deliveries" className="mt-4 inline-block text-sm font-bold text-[#28a690]">
          Back to deliveries
        </Link>
      </div>
    );
  }

  const d = q.data;

  return (
    <div className="max-w-[720px] space-y-4 p-6" style={{ color: text }}>
      <Link href="/deliveries" className="text-sm font-bold text-[#28a690] no-underline">
        ← All deliveries
      </Link>
      <h1 className="text-xl font-black">Delivery #{d.id}</h1>
      <div className="rounded-lg border p-4 text-sm" style={{ borderColor: border }}>
        <p className="font-bold">Post</p>
        <p className="mt-1 font-semibold">{d.post.title}</p>
        <p className="mt-2 text-xs opacity-80">{d.post.description}</p>
      </div>
      <div className="grid gap-2 text-sm font-semibold">
        <p>
          Date: {formatDate(d.date)} · Time slot: {d.time}
        </p>
        <p>Business: {d.business.name}</p>
        <p>Nonprofit: {d.nonprofit.name}</p>
        <p>
          Volunteer: {d.volunteer.firstName} {d.volunteer.lastName}
        </p>
        <p>Drop-off: {d.isDropoff ? "Yes" : "Pickup"}</p>
        <p>Completed: {d.completed === 0 ? "No" : `Flag ${d.completed}`}</p>
      </div>
      <p className="text-xs" style={{ color: muted }}>
        Edit and status transitions from the legacy app will be wired to mutations in a follow-up.
      </p>
    </div>
  );
}
