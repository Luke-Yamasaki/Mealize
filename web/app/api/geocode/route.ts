import { NextRequest, NextResponse } from "next/server";

/** Short pickup-style label from Nominatim reverse JSON (OpenStreetMap). */
function formatPickupLabel(data: {
  address?: Record<string, string>;
  display_name?: string;
}): string {
  const a = data.address ?? {};
  const road = [a.house_number, a.road].filter(Boolean).join(" ").trim();
  const neighborhood =
    a.neighbourhood || a.suburb || a.quarter || a.city_district || a.hamlet || "";
  const city = a.city || a.town || a.village || a.municipality || "";
  const state = a.state || "";

  let out = "";
  if (road && city) out = `${road}, ${city}`;
  else if (neighborhood && city) out = `${neighborhood}, ${city}`;
  else if (city && state) out = `${city}, ${state}`;
  else if (city) out = city;
  else if (state) out = state;

  if (out) return out.length > 120 ? `${out.slice(0, 117)}…` : out;

  if (data.display_name) {
    const short = data.display_name
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3)
      .join(", ");
    return short.length > 120 ? `${short.slice(0, 117)}…` : short;
  }
  return "Unknown location";
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const latRaw = req.nextUrl.searchParams.get("lat");
  const lonRaw = req.nextUrl.searchParams.get("lon");
  if (latRaw == null || lonRaw == null) {
    return NextResponse.json({ error: "Missing lat or lon" }, { status: 400 });
  }
  const lat = Number(latRaw);
  const lon = Number(lonRaw);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return NextResponse.json({ error: "Coordinates out of range" }, { status: 400 });
  }

  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        // Nominatim usage policy: identify the application
        "User-Agent": "Mealize/1.0 (+https://github.com/Luke-Yamasaki/Mealize)",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Address lookup failed" }, { status: 502 });
    }
    const data = (await res.json()) as { error?: string; address?: Record<string, string>; display_name?: string };
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 502 });
    }
    const label = formatPickupLabel(data);
    return NextResponse.json({ label });
  } catch {
    return NextResponse.json({ error: "Address lookup failed" }, { status: 502 });
  }
}
