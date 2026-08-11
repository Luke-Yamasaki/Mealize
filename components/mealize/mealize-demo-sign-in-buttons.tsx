"use client";

import { useAuth, useClerk, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  DEMO_PERSONAS,
  DEMO_PERSONA_IDS,
  type DemoPersonaId,
} from "@/lib/demo-personas";
import { cn } from "@/lib/utils";

export function useDemoSignIn() {
  const { signIn, fetchStatus } = useSignIn();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();
  const [pending, setPending] = useState<DemoPersonaId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const busy = pending !== null || fetchStatus === "fetching";
  const ready = authLoaded && !!signIn;

  async function startDemo(personaId: DemoPersonaId) {
    if (!ready || busy) return;
    setError(null);
    setPending(personaId);

    try {
      if (isSignedIn) {
        await signOut();
      }

      const res = await fetch("/api/demo/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona: personaId }),
      });
      const data = (await res.json()) as { token?: string; error?: string };
      if (!res.ok || !data.token) {
        throw new Error(data.error || "Demo sign-in failed.");
      }

      const { error: ticketError } = await signIn.ticket({
        ticket: data.token,
      });
      if (ticketError) {
        throw new Error(ticketError.message || "Could not apply demo ticket.");
      }

      if (signIn.status !== "complete") {
        throw new Error(
          `Demo sign-in incomplete (status: ${signIn.status ?? "unknown"}).`,
        );
      }

      const { error: finalizeError } = await signIn.finalize({
        navigate: async ({ decorateUrl }) => {
          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            window.location.href = url;
            return;
          }
          router.push(url);
          router.refresh();
        },
      });
      if (finalizeError) {
        throw new Error(finalizeError.message || "Could not activate session.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Demo sign-in failed.");
      setPending(null);
    }
  }

  return { startDemo, pending, error, ready, busy };
}

type MealizeDemoSignInButtonsProps = {
  className?: string;
  /** Compact layout under Clerk forms on /sign-in and /sign-up. */
  compact?: boolean;
};

export function MealizeDemoSignInButtons({
  className,
  compact = false,
}: MealizeDemoSignInButtonsProps) {
  const { startDemo, pending, error, ready, busy } = useDemoSignIn();

  return (
    <div className={cn("w-full", className)} id="demo">
      <div
        className={cn(
          "rounded-xl border border-neutral-200 bg-white/80 p-4 dark:border-white/10 dark:bg-zinc-950/50",
          compact ? "mt-4" : "mt-0",
        )}
      >
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-[#156b5c] dark:text-[#9af2c0]">
          Recruiter demo
        </p>
        <p className="mt-1 text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
          One click — no account needed. Shared demo roles for walkthroughs.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          {DEMO_PERSONA_IDS.map((id) => {
            const persona = DEMO_PERSONAS[id];
            const isPending = pending === id;
            return (
              <button
                key={id}
                type="button"
                disabled={!ready || busy}
                onClick={() => void startDemo(id)}
                className={cn(
                  "flex w-full flex-col items-start rounded-lg border border-[#28a690]/35 bg-white px-3.5 py-2.5 text-left transition",
                  "hover:border-[#28a690] hover:bg-[#28a690]/6",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "dark:border-[#28a690]/30 dark:bg-zinc-900 dark:hover:bg-[#28a690]/12",
                  isPending && "ring-2 ring-[#28a690]/50",
                )}
              >
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  {isPending ? "Signing in…" : `Try as ${persona.label}`}
                </span>
                {!compact ? (
                  <span className="mt-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {persona.description}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {error ? (
          <p
            className="mt-3 text-center text-xs font-medium text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
