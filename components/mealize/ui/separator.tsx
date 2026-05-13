"use client";

import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Thin divider rule. Backed by `@base-ui/react/separator` for the
 * `role="separator"` + `aria-orientation` wiring. Color comes from the
 * shadcn `border` token today; if a future bite formalizes a divider
 * intent in mise-en-mode, swap the className here.
 */

type SeparatorProps = ComponentProps<typeof BaseSeparator>;

export function Separator({
  orientation = "horizontal",
  className,
  ...rest
}: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      {...rest}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
