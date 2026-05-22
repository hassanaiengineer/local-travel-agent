import { SearchResponse } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function errorMessage(response: Response) {
  try {
    const data = await response.json();
    return data.detail || data.error || "Search failed";
  } catch {
    return (await response.text()) || "Search failed";
  }
}

export async function searchTravel(query: string): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(await errorMessage(response));
  }

  return (await response.json()) as SearchResponse;
}

export async function streamTravel(
  query: string,
  onStatus: (text: string) => void,
  onToken: (text: string) => void,
): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, stream: true }),
  });

  if (!response.ok || !response.body) {
    throw new Error("Streaming request failed");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() || "";

    for (const rawEvent of events) {
      const lines = rawEvent.split("\n");
      const eventType = lines.find((line) => line.startsWith("event:"))?.replace("event:", "").trim();
      const dataLine = lines.find((line) => line.startsWith("data:"));
      if (!dataLine) continue;

      const json = dataLine.replace("data:", "").trim();
      const data = JSON.parse(json);

      if (eventType === "status") onStatus(data.message);
      if (eventType === "token") onToken(data.text);
      if (eventType === "done") return data as SearchResponse;
      if (eventType === "error") throw new Error(data.error || "I need a little more detail to search.");
    }
  }

  throw new Error("Stream ended before final response");
}
