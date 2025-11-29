"use client";

import { BetterMissionCard } from "@/components/cards/BetterMissionCard";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseclient";
import clsx from "clsx";

export default function HomePage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // AUTH HANDLER
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      alert("Signup successful! Please verify your email.");
      setMode("login");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#072042] flex">
      {/* LEFT SECTION */}
      <div className="flex-1 flex flex-col justify-center items-start px-16 text-white space-y-10">
        <LogIn className="text-white" size={48} />
        <h1 className="text-4xl font-bold">Welcome to Mission Board</h1>

        <p className="text-gray-300 text-lg max-w-lg">
          Manage your side projects, collaborate with others, and evolve ideas
          into fully working products. Mission Board helps founders and builders
          stay aligned through clean cards, feedback, and execution.
        </p>

        <div className="mt-10 max-w-md">
          <BetterMissionCard
            title="Get Started on Our Platform"
            description="Follow these quick steps to create your account and explore all our features!"
            criteria={[
              "Account is successfully created",
              "User is logged in and session is secure",
              "Dashboard is accessible",
            ]}
            subtasks={[
              { id: 1, text: "Create your account (Sign Up)", done: true },
              { id: 2, text: "Verify your email address", done: true },
              { id: 3, text: "Login to your new account", done: false },
              { id: 4, text: "Start building your first project!", done: false },
            ]}
            tags={["Free", "New User", "High Priority"]}
            owner="You"
            updatedAt="Just now"
          />
        </div>
      </div>

      {/* RIGHT PANEL — FIXED WIDTH (IMPORTANT!) */}
      <div className="w-full max-w-md flex justify-center items-center bg-white/10 backdrop-blur-md p-10">
        <div className="relative overflow-hidden w-full">

          {/* SLIDING CONTAINER — 200% WIDTH */}
          <div
            className={clsx(
              "flex transition-transform duration-500 w-[200%]",
              mode === "login" ? "translate-x-0" : "-translate-x-1/2"
            )}
          >

            {/* LOGIN PANEL */}
            <div className="w-1/2 bg-white/90 backdrop-blur-lg border border-gray-200 p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
                Login to Continue
              </h2>

              {error && mode === "login" && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleAuth}>
                <input
                  className="w-full border rounded-md p-3 mb-3 text-gray-900 placeholder-gray-500"
                  type="email"
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />

                <input
                  className="w-full border rounded-md p-3 mb-3 text-gray-900 placeholder-gray-500"
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-4 text-center">
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                  }}
                >
                  Sign Up
                </span>
              </p>
            </div>

            {/* SIGNUP PANEL */}
            <div className="w-1/2 bg-white/90 backdrop-blur-lg border border-gray-200 p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
                Create an Account
              </h2>

              {error && mode === "signup" && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleAuth}>
                <input
                  className="w-full border rounded-md p-3 mb-3 text-gray-900 placeholder-gray-500"
                  type="email"
                  placeholder="Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />

                <input
                  className="w-full border rounded-md p-3 mb-3 text-gray-900 placeholder-gray-500"
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-4 text-center">
                Already have an account?{" "}
                <span
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
