"use client";

import { logout } from "@/lib/logout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import Link from "next/link";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email || "");
      }
    };

    getUser();
  }, []);

  return (
    <nav className="w-full bg-white/20 backdrop-blur-md border-b border-white/20 px-6 py-3 flex justify-between items-center text-white">
      {/* LEFT */}
      <Link href="/" className="text-xl font-semibold">
        Mission Board
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {userEmail && (
          <span className="text-sm opacity-80">
            {userEmail}
          </span>
        )}

        <button
          onClick={logout}
          className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 transition text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
