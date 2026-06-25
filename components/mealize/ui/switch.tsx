"use client";

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

import { cn } from "@/lib/utils";

/**
 * Toggle switch — a boolean control with a "switching" affordance. ARIA
 * `role="switch"` on a native `<input type="checkbox">`; the visual track +
 * thumb is a sibling element styled with Tailwind's `peer-checked:` variant.
 * The native input itself is `sr-only` so keyboard / screen reader behavior
 * is preserved.
 */
type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  description?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

const TRACK = cn(
  "relative mt-0.5 inline-block h-5 w-9 shrink-0 rounded-full bg-zinc-300 transition",
  "peer-checked:bg-[var(--mz-action_primary_backgroundColor)]",
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-current",
  "after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition",
  "peer-checked:after:translate-x-4",
  "dark:bg-zinc-600",
);

export function Switch({
  id,
  label,
  description,
  className,
  ref,
  ...rest
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hasText = label || description;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex cursor-pointer items-start gap-3 rounded-lg px-1 py-1 transition",
        hasText && "hover:bg-muted/60",
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        {...rest}
        className="peer sr-only"
      />
      <span className={cn(TRACK, className)} aria-hidden />
      {hasText ? (
        <span className="min-w-0">
          {label ? (
            <span className="block text-sm font-medium text-foreground">
              {label}
            </span>
          ) : null}
          {description ? (
            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
}
