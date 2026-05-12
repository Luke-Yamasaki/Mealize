"use client";

import Link from "next/link";
import { useAuth, UserButton, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { trpc } from "@/lib/trpc/react";

import {
  useMealizeAccessibility,
  useMealizeBackground,
  useMealizeTheme,
  type MealizeTheme,
} from "@/stores/mealize-ui-store";
import { useMealizeModalStore } from "@/stores/mealize-modal-store";

function SearchShell() {
  const { theme } = useMealizeTheme();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      className="relative mx-auto hidden min-w-[225px] max-w-[600px] flex-[0_1_40vw] flex-row items-center justify-start gap-1 rounded-full py-0 pl-1 md:flex"
      style={{
        height: "30px",
        backgroundColor: theme === "light" ? "white" : "#191919",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        if (!term) return;
        router.push(`/search/${encodeURIComponent(term)}`);
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search posts"
        className="ml-2 w-[90%] max-w-[530px] border-0 bg-transparent text-sm font-bold outline-none"
        style={{
          color: theme === "light" ? "#191919" : "white",
          backgroundColor: theme === "light" ? "#FFFFFF" : "#191919",
        }}
      />
    </form>
  );
}

function SettingsMenu() {
  const { theme, setTheme } = useMealizeTheme();
  const { showPattern, setShowPattern } = useMealizeBackground();
  const {
    brandHex,
    setBrandHex,
    contrast,
    setContrast,
    saturation,
    setSaturation,
    dyslexicFont,
    setDyslexicFont,
    locationLabel,
    setLocationLabel,
  } = useMealizeAccessibility();
  const openModal = useMealizeModalStore((s) => s.open);
  const closeModal = useMealizeModalStore((s) => s.close);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex size-8 cursor-pointer items-center justify-center rounded border-0 bg-white/20 text-white hover:bg-white/30"
        aria-label="Display settings"
        onClick={() => setOpen((o) => !o)}
      >
        ⚙
      </button>
      {open ? (
        <div
          className="absolute right-0 z-[300] mt-1 max-h-[80vh] min-w-[220px] max-w-[90vw] overflow-y-auto rounded-md border border-black/10 bg-white p-3 text-sm text-zinc-900 shadow-lg"
          role="menu"
        >
          <p className="mb-2 font-bold">Theme</p>
          <div className="mb-3 flex gap-2">
            {(["light", "dark"] as MealizeTheme[]).map((t) => (
              <button
                key={t}
                type="button"
                className={`rounded px-2 py-1 capitalize ${theme === t ? "bg-[#76D97E]" : "bg-zinc-100"}`}
                onClick={() => setTheme(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mb-2 font-bold">Background pattern</p>
          <label className="mb-3 flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showPattern}
              onChange={(e) => setShowPattern(e.target.checked)}
            />
            Show pattern
          </label>
          <p className="mb-2 font-bold">Brand color</p>
          <input
            type="color"
            className="mb-3 h-8 w-full cursor-pointer rounded border border-zinc-200"
            value={brandHex}
            onChange={(e) => setBrandHex(e.target.value)}
          />
          <p className="mb-2 font-bold">Contrast</p>
          <div className="mb-3 flex gap-2">
            {(["normal", "high"] as const).map((c) => (
              <button
                key={c}
                type="button"
                className={`rounded px-2 py-1 capitalize ${contrast === c ? "bg-[#76D97E]" : "bg-zinc-100"}`}
                onClick={() => setContrast(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mb-1 font-bold">Saturation ({saturation}%)</p>
          <input
            type="range"
            min={50}
            max={150}
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="mb-3 w-full"
          />
          <label className="mb-3 flex cursor-pointer items-center gap-2 font-bold">
            <input type="checkbox" checked={dyslexicFont} onChange={(e) => setDyslexicFont(e.target.checked)} />
            Dyslexia-friendly font stack
          </label>
          <p className="mb-1 font-bold">Location label</p>
          <input
            type="text"
            className="mb-3 w-full rounded border border-zinc-200 px-2 py-1 text-xs"
            placeholder="City / region (optional)"
            value={locationLabel}
            onChange={(e) => setLocationLabel(e.target.value)}
          />
          <button
            type="button"
            className="mb-2 w-full rounded border border-zinc-200 py-1 text-xs font-bold"
            onClick={() =>
              openModal(
                <div className="space-y-2">
                  <p className="font-bold">Modal root</p>
                  <p className="text-xs text-zinc-600">Legacy Redux modal mount is replaced by this portal.</p>
                  <button
                    type="button"
                    className="rounded bg-[#28a690] px-3 py-1 text-xs font-bold text-white"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                </div>,
              )
            }
          >
            Test modal
          </button>
          <button
            type="button"
            className="mt-1 w-full rounded border border-zinc-200 py-1 text-xs"
            onClick={() => setOpen(false)}
          >
            Close menu
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function MealizeNavbarGuest() {
  const { theme } = useMealizeTheme();

  return (
    <header
      className="sticky top-0 z-[200] flex h-[50px] w-screen max-w-[1336px] flex-col items-center justify-center"
      style={{
        background: "linear-gradient(#76D97E, #28A690)",
      }}
    >
      <nav className="flex h-full w-full">
        <div className="flex h-full w-[calc(100%-100px)] flex-row items-center justify-between gap-2.5 px-[50px]">
          <div className="flex flex-row items-center gap-2">
            <Link
              href="/"
              className="font-black no-underline"
              style={{
                color: theme === "light" ? "#FFFFFF" : "#191919",
                fontFamily: "motiva-sans, sans-serif",
                fontSize: "28px",
                marginTop: "2px",
              }}
            >
              Mealize
            </Link>
          </div>
          <SearchShell />
          <div className="flex shrink-0 flex-row gap-2">
            <Link
              href="/sign-up"
              prefetch={false}
              className="flex cursor-pointer items-center justify-center rounded-[5px] border-0 bg-[#9AF2C0] px-3 py-1.5 no-underline"
            >
              <span className="text-sm font-extrabold text-black">Sign up</span>
            </Link>
            <Link
              href="/sign-in"
              prefetch={false}
              className="flex cursor-pointer items-center justify-center rounded-[5px] border-0 bg-[#28A690] px-3 py-1.5 no-underline"
            >
              <span className="text-sm font-medium text-white">Log in</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function MealizeNavbarSession({
  isManager,
}: {
  isManager: boolean;
}) {
  const { theme } = useMealizeTheme();

  return (
    <header
      className="sticky top-0 z-[200] flex h-[50px] w-screen max-w-[1336px] flex-col items-center justify-center"
      style={{
        background: "linear-gradient(#76D97E, #28A690)",
      }}
    >
      <nav className="flex h-full w-full">
        <div className="flex h-full w-full flex-row items-center gap-2.5 px-6">
          <Link
            href="/"
            className="shrink-0 font-black no-underline"
            style={{
              color: theme === "light" ? "#FFFFFF" : "#191919",
              fontFamily: "motiva-sans, sans-serif",
              fontSize: "28px",
            }}
          >
            Mealize
          </Link>
          <div className="flex gap-1 pl-2">
            <Link
              href="/"
              className="flex size-8 items-center justify-center rounded bg-white/15 text-xs font-bold text-white hover:bg-white/25"
              title="Home"
            >
              H
            </Link>
            <Link
              href="/deliveries"
              prefetch={false}
              className="flex size-8 items-center justify-center rounded bg-white/15 text-xs font-bold text-white hover:bg-white/25"
              title="Deliveries"
            >
              D
            </Link>
            <Link
              href="/messages"
              prefetch={false}
              className="flex size-8 items-center justify-center rounded bg-white/15 text-xs font-bold text-white hover:bg-white/25"
              title="Messages"
            >
              M
            </Link>
          </div>
          <div className="mx-2 min-w-0 flex-1">
            <SearchShell />
          </div>
          <div className="flex shrink-0 items-center gap-2">
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
      <div
        className="h-[50px] w-screen max-w-[1336px]"
        style={{ background: "linear-gradient(#76D97E, #28A690)" }}
      />
    );
  }
  if (!isSignedIn) return <MealizeNavbarGuest />;
  return <MealizeNavbarSession isManager={me?.isManager ?? false} />;
}
