import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

import { mealizeClerkAuthAppearance } from "@/lib/mealize-clerk-auth-appearance";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <p className="text-sm text-[#4a756c]" aria-live="polite">
          Loading…
        </p>
      }
    >
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        appearance={mealizeClerkAuthAppearance}
      />
    </Suspense>
  );
}
