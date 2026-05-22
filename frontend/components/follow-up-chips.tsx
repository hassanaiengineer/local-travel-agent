"use client";

import { Sparkles } from "lucide-react";

const FOLLOW_UPS = ["show cheapest", "morning buses", "fastest option", "business class", "return tomorrow"];

export function FollowUpChips({ onSelect }: { onSelect: (prompt: string) => Promise<void> }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2.5 fade-in-up">
      <span className="inline-flex items-center gap-1 text-[11px] font-normal text-zinc-500">
        <Sparkles className="h-3 w-3" />
        Try next
      </span>
      {FOLLOW_UPS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-zinc-200/70 bg-white/66 px-3 py-1.5 text-[11px] font-normal text-zinc-600 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:text-emerald-800"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
