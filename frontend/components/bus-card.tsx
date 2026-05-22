import { ArrowRight, Clock3, Sparkles, Tag } from "lucide-react";

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
    <article className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-slate-900">{option.service_name}</p>
          <p className="text-[11px] text-slate-500">{option.class_name} Class</p>
        </div>
        {badge && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-800">
            <Sparkles className="h-3 w-3" />
            {badge}
          </span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
        <div>
          <p className="text-[11px] text-slate-500">Depart</p>
          <p className="text-sm font-medium text-slate-900">{option.departure_time}</p>
          <p className="truncate text-[11px] text-slate-500">{option.departure_city}</p>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-400">
          <ArrowRight className="h-4 w-4" />
          <span className="text-[10px]">{option.duration_text}</span>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-slate-500">Arrive</p>
          <p className="text-sm font-medium text-slate-900">{option.arrival_time}</p>
          <p className="truncate text-[11px] text-slate-500">{option.arrival_city}</p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs">
        <p className="inline-flex items-center gap-1 text-slate-500">
          <Clock3 className="h-3.5 w-3.5" />
          {Math.round(option.duration_minutes / 60)}h trip
        </p>
        <p className="inline-flex items-center gap-1 font-semibold text-slate-900">
          <Tag className="h-3.5 w-3.5" /> PKR {option.price_pkr}
        </p>
      </div>
    </article>
  );
}
