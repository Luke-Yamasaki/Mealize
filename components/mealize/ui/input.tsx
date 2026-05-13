"use client";

import { type InputHTMLAttributes, type Ref } from "react";

import { cn } from "@/lib/utils";

import { useFieldContext } from "./field";

/**
 * Form text input. Reads from `--mz-control_*` tokens; the closest
 * `data-mode` ancestor picks the palette. When wrapped in a `<Field>`, picks
 * up `id`, `aria-describedby`, and `aria-invalid` automatically; call sites
 * can override any of those via props.
 */
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  ref?: Ref<HTMLInputElement>;
};

export function Input({
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ref,
  ...rest
}: InputProps) {
  const field = useFieldContext();
  const resolvedInvalid =
    ariaInvalid ?? (field?.invalid ? true : undefined);

  return (
    <input
      ref={ref}
      id={id ?? field?.id}
      aria-describedby={ariaDescribedBy ?? field?.describedBy}
      aria-invalid={resolvedInvalid}
      {...rest}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border bg-[var(--mz-control_backgroundColor)] px-3 text-sm text-[var(--mz-control_foregroundColor)] transition",
        "border-[var(--mz-control_borderColor)]",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
        "aria-invalid:border-destructive aria-invalid:text-destructive",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    />
  );
}
