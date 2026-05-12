"use client";

import Link from "next/link";
import { useAuth, UserButton, SignOutButton } from "@clerk/nextjs";
import { Building2, MessageSquare, Search, Settings, Truck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";

import { useMealizeAccessibility, useMealizeTheme, type MealizeTheme } from "@/stores/mealize-ui-store";

import { MealizeLocationSettings } from "./mealize-location-settings";
import { MealizeNavbarWelcomeMenus } from "./mealize-navbar-welcome-menus";
import { AppHeader, AppHeaderPlaceholder } from "./ui/app-header";
import { AppHeaderRow } from "./ui/app-header-row";
import { BrandLogo } from "./ui/brand-logo";
import { NavAuthButton } from "./ui/nav-auth-button";
import { NavIconLink } from "./ui/nav-icon-link";
import { NavPrimaryCtaButton, NavPrimaryCtaLink } from "./ui/nav-primary-cta";

function SearchShell() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      className="relative mx-auto flex w-full min-w-0 max-w-[640px] flex-row items-center gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        if (!term) return;
        router.push(`/search/${encodeURIComponent(term)}`);
      }}
    >
      <div className="relative min-w-0 flex-1">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search posts"
          aria-label="Search posts"
          className="h-9 rounded-full border-0 bg-white pr-10 pl-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 placeholder:text-muted-foreground dark:bg-card dark:text-card-foreground dark:shadow-md dark:ring-border"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1.5 z-[1] flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-primary-readable transition hover:bg-primary/10 dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground"
          aria-label="Search"
        >
          <Search className="size-4" strokeWidth={2.25} />
        </button>
      </div>
    </form>
  );
}

