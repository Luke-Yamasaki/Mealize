"use client";

import { useState, type ReactNode } from "react";
import {
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Leaf,
  Store,
  Truck,
} from "lucide-react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

import { MealizeLogoMedium } from "./mealize-logo-medium";
import { MealizeWelcomePersonaPicker } from "./mealize-welcome-persona-picker";
import { MealizeWelcomeSplash } from "./mealize-welcome-splash";

const ASSET = "/welcome";

function WelcomeImg({
  file,
  alt,
  maxHeight = 400,
  objectFit = "contain",
  className = "",
}: {
  file: string;
  alt: string;
  maxHeight?: number;
  objectFit?: "contain" | "cover";
  className?: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.2)] ring-1 ring-black/5 dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/8 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static marketing assets from `/public/welcome` */}
      <img
        src={`${ASSET}/${file}`}
        alt={alt}
        className="w-full object-center"
        style={{ objectFit, maxHeight }}
      />
    </figure>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-[#28a690] underline decoration-1 underline-offset-[3px] transition hover:opacity-[0.85]"
    >
      {children}
    </a>
  );
}

function WelcomeHeadlinePunctuation() {
  return (
    <span
      className="relative z-2 ml-2 inline-flex size-12 shrink-0 items-center justify-center align-middle sm:ml-2.5 sm:size-14 md:size-16"
      aria-hidden
    >
      <span className="pointer-events-none absolute left-1/2 top-1/2 block h-44 w-44 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.42] motion-reduce:scale-[0.3] sm:scale-[0.48] md:scale-[0.56]">
        <span className="relative block h-full w-full">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="mealize-welcome-signal-ring absolute left-1/2 top-1/2 size-17 rounded-full border border-[#28a690]/45 sm:size-19"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
          ))}
          <span className="mealize-welcome-signal-core absolute left-1/2 top-1/2 flex size-14 items-center justify-center sm:size-16 md:size-[4.5rem]">
            <MealizeLogoMedium className="size-full overflow-visible" />
          </span>
        </span>
      </span>
    </span>
  );
}

function WelcomeAtmosphere({ isLight }: { isLight: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Faint grid */}
      <div
        className={
          isLight
            ? "absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-size-[52px_52px]"
            : "absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-size-[52px_52px] opacity-90"
        }
      />
      {/* Soft radial wash behind hero */}
      <div
        className={
          isLight
            ? "absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_16%,rgba(40,166,144,0.1),transparent_65%)]"
            : "absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_14%,rgba(40,166,144,0.2),transparent_60%)]"
        }
      />
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#156b5c] dark:text-[#9af2c0]">
      {children}
    </p>
  );
}

function FeatureTile({
  icon: Icon,
  label,
  title,
  body,
  isLight,
  motionDelay = "0s",
}: {
  icon: typeof Leaf;
  label: string;
  title: string;
  body: string;
  isLight: boolean;
  motionDelay?: string;
}) {
  return (
    <div
      className={`group flex flex-col gap-3 rounded-2xl border p-6 transition hover:border-[#28a690]/35 ${isLight ? "border-neutral-200 bg-white shadow-sm hover:shadow-md" : "border-white/10 bg-white/4 hover:bg-white/6"}`}
    >
      <div className="flex items-center gap-3">
        <div
          className="mealize-feature-icon flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#76d97e]/25 to-[#28a690]/20 text-[#1a6b5c] ring-1 ring-[#28a690]/15 transition duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] dark:text-[#9af2c0] dark:ring-white/10"
          style={{ animationDelay: motionDelay }}
        >
          <Icon className="size-5" strokeWidth={1.75} aria-hidden />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#156b5c] dark:text-[#9af2c0]">
          {label}
        </p>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-black dark:text-zinc-50">{title}</h3>
      <p className="text-sm font-medium leading-relaxed text-black dark:text-zinc-300">{body}</p>
    </div>
  );
}

