"use client";

import { BetterMissionCard } from "@/components/cards/BetterMissionCard";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function HomePage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN + SIGNUP HANDLER
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "signup") {
      // SIGNUP
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      alert("Signup successful! Check your email to confirm your account.");
      setMode("login");
      setLoading(false);
      return;
    }

    // LOGIN
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
      {/* LEFT: Description / Mission / Branding */}
      <div className="flex-1 flex flex-col justify-center items-start px-16 text-white space-y-10">
        <LogIn className="text-white" size={48} />
        <h1 className="text-4xl font-bold">Welcome to Mission Board</h1>

        <p className="text-gray-300 text-lg max-w-lg">
          Manage your side projects, collaborate with others, and evolve ideas
          into fully working products.  
          Mission Board helps founders and builders stay aligned through clean
          cards, feedback, and execution.
        </p>

        {/* Example Mission Card Preview */}
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
              { id: 2, text: "Verify your email address", done: false },
              { id: 3, text: "Login to your new account", done: false },
              { id: 4, text: "Start building your first project!", done: false },
            ]}
            tags={["Free", "New User", "High Priority"]}
            owner="You"
            updatedAt="Just now"
          />
        </div>
      </div>

      {/* RIGHT: Auth Panel */}
      <div className="flex-1 flex justify-center items-center bg-white/10 backdrop-blur-md p-10">
        <div className="bg-white/90 backdrop-blur-lg border border-gray-200 p-8 rounded-xl w-full max-w-md shadow-xl">

          <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
            {mode === "login" ? "Login to Continue" : "Create an Account"}
          </h2>

          {error && (
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
              {loading
                ? mode === "login"
                  ? "Logging in..."
                  : "Signing up..."
                : mode === "login"
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

          {/* SWITCH MODE */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            {mode === "login" ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
