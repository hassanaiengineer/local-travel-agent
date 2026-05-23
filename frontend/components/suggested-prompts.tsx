"use client";

const PROMPTS = [
  "Lahore to Multan tomorrow",
  "Cheapest bus Lahore → Islamabad",
  "Morning buses from Lahore to Karachi",
  "kal Lahore se Multan ki sasti bus",
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
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className={
            compact
              ? "rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-gray-500 shadow-sm transition-all duration-150 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              : "rounded-full border border-gray-200 bg-white px-3.5 py-2 text-[12px] font-medium text-gray-600 shadow-sm transition-all duration-150 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          }
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
