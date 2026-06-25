import { Suspense } from "react";

import { MealizeClerkSignUp } from "@/components/mealize/mealize-auth-clerk-forms";

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Loading…
        </p>
      }
    >
      <MealizeClerkSignUp />
    </Suspense>
  );
}
