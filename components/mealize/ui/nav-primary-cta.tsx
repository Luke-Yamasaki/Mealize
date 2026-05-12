import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

const BASE =
  "cursor-pointer bg-[#9AF2C0] font-bold text-black shadow-sm transition hover:bg-[#8ae8b2] dark:bg-black dark:text-white dark:hover:bg-zinc-800";

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
