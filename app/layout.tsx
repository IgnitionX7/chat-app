import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const viewport: Viewport = {
//   themeColor: "DodgerBlue",
// };
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#6b39b1", // Match manifest theme color
};

// export const metadata: Metadata = {
//   title: "Chat App",
//   description: "Shan's Chat App using Nextjs",
//   icons: [
//     { rel: "apple-touch-icon", url: "icon192.png" },
//     { rel: "icon", url: "icon192.png" },
//   ],
//   generator: "Next.js",
//   manifest: "/manifest.json",
//   authors: [{ name: "Shan Amin" }],
// };
export const metadata: Metadata = {
  title: "Chat App",
  description: "Shan's Chat App using Nextjs",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chat App",
  },
  icons: [
    { rel: "apple-touch-icon", sizes: "192x192", url: "/icon192.png" },
    { rel: "icon", sizes: "192x192", url: "/icon192.png" },
    { rel: "icon", sizes: "512x512", url: "/icon512.png" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider dynamic>
            <ConvexClientProvider>
              <TooltipProvider>
                <Toaster richColors />
                {children}
              </TooltipProvider>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
