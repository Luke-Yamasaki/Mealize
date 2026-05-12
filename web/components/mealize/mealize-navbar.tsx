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
import { MealizeNavLogo } from "./mealize-nav-logo";
import { MealizeNavbarWelcomeMenus } from "./mealize-navbar-welcome-menus";

function NavIconLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      prefetch={false}
      title={title}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/15",
        active && "bg-white/20 ring-1 ring-white/35",
      )}
    >
      {children}
    </Link>
  );
}

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
          className="h-9 rounded-full border-0 bg-white pr-10 pl-3 text-sm font-medium text-foreground shadow-sm ring-1 ring-black/5 placeholder:text-muted-foreground dark:bg-zinc-900 dark:text-white dark:ring-white/10"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1.5 z-[1] flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-primary-readable transition hover:bg-primary/10"
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

export function MealizeNavbarGuest() {
  const { theme } = useMealizeTheme();
  const pathname = usePathname();
  const isWelcome = pathname === "/welcome";

  const guestDrawerAuth: ReactNode = (
    <div className="flex flex-col gap-2">
      <Link
        href="/sign-up"
        prefetch={false}
        className="flex h-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#9AF2C0] px-4 text-sm font-extrabold text-black no-underline shadow-sm transition hover:bg-[#8ae8b2]"
      >
        Sign up
      </Link>
      <Link
        href="/sign-in"
        prefetch={false}
        className="flex h-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#28A690] px-4 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-[#22967f]"
      >
        Log in
      </Link>
    </div>
  );

  return (
    <header
      className="sticky top-0 z-200 w-full min-w-0 overflow-visible bg-gradient-to-b from-[#76D97E] to-[#28A690]"
    >
      <nav className="w-full min-w-0">
        <div
          className={
            isWelcome
              ? "flex h-[50px] w-full min-w-0 flex-row items-center justify-between gap-2 px-4 sm:px-6 lg:px-10"
              : "grid w-full min-w-0 grid-cols-2 items-center gap-x-2 gap-y-2 px-4 py-2 sm:px-6 lg:h-[50px] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-3 lg:gap-y-0 lg:py-0"
          }
        >
          <Link
            href="/"
            aria-label="Mealize home"
            className={cn(
              "flex min-w-0 shrink-0 flex-row items-center gap-2 font-black text-white no-underline",
              !isWelcome &&
                "col-start-1 row-start-1 max-w-[min(100%,14rem)] sm:max-w-none",
            )}
            style={{
              fontFamily: "motiva-sans, sans-serif",
              fontWeight: 900,
              fontStyle: "normal",
              fontSize: "28px",
              marginTop: "2px",
            }}
          >
            <span
              id="mealize-splash-logo-target"
              className="flex size-[40px] shrink-0 items-center justify-center sm:size-[45px]"
              aria-hidden
              data-mealize-splash-logo-target
            >
              <MealizeNavLogo theme={theme} className="block" />
            </span>
            <span className="truncate leading-none max-[380px]:hidden sm:inline">Mealize</span>
          </Link>
          {isWelcome ? (
            <div className="flex min-w-0 flex-1 items-center justify-end lg:justify-center">
              <MealizeNavbarWelcomeMenus mobileDrawerFooter={guestDrawerAuth} />
            </div>
          ) : (
            <>
              <div className="col-span-2 row-start-2 flex min-w-0 items-center gap-2 lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:col-end-3">
                <SearchShell />
              </div>
              <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-2 justify-self-end lg:col-start-3 lg:row-start-1">
                <Link
                  href="/sign-up"
                  prefetch={false}
                  className="flex cursor-pointer items-center justify-center rounded-md border-0 bg-[#9AF2C0] px-2.5 py-1.5 text-xs font-extrabold text-black no-underline shadow-sm sm:px-3 sm:text-sm"
                >
                  Sign up
                </Link>
                <Link
                  href="/sign-in"
                  prefetch={false}
                  className="flex cursor-pointer items-center justify-center rounded-md border-0 bg-[#28A690] px-2.5 py-1.5 text-xs font-semibold text-white no-underline shadow-sm sm:px-3 sm:text-sm"
                >
                  Log in
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
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
        <Link
          href="/posts/new"
          prefetch={false}
          className="flex h-11 items-center justify-center rounded-lg bg-[#9AF2C0] text-sm font-bold text-black no-underline shadow-sm transition hover:bg-[#8ae8b2]"
        >
          New post
        </Link>
      ) : (
        <SignOutButton>
          <button
            type="button"
            className="w-full cursor-pointer rounded-lg bg-[#9AF2C0] py-2.5 text-sm font-bold text-black transition hover:bg-[#8ae8b2]"
          >
            Log out
          </button>
        </SignOutButton>
      )}
    </div>
  );
}

