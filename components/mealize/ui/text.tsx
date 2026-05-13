import { createElement, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * `intent` maps to mise-en-mode's three text levels:
 * - primary: body text
 * - secondary: supporting text (muted)
 * - auxiliary: helper / caption text
 *
 * Today the visuals come from Tailwind utility classes pinned to the
 * shadcn-style `--muted-foreground` token. When the mise-en-mode
 * `text_*` intents are populated with concrete values (currently
 * `inherit` placeholders in app/intents.css), swap these to arbitrary
 * values over the `--mz-text_*` variables (for example
 * `text-[var(--mz-text_primary_fontSize)]`) so typography becomes mode-driven.
 */
const INTENT_STYLES = {
  primary: "text-sm text-foreground",
  secondary: "text-sm text-muted-foreground",
  auxiliary: "text-xs text-muted-foreground",
} as const;

const WEIGHT_STYLES = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export type TextIntent = keyof typeof INTENT_STYLES;
export type TextWeight = keyof typeof WEIGHT_STYLES;

type TextProps = {
  intent?: TextIntent;
  weight?: TextWeight;
  /** Override element tag (default `<p>`). Use `as="span"` for inline copy. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Text({
  intent = "primary",
  weight = "regular",
  as = "p",
  className,
  children,
}: TextProps) {
  return createElement(
    as,
    {
      className: cn(
        "leading-relaxed",
        INTENT_STYLES[intent],
        WEIGHT_STYLES[weight],
        className,
      ),
    },
    children,
  );
}
