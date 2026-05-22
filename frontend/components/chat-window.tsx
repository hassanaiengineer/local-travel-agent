import { Bot, UserRound } from "lucide-react";

import { ChatMessage } from "@/lib/types";

export function ChatWindow({ messages, loading }: { messages: ChatMessage[]; loading?: boolean }) {
  return (
    <div className="space-y-3.5">
      {messages.length === 0 && (
        <div className="mx-auto max-w-md py-8 text-center fade-in-up">
          <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white shadow-sm">
            <Bot className="h-4 w-4" />
          </div>
          <p className="text-[13px] font-normal leading-6 text-zinc-500">
            Safar ab AI ke sath. Bas message karo aur bus dhoondo.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
          <div className={message.role === "user" ? "flex max-w-[82%] flex-row-reverse gap-2" : "flex max-w-[84%] gap-2"}>
            <div
              className={
                message.role === "user"
                  ? "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white"
                  : "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-white"
              }
            >
              {message.role === "user" ? <UserRound className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
            </div>
            <div
              className={
                message.role === "user"
                  ? "rounded-[18px] bg-zinc-900 px-3.5 py-2.5 text-[13px] font-normal leading-6 text-white shadow-sm"
                  : "rounded-[18px] border border-zinc-200/70 bg-white/84 px-3.5 py-2.5 text-[13px] font-normal leading-6 text-zinc-700 shadow-sm"
              }
            >
              {message.text || (loading && message.role === "assistant" ? <TypingDots /> : null)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
    </span>
  );
}
