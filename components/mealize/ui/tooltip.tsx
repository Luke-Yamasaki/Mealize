"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Short label revealed on hover or keyboard focus. Backed by
 * `@base-ui/react/tooltip` — handles hover/focus timing, escape dismiss,
 * and ARIA `describedby` wiring. Visual is inverted from the page surface
 * (consumes `var(--mz-surface_auxiliary_*)`).
 *
 * Mount `Tooltip.Provider` near the app root to share delay settings
 * across all tooltips; without one, each Root uses Base UI defaults.
 */

const Root = BaseTooltip.Root;
const Trigger = BaseTooltip.Trigger;
const Provider = BaseTooltip.Provider;

type PositionerProps = ComponentProps<typeof BaseTooltip.Positioner>;
type PopupProps = ComponentProps<typeof BaseTooltip.Popup>;

type ContentProps = Omit<PopupProps, "children"> & {
  side?: PositionerProps["side"];
  align?: PositionerProps["align"];
  sideOffset?: PositionerProps["sideOffset"];
  children: ReactNode;
};

function Content({
  side = "top",
  align,
  sideOffset = 6,
  className,
  children,
  ...rest
}: ContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-[800]"
      >
        <BaseTooltip.Popup
          {...rest}
          className={cn(
            "rounded-md border bg-[var(--mz-surface_auxiliary_backgroundColor)] text-[var(--mz-surface_auxiliary_foregroundColor)] shadow-md",
            "border-[var(--mz-surface_auxiliary_borderColor)]",
            "px-2 py-1 text-xs font-medium",
            "max-w-xs",
            className,
          )}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

export const Tooltip = {
  Root,
  Trigger,
  Content,
  Provider,
};
