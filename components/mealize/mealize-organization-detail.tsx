"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  ClipboardList,
  Clock,
  Copy,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

function buildDonationAcknowledgment(nonprofitOrRecipientName: string) {
  return `Subject: In-kind food donation acknowledgment

${nonprofitOrRecipientName} acknowledges receipt of donated food as described in the related Mealize delivery record. This contribution supports our tax-exempt charitable mission.

Please retain this acknowledgment for your records. (Template only—not legal advice.)`;
}

export function MealizeOrganizationDetail({ organizationId }: { organizationId: number }) {
  const q = trpc.organization.byId.useQuery({ id: organizationId });
  const statsQ = trpc.organization.impactStats.useQuery({ id: organizationId });
  const [copied, setCopied] = useState(false);

  if (q.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16">
        <div
          className="size-10 animate-pulse rounded-full bg-primary-readable/25 ring-2 ring-primary-readable/20 dark:bg-primary/30 dark:ring-primary/25"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">Loading organization…</p>
      </div>
    );
  }

  if (q.error || !q.data) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12 text-foreground">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="space-y-4 px-5 py-6">
            <p className="text-sm font-semibold text-destructive">Organization not found.</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/"
                prefetch={false}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-readable underline-offset-4 hover:underline dark:text-primary"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back to feed
              </Link>
              <Link
                href="/organizations"
                prefetch={false}
                className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                All organizations
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const o = q.data;
  const addressLine = [o.street, [o.city, o.state].filter(Boolean).join(", "), o.zip].filter(Boolean).join(" · ");
  const telHref = `tel:${o.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-6 text-foreground sm:px-6 sm:pt-8">
      <nav className="mb-8 flex flex-wrap items-center justify-between gap-3" aria-label="Page">
        <Link
          href="/"
          prefetch={false}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary-readable underline-offset-4 hover:underline dark:text-primary"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          Back to feed
        </Link>
        <Link
          href="/organizations"
          prefetch={false}
          className="text-sm font-semibold text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
        >
          All organizations
        </Link>
      </nav>

      <Card className="mb-8 overflow-hidden border-border/80 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.12)] ring-1 ring-foreground/[0.06] dark:shadow-[0_20px_56px_-16px_rgba(0,0,0,0.45)] dark:ring-white/10">
        <div
          className="h-1.5 w-full bg-gradient-to-r from-[#76d97e] via-[#28a690] to-[#0f7669]"
          aria-hidden
        />
        {o.imageUrl ? (
          <div className="relative aspect-[21/9] max-h-[220px] w-full overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={o.imageUrl} alt="" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/95 via-card/20 to-transparent dark:from-zinc-950/95" />
          </div>
        ) : null}
        <CardContent className={cn("relative px-5 pb-8 pt-6 sm:px-8", o.imageUrl && "-mt-14 sm:-mt-16")}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-6">
            <div className="relative shrink-0">
              <div className="ring-4 ring-card dark:ring-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={o.logoUrl}
                  alt={`${o.name} logo`}
                  className="size-24 rounded-2xl border border-border/80 bg-card object-cover shadow-md sm:size-28"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2 pb-0.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-readable">Organization</p>
              <h1 className="text-balance text-3xl font-black tracking-tight sm:text-4xl">{o.name}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wide",
                    o.isNonprofit
                      ? "border-emerald-700/20 bg-emerald-100 text-emerald-950 dark:border-emerald-400/25 dark:bg-emerald-950/60 dark:text-emerald-100"
                      : "border-border bg-muted text-foreground",
                  )}
                >
                  {o.isNonprofit ? (
                    <span className="inline-flex items-center gap-1">
                      <HeartHandshake className="size-3" aria-hidden />
                      Nonprofit
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <Store className="size-3" aria-hidden />
                      Business
                    </span>
                  )}
                </Badge>
                {o.isNonprofit && o.mealizeVerifiedNonprofit ? (
                  <Badge
                    variant="secondary"
                    className="border-sky-600/25 bg-sky-100 text-sky-950 text-[10px] font-bold uppercase tracking-wide dark:border-sky-400/30 dark:bg-sky-950/55 dark:text-sky-100"
                  >
                    <ShieldCheck className="mr-1 size-3" aria-hidden />
                    Verified nonprofit
                  </Badge>
                ) : null}
                {!o.isNonprofit && o.mealizeVerifiedKitchen ? (
                  <Badge
                    variant="secondary"
                    className="border-violet-600/25 bg-violet-100 text-violet-950 text-[10px] font-bold uppercase tracking-wide dark:border-violet-400/30 dark:bg-violet-950/55 dark:text-violet-100"
                  >
                    <ShieldCheck className="mr-1 size-3" aria-hidden />
                    Verified kitchen
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80 shadow-sm md:col-span-2">
          <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <TrendingUp className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              Impact (estimated)
            </CardTitle>
            <CardDescription className="text-xs font-medium text-muted-foreground">
              {statsQ.data?.estimationNote ??
                "Counts from Mealize activity on this profile. Estimates are not audited weights."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {statsQ.isLoading ? (
              <p className="text-sm font-medium text-muted-foreground sm:col-span-2 lg:col-span-4">Loading stats…</p>
            ) : statsQ.data ? (
              <>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Open posts</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-foreground">{statsQ.data.activePosts}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Delivery ties</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-foreground">
                    {statsQ.data.deliveryRelationships}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Completed touches</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-foreground">
                    {statsQ.data.completedDeliveriesTouchingOrg}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Est. meals / lbs</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-foreground">
                    ~{statsQ.data.estimatedMealsEquivalent} / ~{statsQ.data.estimatedPoundsReported}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm font-medium text-destructive sm:col-span-2 lg:col-span-4">
                Could not load impact stats.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm md:col-span-2">
          <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Building2 className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              About
            </CardTitle>
            <CardDescription className="sr-only">Mission and services</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <p className="text-sm font-medium leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              {o.description}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <MapPin className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            <p className="text-sm font-semibold leading-relaxed text-foreground">{addressLine}</p>
            <p className="text-xs font-medium text-muted-foreground">
              Visit hours below before planning a pickup or drop-off.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Clock className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            <p className="text-sm font-semibold text-foreground">
              {o.hoursOpen} – {o.hoursClose}
            </p>
            <Separator />
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Timeslot</p>
            <p className="text-sm font-medium text-foreground">{o.timeslot}</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm md:col-span-2">
          <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Phone className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
              <a
                href={telHref}
                className="group inline-flex items-start gap-3 rounded-xl border border-transparent p-2 transition hover:border-border hover:bg-muted/50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary-readable dark:text-primary">
                  <Phone className="size-[18px]" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">Phone</span>
                  <span className="block text-sm font-semibold text-foreground group-hover:underline">{o.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${o.email}`}
                className="group inline-flex items-start gap-3 rounded-xl border border-transparent p-2 transition hover:border-border hover:bg-muted/50"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary-readable dark:text-primary">
                  <Mail className="size-[18px]" strokeWidth={2} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">Email</span>
                  <span className="block break-all text-sm font-semibold text-foreground group-hover:underline">
                    {o.email}
                  </span>
                </span>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm md:col-span-2">
          <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <ClipboardList className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              Food safety quick checklist
            </CardTitle>
            <CardDescription className="text-xs font-medium text-muted-foreground">
              Operational reminders before moving food—your counsel sets final liability language.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <ul className="list-inside list-disc space-y-2 text-sm font-medium leading-relaxed text-muted-foreground">
              <li>Temperature control: cold chain for TCS foods; document handoffs.</li>
              <li>Allergens: label what you know; flag unknowns prominently.</li>
              <li>Packaging: intact, food-grade, and appropriate for the vehicle and distance.</li>
              <li>Volunteers: confirm driver understands nonprofit receiving windows.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-sm md:col-span-2">
          <CardHeader className="border-b border-border/60 bg-muted/20 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Copy className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              Donation acknowledgment (template)
            </CardTitle>
            <CardDescription className="text-xs font-medium text-muted-foreground">
              Copy into email or PDF workflows—edit parties, dates, and line items to match your records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <pre className="max-h-48 overflow-auto rounded-xl border border-border/80 bg-muted/30 p-4 text-xs font-medium leading-relaxed text-foreground">
              {buildDonationAcknowledgment(o.name)}
            </pre>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="font-semibold"
              onClick={() => {
                void navigator.clipboard.writeText(buildDonationAcknowledgment(o.name)).then(() => {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2200);
                });
              }}
            >
              {copied ? "Copied" : "Copy to clipboard"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
