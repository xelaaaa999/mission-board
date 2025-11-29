import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mission Board",
  description: "Collaborate on missions and ideas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#072042] text-white`}
      >
        {/* Navbar visible on all routes */}
        <Navbar />

        {/* Page content */}
        <main className="pt-4 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
