import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Inline label for status, counts, or categories. Consumes
 * `--mz-surface_secondary_*` by default — a subtle outlined chip. For a
 * loud / branded badge, wrap the call site in a `data-mode` that
 * reassigns surface_secondary to a stronger palette.
 */

const SIZES = {
  sm: "px-1.5 py-0 text-[10px]",
  md: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-0.5 text-sm",
} as const;

export type BadgeSize = keyof typeof SIZES;

type BadgeProps = {
  size?: BadgeSize;
  className?: string;
  children: ReactNode;
};

export function Badge({ size = "md", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border font-semibold uppercase tracking-wide whitespace-nowrap",
        "bg-[var(--mz-surface_secondary_backgroundColor)] text-[var(--mz-surface_secondary_foregroundColor)]",
        "border-[var(--mz-surface_secondary_borderColor)]",
        SIZES[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
