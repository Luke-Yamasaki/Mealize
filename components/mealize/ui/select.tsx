"use client";

import { ChevronDown } from "lucide-react";
import { type Ref, type SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { useFieldContext } from "./field";

/**
 * Native `<select>` with the OS dropdown. Use when the option list is short
 * (under ~10) and the values are simple strings. For typeahead, search, or
 * rich option rendering, a future Combobox primitive is the right shape.
 */
type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  ref?: Ref<HTMLSelectElement>;
};

export function Select({
  id,
  className,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ref,
  children,
  ...rest
}: SelectProps) {
  const field = useFieldContext();
  const resolvedInvalid =
    ariaInvalid ?? (field?.invalid ? true : undefined);

  return (
    <div className="relative min-w-0">
      <select
        ref={ref}
        id={id ?? field?.id}
        aria-describedby={ariaDescribedBy ?? field?.describedBy}
        aria-invalid={resolvedInvalid}
        {...rest}
        className={cn(
          "h-9 w-full min-w-0 cursor-pointer appearance-none rounded-md border bg-[var(--mz-control_backgroundColor)] pr-8 pl-3 text-sm text-[var(--mz-control_foregroundColor)] transition",
          "border-[var(--mz-control_borderColor)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
          "aria-invalid:border-destructive aria-invalid:text-destructive",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}