function SegmentToggle<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-lg bg-muted/70 p-1 ring-1 ring-border/70 dark:bg-muted/40">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "min-w-0 flex-1 rounded-md px-2 py-1.5 text-xs font-semibold capitalize transition",
            value === o.value
              ? "bg-card text-foreground shadow-sm ring-1 ring-foreground/10 dark:bg-card/90"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SettingsMenu() {
  const { theme, setTheme } = useMealizeTheme();
  const {
    contrast,
    setContrast,
    saturation,
    setSaturation,
    dyslexicFont,
    setDyslexicFont,
  } = useMealizeAccessibility();

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-9 shrink-0 rounded-full border-0 bg-white/15 text-white hover:bg-white/25 hover:text-white",
          "dark:bg-black/8 dark:text-black dark:hover:bg-black/15 dark:hover:text-black",
        )}
        aria-label="Display settings"
      >
        <Settings className="size-[18px]" strokeWidth={2} aria-hidden />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-[min(20rem,calc(100vw-1.5rem))] max-h-[min(85vh,26rem)] overflow-y-auto rounded-xl border-border/80 p-0 shadow-lg"
      >
        <PopoverHeader className="space-y-1 border-b border-border px-4 py-3">
          <PopoverTitle className="text-base font-semibold tracking-tight">Display</PopoverTitle>
          <PopoverDescription className="text-xs leading-snug">
            Theme and reading preferences apply across the app.
          </PopoverDescription>
        </PopoverHeader>

        <div className="space-y-4 px-4 py-3">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Theme</p>
            <SegmentToggle
              value={theme}
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              onChange={(v) => setTheme(v as MealizeTheme)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Contrast</p>
            <SegmentToggle
              value={contrast}
              options={[
                { value: "normal", label: "Normal" },
                { value: "high", label: "High" },
              ]}
              onChange={setContrast}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground">Saturation</p>
              <span className="tabular-nums text-xs font-semibold text-foreground">{saturation}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={150}
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="accent-primary-readable dark:accent-primary h-2 w-full cursor-pointer rounded-full"
            />
          </div>

          <Separator />

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-transparent px-1 py-1 transition hover:bg-muted/60">
            <input
              type="checkbox"
              checked={dyslexicFont}
              onChange={(e) => setDyslexicFont(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-border accent-primary-readable dark:accent-primary"
            />
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">Dyslexia-friendly font</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                Uses OpenDyslexic for body text when enabled.
              </span>
            </span>
          </label>

          <Separator />

          <MealizeLocationSettings />
        </div>

        <div className="border-t border-border bg-muted/30 px-4 py-2.5">
          <p className="text-center text-[11px] text-muted-foreground">Click outside or press Esc to close.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function GuestDrawerAuth() {
  return (
    <div className="flex flex-col gap-2">
      <NavAuthButton variant="signup" size="drawer" href="/sign-up">
        Sign up
      </NavAuthButton>
      <NavAuthButton variant="signin" size="drawer" href="/sign-in">
        Log in
      </NavAuthButton>
    </div>
  );
}

function GuestAuthActions() {
  return (
    <>
      <NavAuthButton variant="signup" href="/sign-up">
        Sign up
      </NavAuthButton>
      <NavAuthButton variant="signin" href="/sign-in">
        Log in
      </NavAuthButton>
    </>
  );
}

export function MealizeNavbarGuest() {
  const pathname = usePathname();
  /** Signed-out home (`/`) shows the same About/Docs/… mega nav as `/welcome` and wiki routes — not search. */
  const isWelcome =
    pathname === "/" || pathname === "/welcome" || pathname.startsWith("/work/mealize/wiki");

  return (
    <AppHeader>
      <AppHeaderRow variant={isWelcome ? "welcome" : "default"}>
        <BrandLogo
          className={cn(
            !isWelcome &&
              "col-start-1 row-start-1 max-w-[min(100%,14rem)] sm:max-w-none",
          )}
        />
        {isWelcome ? (
          <>
            <div className="flex min-w-0 flex-1 items-center justify-center">
              <MealizeNavbarWelcomeMenus mobileDrawerFooter={<GuestDrawerAuth />} />
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <GuestAuthActions />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-2 row-start-2 flex min-w-0 items-center gap-2 lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:col-end-3">
              <SearchShell />
            </div>
            <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-2 justify-self-end lg:col-start-3 lg:row-start-1">
              <GuestAuthActions />
            </div>
          </>
        )}
      </AppHeaderRow>
    </AppHeader>
  );
}

function SessionPrimaryCta({ isManager }: { isManager: boolean }) {
  if (isManager) {
    return <NavPrimaryCtaLink href="/posts/new">New post</NavPrimaryCtaLink>;
  }
  return (
    <SignOutButton>
      <NavPrimaryCtaButton>Log out</NavPrimaryCtaButton>
    </SignOutButton>
  );
}

function SessionIconLinks() {
  return (
    <>
      <NavIconLink href="/deliveries" title="Deliveries">
        <Truck className="size-[18px]" strokeWidth={2} />
      </NavIconLink>
      <NavIconLink href="/messages" title="Messages">
        <MessageSquare className="size-[18px]" strokeWidth={2} />
      </NavIconLink>
      <NavIconLink href="/organizations" title="Organizations">
        <Building2 className="size-[18px]" strokeWidth={2} />
      </NavIconLink>
    </>
  );
}

function WelcomeSessionDrawerFooter({ isManager }: { isManager: boolean }) {
  const navLink =
    "flex min-h-10 items-center rounded-lg px-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100";
  return (
    <div className="space-y-4 border-t border-zinc-200 bg-zinc-50/90 px-1 py-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-500">Account and app</p>
      <div className="flex flex-wrap items-center gap-3">
        <UserButton />
        <SettingsMenu />
      </div>
      <div className="flex flex-col gap-0.5">
        <Link href="/deliveries" prefetch={false} className={navLink} title="Deliveries">
          Deliveries
        </Link>
        <Link href="/messages" prefetch={false} className={navLink} title="Messages">
          Messages
        </Link>
        <Link href="/organizations" prefetch={false} className={navLink} title="Organizations">
          Organizations
        </Link>
      </div>
      {isManager ? (
        <NavPrimaryCtaLink href="/posts/new" size="drawer">
          New post
        </NavPrimaryCtaLink>
      ) : (
        <SignOutButton>
          <NavPrimaryCtaButton size="drawer">Log out</NavPrimaryCtaButton>
        </SignOutButton>
      )}
    </div>
  );
}

export function MealizeNavbarSession({ isManager }: { isManager: boolean }) {
  const pathname = usePathname();
  const isWelcome = pathname === "/welcome" || pathname.startsWith("/work/mealize/wiki");

  return (
    <AppHeader>
      <AppHeaderRow variant={isWelcome ? "welcome" : "default"}>
        <BrandLogo
          className={cn(
            !isWelcome &&
              "col-start-1 row-start-1 max-w-[min(100%,15rem)] sm:max-w-none",
          )}
        />
        {isWelcome ? (
          <>
            <div className="flex min-w-0 flex-1 items-center justify-end lg:mx-2 lg:justify-center">
              <MealizeNavbarWelcomeMenus
                mobileDrawerFooter={<WelcomeSessionDrawerFooter isManager={isManager} />}
              />
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
              <SessionIconLinks />
              <UserButton />
              <SettingsMenu />
              <SessionPrimaryCta isManager={isManager} />
            </div>
          </>
        ) : (
          <>
            <div className="col-span-2 row-start-2 min-w-0 lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:col-end-3">
              <SearchShell />
            </div>
            <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-1 justify-self-end sm:gap-1.5 lg:col-start-3 lg:row-start-1">
              <SessionIconLinks />
              <UserButton />
              <SettingsMenu />
              <SessionPrimaryCta isManager={isManager} />
            </div>
          </>
        )}
      </AppHeaderRow>
    </AppHeader>
  );
}

export function MealizeNavbar() {
  const { isSignedIn, isLoaded } = useAuth();
  const { data: me } = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!isSignedIn,
  });

  if (!isLoaded) return <AppHeaderPlaceholder />;
  if (!isSignedIn) return <MealizeNavbarGuest />;
  return <MealizeNavbarSession isManager={me?.isManager ?? false} />;
}
