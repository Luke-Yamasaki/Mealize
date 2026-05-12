"use client";

import { Loader2, MapPin } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMealizeAccessibility } from "@/stores/mealize-ui-store";

function geoErrorMessage(code: number): string {
  switch (code) {
    case 1:
      return "Location was blocked. Allow access in your browser settings, or type an area below.";
    case 2:
      return "Could not determine your position. Try again or enter a location manually.";
    case 3:
      return "Location request timed out. Try again.";
    default:
      return "Could not get your location. Try manual entry.";
  }
}

export function MealizeLocationSettings() {
  const { locationLabel, setLocationLabel } = useMealizeAccessibility();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function useCurrentLocation() {
    setError(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("This browser does not support location.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const res = await fetch(
            `/api/geocode?lat=${encodeURIComponent(String(lat))}&lon=${encodeURIComponent(String(lon))}`,
          );
          const data = (await res.json()) as { label?: string; error?: string };
          if (!res.ok || data.error) {
            setError(data.error ?? "Could not look up that address.");
            setLoading(false);
            return;
          }
          if (data.label) setLocationLabel(data.label);
          setLoading(false);
        } catch {
          setError("Network error while looking up your address.");
          setLoading(false);
        }
      },
      (err) => {
        setError(geoErrorMessage(err.code));
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20_000,
        maximumAge: 5 * 60_000,
      },
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">Pickup area</p>
        {locationLabel.trim() ? (
          <button
            type="button"
            className="text-xs font-medium text-primary-readable underline-offset-2 hover:underline"
            onClick={() => {
              setLocationLabel("");
              setError(null);
            }}
          >
            Clear
          </button>
        ) : null}
      </div>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="h-9 w-full gap-2 font-semibold shadow-none"
        disabled={loading}
        onClick={() => void useCurrentLocation()}
      >
        {loading ? (
          <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
        ) : (
          <MapPin className="size-4 shrink-0" aria-hidden />
        )}
        Use current location
      </Button>

      <p className="text-xs font-medium text-muted-foreground">Manual entry</p>
      <Input
        type="text"
        placeholder="City, neighborhood, or address"
        value={locationLabel}
        onChange={(e) => {
          setLocationLabel(e.target.value);
          setError(null);
        }}
        className="h-9 text-sm"
        autoComplete="off"
      />

      {error ? <p className="text-xs leading-snug text-destructive">{error}</p> : null}

      <p className="text-[11px] leading-snug text-muted-foreground">
        We only use your location to fill this label (with your permission). You can change it anytime—like
        setting a delivery area in other apps.
      </p>
      <p className="text-[11px] leading-snug text-muted-foreground">
        SMS and email digests for new matches and delivery reminders are not wired yet—they will respect quiet hours
        and only go to verified contact paths once messaging providers are configured.
      </p>
    </div>
  );
}
