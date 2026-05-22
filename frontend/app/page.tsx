import Link from "next/link";
import { ArrowRight, BusFront, CheckCircle2, Clock3, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const examples = [
    "Lahore to Multan tomorrow morning",
    "kal Lahore se Multan ki sasti bus",
    "Fastest bus from Multan to Lahore",
  ];
  const routes = [
    ["Lahore", "Multan", "from PKR 2200"],
    ["Multan", "Lahore", "5-6 hours"],
    ["Lahore", "Islamabad", "morning search"],
  ];

  return (
    <main className="min-h-screen overflow-hidden text-zinc-800">
      <section className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6">
        <nav className="mb-10 flex items-center justify-between rounded-[22px] border border-zinc-200/70 bg-white/70 px-3.5 py-2.5 shadow-sm backdrop-blur md:mb-14">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white">
              <BusFront className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-zinc-900">Safar AI</p>
              <p className="text-[11px] text-zinc-500">Pakistan travel assistant</p>
            </div>
          </div>
          <Link href="/chat">
            <Button variant="outline" className="h-9 px-3.5 text-[12px]">
              Open app
            </Button>
          </Link>
        </nav>

        <div className="grid min-h-[68svh] items-center gap-8 md:grid-cols-[minmax(0,1fr)_420px]">
          <div className="max-w-2xl fade-in-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/60 px-3 py-1.5 text-[12px] font-normal text-emerald-900 shadow-sm backdrop-blur">
            <BusFront className="h-3.5 w-3.5 text-emerald-700" />
            AI travel assistant for Pakistan
          </div>
          <h1 className="max-w-xl text-[38px] font-medium leading-[1.08] tracking-normal text-zinc-950 md:text-[56px]">
            Safar ab AI ke sath.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] font-normal leading-7 text-zinc-700 md:text-[16px]">
            Find bus timings, fares, and smarter recommendations by typing naturally. Bas message karo; route,
            timing aur best option samajh lo.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Link href="/chat" className="inline-flex">
              <Button className="h-11 min-w-36 px-5">
                Start searching <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/chat?q=Lahore%20to%20Multan%20tomorrow%20morning" className="inline-flex">
              <Button variant="outline" className="h-11 min-w-36 px-5">
                Try live example
              </Button>
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {examples.map((example) => (
              <Link
                key={example}
                href={`/chat?q=${encodeURIComponent(example)}`}
                className="rounded-full border border-zinc-200/80 bg-white/60 px-3 py-2 text-[12px] font-normal text-zinc-600 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:text-emerald-800"
              >
                {example}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-[12px] leading-5 text-zinc-600">
            {["Live schedules", "AI picks", "No signup"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
          </div>

          <div className="relative fade-in-up md:justify-self-end">
          <div className="soft-surface overflow-hidden rounded-[28px] p-4">
            <div className="mb-3 flex items-center justify-between px-1">
              <div>
                <p className="text-[12px] font-normal text-zinc-500">Live assistant</p>
                <p className="text-[14px] font-medium text-zinc-900">Karachi se Lahore? Ho jayega.</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="ml-auto w-fit max-w-[82%] rounded-2xl bg-zinc-900 px-3.5 py-2.5 text-[13px] font-normal leading-5 text-white shadow-sm">
                Lahore to Multan tomorrow morning
              </div>
              <div className="w-fit max-w-[90%] rounded-2xl border border-zinc-200/70 bg-white px-3.5 py-3 text-[13px] font-normal leading-6 text-zinc-700">
                Found morning options. Cheapest starts around PKR 2200; fastest takes about 5 hours.
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-3">
              <div className="flex items-center justify-between gap-3 border-b border-zinc-200/70 pb-2.5">
                <div>
                  <p className="text-[13px] font-medium text-zinc-900">Premium Plus</p>
                  <p className="text-[11px] text-zinc-500">05:20 AM to 10:20 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-medium text-zinc-900">PKR 2300</p>
                  <p className="text-[11px] text-emerald-700">Recommended</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2.5 text-[11px] text-zinc-500">
                <span>Cheapest</span>
                <span className="text-center">Fastest</span>
                <span className="text-right">Morning</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 px-1 text-[11px] text-zinc-500">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              Eid pe ghar jana asaan
            </div>
          </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {routes.map(([from, to, meta]) => (
            <Link
              key={`${from}-${to}`}
              href={`/chat?q=${encodeURIComponent(`${from} to ${to} tomorrow`)}`}
              className="group rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] text-emerald-800">Popular</span>
                <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:text-emerald-700" />
              </div>
              <p className="text-[14px] font-medium text-zinc-900">
                {from} <span className="font-normal text-zinc-400">to</span> {to}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-zinc-500">
                <Clock3 className="h-3.5 w-3.5" />
                {meta}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
