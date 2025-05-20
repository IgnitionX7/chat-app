"use client";

import { Authenticated, Unauthenticated } from "convex/react";

import SignInForm from "@/components/SignInForm";
import RedirectToConversations from "@/components/RedirectToConversations";

export default function Home() {
  return (
    <>
      <main>
        <Authenticated>
          <RedirectToConversations />
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}
