import { Suspense } from "react";

import { MealizeClerkSignIn } from "@/components/mealize/mealize-auth-clerk-forms";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Loading…
        </p>
      }
    >
      <MealizeClerkSignIn />
    </Suspense>
  );
}
