"use client";

import { Button } from "@/components/ui/button";

const PROMPTS = [
  "Lahore to Multan tomorrow",
  "Cheapest bus from Lahore to Islamabad tomorrow morning",
  "Morning buses from Lahore to Karachi",
  "kal Lahore se Multan ki sasti bus chahiye",
];

export function SuggestedPrompts({
  onSelect,
  compact = false,
}: {
  onSelect: (prompt: string) => Promise<void>;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROMPTS.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          className={compact ? "h-8 rounded-full px-3 text-[11px] font-normal" : "rounded-full text-xs font-normal"}
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </Button>
      ))}
    </div>
  );
}
