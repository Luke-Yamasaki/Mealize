"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Dialog } from "@/components/mealize/ui/dialog";
import { Button } from "@/components/mealize/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import type { MealizePostListItem } from "./mealize-post-card";
import { formatOrganizationAddress } from "./post-utils";

const DEFAULT_SLOTS = [
  "Morning",
  "Noon",
  "Early afternoon",
  "Late afternoon",
] as const;

type MealizeReserveDialogProps = {
  post: MealizePostListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MealizeReserveDialog({
  post,
  open,
  onOpenChange,
}: MealizeReserveDialogProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const me = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!isSignedIn,
  });
  const utils = trpc.useUtils();

  const preferred = post.organization.timeslot?.trim();
  const slots = useMemo(() => {
    const base: string[] = [...DEFAULT_SLOTS];
    if (preferred && !base.includes(preferred)) {
      base.unshift(preferred);
    }
    return base;
  }, [preferred]);

  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(() => preferred || DEFAULT_SLOTS[0]);
  const [isDropoff, setIsDropoff] = useState(false);

  const reserve = trpc.delivery.reservePost.useMutation({
    onSuccess: (delivery) => {
      void utils.post.getById.invalidate({ id: post.id });
      void utils.post.list.invalidate();
      void utils.delivery.listMine.invalidate();
      onOpenChange(false);
      router.push(`/deliveries/${delivery.id}`);
    },
  });

  const address = formatOrganizationAddress(post.organization);
  const hours =
    post.organization.hoursOpen && post.organization.hoursClose
      ? `${post.organization.hoursOpen} – ${post.organization.hoursClose}`
      : null;

  const canReserve =
    !!me.data?.isNonprofit &&
    post.isItem &&
    post.status === 0 &&
    !post.organization.isNonprofit;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canReserve) return;
    reserve.mutate({
      postId: post.id,
      date: new Date(date),
      time,
      isDropoff,
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="md">
        <Dialog.Title className="text-xl font-bold tracking-tight text-foreground">
          Reserve pickup
        </Dialog.Title>
        <Dialog.Description className="mt-1.5 text-sm font-medium text-muted-foreground">
          Lock in a window for <span className="font-semibold text-foreground">{post.title}</span>{" "}
          from {post.organization.name}.
        </Dialog.Description>

        <div className="mt-4 rounded-lg border border-border bg-muted/30 px-3 py-3 text-sm">
          <p className="font-semibold text-foreground">{post.organization.name}</p>
          <p className="mt-1 font-medium text-muted-foreground">{address}</p>
          {hours ? (
            <p className="mt-1 font-medium text-muted-foreground">Hours {hours}</p>
          ) : null}
          {preferred ? (
            <p className="mt-1 font-medium text-muted-foreground">
              Preferred window:{" "}
              <span className="font-semibold text-foreground">{preferred}</span>
            </p>
          ) : null}
        </div>

        {!isLoaded ? (
          <p className="mt-4 text-sm text-muted-foreground">Checking sign-in…</p>
        ) : !isSignedIn ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Sign in as a nonprofit manager or volunteer to reserve this item.
            </p>
            <Link
              href="/sign-in#demo"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-900 bg-zinc-900 px-3 text-sm font-bold text-white"
            >
              Sign in / try demo
            </Link>
          </div>
        ) : !me.data ? (
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Finish onboarding before reserving.{" "}
            <Link href="/onboarding" className="font-semibold underline">
              Continue setup
            </Link>
          </p>
        ) : !canReserve ? (
          <p className="mt-4 text-sm font-medium text-amber-800 dark:text-amber-200">
            {me.data.isNonprofit
              ? "This listing isn’t available to reserve."
              : "Switch to a nonprofit demo persona to reserve surplus items."}
          </p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="mealize-reserve-date"
                className="text-sm font-semibold text-foreground"
              >
                Pickup date
              </label>
              <Input
                id="mealize-reserve-date"
                type="date"
                className="mt-1.5"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <fieldset>
              <legend className="text-sm font-semibold text-foreground">Time slot</legend>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {slots.map((slot) => {
                  const selected = time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-left text-sm font-semibold transition",
                        selected
                          ? "border-[#28a690] bg-[#28a690]/12 text-foreground ring-2 ring-[#28a690]/35"
                          : "border-border bg-card text-muted-foreground hover:border-[#28a690]/50 hover:text-foreground",
                      )}
                    >
                      {slot}
                      {preferred === slot ? (
                        <span className="mt-0.5 block text-xs font-medium text-[#156b5c] dark:text-[#9af2c0]">
                          Preferred by donor
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
              <input
                type="checkbox"
                checked={isDropoff}
                onChange={(e) => setIsDropoff(e.target.checked)}
                className="size-4 shrink-0 rounded border border-input"
              />
              <span className="text-sm font-semibold text-foreground">
                Request drop-off instead of pickup
              </span>
            </label>
            {reserve.error ? (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {reserve.error.message}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="submit" disabled={reserve.isPending}>
                {reserve.isPending ? "Reserving…" : "Confirm reservation"}
              </Button>
              <Dialog.Close
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-md border border-border px-3.5 text-sm font-semibold text-foreground"
              >
                Cancel
              </Dialog.Close>
            </div>
          </form>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
