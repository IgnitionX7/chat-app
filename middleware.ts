// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/",
//   "/conversations(.*)",
//   // Exclude uploadthing API route
//   // ,
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//     // Only run on API routes except uploadthing
//     // "/(api(?!/uploadthing))(.*)",
//   ],
// };
// // -------------------------------
// // import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // // Define protected routes without the negative lookahead
// // const isProtectedRoute = createRouteMatcher(["/", "/conversations(.*)"]);

// // export default clerkMiddleware(async (auth, req) => {
// //   if (isProtectedRoute(req)) {
// //     await auth.protect();
// //   }
// // });

// // export const config = {
// //   matcher: [
// //     // Protected routes
// //     "/",
// //     "/conversations/:path*",

// //     // API routes except uploadthing
// //     "/(api(?!/uploadthing))(.*)",

// //     // Skip files and Next.js internals
// //     "/((?!_next|api/uploadthing|.*\\.[\\w]+$).*)",
// //   ],
// // };
// --------------------------------
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Add PWA-related paths that should be public
const publicPaths = [
  "/manifest.json",
  "/icon192.png",
  "/icon512.png",
  "/icon192_maskable.png",
  "/icon512_maskable.png",
  "/sw.js",
  "/workbox-*.js",
];

const isPublicPath = (path: string) => {
  return publicPaths.some(
    (publicPath) =>
      path.startsWith(publicPath) || path.match(publicPath.replace("*", ".*")),
  );
};

const isProtectedRoute = createRouteMatcher(["/", "/conversations(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicPath(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(css|js|json|png|jpg|ico|svg)).*)",
    // Include API routes
    "/(api|trpc)(.*)",
  ],
};
