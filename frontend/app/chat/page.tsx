import { Suspense } from "react";

import { ChatPageClient } from "@/components/chat-page-client";

export default function ChatPage() {
  return (
    <Suspense fallback={<main className="p-6 text-sm text-slate-600">Loading chat...</main>}>
      <ChatPageClient />
    </Suspense>
  );
}
