"use client";

import React, { useState } from "react";
import { CardBase } from "./CardBase";

interface MissionCardProps {
  mode?: "mission"; // default internal mode for now
}

export const MissionCard = ({ mode = "mission" }: MissionCardProps) => {
  // Local state for MVP (later replaced with DB)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [criteria, setCriteria] = useState("");

  return (
    <CardBase>
      <div className="space-y-3">

        <input
          className="w-full border rounded-md p-2 text-gray-900 placeholder-gray-900"
          placeholder="Mission title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border rounded-md p-2 text-gray-900 placeholder-gray-900"
          placeholder="Mission description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <textarea
          className="w-full border rounded-md p-2 text-gray-900 placeholder-gray-900"
          placeholder="Acceptance criteria..."
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          rows={2}
        />

        <button className="bg-blue-200 text-[#0C2B4E] px-4 py-2 rounded-md">
          Save Mission
        </button>
      </div>
    </CardBase>
  );
};
