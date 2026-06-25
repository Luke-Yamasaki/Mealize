"use client";

import { Menu as BaseMenu } from "@base-ui/react/menu";
import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Selectable action list anchored to a trigger. Distinct from `Popover`
 * in semantics: menus contain `Menu.Item` rows the user picks one of,
 * with keyboard navigation (arrows, type-to-find, escape) handled by
 * `@base-ui/react/menu`. Use Popover for free-form content.
 */

const Root = BaseMenu.Root;
const Trigger = BaseMenu.Trigger;
const Group = BaseMenu.Group;
const GroupLabel = BaseMenu.GroupLabel;
const Separator = BaseMenu.Separator;

type PositionerProps = ComponentProps<typeof BaseMenu.Positioner>;
type PopupProps = ComponentProps<typeof BaseMenu.Popup>;
type ItemProps = ComponentProps<typeof BaseMenu.Item>;

type ContentProps = Omit<PopupProps, "children"> & {
  side?: PositionerProps["side"];
  align?: PositionerProps["align"];
  sideOffset?: PositionerProps["sideOffset"];
  collisionPadding?: PositionerProps["collisionPadding"];
  children: ReactNode;
};

function Content({
  side,
  align,
  sideOffset = 4,
  collisionPadding = 8,
  className,
  children,
  ...rest
}: ContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className="z-[600] outline-none"
      >
        <BaseMenu.Popup
          {...rest}
          className={cn(
            "min-w-[10rem] overflow-y-auto rounded-xl border bg-[var(--mz-surface_secondary_backgroundColor)] text-[var(--mz-surface_secondary_foregroundColor)] shadow-lg",
            "border-[var(--mz-surface_secondary_borderColor)]",
            "max-h-[min(85vh,26rem)] p-1",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
            className,
          )}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

function Item({ className, ...rest }: ItemProps) {
  return (
    <BaseMenu.Item
      {...rest}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium outline-none transition select-none",
        "data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
    />
  );
}

export const Menu = {
  Root,
  Trigger,
  Content,
  Item,
  Group,
  GroupLabel,
  Separator,
};
