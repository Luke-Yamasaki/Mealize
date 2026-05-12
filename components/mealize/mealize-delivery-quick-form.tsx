"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

const fieldSelectClass =
  "mt-1.5 w-full min-h-9 appearance-none rounded-lg border border-input bg-background px-2.5 py-2 text-sm font-medium text-foreground shadow-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30";

/** Minimal delivery request form (legacy `createDelivery` parity for core fields). */
export function MealizeDeliveryQuickForm() {
  const me = trpc.user.me.useQuery();
  const posts = trpc.post.list.useQuery();
  const utils = trpc.useUtils();
  const create = trpc.delivery.create.useMutation({
    onSuccess: () => {
      void utils.delivery.listMine.invalidate();
    },
  });

  const [postId, setPostId] = useState<number>(1);
  const [businessId, setBusinessId] = useState<number>(1);
  const [nonprofitId, setNonprofitId] = useState<number>(12);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState("Morning");
  const [isDropoff, setIsDropoff] = useState(false);

  const org = me.data?.organization;
  const rows = posts.data ?? [];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    create.mutate({
      isDropoff,
      postId,
      businessId,
      nonprofitId,
      date: new Date(date),
      time,
      completed: 0,
    });
  }

  if (!me.data) return null;

  return (
    <div className="border-t border-border bg-muted/20 px-4 py-8 sm:px-6">
      <Card className="mx-auto max-w-xl border-border/80 shadow-sm ring-1 ring-foreground/[0.04]">
        <CardHeader className="border-b border-border/80 bg-card pb-4">
          <CardTitle className="text-lg font-bold">Create delivery (demo)</CardTitle>
          <CardDescription className="text-sm font-medium leading-relaxed">
            Wire your org IDs and post from the live UI; this form sends the same payload as the legacy app&apos;s{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">createDelivery</code>{" "}
            thunk.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="mealize-delivery-post" className="text-sm font-semibold text-foreground">
                Post
              </label>
              <div className="relative">
                <select
                  id="mealize-delivery-post"
                  className={cn(fieldSelectClass, "cursor-pointer pr-10")}
                  value={postId}
                  onChange={(e) => setPostId(Number(e.target.value))}
                >
                  {rows.slice(0, 30).map((p) => (
                    <option key={p.id} value={p.id} className="bg-popover text-foreground">
                      #{p.id} — {p.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="mealize-delivery-business" className="text-sm font-semibold text-foreground">
                Business org id
              </label>
              <Input
                id="mealize-delivery-business"
                type="number"
                className="h-auto min-h-9 border-foreground/12 py-2 font-medium dark:border-foreground/10"
                value={businessId}
                onChange={(e) => setBusinessId(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="mealize-delivery-nonprofit" className="text-sm font-semibold text-foreground">
                Nonprofit org id
              </label>
              <Input
                id="mealize-delivery-nonprofit"
                type="number"
                className="h-auto min-h-9 border-foreground/12 py-2 font-medium dark:border-foreground/10"
                value={nonprofitId}
                onChange={(e) => setNonprofitId(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="mealize-delivery-date" className="text-sm font-semibold text-foreground">
                Date
              </label>
              <Input
                id="mealize-delivery-date"
                type="date"
                className="h-auto min-h-9 border-foreground/12 py-2 font-medium tabular-nums dark:border-foreground/10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="mealize-delivery-time" className="text-sm font-semibold text-foreground">
                Time label
              </label>
              <Input
                id="mealize-delivery-time"
                className="h-auto min-h-9 border-foreground/12 py-2 font-medium dark:border-foreground/10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5 ring-1 ring-foreground/[0.04]">
              <input
                type="checkbox"
                checked={isDropoff}
                onChange={(e) => setIsDropoff(e.target.checked)}
                className="size-4 shrink-0 rounded border border-input accent-primary-readable dark:accent-primary"
              />
              <span className="text-sm font-semibold text-foreground">Drop-off</span>
            </label>
            {create.error ? (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {create.error.message}
              </p>
            ) : null}
            {create.isSuccess ? (
              <p className="text-sm font-semibold text-primary-readable dark:text-primary">Delivery created.</p>
            ) : null}
            <Separator />
            <Button
              type="submit"
              disabled={create.isPending}
              className="w-full bg-emerald-950 font-extrabold text-white hover:bg-emerald-900 disabled:opacity-60 dark:bg-emerald-800 dark:hover:bg-emerald-700 sm:w-auto"
            >
              {create.isPending ? "Submitting…" : "Create delivery"}
            </Button>
          </form>
          {org ? (
            <p className="text-xs font-medium leading-relaxed text-muted-foreground">
              Your org: <span className="font-semibold text-foreground">{org.name}</span> (id {org.id},{" "}
              {me.data.isNonprofit ? "nonprofit" : "business"}).
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
