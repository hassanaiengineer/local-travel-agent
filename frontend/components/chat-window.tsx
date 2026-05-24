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
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)]">
              <Bot className="h-4.5 w-4.5" />
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent" />
            </div>
            <div>
              <p className="text-[18px] font-semibold tracking-tight text-gray-900">
                Where are we going<span className="gradient-text">?</span>
              </p>
              <p className="mt-1.5 max-w-md text-[13px] leading-6 text-gray-500">
                Safar ab <span className="font-semibold gradient-text">AI</span> ke sath. Ask in English, Urdu, or Roman Urdu — I&apos;ll find the best bus options for your journey.
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-3">
            {EMPTY_SUGGESTIONS.map(({ label, text, Icon }) => (
              <div
                key={label}
                className="group flex items-center gap-3 rounded-2xl border border-gray-100/80 bg-white/80 p-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200/80 hover:shadow-[0_8px_24px_rgba(16,185,129,0.10)] md:block md:p-3.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 text-gray-500 transition-colors group-hover:from-emerald-50 group-hover:to-teal-50 group-hover:text-emerald-600 md:mb-2.5">
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
                  ? "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-950 text-white shadow-[0_2px_8px_rgba(15,23,42,0.25)]"
                  : "relative mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-[0_2px_10px_rgba(16,185,129,0.35)]"
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
                  ? "rounded-[20px] rounded-br-sm bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-2.5 text-[13px] leading-6 tracking-tight text-white shadow-[0_4px_16px_rgba(15,23,42,0.15)]"
                  : "rounded-[20px] rounded-bl-sm border border-gray-100/80 bg-white/95 px-4 py-3 text-[13px] leading-6 tracking-tight text-gray-700 shadow-[0_2px_12px_rgba(15,23,42,0.05)] backdrop-blur-sm"
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
      <span className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 [animation-delay:-0.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-br from-emerald-400 to-teal-500" />
    </span>
  );
}
