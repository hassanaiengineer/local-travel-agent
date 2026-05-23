"use client";

import { FormEvent, useState } from "react";
import { SendHorizontal } from "lucide-react";

export function ChatInput({ onSubmit, loading }: { onSubmit: (query: string) => Promise<void>; loading: boolean }) {
  const [value, setValue] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;
    await onSubmit(query);
    setValue("");
  };

  const canSubmit = !loading && value.trim().length >= 3;

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-2 z-20 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl"
    >
      <div className="flex items-end gap-2 p-2">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Lahore to Multan tomorrow morning…"
          rows={1}
          className="max-h-28 min-h-10 w-full resize-none bg-transparent px-3 py-2.5 text-[14px] leading-6 text-gray-800 outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!canSubmit}
          aria-label="Send message"
          className={`mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
            canSubmit
              ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>
      {loading && (
        <div className="h-0.5 w-full overflow-hidden bg-gray-100">
          <div className="h-full animate-[loading_1.2s_ease-in-out_infinite] bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-[length:200%_100%]" />
        </div>
      )}
    </form>
  );
}
