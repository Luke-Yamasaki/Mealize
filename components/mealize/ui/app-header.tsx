import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const APP_HEADER_SURFACE = "bg-linear-to-b from-[#76D97E] to-[#28A690]";

export function AppHeader({
  children,
  navLabel = "Primary",
  className,
}: {
  children: ReactNode;
  navLabel?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-200 w-full min-w-0 overflow-visible shadow-none",
        APP_HEADER_SURFACE,
        className,
      )}
    >
      <nav className="w-full min-w-0" aria-label={navLabel}>
        {children}
      </nav>
    </header>
  );
}

export function AppHeaderPlaceholder() {
  return <div className={cn("sticky top-0 z-200 h-[50px] w-full min-w-0", APP_HEADER_SURFACE)} />;
}
