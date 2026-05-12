import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

import { mealizeClerkAuthAppearance } from "@/lib/mealize-clerk-auth-appearance";

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-[#4a756c]" aria-live="polite">
          Loading…
        </p>
      }
    >
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        appearance={mealizeClerkAuthAppearance}
      />
    </Suspense>
  );
}
