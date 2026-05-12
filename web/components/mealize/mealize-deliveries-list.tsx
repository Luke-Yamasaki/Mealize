"use client";

import Link from "next/link";
import { Package } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import { MealizeDeliveryQuickForm } from "./mealize-delivery-quick-form";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(d));
}

export function MealizeDeliveriesList() {
  const q = trpc.delivery.listMine.useQuery();

  if (q.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16">
        <div
          className="size-10 animate-pulse rounded-full bg-primary-readable/25 ring-2 ring-primary-readable/20 dark:bg-primary/30 dark:ring-primary/25"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">Loading deliveries…</p>
      </div>
    );
  }

  if (q.error) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="px-5 py-6">
            <p className="text-sm font-semibold leading-relaxed text-destructive">
              Could not load deliveries. Ensure you are signed in and your profile exists in the database.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const rows = q.data ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-12 pt-8 text-foreground sm:px-6 sm:pt-10">
      <header className="mb-8 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-readable">Logistics</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Deliveries</h1>
        <p className="max-w-xl text-sm font-medium leading-relaxed text-muted-foreground">
          Pickups and drop-offs you are involved in. Open a row for full context.
        </p>
      </header>

      {rows.length === 0 ? (
        <Card className="mb-10 border-dashed border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-primary-readable dark:text-primary">
                <Package className="size-5" strokeWidth={2} aria-hidden />
              </span>
              <div>
                <CardTitle className="text-lg">No deliveries yet</CardTitle>
                <CardDescription className="text-sm font-medium">
                  When you coordinate pickups through posts, they will show up here.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <ul className="mb-10 flex flex-col gap-3">
          {rows.map((d) => (
            <li key={d.id}>
              <Link href={`/deliveries/${d.id}`} prefetch={false} className="group block no-underline">
                <Card
                  className={cn(
                    "border-border/80 transition-shadow ring-1 ring-transparent",
                    "hover:border-primary-readable/25 hover:shadow-md hover:ring-primary-readable/15 dark:hover:border-primary/30 dark:hover:ring-primary/20",
                  )}
                >
                  <CardContent className="px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-base font-bold tracking-tight text-foreground group-hover:text-primary-readable dark:group-hover:text-primary">
                        {d.post.title}
                        <span className="font-semibold text-muted-foreground">
                          {" "}
                          · {formatDate(d.date)} · {d.time}
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-muted-foreground">
                        {d.business.name} <span className="text-foreground/80">→</span> {d.nonprofit.name}
                      </p>
                      <p className="text-xs font-medium text-muted-foreground">
                        Status:{" "}
                        <span className="font-semibold text-foreground">
                          {d.completed === 0 ? "Active" : `Code ${d.completed}`}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <MealizeDeliveryQuickForm />
    </div>
  );
}
