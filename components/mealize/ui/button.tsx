import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Color comes from the closest `data-mode` ancestor's `action_primary_*`
 * intents. The component is unaware of which palette is active — the
 * surrounding mode decides. Hover/focus-visible reassignment is handled by
 * the mode rules in `app/intents.css`, so this component declares no
 * `hover:` classes.
 *
 * `variant` chooses the structural treatment (filled / outlined / ghost),
 * not the color — it's the mise-en-mode boundary between "what role does
 * this button play" (mode) and "what shape does it have" (variant).
 */
const VARIANT_STYLES = {
  filled:
    "bg-[var(--mz-action_primary_backgroundColor)] text-[var(--mz-action_primary_foregroundColor)] border border-[var(--mz-action_primary_borderColor)] shadow-sm",
  outlined:
    "bg-transparent text-[var(--mz-action_primary_backgroundColor)] border border-[var(--mz-action_primary_backgroundColor)]",
  ghost:
    "bg-transparent text-[var(--mz-action_primary_backgroundColor)] border border-transparent",
} as const;

const SIZE_STYLES = {
  sm: "h-8 rounded-md px-2.5 text-xs",
  md: "h-9 rounded-md px-3.5 text-sm",
  lg: "h-11 rounded-lg px-5 text-base",
} as const;

export type ButtonVariant = keyof typeof VARIANT_STYLES;
export type ButtonSize = keyof typeof SIZE_STYLES;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function Button({
  variant = "filled",
  size = "md",
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      {...rest}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
