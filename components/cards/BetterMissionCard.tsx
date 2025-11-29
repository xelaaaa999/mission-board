"use client";

import { useState } from "react";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  GripVertical,
  User,
  Clock
} from "lucide-react";

interface Subtask {
  id: number;
  text: string;
  done: boolean;
}

interface MissionCardProps {
  title: string;
  description: string;
  criteria: string[];
  subtasks: Subtask[];
  tags: string[];
  owner: string;
  updatedAt: string;
}

export function BetterMissionCard({
  title,
  description,
  criteria,
  subtasks,
  tags,
  owner,
  updatedAt,
}: MissionCardProps) {
  const [open, setOpen] = useState(false);

  const completed = subtasks.filter((t) => t.done).length;
  const total = subtasks.length;

  return (
    <div
      className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl 
      p-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Clickable top area (opens card) */}
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={() => {
          if (!open) setOpen(true); // Only open on click
        }}
      >
        <div className="flex items-center gap-2">
          <GripVertical size={20} className="text-gray-400" />

          <h2 className="text-xl font-semibold text-gray-900 leading-tight">
            {title}
          </h2>
        </div>

        {/* Chevron only closes */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent opening/closing from parent click
            setOpen(!open);
          }}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <div
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={22} />
          </div>
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3 cursor-pointer"
        onClick={() => !open && setOpen(true)}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-medium shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Progress */}
      <div
        className="mt-3 text-sm text-gray-600 flex items-center gap-2 cursor-pointer"
        onClick={() => !open && setOpen(true)}
      >
        <CheckCircle size={16} className="text-green-500" />
        {completed}/{total} complete
      </div>

      {/* Owner + Time */}
      <div
        className="mt-1 text-xs text-gray-500 flex items-center gap-4 cursor-pointer"
        onClick={() => !open && setOpen(true)}
      >
        <span className="flex items-center gap-1">
          <User size={14} className="text-purple-600" />
          {owner}
        </span>

        <span className="flex items-center gap-1">
          <Clock size={14} className="text-gray-500" />
          {updatedAt}
        </span>
      </div>

      {/* Expanded Section */}
      {open && (
        <div
          className="mt-5 border-t border-gray-200 pt-5 animate-fadeIn"
        >
          {/* Description */}
          <h3 className="text-sm font-semibold text-gray-800">Description</h3>
          <p className="text-gray-700 text-sm mt-1 leading-relaxed">
            {description}
          </p>

          {/* Acceptance Criteria */}
          <h3 className="text-sm font-semibold text-gray-800 mt-5">
            Acceptance Criteria
          </h3>
          <ul className="list-disc ml-5 text-sm text-gray-700 mt-1 space-y-1">
            {criteria.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

          {/* Subtasks */}
          <h3 className="text-sm font-semibold text-gray-800 mt-5">Subtasks</h3>
          <div className="space-y-2 mt-2">
            {subtasks.map((task) => (
              <label
                key={task.id}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={task.done}
                  readOnly
                />
                {task.text}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
