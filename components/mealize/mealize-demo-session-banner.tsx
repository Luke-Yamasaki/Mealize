"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

import { isDemoEmail } from "@/lib/demo-personas";
import { trpc } from "@/lib/trpc/react";

/** Banner for shared recruiter demo personas (profile edits are blocked server-side). */
export function MealizeDemoSessionBanner() {
  const { isSignedIn, isLoaded } = useAuth();
  const me = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!isSignedIn,
  });
  if (!me.data || !isDemoEmail(me.data.email)) return null;

  const role = me.data.isManager
    ? me.data.isNonprofit
      ? "nonprofit manager"
      : "business manager"
    : "volunteer";

  return (
    <div
      className="border-b border-[#28a690]/25 bg-[#28a690]/10 px-4 py-2 text-center text-xs font-semibold text-[#0f3d36] dark:border-[#28a690]/30 dark:bg-[#28a690]/15 dark:text-[#c6fde8]"
      role="status"
    >
      Viewing as demo {role}. Profile settings are locked.{" "}
      <Link
        href="/sign-in#demo"
        className="underline decoration-[#28a690]/60 underline-offset-2 hover:decoration-[#28a690]"
      >
        Switch persona
      </Link>
    </div>
  );
}
