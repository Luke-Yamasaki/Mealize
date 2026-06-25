"use client";

import { type Ref, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { useFieldContext } from "./field";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: Ref<HTMLTextAreaElement>;
};

export function Textarea({
  id,
  rows = 3,
  className,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ref,
  ...rest
}: TextareaProps) {
  const field = useFieldContext();
  const resolvedInvalid =
    ariaInvalid ?? (field?.invalid ? true : undefined);

  return (
    <textarea
      ref={ref}
      id={id ?? field?.id}
      rows={rows}
      aria-describedby={ariaDescribedBy ?? field?.describedBy}
      aria-invalid={resolvedInvalid}
      {...rest}
      className={cn(
        "w-full min-w-0 resize-y rounded-md border bg-[var(--mz-control_backgroundColor)] px-3 py-2 text-sm text-[var(--mz-control_foregroundColor)] transition",
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
