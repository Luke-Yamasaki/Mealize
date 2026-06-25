import { createElement, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * `level` controls both the semantic element (h1–h6) and the visual size.
 * Use `as` to override the semantic element while keeping the visual size
 * (e.g., `level={1} as="h2"` for a hero that's still h2 in the doc outline).
 */
const LEVEL_STYLES = {
  1: "text-4xl font-extrabold tracking-tight",
  2: "text-3xl font-bold tracking-tight",
  3: "text-2xl font-semibold tracking-tight",
  4: "text-xl font-semibold",
  5: "text-lg font-semibold",
  6: "text-base font-semibold uppercase tracking-wide",
} as const;

export type HeadingLevel = keyof typeof LEVEL_STYLES;

type HeadingProps = {
  level: HeadingLevel;
  /** Override the rendered element while keeping the visual scale of `level`. */
  as?: `h${HeadingLevel}`;
  className?: string;
  children: ReactNode;
};

export function Heading({ level, as, className, children }: HeadingProps) {
  const tag = as ?? (`h${level}` as const);
  return createElement(
    tag,
    {
      className: cn(
        "min-w-0 text-foreground",
        LEVEL_STYLES[level],
        className,
      ),
    },
    children,
  );
}
