"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export const APP_SHELL_MAIN_ID = "main-content";

export function AppShell({
  header,
  footer,
  modals,
  mainId = APP_SHELL_MAIN_ID,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  modals?: ReactNode;
  mainId?: string;
  children: ReactNode;
}) {
  const topChromeRef = useRef<HTMLDivElement>(null);
  /** Measured height of everything in the `header` slot — drives `main` min-height so the footer stays below the first viewport. */
  const [topChromePx, setTopChromePx] = useState(50);

  useLayoutEffect(() => {
    const el = topChromeRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      setTopChromePx(Math.round(el.getBoundingClientRect().height));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col">
      <div ref={topChromeRef} className="shrink-0">
        {header}
      </div>
      <main
        id={mainId}
        className="flex w-full min-w-0 flex-1 flex-col"
        style={{ minHeight: `calc(100dvh - ${topChromePx}px)` }}
      >
        {children}
      </main>
      {footer}
      {modals}
    </div>
  );
}
