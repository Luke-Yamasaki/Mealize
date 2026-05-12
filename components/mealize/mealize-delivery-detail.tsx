"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/react";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(d));
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
      <span className="min-w-[7rem] shrink-0 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{children}</span>
    </div>
  );
}

function StarsRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < rating ? "fill-current" : "fill-none opacity-35"}`}
          strokeWidth={1.75}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function MealizeDeliveryDetail({ deliveryId }: { deliveryId: number }) {
  const q = trpc.delivery.byId.useQuery({ id: deliveryId });
  const meQ = trpc.user.me.useQuery();
  const utils = trpc.useUtils();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  const submitFeedback = trpc.delivery.submitFeedback.useMutation({
    onSuccess: () => {
      void utils.delivery.byId.invalidate({ id: deliveryId });
    },
  });

  useEffect(() => {
    const row = q.data;
    const uid = meQ.data?.id;
    if (!row || uid == null) return;
    const mf = row.feedback.find((f) => f.userId === uid);
    if (mf) {
      setRating(mf.rating);
      setComment(mf.comment ?? "");
    } else {
      setRating(5);
      setComment("");
    }
  }, [q.data, meQ.data?.id]);

  if (q.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16">
        <div
          className="size-10 animate-pulse rounded-full bg-primary-readable/25 ring-2 ring-primary-readable/20 dark:bg-primary/30 dark:ring-primary/25"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">Loading delivery…</p>
      </div>
    );
  }

  if (q.error || !q.data) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12 text-foreground">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="space-y-4 px-5 py-6">
            <p className="text-sm font-semibold text-destructive">Delivery not found or not accessible.</p>
            <Link
              href="/deliveries"
              prefetch={false}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-readable underline-offset-4 hover:underline dark:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to deliveries
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const d = q.data;
  const myUserId = meQ.data?.id;
  const myFeedback = myUserId != null ? d.feedback.find((f) => f.userId === myUserId) : undefined;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-8 text-foreground sm:px-6 sm:pt-10">
      <Link
        href="/deliveries"
        prefetch={false}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary-readable underline-offset-4 hover:underline dark:text-primary"
      >
        <ArrowLeft className="size-4 shrink-0" aria-hidden />
        All deliveries
      </Link>

      <header className="mb-8 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-readable">Delivery</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">#{d.id}</h1>
        <p className="text-sm font-medium text-muted-foreground">
          {d.business.name} → {d.nonprofit.name}
        </p>
      </header>

      <div className="space-y-6">
        <Card className="overflow-hidden border-border/80 shadow-sm ring-1 ring-foreground/[0.04]">
          <CardHeader className="border-b border-border/80 bg-muted/25">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card text-primary-readable shadow-sm ring-1 ring-border dark:text-primary">
                <Truck className="size-5" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0 space-y-1">
                <CardTitle className="text-lg leading-snug sm:text-xl">Post</CardTitle>
                <CardDescription className="text-base font-semibold text-foreground">{d.post.title}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm font-medium leading-relaxed text-muted-foreground">{d.post.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Calendar className="size-4 text-primary-readable dark:text-primary" aria-hidden />
              Schedule & parties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <MetaRow label="When">
              {formatDate(d.date)} · {d.time}
            </MetaRow>
            <Separator />
            <MetaRow label="Business">{d.business.name}</MetaRow>
            <MetaRow label="Nonprofit">{d.nonprofit.name}</MetaRow>
            <MetaRow label="Volunteer">
              {d.volunteer.firstName} {d.volunteer.lastName}
            </MetaRow>
            <Separator />
            <MetaRow label="Type">{d.isDropoff ? "Drop-off" : "Pickup"}</MetaRow>
            <MetaRow label="Completed">{d.completed === 0 ? "No" : `Flag ${d.completed}`}</MetaRow>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold">Feedback</CardTitle>
            <CardDescription className="text-sm font-medium">
              One rating per person on this delivery. Visible to everyone who can open this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {d.feedback.length > 0 ? (
              <ul className="space-y-4">
                {d.feedback.map((f) => (
                  <li key={f.id} className="rounded-xl border border-border/80 bg-muted/15 px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-bold text-foreground">
                        {f.user.firstName} {f.user.lastName}
                      </p>
                      <StarsRow rating={f.rating} />
                    </div>
                    {f.comment ? (
                      <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">{f.comment}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-medium text-muted-foreground">No feedback yet.</p>
            )}

            {myUserId != null ? (
              <div className="space-y-3 border-t border-border/80 pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {myFeedback ? "Update your rating" : "Add your rating"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Button
                      key={n}
                      type="button"
                      size="sm"
                      variant={rating === n ? "default" : "secondary"}
                      className="min-w-10 font-bold"
                      onClick={() => setRating(n)}
                    >
                      {n}
                    </Button>
                  ))}
                </div>
                <label className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Optional note
                  </span>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={500}
                    rows={3}
                    className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="What went well or what to improve next time?"
                  />
                </label>
                <Button
                  type="button"
                  className="font-semibold"
                  disabled={submitFeedback.isPending}
                  onClick={() =>
                    submitFeedback.mutate({
                      deliveryId: d.id,
                      rating,
                      comment: comment.trim() || undefined,
                    })
                  }
                >
                  {submitFeedback.isPending ? "Saving…" : myFeedback ? "Update feedback" : "Submit feedback"}
                </Button>
                {submitFeedback.error ? (
                  <p className="text-sm font-semibold text-destructive">{submitFeedback.error.message}</p>
                ) : null}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <p className="text-xs font-medium leading-relaxed text-muted-foreground">
          Status transitions from the legacy app can be wired to mutations in a follow-up; feedback saves to the new
          table immediately.
        </p>
      </div>
    </div>
  );
}
