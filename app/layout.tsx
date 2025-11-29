import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import React from "react";

export const metadata = {
  title: "Mission Board",
  description: "A task collaboration app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
