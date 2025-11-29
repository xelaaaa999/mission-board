"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hide =
    pathname === "/login" || pathname === "/signup";

  if (hide) return null;

  return <Navbar />;
}
