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
      className="sticky bottom-2 z-20 rounded-[22px] border border-zinc-200/70 bg-white/88 p-1.5 shadow-[0_18px_60px_rgba(39,39,42,0.11)] backdrop-blur-xl"
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
          className="max-h-24 min-h-11 w-full resize-none rounded-2xl border-0 bg-transparent px-3 py-2.5 text-[14px] font-normal leading-6 text-zinc-800 outline-none placeholder:text-zinc-400"
        />
        <Button
          type="submit"
          disabled={loading || value.trim().length < 3}
          className="mb-0.5 h-9 w-9 shrink-0 rounded-full p-0"
          aria-label="Send message"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
