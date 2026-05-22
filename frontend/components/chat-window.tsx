import { Bot, UserRound } from "lucide-react";

import { ChatMessage } from "@/lib/types";

export function ChatWindow({ messages, loading }: { messages: ChatMessage[]; loading?: boolean }) {
  return (
    <div className="space-y-4">
      {messages.length === 0 && (
        <div className="mx-auto max-w-xl py-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950 text-white shadow-sm">
            <Bot className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-500">Safar ab AI ke sath. Bas message karo aur bus dhoondo.</p>
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
          <div className={message.role === "user" ? "flex max-w-[86%] flex-row-reverse gap-2" : "flex max-w-[90%] gap-2"}>
            <div
              className={
                message.role === "user"
                  ? "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white"
                  : "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-950 text-white"
              }
            >
              {message.role === "user" ? <UserRound className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>
            <div
              className={
                message.role === "user"
                  ? "rounded-[1.1rem] bg-slate-900 px-4 py-2.5 text-sm leading-6 text-white shadow-sm"
                  : "rounded-[1.1rem] border border-slate-200 bg-white/90 px-4 py-2.5 text-sm leading-6 text-slate-800 shadow-sm"
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
