import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Travel Assistant Pakistan",
  description: "Chat-based bus travel search for Pakistan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
