import { createElement, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Card — a lifted-surface container. Consumes `--mz-surface_secondary_*`
 * (same intent family as Popover, Dialog, Menu — anything that visually
 * lifts off the page). Compose content with `Stack`, `Heading`, `Text`
 * inside; the card itself stays simple and unopinionated about layout.
 */

const PADDING = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
} as const;

export type CardPadding = keyof typeof PADDING;

type CardProps = {
  /** Internal padding tier (default `md`). Use `none` if you'll lay out children with their own padding. */
  padding?: CardPadding;
  /** Override element tag (default `<div>`). */
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Card({
  padding = "md",
  as = "div",
  className,
  children,
}: CardProps) {
  return createElement(
    as,
    {
      className: cn(
        "rounded-xl border bg-[var(--mz-surface_secondary_backgroundColor)] text-[var(--mz-surface_secondary_foregroundColor)] shadow-sm",
        "border-[var(--mz-surface_secondary_borderColor)]",
        PADDING[padding],
        className,
      ),
    },
    children,
  );
}
