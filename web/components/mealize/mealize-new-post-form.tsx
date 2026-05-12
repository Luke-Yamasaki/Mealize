"use client";

import {
  CalendarClock,
  ChevronDown,
  ImagePlus,
  LayoutList,
  Package,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import { MealizeImageUploadField } from "./mealize-image-upload-field";

const fieldClassName =
  "min-h-9 w-full min-w-0 appearance-none rounded-lg border border-input bg-background px-2.5 py-2 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 md:text-sm";

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex gap-3">
        <span
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-readable/22 to-primary-readable/6 text-primary-readable shadow-sm ring-1 ring-primary-readable/30 dark:from-primary/25 dark:to-primary/10 dark:text-primary dark:ring-primary/30"
          aria-hidden
        >
          <Icon className="size-4" strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-sm font-bold tracking-tight text-foreground">{title}</h2>
          {description ? (
            <p className="text-xs font-medium leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-4 sm:pl-12">{children}</div>
    </section>
  );
}

function FieldLabel({
  htmlFor,
  children,
  aside,
}: {
  htmlFor?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {children}
      </label>
      {aside ? <span className="text-xs font-medium tabular-nums text-muted-foreground">{aside}</span> : null}
    </div>
  );
}

export function MealizeNewPostForm() {
  const router = useRouter();
  const me = trpc.user.me.useQuery();
  const categories = trpc.category.list.useQuery();
  const create = trpc.post.create.useMutation({
    onSuccess: (row) => {
      void router.push(`/posts/${row.id}`);
    },
  });

  const orgId = me.data?.organizationId ?? 0;

  const [isItem, setIsItem] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [categoryId, setCategoryId] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [expDate, setExpDate] = useState(() => new Date().toISOString().slice(0, 10));

  const cats = categories.data ?? [];

  useEffect(() => {
    if (cats.length && !cats.some((c) => c.id === categoryId)) {
      setCategoryId(cats[0]!.id);
    }
  }, [cats, categoryId]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!orgId) return;
    const url = imageUrl.trim();
    if (!url) return;
    create.mutate({
      isItem,
      organizationId: orgId,
      title: title.trim().slice(0, 25),
      description: description.trim().slice(0, 120),
      quantity: quantity.trim().slice(0, 12),
      categoryId,
      imageUrl: url,
      expDate: new Date(expDate),
      status: 0,
    });
  }

  if (me.isLoading) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-3 px-6 py-24 text-center">
        <div
          className="size-10 animate-pulse rounded-full bg-gradient-to-br from-primary-readable/40 to-primary-readable/12 ring-2 ring-primary-readable/25 dark:from-primary/40 dark:to-primary/10 dark:ring-primary/20"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">Loading your workspace…</p>
      </div>
    );
  }

  if (!me.data?.isManager) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <Card className="border-dashed border-destructive/30 bg-destructive/5 py-8 text-center shadow-sm">
          <CardContent className="px-6">
            <p className="text-sm font-semibold leading-relaxed text-foreground">
              Only managers can create posts. Ask your organization manager for access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 pb-20 pt-10 text-foreground sm:px-6 sm:pt-14">
      <header className="mb-8 space-y-3 sm:mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-readable">Create listing</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">New post</h1>
            <p className="max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
              Share surplus food as an item donors can pick up, or post a request your community can help fill.
            </p>
          </div>
        </div>
      </header>

      <Card className="gap-0 overflow-hidden border border-border/80 py-0 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.14)] ring-1 ring-foreground/[0.06] dark:shadow-[0_20px_56px_-16px_rgba(0,0,0,0.55)] dark:ring-white/10">
        <div
          className="h-1.5 w-full bg-gradient-to-r from-[#76d97e] via-[#28a690] to-[#0f7669]"
          aria-hidden
        />
        <CardHeader className="border-b border-border/80 bg-muted/25 pb-5">
          <CardTitle className="text-lg font-bold sm:text-xl">Post details</CardTitle>
          <CardDescription className="text-sm font-medium leading-relaxed">
            Required fields are marked. Listings go live as soon as you publish.
          </CardDescription>
        </CardHeader>

        <form onSubmit={submit}>
          <CardContent className="space-y-10 pt-8 pb-2">
            <FormSection
              icon={Package}
              title="Listing type"
              description="Items are surplus you’re offering; requests are needs you’d like others to help meet."
            >
              <div
                className={cn(
                  "rounded-xl border px-4 py-3.5 transition-colors",
                  isItem
                    ? "border-primary-readable/50 bg-primary-readable/[0.09] ring-1 ring-primary-readable/22 dark:border-primary/35 dark:bg-primary/10 dark:ring-primary/15"
                    : "border-border bg-muted/30 ring-1 ring-foreground/[0.04]",
                )}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isItem}
                    onChange={(e) => setIsItem(e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 rounded border border-input accent-primary-readable dark:accent-primary"
                  />
                  <span className="space-y-0.5">
                    <span className="block text-sm font-semibold text-foreground">This is an item (uncheck for a request)</span>
                    <span className="block text-xs font-medium text-muted-foreground">
                      {isItem
                        ? "Donors will see quantity, category, and pickup window like a normal listing."
                        : "Use requests when you’re looking for donations or specific foods."}
                    </span>
                  </span>
                </label>
              </div>
            </FormSection>

            <Separator className="bg-border/80" />

            <FormSection
              icon={LayoutList}
              title="What you’re posting"
              description="Keep the title short; the description can carry the story and any pickup notes."
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="mealize-post-title" aside={`${title.length}/25`}>
                    Title
                  </FieldLabel>
                  <Input
                    id="mealize-post-title"
                    required
                    maxLength={25}
                    placeholder="e.g. Fresh milk — pickup today"
                    className="h-auto min-h-10 border-foreground/12 py-2.5 font-medium shadow-sm dark:border-foreground/10"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="mealize-post-desc" aside={`${description.length}/120`}>
                    Description
                  </FieldLabel>
                  <textarea
                    id="mealize-post-desc"
                    required
                    maxLength={120}
                    rows={4}
                    placeholder="What’s included, how to pick up, allergens, best-by context…"
                    className={cn(
                      fieldClassName,
                      "min-h-[7.5rem] resize-y font-medium leading-relaxed placeholder:font-normal",
                    )}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </FormSection>

            <Separator className="bg-border/80" />

            <FormSection
              icon={Sparkles}
              title="Inventory"
              description="Quantity and category help neighbors filter and plan pickups."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="mealize-post-qty">Quantity</FieldLabel>
                  <Input
                    id="mealize-post-qty"
                    required
                    maxLength={12}
                    className="h-auto min-h-10 border-foreground/12 py-2.5 font-medium tabular-nums shadow-sm dark:border-foreground/10"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="mealize-post-cat">Category</FieldLabel>
                  <div className="relative">
                    <select
                      id="mealize-post-cat"
                      className={cn(fieldClassName, "cursor-pointer pr-10 font-medium")}
                      value={categoryId}
                      onChange={(e) => setCategoryId(Number(e.target.value))}
                    >
                      {cats.map((c) => (
                        <option key={c.id} value={c.id} className="bg-popover text-foreground">
                          {c.category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </FormSection>

            <Separator className="bg-border/80" />

            <FormSection
              icon={ImagePlus}
              title="Photo"
              description="A clear photo builds trust. Square or landscape both work — we’ll keep the preview compact."
            >
              <div className="rounded-xl border border-dashed border-primary-readable/50 bg-gradient-to-b from-muted/50 to-muted/20 p-4 ring-1 ring-inset ring-foreground/[0.04] dark:border-primary/25 dark:from-muted/30 dark:to-muted/10">
                <MealizeImageUploadField
                  label="Post photo"
                  required
                  hideLabel
                  value={imageUrl}
                  onChange={setImageUrl}
                  helperText="PNG, JPEG, or WebP — max 10 MB. Uses your configured S3 bucket."
                />
              </div>
            </FormSection>

            <Separator className="bg-border/80" />

            <FormSection
              icon={CalendarClock}
              title="Availability"
              description="Expiration helps hide stale listings automatically over time."
            >
              <div className="space-y-1.5">
                <FieldLabel htmlFor="mealize-post-exp">Expiration date</FieldLabel>
                <input
                  id="mealize-post-exp"
                  required
                  type="date"
                  className={cn(fieldClassName, "min-h-10 font-medium tabular-nums")}
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                />
              </div>
            </FormSection>

            {create.error ? (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm font-semibold text-destructive">
                {create.error.message}
              </p>
            ) : null}
          </CardContent>

          <CardFooter className="flex-col gap-3 border-t border-border/80 bg-muted/20 pt-6 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="order-2 text-center text-xs font-medium text-muted-foreground sm:order-1 sm:max-w-[14rem] sm:text-left">
              {!imageUrl.trim()
                ? "Add a photo to enable publishing."
                : "Ready when you are — you can edit listings later from the post page."}
            </p>
            <button
              type="submit"
              disabled={create.isPending || !imageUrl.trim()}
              className="order-1 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-950 px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:pointer-events-none disabled:opacity-60 sm:order-2 sm:w-auto sm:min-w-[11rem] dark:bg-emerald-800 dark:hover:bg-emerald-700"
            >
              {create.isPending ? (
                "Publishing…"
              ) : (
                <>
                  <Sparkles className="size-4 opacity-90" aria-hidden />
                  Publish
                </>
              )}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
