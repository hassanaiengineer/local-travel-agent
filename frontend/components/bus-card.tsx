import { ArrowRight, Clock3, Sparkles } from "lucide-react";

import { BusOption, Recommendation } from "@/lib/types";

function getBadge(option: BusOption, rec: Recommendation) {
  if (option.option_id === rec.best_option_id) return "Recommended";
  if (option.option_id === rec.cheapest_option_id) return "Cheapest";
  if (option.option_id === rec.fastest_option_id) return "Fastest";
  return null;
}

export function BusCard({ option, recommendation }: { option: BusOption; recommendation: Recommendation }) {
  const badge = getBadge(option, recommendation);

  return (
    <article className="group rounded-2xl border border-zinc-200/70 bg-white/76 p-2.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:bg-white">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="min-w-0 pl-0.5">
          <p className="truncate text-[12px] font-normal text-zinc-800">{option.service_name}</p>
          <p className="text-[10.5px] font-normal text-zinc-500">{option.class_name} Class</p>
        </div>
        {badge && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-900/10 bg-emerald-50/80 px-2 py-1 text-[10px] font-normal text-emerald-800">
            <Sparkles className="h-2.5 w-2.5" />
            {badge}
          </span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl bg-zinc-50/80 px-2.5 py-2">
        <div>
          <p className="text-[10.5px] font-normal text-zinc-500">Depart</p>
          <p className="text-[13px] font-normal text-zinc-900">{option.departure_time}</p>
          <p className="truncate text-[10.5px] font-normal text-zinc-500">{option.departure_city}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-400">
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:text-emerald-600" />
          <span className="text-[10px] font-normal">{option.duration_text}</span>
        </div>
        <div className="text-right">
          <p className="text-[10.5px] font-normal text-zinc-500">Arrive</p>
          <p className="text-[13px] font-normal text-zinc-900">{option.arrival_time}</p>
          <p className="truncate text-[10.5px] font-normal text-zinc-500">{option.arrival_city}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between px-0.5 text-[11px] font-normal">
        <p className="inline-flex items-center gap-1 text-zinc-500">
          <Clock3 className="h-3 w-3" />
          {Math.round(option.duration_minutes / 60)}h trip
        </p>
        <p className="font-medium text-zinc-900">
          PKR {option.price_pkr}
        </p>
      </div>
    </article>
  );
}
