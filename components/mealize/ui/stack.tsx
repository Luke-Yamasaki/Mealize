import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const GAPS = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
  "2xl": "gap-8",
} as const;

const ALIGN = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const;

const JUSTIFY = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
} as const;

export type StackGap = keyof typeof GAPS;
export type StackAlign = keyof typeof ALIGN;
export type StackJustify = keyof typeof JUSTIFY;

type StackProps = {
  /** "column" stacks vertically (default); "row" stacks horizontally. */
  direction?: "column" | "row";
  gap?: StackGap;
  align?: StackAlign;
  justify?: StackJustify;
  /** Wrap to next line/column when content overflows the cross-axis. */
  wrap?: boolean;
  /** Override the element tag (default `<div>`). */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Stack({
  direction = "column",
  gap = "md",
  align,
  justify,
  wrap,
  as = "div",
  className,
  style,
  children,
}: StackProps) {
  return createElement(
    as,
    {
      className: cn(
        "flex min-w-0",
        direction === "column" ? "flex-col" : "flex-row",
        GAPS[gap],
        align && ALIGN[align],
        justify && JUSTIFY[justify],
        wrap && "flex-wrap",
        className,
      ),
      style,
    },
    children,
  );
}
