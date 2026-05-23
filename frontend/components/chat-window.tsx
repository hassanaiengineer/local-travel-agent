import { Bot, Clock3, Route, UserRound, WalletCards } from "lucide-react";

import { ChatMessage } from "@/lib/types";

const EMPTY_SUGGESTIONS = [
  { label: "Route", text: "Lahore to Multan tomorrow", Icon: Route },
  { label: "Budget", text: "show cheapest option", Icon: WalletCards },
  { label: "Time", text: "morning buses only", Icon: Clock3 },
];

export function ChatWindow({ messages, loading }: { messages: ChatMessage[]; loading?: boolean }) {
  return (
    <div className="space-y-4">
      {messages.length === 0 && (
        <div className="mx-auto w-full max-w-2xl py-6 fade-in-up">
          <div className="mb-6 flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[16px] font-semibold text-gray-900">Where are we going?</p>
              <p className="mt-1.5 max-w-md text-[13px] leading-6 text-gray-500">
                Safar ab AI ke sath. Ask in English, Urdu, or Roman Urdu — I&apos;ll find the best bus options for your journey.
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-3">
            {EMPTY_SUGGESTIONS.map(({ label, text, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm md:block md:p-3.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500 md:mb-2.5">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
                  <p className="mt-0.5 text-[12px] leading-5 text-gray-700">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} fade-in-up`}
        >
          <div className={`flex ${message.role === "user" ? "max-w-[82%] flex-row-reverse gap-2" : "max-w-[86%] gap-2.5"}`}>
            <div
              className={
                message.role === "user"
                  ? "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white"
                  : "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/20"
              }
            >
              {message.role === "user" ? (
                <UserRound className="h-3.5 w-3.5" />
              ) : (
                <Bot className="h-3.5 w-3.5" />
              )}
            </div>
            <div
              className={
                message.role === "user"
                  ? "rounded-[20px] rounded-br-sm bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-2.5 text-[13px] leading-6 text-white shadow-sm"
                  : "rounded-[20px] rounded-bl-sm border border-gray-100 bg-white px-4 py-3 text-[13px] leading-6 text-gray-700 shadow-sm"
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
    <span className="inline-flex items-center gap-1.5 py-0.5">
      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />
    </span>
  );
}
