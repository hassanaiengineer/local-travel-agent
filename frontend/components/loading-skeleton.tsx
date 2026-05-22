export function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-20 animate-pulse rounded-2xl bg-zinc-200/55" />
      <div className="h-20 animate-pulse rounded-2xl bg-zinc-200/45" />
      <div className="h-20 animate-pulse rounded-2xl bg-zinc-200/35" />
    </div>
  );
}
