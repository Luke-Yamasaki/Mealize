"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function NavIconLink({
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
      aria-label={title}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/15",
        "dark:text-black dark:hover:bg-black/10",
        active && "bg-white/20 ring-1 ring-white/35 dark:bg-black/12 dark:ring-black/20",
      )}
    >
      {children}
    </Link>
  );
}
