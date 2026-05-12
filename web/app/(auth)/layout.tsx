import Link from "next/link";

import { MealizeAuthBranding } from "@/components/mealize/mealize-auth-branding";

import "./clerk-auth-overrides.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mealize-auth relative flex min-h-full flex-col bg-white font-sans text-zinc-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {/* Corner washes — stronger mint/teal (see `WelcomeAtmosphere` palette). */}
        <div className="absolute -top-40 -right-28 h-[min(78vh,760px)] w-[min(115vw,920px)] rounded-full bg-linear-to-bl from-[#76d97e]/55 via-[#28a690]/32 to-transparent blur-3xl" />
        <div className="absolute -bottom-36 -left-32 h-[min(72vh,700px)] w-[min(110vw,880px)] rounded-full bg-linear-to-tr from-[#28a690]/48 via-[#76d97e]/38 to-transparent blur-3xl" />
        {/* Same faint grid as `/welcome` (`WelcomeAtmosphere`, light). */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-size-[52px_52px]" />
        {/* Soft center wash so the form area stays calm over the grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_42%,rgba(255,255,255,0.72),transparent_62%)]" />
      </div>

      <header className="relative z-10 flex shrink-0 p-6">
        <Link
          href="/welcome"
          className="text-sm font-medium text-[#4a756c] transition-colors hover:text-[#28a690]"
        >
          {"< Home"}
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-2">
        <MealizeAuthBranding>{children}</MealizeAuthBranding>
      </div>
    </div>
  );
}
