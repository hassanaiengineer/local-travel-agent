"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Bot, BusFront, MapPin, Sparkles } from "lucide-react";

import { BusCard } from "@/components/bus-card";
import { ChatInput } from "@/components/chat-input";
import { ChatWindow } from "@/components/chat-window";
import { FollowUpChips } from "@/components/follow-up-chips";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { SuggestedPrompts } from "@/components/suggested-prompts";
import { useChat } from "@/hooks/use-chat";

export function ChatPageClient() {
  const params = useSearchParams();
  const queryParam = params.get("q") || undefined;
  const { messages, loading, error, sendMessage, latestAssistant } = useChat(queryParam);

  useEffect(() => {
    if (queryParam) {
      void sendMessage(queryParam);
    }
    // Intentionally run once for initial query from URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-2.5 py-2.5 text-zinc-800 md:px-5 md:py-4">
      <header className="mb-2.5 flex items-center justify-between rounded-[22px] border border-zinc-200/60 bg-white/60 px-3.5 py-2.5 shadow-sm backdrop-blur-xl md:px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white">
            <BusFront className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[13px] font-normal text-zinc-900">Safar AI</p>
            <p className="text-[11px] font-normal text-zinc-500">Chalo ghar chalayin</p>
          </div>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-emerald-900/10 bg-emerald-50/70 px-3 py-1.5 text-[11px] font-normal text-emerald-800 sm:flex">
          <MapPin className="h-3.5 w-3.5" />
          Pakistan routes
        </div>
      </header>

      <section className="grid flex-1 gap-2.5 lg:grid-cols-[minmax(0,1fr)_376px]">
        <div className="flex min-h-[62svh] flex-col overflow-hidden rounded-[24px] border border-zinc-200/60 bg-white/52 shadow-sm backdrop-blur-xl lg:min-h-[calc(100svh-98px)]">
          <div className="border-b border-zinc-200/60 px-3 py-2.5 md:px-4">
            <SuggestedPrompts onSelect={sendMessage} compact />
          </div>

          <div className="flex-1 overflow-y-auto px-3.5 py-4 md:px-5">
            <ChatWindow messages={messages} loading={loading} />
            {latestAssistant?.result && <FollowUpChips onSelect={sendMessage} />}
            {error && (
              <p className="mt-3 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-3 py-2 text-[12px] leading-5 text-amber-800">
                {error}
              </p>
            )}
          </div>

          <div className="px-3 pb-3">
            <ChatInput onSubmit={sendMessage} loading={loading} />
          </div>
        </div>

        <aside className="overflow-hidden rounded-[24px] border border-zinc-200/60 bg-white/62 shadow-sm backdrop-blur-xl lg:sticky lg:top-4 lg:h-[calc(100svh-32px)]">
          <div className="border-b border-zinc-200/60 px-3.5 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-normal text-zinc-900">Bus options</h2>
                <p className="text-[11px] font-normal text-zinc-500">
                  {latestAssistant?.result
                    ? `${latestAssistant.result.options.length} live results`
                    : "Live options appear here"}
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="h-[38svh] space-y-2 overflow-y-auto p-2.5 lg:h-[calc(100%-65px)]">
            {loading && !latestAssistant?.result && <LoadingSkeleton />}
            {!latestAssistant?.result && !loading && (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-zinc-200/80 bg-white/44 p-6 text-center">
                <div>
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
                    <Bot className="h-4 w-4" />
                  </div>
                  <p className="text-[13px] font-normal leading-6 text-zinc-500">
                    Ask for a route to see fares, timings, and recommendations.
                  </p>
                </div>
              </div>
            )}
            {latestAssistant?.result?.options?.slice(0, 40).map((option, index) => (
              <BusCard
                key={`${option.option_id}-${index}`}
                option={option}
                recommendation={latestAssistant.result!.recommendation}
              />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
