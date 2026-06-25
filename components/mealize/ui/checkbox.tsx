"use client";

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

import { cn } from "@/lib/utils";

/**
 * Single checkbox. The label is part of the control's anatomy (rendered to
 * the right), so Checkbox renders its own `<label>` — don't wrap it in a
 * `<Field>`. For groups (e.g., filter lists), render multiple Checkboxes
 * with a shared group label provided by the caller.
 */
type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  description?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

const INPUT_BASE = cn(
  "size-4 shrink-0 cursor-pointer rounded border accent-[var(--mz-action_primary_backgroundColor)]",
  "border-[var(--mz-control_borderColor)]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

export function Checkbox({
  id,
  label,
  description,
  className,
  ref,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  if (!label && !description) {
    return (
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        {...rest}
        className={cn(INPUT_BASE, className)}
      />
    );
  }

  return (
    <label
      htmlFor={inputId}
      className="flex cursor-pointer items-start gap-2.5 rounded-lg px-1 py-1 transition hover:bg-muted/60"
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        {...rest}
        className={cn(INPUT_BASE, "mt-0.5", className)}
      />
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
    </label>
  );
}
