import { createHash } from "node:crypto";

/** Original demo bucket URLs; replace with public placeholders when assets are unavailable. */
const LEGACY_MEALIZE_MEDIA = /mealizeaa\.s3\.amazonaws\.com/i;

/**
 * Curated Unsplash images (ingredients / pantry staples). Same salt → same image for stable UI.
 * https://unsplash.com/license
 */
const FOOD_INGREDIENT_PHOTO_SLUGS = [
  "photo-1540420773420-3366772f4999",
  "photo-1490818387583-1baba5e638af",
  "photo-1550583724-b2692b85b150",
  "photo-1582722872445-44dc5f7e3c8f",
  "photo-1486297678162-eb2a19b0a32d",
  "photo-1592924357228-91a4daadcfea",
  "photo-1547514701-42782101795e",
  "photo-1518977822534-7049a61ee0c2",
  "photo-1563565375-f3fdfdbefa83",
  "photo-1610348725531-843dff563e2c",
  "photo-1610832958506-aa56368176cf",
  "photo-1598170845058-32b9d6a5da37",
  "photo-1560493676-04071c5f467b",
  "photo-1551024506-0bccd828d307",
  "photo-1512621776951-a57141f2eefd",
  "photo-1621996346565-e3dbc646d9a9",
  "photo-1584270354949-c26b0d5b4a0c",
  "photo-1473093295043-cdd812d0e601",
  "photo-1559181567-c3190ca9959b",
  "photo-1595475207225-428b62bda831",
] as const;

function foodIngredientPlaceholderIndex(salt: string): number {
  const digest = createHash("sha256").update(salt).digest();
  return digest.readUInt32BE(0) % FOOD_INGREDIENT_PHOTO_SLUGS.length;
}

/** Deterministic food-ingredient placeholder (no API key; works in dev without your S3). */
export function publicDemoImageUrl(salt: string, width = 720, height = 480): string {
  const slug = FOOD_INGREDIENT_PHOTO_SLUGS[foodIngredientPlaceholderIndex(salt)];
  return `https://images.unsplash.com/${slug}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

/**
 * If the URL is empty or points at legacy demo S3, return a stable ingredient photo URL.
 * Set `DISABLE_LEGACY_MEDIA_PLACEHOLDER=true` to pass through stored URLs as-is (still falls back when empty).
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
