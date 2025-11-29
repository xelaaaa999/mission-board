"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else window.location.href = "/dashboard"; // redirect to home after login

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#072042] flex justify-center items-center">
      <div className="bg-white/90 backdrop-blur-lg border border-gray-200 p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
          Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          className="w-full border rounded-md p-3 mb-3 text-gray-900 placeholder-gray-500"
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border rounded-md p-3 mb-3 text-gray-900 placeholder-gray-500"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
