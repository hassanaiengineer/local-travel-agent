import Link from "next/link";
import { ArrowRight, BusFront, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const examples = [
    "Lahore to Multan tomorrow morning",
    "kal Lahore se Multan ki sasti bus",
    "Fastest bus from Multan to Lahore",
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="mx-auto grid min-h-[92vh] w-full max-w-6xl content-center gap-8 px-4 py-8 md:grid-cols-[1fr_420px] md:items-center md:px-6">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1.5 text-xs text-emerald-900 shadow-sm backdrop-blur">
            <BusFront className="h-3.5 w-3.5" />
            AI travel assistant for Pakistan
          </div>
          <h1 className="max-w-xl text-4xl font-medium leading-tight tracking-normal text-slate-950 md:text-6xl">
            Safar ab AI ke sath.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            Find buses instantly using natural language. Bas message karo aur route, fare, timing aur best option
            samajh lo.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/chat" className="inline-flex">
              <Button className="h-11 rounded-full px-5">
                Start searching <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/chat?q=Lahore%20to%20Multan%20tomorrow%20morning" className="inline-flex">
              <Button variant="outline" className="h-11 rounded-full px-5">
                Try live example
              </Button>
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {examples.map((example) => (
              <Link
                key={example}
                href={`/chat?q=${encodeURIComponent(example)}`}
                className="rounded-full border border-slate-200 bg-white/75 px-3 py-2 text-xs text-slate-600 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800"
              >
                {example}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/80 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Live assistant</p>
                <p className="text-sm font-medium text-slate-900">Karachi se Lahore? Ho jayega.</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950 text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="ml-auto w-fit max-w-[82%] rounded-2xl bg-slate-950 px-4 py-2.5 text-sm text-white">
                Lahore to Multan tomorrow morning
              </div>
              <div className="w-fit max-w-[88%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                Found morning options. Cheapest starts around PKR 2200, fastest takes about 5 hours.
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">Premium Plus</p>
                  <p className="text-xs text-slate-500">05:20 AM to 10:20 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-950">PKR 2300</p>
                  <p className="text-xs text-emerald-700">Recommended</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              Live schedules, AI recommendations, no account needed
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
