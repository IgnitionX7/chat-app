"use client";

// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function RedirectToConversations() {
//   const router = useRouter();
//   const { isSignedIn, isLoaded } = useAuth();

//   useEffect(() => {
//     if (!isLoaded) return;

//     if (isSignedIn) {
//       router.replace("/conversations");
//     }
//   }, [router, isSignedIn, isLoaded]);

//   return null;
// }
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // not using next router as it was causing data fetching error
import { useEffect } from "react";
import LoadingLogo from "./shared/LoadingLogo";

export default function RedirectToConversations() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const redirect = async () => {
      try {
        if (isLoaded && isSignedIn === false) {
          window.location.href = "/";
        } else if (isLoaded && isSignedIn) {
          window.location.href = "/conversations";
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };

    redirect();
  }, [isLoaded, isSignedIn]);

  return <LoadingLogo />;
}
