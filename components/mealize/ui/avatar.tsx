"use client";

import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Profile image with fallback. Backed by `@base-ui/react/avatar` — the
 * fallback renders while the image loads or if the URL fails. Pass
 * initials (or any node) as children for the fallback content.
 */

const SIZES = {
  xs: "size-5 text-[9px]",
  sm: "size-6 text-[10px]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-12 text-base",
} as const;

export type AvatarSize = keyof typeof SIZES;

type AvatarProps = {
  /** Image URL. Omit for an initials-only avatar. */
  src?: string;
  /** Required for `<img>` accessibility — describe the person/entity. */
  alt: string;
  size?: AvatarSize;
  className?: string;
  /** Fallback content shown while image loads or on failure (usually initials). */
  children?: ReactNode;
};

export function Avatar({
  src,
  alt,
  size = "md",
  className,
  children,
}: AvatarProps) {
  return (
    <BaseAvatar.Root
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-semibold text-muted-foreground select-none",
        SIZES[size],
        className,
      )}
    >
      {src ? (
        <BaseAvatar.Image
          src={src}
          alt={alt}
          className="size-full object-cover"
        />
      ) : null}
      <BaseAvatar.Fallback className="flex size-full items-center justify-center">
        {children}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}
