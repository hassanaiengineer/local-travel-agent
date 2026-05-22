import { Bot, Clock3, Route, UserRound, WalletCards } from "lucide-react";

import { ChatMessage } from "@/lib/types";

const EMPTY_SUGGESTIONS = [
  { label: "Route", text: "Lahore to Multan tomorrow", Icon: Route },
  { label: "Budget", text: "show cheapest option", Icon: WalletCards },
  { label: "Time", text: "morning buses only", Icon: Clock3 },
];

export function ChatWindow({ messages, loading }: { messages: ChatMessage[]; loading?: boolean }) {
  return (
    <div className="space-y-3.5">
      {messages.length === 0 && (
        <div className="mx-auto w-full max-w-2xl py-6 fade-in-up">
          <div className="mb-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white shadow-sm">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[15px] font-medium text-zinc-900">Where are we going?</p>
              <p className="mt-1 max-w-md text-[13px] font-normal leading-6 text-zinc-600">
                Safar ab AI ke sath. Ask in English, Urdu, or Roman Urdu and I will find practical bus options.
              </p>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            {EMPTY_SUGGESTIONS.map(({ label, text, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-zinc-200/70 bg-white/72 p-2.5 shadow-sm md:block md:p-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 md:mb-2">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-normal text-zinc-500">{label}</p>
                  <p className="text-[12px] font-normal leading-5 text-zinc-700 md:mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
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
