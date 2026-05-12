import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Brand fills are written as literal `bg-[#hex]` classes (not template-interpolated
 * from `mealizeAuthBrand`) because Tailwind's JIT only generates CSS for class
 * strings it can find verbatim in source. Keep these in sync with
 * `lib/mealize-auth-brand-colors.ts`.
 */
const STYLES = {
  signup: {
    compact:
      "flex cursor-pointer items-center justify-center rounded-md border-0 bg-[#b45309] px-2.5 py-1.5 text-xs font-extrabold text-white no-underline shadow-sm transition hover:bg-[#92400e] sm:px-3 sm:text-sm dark:border dark:border-[#f0c94a]/50 dark:bg-[#f0c94a] dark:text-black dark:shadow-none dark:hover:bg-[#e0b838]",
    drawer:
      "flex h-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#b45309] px-4 text-sm font-extrabold text-white no-underline shadow-sm transition hover:bg-[#92400e] dark:border dark:border-[#f0c94a]/50 dark:bg-[#f0c94a] dark:text-black dark:shadow-none dark:hover:bg-[#e0b838]",
  },
  signin: {
    compact:
      "flex cursor-pointer items-center justify-center rounded-md border-0 bg-[#0a4d42] px-2.5 py-1.5 text-xs font-semibold text-white no-underline shadow-sm transition hover:bg-[#062f29] sm:px-3 sm:text-sm dark:bg-[#3db89f] dark:text-black dark:hover:bg-[#2d8a7a]",
    drawer:
      "flex h-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#0a4d42] px-4 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-[#062f29] dark:bg-[#3db89f] dark:text-black dark:hover:bg-[#2d8a7a]",
  },
} as const;

export type NavAuthButtonVariant = keyof typeof STYLES;
export type NavAuthButtonSize = keyof typeof STYLES[NavAuthButtonVariant];

export function NavAuthButton({
  variant,
  size = "compact",
  href,
  children,
}: {
  variant: NavAuthButtonVariant;
  size?: NavAuthButtonSize;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} prefetch={false} className={STYLES[variant][size]}>
      {children}
    </Link>
  );
}
