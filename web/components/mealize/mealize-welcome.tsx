"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  HeartHandshake,
  Leaf,
  Truck,
} from "lucide-react";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

import { MealizeLogoMedium } from "./mealize-logo-medium";
import { MealizePlatformRoadmap } from "./mealize-platform-roadmap";
import { MealizeWelcomeSplash } from "./mealize-welcome-splash";

const ASSET = "/welcome";
const REPO = "https://github.com/Luke-Yamasaki/Mealize";
const WIKI = "https://github.com/Luke-Yamasaki/Mealize/wiki";

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
      className="relative z-2 ml-2 inline-flex size-[2.65rem] shrink-0 items-center justify-center align-middle motion-reduce:size-10 sm:ml-2.5 sm:size-12 md:size-14"
      aria-hidden
    >
      <span className="pointer-events-none absolute left-1/2 top-1/2 block h-40 w-40 origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.34] motion-reduce:scale-[0.22] sm:scale-[0.38] md:scale-[0.44]">
        <span className="relative block h-full w-full">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="mealize-welcome-signal-ring absolute left-1/2 top-1/2 size-17 rounded-full border border-[#28a690]/45 sm:size-19"
              style={{ animationDelay: `${i * 0.9}s` }}
            />
          ))}
          <span className="mealize-welcome-signal-core absolute left-1/2 top-1/2 size-3.5 rounded-full bg-linear-to-br from-[#76d97e] to-[#28a690] sm:size-4" />
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

function PrimaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#28a690] px-7 text-sm font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_32px_-8px_rgba(40,166,144,0.55)] transition hover:bg-[#22967f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#28a690]"
    >
      {children}
      <ArrowRight className="size-4 opacity-90" aria-hidden />
    </Link>
  );
}

function SecondaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-300 bg-white px-7 text-sm font-bold text-black transition hover:border-neutral-400 hover:bg-neutral-50 dark:border-white/15 dark:bg-zinc-900/80 dark:text-zinc-50 dark:hover:border-white/25 dark:hover:bg-zinc-800/90"
    >
      {children}
    </Link>
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
  title,
  body,
  isLight,
}: {
  icon: typeof Leaf;
  title: string;
  body: string;
  isLight: boolean;
}) {
  return (
    <div
      className={`group flex flex-col gap-3 rounded-2xl border p-6 transition hover:border-[#28a690]/35 ${isLight ? "border-neutral-200 bg-white shadow-sm hover:shadow-md" : "border-white/10 bg-white/4 hover:bg-white/6"}`}
    >
      <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-[#76d97e]/25 to-[#28a690]/20 text-[#1a6b5c] ring-1 ring-[#28a690]/15 dark:text-[#9af2c0] dark:ring-white/10">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="text-lg font-bold tracking-tight text-black dark:text-zinc-50">{title}</h3>
      <p className="text-sm font-medium leading-relaxed text-black dark:text-zinc-300">{body}</p>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10">
      <div className="flex gap-4 lg:flex-col lg:gap-2">
        <span className="font-mono text-xs font-semibold tabular-nums text-[#28a690]">{n}</span>
        <h3 className="text-xl font-bold tracking-tight text-black dark:text-zinc-50 lg:text-2xl">{title}</h3>
      </div>
      <div className="space-y-4 text-sm font-medium leading-relaxed text-black dark:text-zinc-300 lg:text-[0.9375rem]">
        {children}
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
          className="relative flex w-full scroll-mt-20 flex-col items-center px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,56rem)] -translate-x-1/2 bg-linear-to-r from-transparent via-[#28a690]/30 to-transparent dark:via-[#28a690]/40" />
          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm dark:border-white/10 dark:bg-white/6">
              <MealizeLogoMedium className="size-9 shrink-0" />
              <span className="text-xs font-semibold tracking-wide text-black dark:text-zinc-200">
                Surplus food · nonprofits · one coordinated pickup
              </span>
            </div>
            <h1 className="text-balance overflow-visible text-4xl font-bold tracking-tight text-black sm:text-5xl sm:leading-[1.08] md:text-6xl dark:text-zinc-50">
              Turn surplus food into{" "}
              <span className="bg-linear-to-r from-[#156b5c] via-[#28a690] to-[#76d97e] bg-clip-text text-transparent dark:from-[#c6fde8] dark:via-[#9af2c0] dark:to-[#28a690]">
                meals that matter
              </span>
              <WelcomeHeadlinePunctuation />
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base font-medium leading-relaxed text-black sm:text-lg dark:text-zinc-300">
              Mealize connects restaurants, grocers, and other food businesses with nonprofits—so edible surplus becomes
              community meals instead of landfill.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <PrimaryCta href="/sign-up">Create an account</PrimaryCta>
              <SecondaryCta href="/sign-in">Log in</SecondaryCta>
            </div>
          </div>

          {/* Feature bento */}
          <div className="mx-auto mt-20 grid w-full max-w-5xl gap-4 sm:grid-cols-3">
            <FeatureTile
              isLight={isLight}
              icon={Building2}
              title="List surplus in minutes"
              body="Add a photo, quantity, and pickup window—so nonprofits know what is available while it is still safe to move."
            />
            <FeatureTile
              isLight={isLight}
              icon={HeartHandshake}
              title="Coordinate need in one place"
              body="Post requests, message businesses, and flag posts for your team—without losing context in email threads."
            />
            <FeatureTile
              isLight={isLight}
              icon={Leaf}
              title="From match to confirmed pickup"
              body="Favorites, notifications, and reservations keep volunteers, managers, and drivers aligned through handoff."
            />
          </div>
        </section>

        {/* What is Mealize */}
        <section
          id="about"
          className="mx-auto flex w-full max-w-3xl scroll-mt-20 flex-col items-center gap-8 px-4 pb-20 sm:px-6"
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
                    Closing that gap means connecting surplus to nonprofits faster than it spoils—and doing it at
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
          className="mx-auto flex w-full max-w-3xl scroll-mt-20 flex-col items-center gap-8 px-4 py-20 sm:px-6"
        >
          <div className="w-full text-center">
            <SectionLabel>Approach</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
              A shared workspace for both sides
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base font-medium leading-relaxed text-black dark:text-zinc-300">
              Businesses and nonprofits meet in one feed—with messaging and pickup scheduling—so a match becomes a
              handoff you can repeat week after week.
            </p>
          </div>
          <WelcomeImg
            file={isLight ? "lightdiagram.png" : "darkdiagram.png"}
            alt="Diagram of Mealize connecting businesses and nonprofits"
            maxHeight={560}
            className="w-full max-w-2xl"
          />
        </section>

        {/* How it works */}
        <section id="tour" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 pb-24 sm:px-6">
          <div className="mb-16 text-center">
            <SectionLabel>Product tour</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
              How Mealize works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base font-medium text-black dark:text-zinc-300">
              Five steps from posting a need to a confirmed drop-off—the screenshots below follow the same path you
              will use in the app.
            </p>
          </div>

          <div className="space-y-20">
            <Step n="01" title="Nonprofits spell out what helps most">
              <p>
                Managers publish structured requests—so businesses see exactly what would make a difference this week,
                not a vague wish list.
              </p>
              <WelcomeImg file="request.png" alt="Posting a request in Mealize" maxHeight={400} />
            </Step>

            <Step n="02" title="Businesses publish surplus that fits the ask">
              <p>
                Teams scan open requests, then post items with photos and details when they have a match—so donors lead
                with what is actually on hand.
              </p>
              <WelcomeImg file="item.png" alt="Posting a surplus food item" maxHeight={400} />
            </Step>

            <Step n="03" title="Volunteers flag what matters to their site">
              <p>
                Staff browse the feed, save strong fits, ask clarifying questions, or ping a manager—so the right person
                says yes before slots disappear.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <WelcomeImg file="notify.png" alt="Notifying a manager about a post" maxHeight={280} />
                <WelcomeImg file="notifymessage.png" alt="Manager message thread" maxHeight={280} />
              </div>
            </Step>

            <Step n="04" title="Details, locations, and a formal pickup request">
              <p>
                Open a post for hours and address, visit the organization profile for context, then send a pickup
                request—once it is submitted, that item is reserved for your flow so nobody double-books the run.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <WelcomeImg file="singleitem.png" alt="Single post detail view" maxHeight={320} />
                <WelcomeImg file="organization.png" alt="Organization profile page" maxHeight={320} />
              </div>
              <WelcomeImg file="pickupform.png" alt="Pickup request form" maxHeight={380} />
            </Step>

            <Step n="05" title="Confirm, dispatch, and close the loop">
              <p>
                When a business manager accepts the request, the pickup is confirmed and a driver can be assigned. The
                last mile is simple: return to the nonprofit with food that would have otherwise been discarded.
              </p>
              <WelcomeImg file="pickupmessage.png" alt="Pickup confirmation message" maxHeight={380} />
              <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-[#28a690]/35 bg-white px-6 py-10 dark:border-[#28a690]/25 dark:bg-zinc-950/50">
                <Truck className="size-16 text-[#28a690]" strokeWidth={1.25} aria-hidden />
                <p className="text-center text-lg font-bold tracking-tight text-black dark:text-zinc-50">
                  That handoff completes a Mealize delivery.
                </p>
              </div>
            </Step>
          </div>
        </section>

        {/* Get started */}
        <section
          id="get-started"
          className="mx-auto flex w-full max-w-3xl scroll-mt-20 flex-col items-center gap-10 px-4 pb-20 sm:px-6"
        >
          <div className="w-full text-center">
            <SectionLabel>Onboarding</SectionLabel>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-zinc-50">
              Ready to try Mealize?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base font-medium text-black dark:text-zinc-300">
              Use <span className="font-semibold text-black dark:text-zinc-200">Sign up</span> or{" "}
              <span className="font-semibold text-black dark:text-zinc-200">Log in</span> in the top navigation, or
              tap the demo shortcuts on the authentication forms to explore without setting up a full profile first.
            </p>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <WelcomeImg file="navbar.png" alt="Mealize navigation bar with sign up" maxHeight={48} />
            <WelcomeImg file="buttons.png" alt="Sign up and log in buttons" maxHeight={100} objectFit="cover" />
          </div>
          <WelcomeImg file="login.png" alt="Login and sign up forms" maxHeight={640} objectFit="cover" />
        </section>

        <MealizePlatformRoadmap />

        {/* Blog / updates (stub — nav links land here) */}
        <section
          id="blog"
          className="mx-auto w-full max-w-2xl scroll-mt-20 border-y border-neutral-200 bg-white px-4 py-14 pb-20 text-center dark:border-white/10 dark:bg-zinc-900/40 sm:px-6"
        >
          <SectionLabel>Notes</SectionLabel>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-black dark:text-zinc-50">Blog &amp; updates</h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm font-medium leading-relaxed text-black dark:text-zinc-300">
            Long-form build logs are not live yet—this space is reserved for release notes, partner stories, and
            behind-the-scenes engineering notes. Until then, use the{" "}
            <ExternalLink href={REPO}>GitHub repository</ExternalLink> for activity and the{" "}
            <ExternalLink href={WIKI}>wiki</ExternalLink> for background.
          </p>
        </section>
      </div>
    </>
  );
}
