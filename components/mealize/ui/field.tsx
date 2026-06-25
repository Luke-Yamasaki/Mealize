"use client";

import { createContext, useContext, useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Field wraps a single form control with label, optional helper, and optional
 * error. It owns the input's id (auto-generated if not provided), the
 * helper/error elements' ids, and the `aria-describedby` wiring. Form
 * controls (Input, Textarea, Select…) inside a Field read this context and
 * pick up the right ids and `aria-invalid` automatically.
 *
 * Use the explicit `id` prop only when an external label or non-Field code
 * needs to reference the input — the auto id is usually enough.
 */

type FieldContextValue = {
  id: string;
  describedBy?: string;
  invalid: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return useContext(FieldContext);
}

type FieldProps = {
  id?: string;
  label: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({
  id: idProp,
  label,
  helper,
  error,
  required,
  className,
  children,
}: FieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [errorId, helperId].filter(Boolean).join(" ") || undefined;
  const invalid = !!error;

  return (
    <FieldContext.Provider value={{ id, describedBy, invalid }}>
      <div className={cn("min-w-0 space-y-1.5", className)}>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </label>
        {children}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-destructive"
          >
            {error}
          </p>
        ) : helper ? (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helper}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}