/** Partner logos in `/public/welcome/partners`. */
const TRUSTED_PARTNERS: {
  name: string;
  file: string;
  /** Wider wordmarks vs square marks. */
  wide?: boolean;
  /** Logo art that already sits on a dark field. */
  onDark?: boolean;
}[] = [
  { name: "Harbor Market", file: "harbor-lighthouse.png" },
  { name: "River City Food Bank", file: "river-city.png" },
  { name: "the Green Shelf", file: "green-shelf.png", wide: true },
  { name: "Northside Tree and Garden Service", file: "northside.png", wide: true },
  { name: "Metro Fresh Co-op", file: "metro-bowl.png" },
  { name: "Sunrise Relief Kitchen", file: "sunrise.png", wide: true },
  { name: "Oak & Vine Market", file: "oak-and-vine.png" },
];

function PartnerLogo({
  name,
  file,
  wide,
  onDark,
}: {
  name: string;
  file: string;
  wide?: boolean;
  onDark?: boolean;
}) {
  return (
    <div
      className={`flex h-20 shrink-0 items-center justify-center px-6 sm:h-24 sm:px-8 ${
        wide ? "w-[11.5rem] sm:w-[14rem]" : "w-[7.5rem] sm:w-36"
      }`}
      title={name}
    >
      <span
        className={`flex h-full w-full items-center justify-center overflow-hidden rounded-xl px-3 py-2 ${
          onDark ? "bg-zinc-950" : "bg-white ring-1 ring-black/5 dark:ring-white/10"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static partner marks from `/public/welcome/partners` */}
        <img
          src={`${ASSET}/partners/${file}`}
          alt={name}
          className={`max-h-full max-w-full object-contain ${
            !onDark ? "dark:brightness-100" : ""
          }`}
        />
      </span>
    </div>
  );
}

function TrustedByMarquee() {
  const loop = [...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS];

  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-12" aria-label="Partner logos">
      <p className="mb-6 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#156b5c] dark:text-[#9af2c0]">
        Trusted by grocers & food banks
      </p>
      <div className="mealize-marquee relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent dark:from-zinc-950 sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent dark:from-zinc-950 sm:w-24" />
        <div className="mealize-marquee__track flex w-max items-center">
          {loop.map((partner, i) => (
            <PartnerLogo key={`${partner.name}-${i}`} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Simple row: Businesses → Mealize → Food banks, with leaf/truck couriers on the connectors. */
function ApproachFlowDiagram({ isLight }: { isLight: boolean }) {
  return (
    <div className="mealize-approach-flow mx-auto w-full max-w-2xl px-2 sm:px-4" aria-hidden>
      <div className="flex items-center justify-center gap-1 sm:gap-3">
        <div className="relative flex w-[4.75rem] shrink-0 justify-center sm:w-28">
          <div
            className={`flex size-14 items-center justify-center rounded-2xl ring-1 sm:size-16 ${
              isLight
                ? "bg-linear-to-br from-[#fde047]/45 to-[#eab308]/30 text-[#854d0e] ring-[#eab308]/35 shadow-sm"
                : "bg-linear-to-br from-[#f0c94a]/20 to-[#eab308]/10 text-[#f0c94a] ring-[#f0c94a]/30"
            }`}
          >
            <Store className="size-6 sm:size-7" strokeWidth={1.75} />
          </div>
          <p className="absolute top-[calc(100%+0.5rem)] w-full text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#a16207] dark:text-[#f0c94a] sm:text-[11px]">
            Businesses
          </p>
        </div>

        <div className="mealize-approach-rail relative mx-1 h-10 min-w-0 flex-1 sm:mx-2">
          <div
            className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 ${
              isLight ? "bg-[#28a690]/40" : "bg-[#9af2c0]/35"
            }`}
          />
          <span className="mealize-approach-courier mealize-approach-courier--leaf">
            <Leaf className="size-3.5" strokeWidth={2.25} />
          </span>
        </div>

        <div className="relative flex w-[5.5rem] shrink-0 justify-center sm:w-32">
          <div
            className={`mealize-approach-hub__mark flex size-20 items-center justify-center rounded-full sm:size-24 ${
              isLight
                ? "bg-white shadow-[0_12px_40px_-16px_rgba(40,166,144,0.55)] ring-1 ring-[#28a690]/20"
                : "bg-zinc-900 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.65)] ring-1 ring-[#9af2c0]/25"
            }`}
          >
            <MealizeLogoMedium className="size-[70%] overflow-visible" />
          </div>
          <p className="absolute top-[calc(100%+0.5rem)] w-full text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#156b5c] dark:text-[#9af2c0] sm:text-[11px]">
            Mealize
          </p>
        </div>

        <div className="mealize-approach-rail relative mx-1 h-10 min-w-0 flex-1 sm:mx-2">
          <div
            className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 ${
              isLight ? "bg-[#28a690]/40" : "bg-[#9af2c0]/35"
            }`}
          />
          <span className="mealize-approach-courier mealize-approach-courier--truck">
            <Truck className="size-3.5" strokeWidth={2.25} />
          </span>
        </div>

        <div className="relative flex w-[4.75rem] shrink-0 justify-center sm:w-28">
          <div
            className={`flex size-14 items-center justify-center rounded-2xl ring-1 sm:size-16 ${
              isLight
                ? "bg-linear-to-br from-[#76d97e]/30 to-[#28a690]/20 text-[#156b5c] ring-[#28a690]/25 shadow-sm"
                : "bg-linear-to-br from-[#9af2c0]/15 to-[#28a690]/10 text-[#9af2c0] ring-[#9af2c0]/25"
            }`}
          >
            <Building2 className="size-6 sm:size-7" strokeWidth={1.75} />
          </div>
          <p className="absolute top-[calc(100%+0.5rem)] w-full text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#156b5c] dark:text-[#9af2c0] sm:text-[11px]">
            Food banks
          </p>
        </div>
      </div>
      {/* Reserve space for absolutely positioned labels */}
      <div className="h-8" />
    </div>
  );
}

/** Closing “receipt” beat: truck runs the last mile, then a check seals the handoff. */
function DeliveryHandoffBeat() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#28a690]/22 bg-linear-to-b from-[#28a690]/10 via-[#28a690]/4 to-transparent px-6 py-9 dark:border-[#28a690]/20 dark:from-[#28a690]/14">
      <div className="mealize-delivery-beat relative h-14 w-full max-w-[16rem]" aria-hidden>
        <div className="mealize-delivery-road absolute inset-x-2 bottom-3 h-px bg-linear-to-r from-transparent via-[#28a690]/45 to-transparent" />
        <div className="mealize-delivery-truck absolute bottom-4 left-0 flex size-11 items-center justify-center rounded-full bg-[#28a690]/14 text-[#28a690] ring-1 ring-[#28a690]/25 dark:bg-[#9af2c0]/12 dark:text-[#9af2c0] dark:ring-[#9af2c0]/25">
          <Truck className="size-5" strokeWidth={1.75} />
        </div>
        <div className="mealize-delivery-check absolute bottom-4 right-0 flex size-11 items-center justify-center rounded-full bg-[#76d97e]/25 text-[#156b5c] ring-1 ring-[#28a690]/25 dark:bg-[#9af2c0]/15 dark:text-[#9af2c0] dark:ring-[#9af2c0]/30">
          <Check className="size-5" strokeWidth={2.5} />
        </div>
      </div>
      <p className="text-center text-lg font-bold tracking-tight text-black dark:text-zinc-50">
        That handoff completes a Mealize delivery.
      </p>
    </div>
  );
}

function TourScreenshot({
  file,
  alt,
  maxHeight = 400,
  className = "",
}: {
  file: string;
  alt: string;
  maxHeight?: number;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-[#28a690]/15 bg-[#f4faf8] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-white/10 dark:bg-zinc-900/50 dark:shadow-none ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static marketing assets from `/public/welcome` */}
      <img
        src={`${ASSET}/${file}`}
        alt={alt}
        className="mx-auto block w-full object-contain object-top"
        style={{ maxHeight }}
      />
    </figure>
  );
}

function TourStep({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mealize-tour-step flex flex-col gap-7">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
        <span
          className="h-1 w-10 rounded-full bg-linear-to-r from-[#156b5c] to-[#76d97e]"
          aria-hidden
        />
        <h3 className="text-balance text-2xl font-bold tracking-tight text-black sm:text-[1.75rem] sm:leading-snug dark:text-zinc-50">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-5 text-sm font-medium leading-relaxed text-black/85 dark:text-zinc-300 sm:text-[0.9375rem]">
        {children}
      </div>
    </div>
  );
}

function ProductTourCarousel({
  steps,
  isLight,
}: {
  steps: { title: string; content: ReactNode }[];
  isLight: boolean;
}) {
  const [index, setIndex] = useState(0);
  const total = steps.length;
  const step = steps[index];
  const progress = ((index + 1) / total) * 100;

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border shadow-[0_32px_90px_-40px_rgba(15,61,54,0.55)] ring-1 ${
        isLight
          ? "border-[#28a690]/20 bg-white ring-black/[0.03]"
          : "border-white/10 bg-zinc-950/85 ring-white/8"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_90%_120%_at_50%_-20%,rgba(40,166,144,0.18),transparent_68%)] dark:bg-[radial-gradient(ellipse_90%_120%_at_50%_-20%,rgba(154,242,192,0.14),transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-24 size-56 rounded-full bg-[#76d97e]/10 blur-3xl dark:bg-[#9af2c0]/8"
        aria-hidden
      />

      <div className="relative border-b border-[#28a690]/12 px-5 py-5 sm:px-8 dark:border-white/8">
        <div className="mb-3.5 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#156b5c] dark:text-[#9af2c0]">
            Step walkthrough
          </p>
          <p className="font-mono text-xs font-semibold tabular-nums text-[#28a690]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
        <div
          className={`h-1.5 overflow-hidden rounded-full ${isLight ? "bg-[#28a690]/10" : "bg-white/10"}`}
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Tour progress, step ${index + 1} of ${total}`}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-[#156b5c] via-[#28a690] to-[#76d97e] transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3.5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className={`inline-flex size-8 items-center justify-center rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28a690] disabled:cursor-not-allowed disabled:opacity-35 ${
              isLight
                ? "border-[#28a690]/25 bg-white text-[#156b5c] hover:border-[#28a690] hover:bg-[#28a690]/8"
                : "border-white/15 bg-zinc-950 text-[#9af2c0] hover:border-[#9af2c0]/40 hover:bg-[#9af2c0]/10"
            }`}
            aria-label="Previous step"
          >
            <ChevronLeft className="size-4" strokeWidth={2.25} aria-hidden />
          </button>
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28a690] ${
                  i === index
                    ? "w-7 bg-[#28a690]"
                    : isLight
                      ? "w-2 bg-zinc-300/90 hover:bg-[#28a690]/55"
                      : "w-2 bg-zinc-600 hover:bg-[#9af2c0]/55"
                }`}
                aria-label={`Go to step ${i + 1}`}
                aria-current={i === index ? "step" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            disabled={index === total - 1}
            className={`inline-flex size-8 items-center justify-center rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28a690] disabled:cursor-not-allowed disabled:opacity-35 ${
              isLight
                ? "border-[#28a690]/25 bg-white text-[#156b5c] hover:border-[#28a690] hover:bg-[#28a690]/8"
                : "border-white/15 bg-zinc-950 text-[#9af2c0] hover:border-[#9af2c0]/40 hover:bg-[#9af2c0]/10"
            }`}
            aria-label="Next step"
          >
            <ChevronRight className="size-4" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>

      <div className="relative px-5 py-9 sm:px-10 sm:py-11" aria-live="polite" aria-atomic="true">
        <TourStep key={index} title={step.title}>
          {step.content}
        </TourStep>
      </div>
    </div>
  );
}