export function MealizeNavbarSession({
  isManager,
}: {
  isManager: boolean;
}) {
  const { theme } = useMealizeTheme();
  const pathname = usePathname();
  const isWelcome = pathname === "/welcome";

  return (
    <header className="sticky top-0 z-200 w-full min-w-0 overflow-visible bg-gradient-to-b from-[#76D97E] to-[#28A690]">
      <nav className="w-full min-w-0">
        <div
          className={
            isWelcome
              ? "flex h-[50px] w-full min-w-0 flex-row items-center gap-2 px-4 sm:px-6 lg:justify-between lg:gap-2.5 lg:px-6"
              : "grid w-full min-w-0 grid-cols-2 items-center gap-x-2 gap-y-2 px-4 py-2 sm:px-6 lg:h-[50px] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-3 lg:gap-y-0 lg:py-0"
          }
        >
          <Link
            href="/"
            aria-label="Mealize home"
            className={cn(
              "flex min-w-0 shrink-0 flex-row items-center gap-2 font-black text-white no-underline",
              !isWelcome &&
                "col-start-1 row-start-1 max-w-[min(100%,15rem)] sm:max-w-none",
            )}
            style={{
              fontFamily: "motiva-sans, sans-serif",
              fontWeight: 900,
              fontStyle: "normal",
              fontSize: "28px",
            }}
          >
            <span
              id="mealize-splash-logo-target"
              className="flex size-[40px] shrink-0 items-center justify-center sm:size-[45px]"
              aria-hidden
              data-mealize-splash-logo-target
            >
              <MealizeNavLogo theme={theme} className="block" />
            </span>
            <span className="truncate leading-none max-[380px]:hidden sm:inline">Mealize</span>
          </Link>
          {isWelcome ? (
            <>
              <div className="flex min-w-0 flex-1 items-center justify-end lg:mx-2 lg:justify-center">
                <MealizeNavbarWelcomeMenus
                  mobileDrawerFooter={<WelcomeSessionDrawerFooter isManager={isManager} />}
                />
              </div>
              <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
                <NavIconLink href="/deliveries" title="Deliveries">
                  <Truck className="size-[18px]" strokeWidth={2} />
                </NavIconLink>
                <NavIconLink href="/messages" title="Messages">
                  <MessageSquare className="size-[18px]" strokeWidth={2} />
                </NavIconLink>
                <NavIconLink href="/organizations" title="Organizations">
                  <Building2 className="size-[18px]" strokeWidth={2} />
                </NavIconLink>
                <UserButton />
                <SettingsMenu />
                {isManager ? (
                  <Link
                    href="/posts/new"
                    prefetch={false}
                    className="cursor-pointer rounded bg-[#9AF2C0] px-3 py-1.5 text-sm font-bold text-black no-underline hover:bg-[#8ae8b2]"
                  >
                    New post
                  </Link>
                ) : (
                  <SignOutButton>
                    <button
                      type="button"
                      className="cursor-pointer rounded bg-[#9AF2C0] px-3 py-1.5 text-sm font-bold text-black hover:bg-[#8ae8b2]"
                    >
                      Log out
                    </button>
                  </SignOutButton>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="col-span-2 row-start-2 min-w-0 lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:col-end-3">
                <SearchShell />
              </div>
              <div className="col-start-2 row-start-1 flex shrink-0 items-center justify-end gap-1 justify-self-end sm:gap-1.5 lg:col-start-3 lg:row-start-1">
                <NavIconLink href="/deliveries" title="Deliveries">
                  <Truck className="size-[18px]" strokeWidth={2} />
                </NavIconLink>
                <NavIconLink href="/messages" title="Messages">
                  <MessageSquare className="size-[18px]" strokeWidth={2} />
                </NavIconLink>
                <NavIconLink href="/organizations" title="Organizations">
                  <Building2 className="size-[18px]" strokeWidth={2} />
                </NavIconLink>
                <UserButton />
                <SettingsMenu />
                {isManager ? (
                  <Link
                    href="/posts/new"
                    prefetch={false}
                    className="cursor-pointer rounded-md bg-[#9AF2C0] px-2 py-1.5 text-xs font-bold text-black no-underline shadow-sm hover:bg-[#8ae8b2] sm:px-3 sm:text-sm"
                  >
                    New post
                  </Link>
                ) : (
                  <SignOutButton>
                    <button
                      type="button"
                      className="cursor-pointer rounded-md bg-[#9AF2C0] px-2 py-1.5 text-xs font-bold text-black shadow-sm hover:bg-[#8ae8b2] sm:px-3 sm:text-sm"
                    >
                      Log out
                    </button>
                  </SignOutButton>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export function MealizeNavbar() {
  const { isSignedIn, isLoaded } = useAuth();
  const { data: me } = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!isSignedIn,
  });

  if (!isLoaded) {
    return (
      <div className="h-[50px] w-full min-w-0 bg-gradient-to-b from-[#76D97E] to-[#28A690] lg:h-[50px]" />
    );
  }
  if (!isSignedIn) return <MealizeNavbarGuest />;
  return <MealizeNavbarSession isManager={me?.isManager ?? false} />;
}
