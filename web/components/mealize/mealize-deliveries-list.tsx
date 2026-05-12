"use client";

import Link from "next/link";

import { trpc } from "@/lib/trpc/react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

import { MealizeDeliveryQuickForm } from "./mealize-delivery-quick-form";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(d));
}

export function MealizeDeliveriesList() {
  const { theme } = useMealizeTheme();
  const q = trpc.delivery.listMine.useQuery();
  const text = theme === "light" ? "#191919" : "#fff";
  const muted = theme === "light" ? "#444" : "#ccc";
  const border = theme === "light" ? "#B2B2B2" : "#616161";

  if (q.isLoading) {
    return (
      <p className="p-6 text-sm" style={{ color: muted }}>
        Loading deliveries…
      </p>
    );
  }
  if (q.error) {
    return (
      <p className="p-6 text-sm text-red-600">
        Could not load deliveries. Ensure you are signed in and your profile exists in the database.
      </p>
    );
  }
  const rows = q.data ?? [];

  return (
    <>
      {rows.length === 0 ? (
        <div className="p-6" style={{ color: text }}>
          <p className="text-base font-bold">No deliveries yet</p>
          <p className="mt-2 text-sm" style={{ color: muted }}>
            When you coordinate pickups through posts, they will show up here.
          </p>
        </div>
      ) : (
        <ul className="flex max-w-[900px] flex-col gap-2 p-6">
          {rows.map((d) => (
            <li key={d.id}>
              <Link
                href={`/deliveries/${d.id}`}
                className="block rounded-lg border px-4 py-3 no-underline transition-colors hover:bg-black/5"
                style={{ borderColor: border, color: text }}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-extrabold">
                    {d.post.title} · {formatDate(d.date)} · {d.time}
                  </span>
                  <span className="text-sm font-semibold opacity-90">
                    {d.business.name} → {d.nonprofit.name}
                  </span>
                  <span className="text-xs opacity-75">
                    Status: {d.completed === 0 ? "Active" : `Code ${d.completed}`}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <MealizeDeliveryQuickForm />
    </>
  );
}
