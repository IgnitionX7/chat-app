/** @type {import('next').NextConfig} */
const config = {
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
};

export default config;
