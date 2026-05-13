"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Popover — visual layer on top of `@base-ui/react`'s headless popover.
 * Base UI handles positioning, focus management, escape dismissal, click
 * outside, and ARIA wiring; Mealize provides the surface styling driven by
 * `--mz-surface_secondary_*`.
 *
 * The compound API is collapsed where it adds noise: `Popover.Content`
 * internally renders the `Portal + Positioner + Popup` triple, while
 * `Title`, `Description`, and `Close` stay as direct exports for opt-in
 * use. For deeper customization (custom Backdrop, Arrow), drop to
 * `@base-ui/react/popover` directly.
 */

const Root = BasePopover.Root;
const Trigger = BasePopover.Trigger;
const Title = BasePopover.Title;
const Description = BasePopover.Description;
const Close = BasePopover.Close;

type PositionerProps = ComponentProps<typeof BasePopover.Positioner>;
type PopupProps = ComponentProps<typeof BasePopover.Popup>;

type ContentProps = Omit<PopupProps, "children"> & {
  /** Side of the trigger to position the popover (`"bottom"` default). */
  side?: PositionerProps["side"];
  /** Alignment of the popover relative to the trigger (`"center"` default). */
  align?: PositionerProps["align"];
  /** Gap between the trigger and the popover in pixels. */
  sideOffset?: PositionerProps["sideOffset"];
  /** Padding from the viewport edge before flipping. */
  collisionPadding?: PositionerProps["collisionPadding"];
  children: ReactNode;
};

function Content({
  side,
  align,
  sideOffset = 8,
  collisionPadding = 8,
  className,
  children,
  ...popupProps
}: ContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="z-[600] outline-none"
      >
        <BasePopover.Popup
          {...popupProps}
          className={cn(
            "min-w-[12rem] overflow-y-auto rounded-xl border bg-[var(--mz-surface_secondary_backgroundColor)] text-[var(--mz-surface_secondary_foregroundColor)] shadow-lg",
            "border-[var(--mz-surface_secondary_borderColor)]",
            "max-h-[min(85vh,26rem)] max-w-[min(20rem,calc(100vw-1.5rem))]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
            className,
          )}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export const Popover = {
  Root,
  Trigger,
  Content,
  Title,
  Description,
  Close,
};
