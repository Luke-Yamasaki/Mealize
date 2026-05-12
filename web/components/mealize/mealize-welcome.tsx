"use client";

import Link from "next/link";

import { useMealizeTheme } from "@/stores/mealize-ui-store";

export function MealizeWelcome() {
  const { theme } = useMealizeTheme();
  const isLight = theme === "light";

  return (
    <div
      className="flex w-full max-w-[1100px] flex-col gap-10 px-6 py-12"
      style={{
        color: isLight ? "#191919" : "white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">Welcome to Mealize!</h1>
        <p className="max-w-2xl text-lg font-semibold leading-relaxed opacity-90">
          Mealize connects food businesses and nonprofits so surplus food reaches people who need it—
          instead of going to waste.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sign-up"
            prefetch={false}
            className="rounded-lg bg-[#9AF2C0] px-6 py-3 text-base font-extrabold text-black shadow-sm hover:bg-[#8ae8b2]"
          >
            Create an account
          </Link>
          <Link
            href="/sign-in"
            prefetch={false}
            className="rounded-lg border-2 border-[#28A690] bg-transparent px-6 py-3 text-base font-bold text-[#28A690] hover:bg-white/10"
          >
            Log in
          </Link>
        </div>
      </div>

      <div
        className="grid gap-6 rounded-xl border p-6 md:grid-cols-2"
        style={{
          borderColor: isLight ? "#B2B2B2" : "#616161",
          background: isLight ? "rgba(255,255,255,0.85)" : "rgba(25,25,25,0.6)",
        }}
      >
        <div>
          <h2 className="mb-2 text-xl font-black">For businesses</h2>
          <p className="text-sm font-semibold leading-relaxed opacity-90">
            Post surplus items, manage pickup requests, and coordinate deliveries with nonprofits you trust.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-xl font-black">For nonprofits</h2>
          <p className="text-sm font-semibold leading-relaxed opacity-90">
            Browse available food, save favorites, and request pickups when you find what your community needs.
          </p>
        </div>
      </div>
    </div>
  );
}
