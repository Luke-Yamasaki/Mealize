"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Modal dialog backed by `@base-ui/react/dialog`. Base UI handles focus
 * trap, restore-on-close, escape dismissal, scroll lock, and `aria-modal`
 * wiring. `Dialog.Content` collapses Portal + Backdrop + Popup into a
 * single component and applies the centered-modal styling from
 * `var(--mz-surface_secondary_*)`.
 */

const Root = BaseDialog.Root;
const Trigger = BaseDialog.Trigger;
const Title = BaseDialog.Title;
const Description = BaseDialog.Description;
const Close = BaseDialog.Close;

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export type DialogSize = keyof typeof SIZES;

type PopupProps = ComponentProps<typeof BaseDialog.Popup>;

type ContentProps = Omit<PopupProps, "children"> & {
  size?: DialogSize;
  children: ReactNode;
};

function Content({
  size = "md",
  className,
  children,
  ...rest
}: ContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-[700] bg-black/50 backdrop-blur-sm" />
      <BaseDialog.Popup
        {...rest}
        className={cn(
          "fixed top-1/2 left-1/2 z-[710] -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100vw-2rem)] rounded-xl border bg-[var(--mz-surface_secondary_backgroundColor)] text-[var(--mz-surface_secondary_foregroundColor)] shadow-xl",
          "border-[var(--mz-surface_secondary_borderColor)]",
          "max-h-[min(85vh,40rem)] overflow-y-auto p-6",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
          SIZES[size],
          className,
        )}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export const Dialog = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Close,
};
