import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iGaming Awards",
  description:
    "Awards website for the iGaming Afrika Summit Awards ceremony 2026",
  icons: {
    // Single icon approach (simplest)
    icon: "/iGaming-Logo-icon-2.webp",

    // OR for multiple sizes (better compatibility)
    // icon: [
    //   { url: "/favicon.ico" },
    //   { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
    //   { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    //   { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
    // ],

    // Apple touch icon for iOS devices
    // apple: "/apple-touch-icon.png",

    // For SVG icons
    // icon: "/icon.svg",
    // OR
    // icon: { url: "/icon.svg", type: "image/svg+xml" },

    // Shortcut icon (optional)
    // shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* You can also add additional meta tags here if needed */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
