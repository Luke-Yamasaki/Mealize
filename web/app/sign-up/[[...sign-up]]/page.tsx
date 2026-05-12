import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center p-6">
      <Suspense fallback={<p className="text-sm text-zinc-600">Loading…</p>}>
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </Suspense>
    </div>
  );
}
