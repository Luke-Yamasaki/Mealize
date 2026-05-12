"use client";

import { SignIn, SignUp } from "@clerk/nextjs";

import { getMealizeClerkAuthAppearance } from "@/lib/mealize-clerk-auth-appearance";
import { useMealizeTheme } from "@/stores/mealize-ui-store";

export function MealizeClerkSignUp() {
  const { theme } = useMealizeTheme();
  return (
    <SignUp
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
      appearance={getMealizeClerkAuthAppearance(theme, "sign-up")}
    />
  );
}

export function MealizeClerkSignIn() {
  const { theme } = useMealizeTheme();
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      appearance={getMealizeClerkAuthAppearance(theme, "sign-in")}
    />
  );
}
