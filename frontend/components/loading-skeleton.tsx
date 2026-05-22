export function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-20 animate-pulse rounded-xl bg-slate-200/80" />
      <div className="h-20 animate-pulse rounded-xl bg-slate-200/70" />
      <div className="h-20 animate-pulse rounded-xl bg-slate-200/60" />
    </div>
  );
}
