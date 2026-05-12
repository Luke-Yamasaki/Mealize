import Link from "next/link";

import { MealizeChrome } from "@/components/mealize/mealize-chrome";

/** Root 404 — outside `(mealize)` layout; wraps same chrome as legacy catch-all. */
export default function NotFound() {
  return (
    <MealizeChrome>
      <div className="mealize-notFound">
        <p className="mealize-notFound__title">404 Not found</p>
        <p className="mealize-notFound__hint">The page you requested does not exist.</p>
        <Link href="/" className="mealize-notFound__link">
          Back to home
        </Link>
      </div>
    </MealizeChrome>
  );
}
