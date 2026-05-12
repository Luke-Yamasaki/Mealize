"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { trpc } from "@/lib/trpc/react";

import { MealizeOnboardingForm } from "./mealize-onboarding-form";

export function MealizeOnboardingGate() {
  const router = useRouter();
  const me = trpc.user.me.useQuery();

  useEffect(() => {
    if (me.data != null) {
      router.replace("/");
    }
  }, [me.data, router]);

  if (me.isLoading) {
    return <div className="h-40 w-full" />;
  }
  if (me.data != null) {
    return null;
  }
  return <MealizeOnboardingForm />;
}
