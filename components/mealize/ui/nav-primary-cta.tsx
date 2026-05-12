import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * Fully mode-driven. The component declares only the base intent; the mode
 * (`default` stacked with `light`/`dark` on MealizeShell) owns rest, hover/
 * focus-visible, and theme values via mode-scoped rules in `app/intents.css`.
 */
const BASE =
  "cursor-pointer bg-[var(--mz-action_primary_backgroundColor)] font-bold text-[var(--mz-action_primary_foregroundColor)] shadow-sm transition";

const SIZES = {
  compact: "rounded-md px-2 py-1.5 text-xs sm:px-3 sm:text-sm",
  drawer: "flex h-11 w-full items-center justify-center rounded-lg text-sm",
} as const;

export type NavPrimaryCtaSize = keyof typeof SIZES;

export function NavPrimaryCtaLink({
  href,
  size = "compact",
  children,
}: {
  href: string;
  size?: NavPrimaryCtaSize;
  children: ReactNode;
}) {
  return (
    <Link href={href} prefetch={false} className={`${BASE} ${SIZES[size]} no-underline`}>
      {children}
    </Link>
  );
}

export function NavPrimaryCtaButton({
  size = "compact",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { size?: NavPrimaryCtaSize }) {
  return (
    <button type="button" {...rest} className={`${BASE} ${SIZES[size]}`}>
      {children}
    </button>
  );
}
