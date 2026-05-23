"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Bot, BusFront, MapPin, Sparkles, Zap } from "lucide-react";

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
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-2.5 py-2.5 md:px-5 md:py-4">
      {/* Header */}
      <header className="mb-2.5 flex items-center justify-between rounded-2xl border border-white/90 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25">
            <BusFront className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-gray-900">Safar AI</p>
            <p className="text-[11px] text-gray-500">Chalo ghar chalayin</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {latestAssistant?.result && (
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-700 sm:flex">
              <Zap className="h-3 w-3" />
              {latestAssistant.result.options.length} results found
            </div>
          )}
          <div className="hidden items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-medium text-gray-500 sm:flex">
            <MapPin className="h-3 w-3" />
            Pakistan routes
          </div>
        </div>
      </header>

      <section className="grid flex-1 gap-2.5 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Chat panel */}
        <div className="flex min-h-[62svh] flex-col overflow-hidden rounded-2xl border border-white/90 bg-white/70 shadow-sm backdrop-blur-xl lg:min-h-[calc(100svh-98px)]">
          <div className="border-b border-gray-100 px-3 py-2.5 md:px-4">
            <SuggestedPrompts onSelect={sendMessage} compact />
          </div>

          <div className="flex-1 overflow-y-auto px-3.5 py-4 md:px-5">
            <ChatWindow messages={messages} loading={loading} />
            {latestAssistant?.result && <FollowUpChips onSelect={sendMessage} />}
            {error && (
              <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                <p className="text-[12px] leading-5 text-amber-800">{error}</p>
              </div>
            )}
          </div>

          <div className="px-3 pb-3">
            <ChatInput onSubmit={sendMessage} loading={loading} />
          </div>
        </div>

        {/* Results sidebar */}
        <aside className="overflow-hidden rounded-2xl border border-white/90 bg-white/70 shadow-sm backdrop-blur-xl lg:sticky lg:top-4 lg:h-[calc(100svh-32px)]">
          <div className="border-b border-gray-100 px-4 py-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-semibold text-gray-900">Bus options</h2>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  {latestAssistant?.result
                    ? `${latestAssistant.result.options.length} live results`
                    : "Live options appear here"}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="h-[38svh] space-y-2 overflow-y-auto p-2.5 lg:h-[calc(100%-65px)]">
            {loading && !latestAssistant?.result && <LoadingSkeleton />}

            {!latestAssistant?.result && !loading && (
              <div className="h-full rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-5">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                      <Bot className="h-5 w-5" />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">Your options will appear here</p>
                    <p className="mt-1.5 text-[12px] leading-5 text-gray-500">
                      Compare departure times, duration, fare, and AI recommendations in one place.
                    </p>
                  </div>
                  <div className="mt-5 space-y-2">
                    {[
                      { label: "Best value", color: "bg-amber-100 text-amber-600" },
                      { label: "Cheapest fare", color: "bg-emerald-100 text-emerald-600" },
                      { label: "Fastest route", color: "bg-blue-100 text-blue-600" },
                    ].map(({ label, color }) => (
                      <div key={label} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-3 py-2.5">
                        <span className="text-[12px] font-medium text-gray-700">{label}</span>
                        <span className={`h-1.5 w-12 rounded-full ${color.split(" ")[0]}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {loading && latestAssistant?.result && (
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex items-center gap-3 text-[12px] text-gray-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Zap className="h-4 w-4" />
                  </div>
                  Refreshing live options…
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
