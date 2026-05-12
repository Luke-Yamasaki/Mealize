export function determineExpirationHours(expDate: Date) {
  const today = new Date();
  const expiration = new Date(expDate);
  return Math.floor((expiration.getTime() - today.getTime()) / 1000 / 60 / 60);
}

export function formatExpDate(expDate: Date) {
  const d = new Date(expDate);
  const month = (d.getUTCMonth() + 1).toString();
  const day = d.getUTCDate().toString();
  const year = d.getUTCFullYear().toString();
  return `${month}/${day}/${year}`;
}

/** Single-line mailing-style address for list UIs. */
export function formatOrganizationAddress(o: {
  street: string;
  city: string;
  state: string;
  zip: string;
}): string {
  const street = o.street.trim();
  const city = o.city.trim();
  const state = o.state.trim();
  const zip = o.zip.trim();
  const cityStateZip = [city, state].filter(Boolean).join(", ");
  const tail = [cityStateZip, zip].filter(Boolean).join(" ").trim();
  if (street && tail) return `${street}, ${tail}`;
  if (street) return street;
  return tail || "Address on file";
}

export function expirationFlagTone(expDate: Date): "green" | "yellow" | "red" {
  const hoursLeft = determineExpirationHours(expDate);
  if (hoursLeft < 72) return "red";
  if (hoursLeft > 168) return "green";
  return "yellow";
}
