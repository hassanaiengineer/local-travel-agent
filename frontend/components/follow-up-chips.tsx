"use client";

import { Sparkles } from "lucide-react";

const FOLLOW_UPS = ["show cheapest", "morning buses", "fastest option", "business class", "return tomorrow"];

export function FollowUpChips({ onSelect }: { onSelect: (prompt: string) => Promise<void> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-3 fade-in-up">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
        <Sparkles className="h-3 w-3 text-emerald-500" />
        Try next
      </span>
      {FOLLOW_UPS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium text-gray-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
