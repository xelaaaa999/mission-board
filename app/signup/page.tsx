"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    else alert("Check your email for confirmation!");

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#072042] flex justify-center items-center">
      <div className="bg-white/90 backdrop-blur-lg border border-gray-200 p-8 rounded-xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
          Create Account
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
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
