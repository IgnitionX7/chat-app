/** @type {import('next').NextConfig} */
import withPWA from "@ducanh2912/next-pwa";

const config = withPWA({
  dest: "public",
  register: true,
  workboxOptions: {
    skipWaiting: true,
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.clerk\.com\/.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "clerk-auth",
          networkTimeoutSeconds: 10,
        },
      },
    ],
  },
  disable: process.env.NODE_ENV === "development",
})({
  typescript: {
    // ⚠️ Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.uploadthing.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "uploadthing-prod.b-cdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh", // This will match all subdomains like 8fjp8g7qup.ufs.sh
        pathname: "/**",
      },
    ],
  },
});

export default config;
