import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Colors come from `[data-mode~="signup"]` / `[data-mode~="signin"]` blocks in
 * `app/intents.css`, scoped to this element via an internal wrapper so the
 * descendant-combinator pattern stays uniform with other mode rules. The wrapper
 * uses `display: contents` so it doesn't affect layout.
 */
const STYLES = {
  compact:
    "flex cursor-pointer items-center justify-center rounded-md border border-[var(--mz-action_primary_borderColor)] bg-[var(--mz-action_primary_backgroundColor)] px-2.5 py-1.5 text-xs font-extrabold text-[var(--mz-action_primary_foregroundColor)] no-underline shadow-sm transition sm:px-3 sm:text-sm",
  drawer:
    "flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-[var(--mz-action_primary_borderColor)] bg-[var(--mz-action_primary_backgroundColor)] px-4 text-sm font-extrabold text-[var(--mz-action_primary_foregroundColor)] no-underline shadow-sm transition",
} as const;

export type NavAuthButtonMode = "signup" | "signin";
export type NavAuthButtonSize = keyof typeof STYLES;

export function NavAuthButton({
  mode,
  size = "compact",
  href,
  children,
}: {
  mode: NavAuthButtonMode;
  size?: NavAuthButtonSize;
  href: string;
  children: ReactNode;
}) {
  return (
    <div data-mode={mode} className="contents">
      <Link href={href} prefetch={false} className={STYLES[size]}>
        {children}
      </Link>
    </div>
  );
}
