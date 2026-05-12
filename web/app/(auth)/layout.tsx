import Link from "next/link";

import { MealizeAuthBranding } from "@/components/mealize/mealize-auth-branding";
import { MealizeAuthThemeShell } from "@/components/mealize/mealize-auth-theme-shell";

import "./clerk-auth-overrides.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MealizeAuthThemeShell>
      <header className="relative z-10 flex shrink-0 p-6">
        <Link
          href="/welcome"
          className="text-sm font-medium text-[#4a756c] transition-colors hover:text-[#28a690] dark:text-zinc-400 dark:hover:text-[#9af2c0]"
        >
          {"< Home"}
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-2">
        <MealizeAuthBranding>{children}</MealizeAuthBranding>
      </div>
    </MealizeAuthThemeShell>
  );
}
