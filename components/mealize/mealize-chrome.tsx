"use client";

import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { trpc } from "@/lib/trpc/react";
import { useMealizeUiStore } from "@/stores/mealize-ui-store";

import { MealizeFooter } from "./mealize-footer";
import { MealizeLocationStrip } from "./mealize-location-strip";
import { MealizeModalRoot } from "./mealize-modal-root";
import { MealizeNavbar } from "./mealize-navbar";
import { MealizeShell } from "./mealize-shell";
import { AppShell } from "./ui/app-shell";
import { SkipToMainLink } from "./ui/skip-to-main-link";

/** Shared shell (background, navbar, footer) for `/` and other Mealize routes. */
export function MealizeChrome({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isOnboardingPath = pathname === "/onboarding";
  const needsProfileGate = authLoaded && !!isSignedIn && !isOnboardingPath;
  const meQuery = trpc.user.me.useQuery(undefined, {
    enabled: needsProfileGate,
  });

  useEffect(() => {
    if (!needsProfileGate) return;
    if (meQuery.isFetched && meQuery.data === null) {
      router.replace("/onboarding");
    }
  }, [needsProfileGate, meQuery.isFetched, meQuery.data, router]);

  const profileBlocked =
    needsProfileGate &&
    ((!meQuery.isFetched || meQuery.isLoading) || meQuery.data === null);

  useEffect(() => {
    void useMealizeUiStore.persist.rehydrate();
  }, []);

  return (
    <MealizeShell>
      <SkipToMainLink />
      <AppShell
        header={
          <>
            <MealizeNavbar />
            <MealizeLocationStrip />
          </>
        }
        footer={<MealizeFooter />}
        modals={<MealizeModalRoot />}
      >
        {profileBlocked ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16">
            {meQuery.data === null && meQuery.isFetched ? (
              <p className="text-center text-sm font-semibold text-muted-foreground">
                Redirecting to onboarding…
              </p>
            ) : (
              <div className="h-40 w-full max-w-md animate-pulse rounded-lg bg-muted/60" aria-hidden />
            )}
          </div>
        ) : (
          children
        )}
      </AppShell>
    </MealizeShell>
  );
}
