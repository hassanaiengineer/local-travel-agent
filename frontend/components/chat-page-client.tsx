"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Bot, BusFront, MapPin } from "lucide-react";

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
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-3 py-3 md:px-5 md:py-5">
      <header className="mb-3 flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950 text-white">
            <BusFront className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-950">AI Bus Assistant</p>
            <p className="text-xs text-slate-500">Chalo ghar chalayin</p>
          </div>
        </div>
        <div className="hidden items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800 sm:flex">
          <MapPin className="h-3.5 w-3.5" />
          Pakistan routes
        </div>
      </header>

      <section className="grid flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="flex min-h-[calc(100vh-116px)] flex-col rounded-2xl border border-white/70 bg-white/55 shadow-sm backdrop-blur">
          <div className="border-b border-slate-200/70 px-4 py-3">
            <SuggestedPrompts onSelect={sendMessage} compact />
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <ChatWindow messages={messages} loading={loading} />
            {latestAssistant?.result && <FollowUpChips onSelect={sendMessage} />}
            {error && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">{error}</p>}
          </div>

          <div className="px-3 pb-3">
            <ChatInput onSubmit={sendMessage} loading={loading} />
          </div>
        </div>

        <aside className="rounded-2xl border border-white/70 bg-white/65 shadow-sm backdrop-blur lg:sticky lg:top-5 lg:h-[calc(100vh-40px)]">
          <div className="border-b border-slate-200/70 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-slate-950">Bus Options</h2>
                <p className="text-xs text-slate-500">
                  {latestAssistant?.result
                    ? `${latestAssistant.result.options.length} live results`
                    : "Live options appear here"}
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">
                <Bot className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="h-[48vh] space-y-2 overflow-y-auto p-3 lg:h-[calc(100%-73px)]">
            {loading && !latestAssistant?.result && <LoadingSkeleton />}
            {!latestAssistant?.result && !loading && (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50 p-6 text-center text-sm text-slate-500">
                Ask for a route to see compact fares, timings, and recommendations.
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
