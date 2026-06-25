import type { ReactNode } from "react";

const ROW_STYLES = {
  /** Welcome/wiki — single horizontal row, mega-menu lives in the middle. */
  welcome:
    "flex h-[50px] w-full min-w-0 flex-row items-center justify-between gap-2 px-4 sm:px-6 lg:px-10",
  /** Default — logo + search + actions; collapses to 2-row grid on mobile. */
  default:
    "grid w-full min-w-0 grid-cols-2 items-center gap-x-2 gap-y-2 px-4 py-2 sm:px-6 lg:h-[50px] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-3 lg:gap-y-0 lg:py-0",
} as const;

export type AppHeaderRowVariant = keyof typeof ROW_STYLES;

export function AppHeaderRow({
  variant,
  children,
}: {
  variant: AppHeaderRowVariant;
  children: ReactNode;
}) {
  return <div className={ROW_STYLES[variant]}>{children}</div>;
}
