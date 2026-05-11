import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center p-6">
      <SignUp />
    </div>
  );
}
