import Link from "next/link";
import {
  ArrowRight,
  BusFront,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  const examples = [
    "Lahore to Multan tomorrow morning",
    "kal Lahore se Multan ki sasti bus",
    "Fastest bus Karachi to Hyderabad",
  ];

  const routes = [
    { from: "Lahore", to: "Multan", meta: "from PKR 2,200", badge: "Most Popular" },
    { from: "Karachi", to: "Lahore", meta: "12–14 hour journey", badge: "Long Haul" },
    { from: "Lahore", to: "Islamabad", meta: "4–5 hour express", badge: "Quick Trip" },
  ];

  const features = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Natural Language Search",
      desc: "Ask in English, Urdu, or Roman Urdu — the AI understands your intent perfectly.",
      color: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Live Bus Schedules",
      desc: "Real-time data directly from Faisal Movers — always accurate, always up to date.",
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI Recommendations",
      desc: "Get the best value, cheapest, and fastest picks curated by AI for your trip.",
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Nav */}
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <nav className="flex items-center justify-between rounded-2xl border border-white/90 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25">
              <BusFront className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-gray-900">Safar AI</p>
              <p className="text-[11px] text-gray-500">Pakistan&apos;s travel assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-700 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" />
              Live data
            </div>
            <Link href="/chat">
              <Button className="btn-primary h-9 rounded-xl px-4 text-[13px]">
                Open app
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-6 md:px-6 md:pt-10">
        <div className="grid min-h-[65svh] items-center gap-10 md:grid-cols-[minmax(0,1fr)_440px]">
          {/* Left */}
          <div className="fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-[12px] font-medium text-emerald-700 shadow-sm">
              <Globe className="h-3.5 w-3.5" />
              AI-powered travel for Pakistan
            </div>

            <h1 className="max-w-2xl text-[42px] font-bold leading-[1.06] tracking-tight text-gray-900 md:text-[62px]">
              Safar ab{" "}
              <span className="gradient-text">AI ke sath.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[16px] leading-[1.75] text-gray-500">
              Find bus timings, compare fares, and get smarter recommendations by
              typing naturally. Bas message karo — route, timing aur best option
              samajh lo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/chat" className="inline-flex">
                <Button className="btn-primary h-12 min-w-40 rounded-xl px-6 text-[14px] font-medium">
                  Start searching
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/chat?q=Lahore%20to%20Multan%20tomorrow%20morning" className="inline-flex">
                <Button
                  variant="outline"
                  className="h-12 min-w-40 rounded-xl border-gray-200 bg-white/80 px-6 text-[14px] font-medium text-gray-700 shadow-sm backdrop-blur hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Try live example
                </Button>
              </Link>
            </div>

            {/* Example chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {examples.map((example) => (
                <Link
                  key={example}
                  href={`/chat?q=${encodeURIComponent(example)}`}
                  className="rounded-full border border-gray-200 bg-white/80 px-3.5 py-2 text-[12px] font-normal text-gray-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:text-emerald-700 hover:shadow-md"
                >
                  {example}
                </Link>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-7 flex flex-wrap items-center gap-4 text-[12px] text-gray-500">
              {[
                { icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />, text: "Live schedules" },
                { icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />, text: "AI-curated picks" },
                { icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />, text: "No sign-up needed" },
                { icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />, text: "Always free" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  {icon}
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — preview card */}
          <div className="fade-in-up-delay md:justify-self-end">
            <div className="soft-surface overflow-hidden rounded-3xl p-5">
              {/* Card header */}
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400">Live assistant</p>
                  <p className="mt-0.5 text-[15px] font-semibold text-gray-900">Karachi se Lahore? Ho jayega.</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30">
                  <MessageCircle className="h-4.5 w-4.5" />
                </div>
              </div>

              {/* Chat bubbles */}
              <div className="space-y-3">
                <div className="ml-auto w-fit max-w-[82%] rounded-2xl rounded-br-sm bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-2.5 text-[13px] leading-5 text-white shadow-sm">
                  Lahore to Multan tomorrow morning
                </div>
                <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-gray-100 bg-white px-4 py-3 text-[13px] leading-6 text-gray-600 shadow-sm">
                  Found <strong className="text-gray-900">12 morning options</strong>. Cheapest starts at{" "}
                  <strong className="text-emerald-600">PKR 2,200</strong>; fastest takes about{" "}
                  <strong className="text-gray-900">5 hrs</strong>.
                </div>
              </div>

              {/* Bus card preview */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/80">
                <div className="border-b border-gray-100 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">Premium Plus</p>
                      <p className="text-[11px] text-gray-400">Economy Class</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10.5px] font-medium text-amber-700">
                      <Sparkles className="h-2.5 w-2.5" />
                      Recommended
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-2.5">
                  <div>
                    <p className="text-[10px] text-gray-400">Departs</p>
                    <p className="text-[14px] font-semibold text-gray-900">05:20 AM</p>
                    <p className="text-[10px] text-gray-400">Lahore</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="h-3.5 w-3.5 text-gray-300" />
                    <span className="text-[10px] text-gray-400">5h 00m</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Arrives</p>
                    <p className="text-[14px] font-semibold text-gray-900">10:20 AM</p>
                    <p className="text-[10px] text-gray-400">Multan</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2">
                  <div className="flex gap-2">
                    {["Cheapest", "Fastest"].map((tag) => (
                      <span key={tag} className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">PKR 2,300</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Powered by live Faisal Movers data
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon, title, desc, bg, iconColor }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/90 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${iconColor}`}>
                {icon}
              </div>
              <p className="text-[14px] font-semibold text-gray-900">{title}</p>
              <p className="mt-1.5 text-[13px] leading-6 text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular routes */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gray-400">Popular routes</p>
        <div className="grid gap-3 md:grid-cols-3">
          {routes.map(({ from, to, meta, badge }) => (
            <Link
              key={`${from}-${to}`}
              href={`/chat?q=${encodeURIComponent(`${from} to ${to} tomorrow`)}`}
              className="group flex items-center justify-between rounded-2xl border border-white/90 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="mb-1.5">
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                    {badge}
                  </span>
                </div>
                <p className="text-[15px] font-semibold text-gray-900">
                  {from} <span className="font-normal text-gray-400">→</span> {to}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-gray-500">
                  <Clock3 className="h-3 w-3" />
                  {meta}
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-gray-400 transition-colors group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                <MapPin className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
