// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/",
//   "/conversations(.*)",
//   // Exclude uploadthing API route
//   "(?!/api/uploadthing).*",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     // "/(api|trpc)(.*)",
//     // Only run on API routes except uploadthing
//     "/(api(?!/uploadthing))(.*)",
//   ],
// };
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes without the negative lookahead
const isProtectedRoute = createRouteMatcher(["/", "/conversations(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Protected routes
    "/",
    "/conversations/:path*",

    // API routes except uploadthing
    "/(api(?!/uploadthing))(.*)",

    // Skip files and Next.js internals
    "/((?!_next|api/uploadthing|.*\\.[\\w]+$).*)",
  ],
};
