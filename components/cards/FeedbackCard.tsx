"use client";

import React, { useState } from "react";
import { CardBase } from "./CardBase";

export const FeedbackCard = () => {
  const [problem, setProblem] = useState("");
  const [rationale, setRationale] = useState("");
  const [suggestion, setSuggestion] = useState("");

  return (
    <CardBase>
      <div className="space-y-3">

        <textarea
          className="w-full border rounded-md p-2 text-gray-900 placeholder-gray-900"
          placeholder="What is the problem?"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={2}
        />

        <textarea
          className="w-full border rounded-md p-2 text-gray-900 placeholder-gray-900"
          placeholder="Why do you think this matters?"
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          rows={2}
        />

        <textarea
          className="w-full border rounded-md p-2 text-gray-900 placeholder-gray-900"
          placeholder="Any suggestion or alternative?"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows={2}
        />

        <button className="bg-blue-200 text-[#0C2B4E] px-4 py-2 rounded-md">
          Submit Feedback
        </button>
      </div>
    </CardBase>
  );
};
