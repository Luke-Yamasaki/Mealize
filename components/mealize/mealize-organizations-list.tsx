"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

export function MealizeOrganizationsList() {
  const q = trpc.organization.list.useQuery();

  if (q.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16">
        <div
          className="size-10 animate-pulse rounded-full bg-primary-readable/25 ring-2 ring-primary-readable/20 dark:bg-primary/30 dark:ring-primary/25"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">Loading organizations…</p>
      </div>
    );
  }

  if (q.error) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="px-5 py-6">
            <p className="text-sm font-semibold leading-relaxed text-destructive">
              Could not load organizations. Check your connection and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const rows = q.data ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 text-foreground sm:px-6 sm:pt-10">
      <header className="mb-8 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-readable">Directory</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Organizations</h1>
        <p className="max-w-xl text-sm font-medium leading-relaxed text-muted-foreground">
          Businesses and nonprofits on Mealize. Select one to view hours, contact, and profile details.
        </p>
      </header>

      {rows.length === 0 ? (
        <Card className="border-dashed border-border">
          <CardContent className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <Building2 className="size-10 text-muted-foreground" strokeWidth={1.5} aria-hidden />
            <p className="text-base font-bold text-foreground">No organizations yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">Seed the database to see sample orgs.</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((o) => (
            <li key={o.id}>
              <Link href={`/organizations/${o.id}`} prefetch={false} className="group block no-underline">
                <Card
                  className={cn(
                    "border-border/80 transition-shadow ring-1 ring-transparent",
                    "hover:border-primary-readable/25 hover:shadow-md hover:ring-primary-readable/15 dark:hover:border-primary/30 dark:hover:ring-primary/20",
                  )}
                >
                  <CardContent className="flex flex-row items-start gap-4 px-4 py-4 sm:gap-5 sm:px-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={o.logoUrl}
                      alt={`${o.name} logo`}
                      className="size-20 shrink-0 rounded-xl border border-border/80 bg-muted object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                      width={80}
                      height={80}
                    />
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="truncate text-base font-bold tracking-tight text-foreground group-hover:text-primary-readable dark:group-hover:text-primary">
                        {o.name}
                      </p>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "w-fit text-[10px] font-bold uppercase tracking-wide",
                          o.isNonprofit
                            ? "border-emerald-700/20 bg-emerald-100 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-950/50 dark:text-emerald-100"
                            : "border-border bg-muted text-foreground",
                        )}
                      >
                        {o.isNonprofit ? "Nonprofit" : "Business"}
                      </Badge>
                      <p className="text-sm font-semibold text-muted-foreground">
                        {o.city}, {o.state}
                      </p>
                      <p className="line-clamp-2 text-sm font-medium leading-snug text-muted-foreground">
                        {o.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
