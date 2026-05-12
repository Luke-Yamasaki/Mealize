import { createHash } from "node:crypto";

/** Original demo bucket URLs; replace with public placeholders when assets are unavailable. */
const LEGACY_MEALIZE_MEDIA = /mealizeaa\.s3\.amazonaws\.com/i;

function picsumSeed(salt: string): string {
  return createHash("sha256").update(salt).digest("hex").slice(0, 32);
}

/** Deterministic placeholder image (no API key; works in dev without your S3). */
export function publicDemoImageUrl(salt: string, width = 720, height = 480): string {
  return `https://picsum.photos/seed/${picsumSeed(salt)}/${width}/${height}`;
}

/**
 * If the URL is empty or points at legacy demo S3, return a stable Picsum URL.
 * Set `DISABLE_LEGACY_MEDIA_PLACEHOLDER=true` to pass through stored URLs as-is.
 */
export function withPublicImageFallback(
  url: string | null | undefined,
  salt: string,
): string {
  if (process.env.DISABLE_LEGACY_MEDIA_PLACEHOLDER === "true") {
    const t = (url || "").trim();
    return t || publicDemoImageUrl(salt);
  }
  const trimmed = (url || "").trim();
  if (!trimmed || LEGACY_MEALIZE_MEDIA.test(trimmed)) {
    return publicDemoImageUrl(`${salt}|${trimmed || "empty"}`);
  }
  return trimmed;
}
