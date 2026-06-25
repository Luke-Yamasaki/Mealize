"use client";

import { MapPin } from "lucide-react";

import { useMealizeAccessibility } from "@/stores/mealize-ui-store";

export function MealizeLocationStrip() {
  const { locationLabel } = useMealizeAccessibility();
  const trimmed = locationLabel.trim();
  if (!trimmed) return null;

  return (
    <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5 text-sm sm:px-6">
      <MapPin className="size-4 shrink-0 text-primary-readable" aria-hidden />
      <span className="min-w-0 font-semibold text-primary-readable">Pick up at {trimmed}</span>
    </div>
  );
}
