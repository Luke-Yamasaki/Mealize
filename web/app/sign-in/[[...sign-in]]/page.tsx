import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center p-6">
      <Suspense fallback={<p className="text-sm text-zinc-600">Loading…</p>}>
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </Suspense>
    </div>
  );
}
