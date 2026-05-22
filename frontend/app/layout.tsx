import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safar AI - Pakistan Travel Assistant",
  description: "AI-powered bus travel search for Pakistan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
