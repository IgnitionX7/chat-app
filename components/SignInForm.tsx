import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export default function SignInForm() {
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto">
      <p className="text-center text-xl font-semibold py-6">
        Real-Time Chat App, Please Login
      </p>
      <SignInButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}
