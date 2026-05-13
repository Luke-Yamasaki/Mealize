import NextLink from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Text links. For external URLs pass `external` to opt into `target="_blank"`
 * plus `rel="noopener noreferrer"`. Internal hrefs use Next.js routing.
 *
 * Use for inline text navigation. Don't use for primary actions — use
 * `<Button>` (or `<NavPrimaryCtaLink>` in nav context) when the affordance
 * should be a button.
 */
type LinkProps = {
  href: string;
  external?: boolean;
  /** Disable Next.js prefetch (recommended for low-priority links). */
  prefetch?: boolean;
  className?: string;
  children: ReactNode;
};

const BASE =
  "font-semibold text-primary-readable underline decoration-border underline-offset-2 transition hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-primary";

export function Link({
  href,
  external,
  prefetch = false,
  className,
  children,
}: LinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(BASE, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} prefetch={prefetch} className={cn(BASE, className)}>
      {children}
    </NextLink>
  );
}
