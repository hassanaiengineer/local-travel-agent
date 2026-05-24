"use client";

import { FormEvent, useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";

export function ChatInput({ onSubmit, loading }: { onSubmit: (query: string) => Promise<void>; loading: boolean }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;
    await onSubmit(query);
    setValue("");
  };

  const canSubmit = !loading && value.trim().length >= 3;

  return (
    <div className="relative">
      {/* Gradient glow ring on focus */}
      <div
        className={`pointer-events-none absolute -inset-[1.5px] rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 blur-[6px] transition-opacity duration-300 ${
          focused ? "opacity-60" : ""
        }`}
      />
      <form
        onSubmit={handleSubmit}
        className={`relative overflow-hidden rounded-2xl border bg-white/95 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-200 ${
          focused ? "border-emerald-300/80" : "border-gray-200/80"
        }`}
      >
        <div className="flex items-end gap-2 p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600">
              <Sparkles className="h-3.5 w-3.5" />
              {loading && (
                <span className="absolute inset-0 animate-ping rounded-lg bg-emerald-300/40" />
              )}
            </div>
          </div>
          <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Lahore to Multan tomorrow morning…"
            rows={1}
            className="max-h-28 min-h-10 w-full resize-none bg-transparent py-2.5 text-[14px] leading-6 tracking-tight text-gray-800 outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            aria-label="Send message"
            className={`mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
              canSubmit
                ? "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.55)] active:translate-y-0"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>
        {loading && (
          <div className="h-0.5 w-full overflow-hidden bg-gray-100">
            <div className="h-full animate-[loading_1.2s_ease-in-out_infinite] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-[length:200%_100%]" />
          </div>
        )}
      </form>
      <p className="mt-1.5 px-1 text-[10.5px] tracking-tight text-gray-400">
        <span className="font-medium text-gray-500">Enter</span> to send ·{" "}
        <span className="font-medium text-gray-500">Shift + Enter</span> for new line
      </p>
    </div>
  );
}
