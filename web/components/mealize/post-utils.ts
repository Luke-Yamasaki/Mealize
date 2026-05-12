export function determineExpirationHours(expDate: Date) {
  const today = new Date();
  const expiration = new Date(expDate);
  return Math.floor((expiration.getTime() - today.getTime()) / 1000 / 60 / 60);
}

export function daysAgoLabel(post: {
  createdAt: Date;
  updatedAt: Date;
}) {
  if (post.updatedAt.getTime() !== post.createdAt.getTime()) {
    const ms = post.updatedAt.getTime() - post.createdAt.getTime();
    const daysPassed = Math.floor(ms / 1000 / 60 / 60 / 24);
    const hoursPassed = Math.floor(ms / 1000 / 60 / 60);
    if (daysPassed >= 1) return `${daysPassed}d`;
    if (hoursPassed >= 1) return `${hoursPassed}h`;
    return "now";
  }
  const today = new Date();
  const postDate = post.updatedAt ?? post.createdAt;
  const ms = today.getTime() - postDate.getTime();
  const daysPassed = Math.floor(ms / 1000 / 60 / 60 / 24);
  const hoursPassed = Math.floor(ms / 1000 / 60 / 60);
  if (daysPassed >= 1) return `${daysPassed}d`;
  if (hoursPassed >= 1) return `${hoursPassed}h`;
  return "now";
}

export function formatExpDate(expDate: Date) {
  const d = new Date(expDate);
  const month = (d.getUTCMonth() + 1).toString();
  const day = d.getUTCDate().toString();
  const year = d.getUTCFullYear().toString();
  return `${month}/${day}/${year}`;
}

export function expirationFlagTone(expDate: Date): "green" | "yellow" | "red" {
  const hoursLeft = determineExpirationHours(expDate);
  if (hoursLeft < 72) return "red";
  if (hoursLeft > 168) return "green";
  return "yellow";
}
