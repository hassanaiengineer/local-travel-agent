"use client";

import { FormEvent, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ChatInput({ onSubmit, loading }: { onSubmit: (query: string) => Promise<void>; loading: boolean }) {
  const [value, setValue] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;
    await onSubmit(query);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-3 z-20 rounded-[1.35rem] border border-white/70 bg-white/90 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl"
    >
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Lahore to Multan tomorrow morning..."
          className="max-h-28 min-h-12 w-full resize-none rounded-2xl border-0 bg-transparent px-3 py-3 text-[15px] leading-6 text-slate-900 outline-none placeholder:text-slate-400"
        />
        <Button
          type="submit"
          disabled={loading || value.trim().length < 3}
          className="mb-1 h-10 w-10 shrink-0 rounded-full p-0"
          aria-label="Send message"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
