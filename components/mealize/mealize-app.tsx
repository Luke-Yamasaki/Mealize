"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { trpc } from "@/lib/trpc/react";

import { MealizeHome } from "./mealize-home";
import { MealizeWelcome } from "./mealize-welcome";

/** Home route body; shell is `app/(mealize)/layout.tsx` (`MealizeChrome`). */
export function MealizeApp() {
  return <SignedInMain />;
}

function SignedInMain() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const meQuery = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!isSignedIn,
  });

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (meQuery.isFetched && meQuery.data === null) {
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, meQuery.isFetched, meQuery.data, router]);

  if (!isLoaded) {
    return <div className="h-40 w-full" />;
  }
  if (!isSignedIn) {
    return <MealizeWelcome />;
  }
  if (!meQuery.isFetched || meQuery.isLoading) {
    return <div className="h-40 w-full" />;
  }
  if (meQuery.data === null) {
    return (
      <div className="p-6 text-center text-sm font-semibold text-zinc-600">
        Redirecting to onboarding…
      </div>
    );
  }
  return <MealizeHome />;
}
