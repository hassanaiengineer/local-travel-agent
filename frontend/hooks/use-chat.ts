"use client";

import { useMemo, useRef, useState } from "react";

import { streamTravel } from "@/lib/api";
import { ChatMessage, SearchResponse } from "@/lib/types";

export function useChat(initialQuery?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestResultRef = useRef<SearchResponse | null>(null);

  const buildBackendQuery = (query: string) => {
    const latestResult = latestResultRef.current;
    if (!latestResult) return query;

    const parsed = latestResult.parsed_query;
    return [
      `User follow-up: ${query}`,
      "Previous successful search context:",
      `origin: ${parsed.origin}`,
      `destination: ${parsed.destination}`,
      `date: ${parsed.date}`,
      `time_preference: ${parsed.time_preference}`,
      "Use this previous context when the follow-up omits route or date.",
    ].join("\n");
  };

  const sendMessage = async (query: string) => {
    if (loading) return;
    const backendQuery = buildBackendQuery(query);
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: query,
    };
    const assistantMsgId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantMsgId, role: "assistant", text: "" },
    ]);
    setLoading(true);
    setError(null);

    try {
      const result = await streamTravel(
        backendQuery,
        (status) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, text: status } : msg)),
          );
        },
        (token) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, text: msg.text + token } : msg)),
          );
        },
      );

      latestResultRef.current = result;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                text: result.recommendation.summary,
                result,
              }
            : msg,
        ),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? { ...msg, text: msg.text.trim() || message }
            : msg,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const latestAssistant = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant" && message.result),
    [messages],
  );

  return { messages, loading, error, sendMessage, latestAssistant, initialQuery };
}
