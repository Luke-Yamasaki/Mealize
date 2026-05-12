"use client";

import Link from "next/link";

import { trpc } from "@/lib/trpc/react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

export function MealizeOrganizationDetail({ organizationId }: { organizationId: number }) {
  const { theme } = useMealizeTheme();
  const q = trpc.organization.byId.useQuery({ id: organizationId });
  const text = theme === "light" ? "#191919" : "#fff";
  const muted = theme === "light" ? "#444" : "#ccc";
  const border = theme === "light" ? "#B2B2B2" : "#616161";

  if (q.isLoading) {
    return (
      <p className="p-6 text-sm" style={{ color: muted }}>
        Loading organization…
      </p>
    );
  }
  if (q.error || !q.data) {
    return <p className="p-6 text-sm text-red-600">Organization not found.</p>;
  }

  const o = q.data;

  return (
    <div className="max-w-[900px] space-y-4 p-6" style={{ color: text }}>
      <div className="flex flex-wrap items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={o.logoUrl} alt="" className="size-20 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-black">{o.name}</h1>
          <p className="text-sm font-semibold opacity-90">{o.isNonprofit ? "Nonprofit" : "Business"}</p>
        </div>
      </div>
      <div className="rounded-lg border p-4 text-sm font-semibold" style={{ borderColor: border }}>
        <p>{o.description}</p>
        <p className="mt-3">
          {o.street}, {o.city}, {o.state} {o.zip}
        </p>
        <p className="mt-1">Phone: {o.phone}</p>
        <p className="mt-1">Email: {o.email}</p>
        <p className="mt-1">
          Hours: {o.hoursOpen} – {o.hoursClose}
        </p>
      </div>
      <Link href="/" className="text-sm font-bold text-[#28a690] no-underline">
        ← Back to feed
      </Link>
    </div>
  );
}
