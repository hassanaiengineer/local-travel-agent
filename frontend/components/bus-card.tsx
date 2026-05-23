import { ArrowRight, Clock3, Sparkles, Zap, DollarSign } from "lucide-react";

import { BusOption, Recommendation } from "@/lib/types";

type BadgeType = "Recommended" | "Cheapest" | "Fastest" | null;

function getBadge(option: BusOption, rec: Recommendation): BadgeType {
  if (option.option_id === rec.best_option_id) return "Recommended";
  if (option.option_id === rec.cheapest_option_id) return "Cheapest";
  if (option.option_id === rec.fastest_option_id) return "Fastest";
  return null;
}

const BADGE_STYLES: Record<NonNullable<BadgeType>, { wrapper: string; icon: React.ReactNode; label: string }> = {
  Recommended: {
    wrapper: "border-amber-200 bg-amber-50 text-amber-700",
    icon: <Sparkles className="h-2.5 w-2.5" />,
    label: "Recommended",
  },
  Cheapest: {
    wrapper: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: <DollarSign className="h-2.5 w-2.5" />,
    label: "Cheapest",
  },
  Fastest: {
    wrapper: "border-blue-200 bg-blue-50 text-blue-700",
    icon: <Zap className="h-2.5 w-2.5" />,
    label: "Fastest",
  },
};

export function BusCard({ option, recommendation }: { option: BusOption; recommendation: Recommendation }) {
  const badge = getBadge(option, recommendation);
  const badgeStyle = badge ? BADGE_STYLES[badge] : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="min-w-0 pr-2">
          <p className="truncate text-[12.5px] font-semibold text-gray-900">{option.service_name}</p>
          <p className="text-[10.5px] text-gray-400">{option.class_name} Class</p>
        </div>
        {badgeStyle && (
          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${badgeStyle.wrapper}`}>
            {badgeStyle.icon}
            {badgeStyle.label}
          </span>
        )}
      </div>

      {/* Route */}
      <div className="mx-3 mb-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
        <div>
          <p className="text-[9.5px] font-medium uppercase tracking-wide text-gray-400">Depart</p>
          <p className="text-[14px] font-bold text-gray-900">{option.departure_time}</p>
          <p className="truncate text-[10px] text-gray-400">{option.departure_city}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-0.5">
            <span className="h-px w-4 bg-gray-300" />
            <ArrowRight className="h-3.5 w-3.5 text-gray-300 transition-colors group-hover:text-emerald-500" />
          </div>
          <span className="text-[9.5px] font-medium text-gray-400">{option.duration_text}</span>
        </div>

        <div className="text-right">
          <p className="text-[9.5px] font-medium uppercase tracking-wide text-gray-400">Arrive</p>
          <p className="text-[14px] font-bold text-gray-900">{option.arrival_time}</p>
          <p className="truncate text-[10px] text-gray-400">{option.arrival_city}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-50 px-3.5 py-2.5">
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <Clock3 className="h-3 w-3" />
          <span>{Math.round(option.duration_minutes / 60)}h journey</span>
        </div>
        <p className="text-[15px] font-bold text-gray-900">
          PKR {option.price_pkr.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