export function MealizeWelcome() {
  const { theme } = useMealizeTheme();
  const isLight = theme === "light";

  return (
    <>
      <MealizeWelcomeSplash />
      <div
        className={`relative isolate flex w-full flex-col font-sans ${isLight ? "bg-white text-black" : "bg-zinc-950 text-zinc-50"}`}
      >
        <WelcomeAtmosphere isLight={isLight} />

        {/* Hero */}
        <section
          id="product"
          className="relative flex w-full scroll-mt-20 flex-col items-center pb-16 pt-10 sm:pb-20 sm:pt-14"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,56rem)] -translate-x-1/2 bg-linear-to-r from-transparent via-[#28a690]/30 to-transparent dark:via-[#28a690]/40" />

          <div className="relative w-full overflow-x-clip">
            {/* Edge-hugging art (lg+) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[min(34vw,28rem)] translate-x-4 items-center lg:flex">
              {/* eslint-disable-next-line @next/next/no-img-element -- marketing asset from /public/welcome */}
              <img
                src={`${ASSET}/hero-surplus-food.png`}
                alt=""
                aria-hidden
                className="mealize-hero-float mealize-hero-float--left h-auto w-[85%] max-h-[min(59.5vh,27rem)] object-contain object-left"
                width={1024}
                height={677}
              />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[min(34vw,28rem)] items-center justify-end lg:flex">
              {/* eslint-disable-next-line @next/next/no-img-element -- marketing asset from /public/welcome */}
              <img
                src={`${ASSET}/hero-food-donation.png`}
                alt=""
                aria-hidden
                className="mealize-hero-float mealize-hero-float--right h-auto w-[85%] max-h-[min(59.5vh,27rem)] object-contain object-right"
                width={1024}
                height={635}
              />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
              <h1 className="text-balance overflow-visible text-4xl font-bold tracking-tight text-black sm:text-5xl sm:leading-[1.08] md:text-6xl dark:text-zinc-50">
                Turn{" "}
                <span className="bg-linear-to-r from-[#ca8a04] via-[#eab308] to-[#fde047] bg-clip-text text-transparent dark:from-[#e0b838] dark:via-[#f0c94a] dark:to-[#fde68a]">
                  surplus food
                </span>{" "}
                into{" "}
                <span className="bg-linear-to-r from-[#156b5c] via-[#28a690] to-[#76d97e] bg-clip-text text-transparent dark:from-[#c6fde8] dark:via-[#9af2c0] dark:to-[#28a690]">
                  meals that matter
                </span>
                <WelcomeHeadlinePunctuation />
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base font-medium leading-relaxed text-black sm:text-lg dark:text-zinc-300">
                Mealize connects restaurants, grocers, and other food businesses with food banks—so edible surplus becomes
                community meals instead of landfill.
              </p>
            </div>

            {/* Stacked under copy below lg (includes md) */}
            <div className="mt-10 grid w-full grid-cols-2 lg:hidden" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element -- marketing asset from /public/welcome */}
              <img
                src={`${ASSET}/hero-surplus-food.png`}
                alt="Illustrated surplus groceries and fresh produce"
                className="mealize-hero-float mealize-hero-float--left h-auto w-[85%] max-h-48 justify-self-start object-contain object-left sm:max-h-60 md:max-h-72"
                width={1024}
                height={677}
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- marketing asset from /public/welcome */}
              <img
                src={`${ASSET}/hero-food-donation.png`}
                alt="Illustrated food donation box filled with groceries"
                className="mealize-hero-float mealize-hero-float--right h-auto w-[85%] max-h-48 justify-self-end object-contain object-right sm:max-h-60 md:max-h-72"
                width={1024}
                height={635}
              />
            </div>
          </div>

          {/* Feature bento — labels from the former hero pill */}
          <div className="mx-auto mt-20 grid w-full max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
            <FeatureTile
              isLight={isLight}
              icon={Leaf}
              label="Surplus food"
              title="List surplus in minutes"
              body="Add a photo, quantity, and pickup window—so food banks know what is available while it is still safe to move."
              motionDelay="0s"
            />
            <FeatureTile
              isLight={isLight}
              icon={Building2}
              label="Food banks"
              title="Connect with those in need"
              body="Post requests, message businesses, and flag posts for your team—without losing context in email threads."
              motionDelay="0.35s"
            />
            <FeatureTile
              isLight={isLight}
              icon={HeartHandshake}
              label="One coordinated pickup"
              title="Handle pickups in one app"
              body="Favorites, notifications, and reservations keep volunteers, managers, and drivers aligned through handoff."
              motionDelay="0.7s"
            />
          </div>
        </section>

        <TrustedByMarquee />

        {/* What is Mealize */}
        <section
          id="about"
          className="mx-auto flex w-full max-w-3xl scroll-mt-20 flex-col items-center gap-8 px-4 pb-20 pt-16 sm:px-6 sm:pt-20"
        >
          <div className="w-full text-center">
            <SectionLabel>Why Mealize</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
              One platform for surplus handoffs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base font-medium leading-relaxed text-black dark:text-zinc-300">
              Mealize exists to move safe, edible surplus off loading docks and into community programs—before spoilage
              and paperwork get in the way.
            </p>
          </div>
          <WelcomeImg file="volunteer.jpg" alt="Volunteers coordinating food pickup" maxHeight={420} />
        </section>

        {/* Problem + stats feel */}
        <section
          id="challenge"
          className="scroll-mt-20 border-y border-neutral-200 bg-white py-20 dark:border-white/10 dark:bg-zinc-900/50"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:gap-16">
            <div className="max-w-xl shrink-0 lg:w-[42%]">
              <SectionLabel>The challenge</SectionLabel>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
                Hunger and waste sit side by side
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-black dark:text-zinc-300">
                Even before recent shocks, millions of households were one emergency away from skipping meals. In 2019,
                about{" "}
                <ExternalLink href="https://www.ers.usda.gov/data-products/ag-and-food-statistics-charting-the-essentials/food-security-and-nutrition-assistance/#:~:text=In%202020%2C%2089.5%20percent%20of,from%2010.5%20percent%20in%202019.">
                  10.5%
                </ExternalLink>{" "}
                of US households reported low or very low food security—while a staggering share of food never reaches
                a plate.
              </p>
              <ul className="mt-6 space-y-4 text-base font-medium leading-relaxed text-black dark:text-zinc-300">
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#28a690]" aria-hidden />
                  <span className="min-w-0 flex-1">
                    The Covid-19 period saw roughly{" "}
                    <ExternalLink href="https://www.bls.gov/opub/mlr/2020/article/employment-recovery.htm">
                      22 million
                    </ExternalLink>{" "}
                    jobs lost between February and April 2020 in the US alone—disrupting wages and supply chains when
                    people could least afford it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#28a690]" aria-hidden />
                  <span className="min-w-0 flex-1">
                    USDA estimates roughly{" "}
                    <ExternalLink href="https://www.usda.gov/foodwaste/faqs#:~:text=In%20the%20United%20States%2C%20food,worth%20of%20food%20in%202010.">
                      30–40%
                    </ExternalLink>{" "}
                    of the food supply goes uneaten—nutrition and labor thrown away alongside it.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#28a690]" aria-hidden />
                  <span className="min-w-0 flex-1">
                    Closing that gap means connecting surplus to food banks faster than it spoils—and doing it at
                    community scale.
                  </span>
                </li>
              </ul>
            </div>
            <div className="min-w-0 flex-1">
              <WelcomeImg file="hungry.jpg" alt="Food insecurity in the community" maxHeight={520} objectFit="cover" />
            </div>
          </div>
        </section>

        {/* Solution */}
        <section
          id="approach"
          className="mx-auto flex w-full max-w-3xl scroll-mt-20 flex-col items-center gap-10 px-4 py-20 sm:px-6"
        >
          <div className="w-full text-center">
            <SectionLabel>Approach</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
              A shared workspace for both sides
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base font-medium leading-relaxed text-black dark:text-zinc-300">
              Businesses and food banks meet in one feed—with messaging and pickup scheduling—so a match becomes a
              handoff you can repeat week after week.
            </p>
          </div>
          <ApproachFlowDiagram isLight={isLight} />
        </section>

        {/* How it works */}
        <section
          id="tour"
          className="relative mx-auto w-full max-w-5xl scroll-mt-20 px-4 pb-24 sm:px-6"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-8 h-72 w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-[#28a690]/8 blur-3xl dark:bg-[#9af2c0]/6"
            aria-hidden
          />
          <div className="relative mb-12 text-center">
            <SectionLabel>Product tour</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
              How Mealize works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base font-medium text-black dark:text-zinc-300">
              Five steps from posting a need to a confirmed drop-off—the screenshots below follow the same path you
              will use in the app.
            </p>
          </div>

          <ProductTourCarousel
            isLight={isLight}
            steps={[
              {
                title: "Food banks spell out what helps most",
                content: (
                  <>
                    <p className="mx-auto max-w-xl text-center text-pretty">
                      Managers publish structured requests—so businesses see exactly what would make a difference this
                      week, not a vague wish list.
                    </p>
                    <TourScreenshot file="request.png" alt="Posting a request in Mealize" maxHeight={400} />
                  </>
                ),
              },
              {
                title: "Businesses publish surplus that fits the ask",
                content: (
                  <>
                    <p className="mx-auto max-w-xl text-center text-pretty">
                      Teams scan open requests, then post items with photos and details when they have a match—so donors
                      lead with what is actually on hand.
                    </p>
                    <TourScreenshot file="item.png" alt="Posting a surplus food item" maxHeight={400} />
                  </>
                ),
              },
              {
                title: "Volunteers flag what matters to their site",
                content: (
                  <>
                    <p className="mx-auto max-w-xl text-center text-pretty">
                      Staff browse the feed, save strong fits, ask clarifying questions, or ping a manager—so the right
                      person says yes before slots disappear.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <TourScreenshot file="notify.png" alt="Notifying a manager about a post" maxHeight={280} />
                      <TourScreenshot file="notifymessage.png" alt="Manager message thread" maxHeight={280} />
                    </div>
                  </>
                ),
              },
              {
                title: "Details, locations, and a formal pickup request",
                content: (
                  <>
                    <p className="mx-auto max-w-xl text-center text-pretty">
                      Open a post for hours and address, visit the organization profile for context, then send a pickup
                      request—once it is submitted, that item is reserved for your flow so nobody double-books the run.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      <TourScreenshot file="singleitem.png" alt="Single post detail view" maxHeight={320} />
                      <TourScreenshot file="organization.png" alt="Organization profile page" maxHeight={320} />
                    </div>
                    <TourScreenshot file="pickupform.png" alt="Pickup request form" maxHeight={380} />
                  </>
                ),
              },
              {
                title: "Confirm, dispatch, and close the loop",
                content: (
                  <>
                    <p className="mx-auto max-w-xl text-center text-pretty">
                      When a business manager accepts the request, the pickup is confirmed and a driver can be assigned.
                      The last mile is simple: return to the food bank with food that would have otherwise been
                      discarded.
                    </p>
                    <TourScreenshot file="pickupmessage.png" alt="Pickup confirmation message" maxHeight={380} />
                    <DeliveryHandoffBeat />
                  </>
                ),
              },
            ]}
          />
        </section>

        {/* Get started */}
        <section
          id="get-started"
          className="mx-auto flex w-full max-w-5xl scroll-mt-20 flex-col items-center gap-8 px-4 pb-20 sm:px-6"
        >
          <div className="w-full text-center">
            <SectionLabel>Onboarding</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
              Ready to try Mealize?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base font-medium text-black dark:text-zinc-300">
              Pick a role and jump straight into a seeded walkthrough—no account setup. You can also use{" "}
              <span className="font-semibold text-black dark:text-zinc-200">Sign up</span> or{" "}
              <span className="font-semibold text-black dark:text-zinc-200">Log in</span> in the top navigation.
            </p>
          </div>
          <MealizeWelcomePersonaPicker isLight={isLight} />
        </section>

      </div>
    </>
  );
}
