export function LoadingSkeleton() {
  return (
    <div className="space-y-2.5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          style={{ opacity: 1 - (i - 1) * 0.2 }}
        >
          <div className="flex items-center justify-between px-3 pt-3 pb-2">
            <div className="space-y-1.5">
              <div className="h-3 w-28 rounded-full shimmer" />
              <div className="h-2.5 w-16 rounded-full shimmer" />
            </div>
            <div className="h-5 w-20 rounded-full shimmer" />
          </div>
          <div className="mx-3 mb-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl bg-gray-50 px-3 py-3">
            <div className="space-y-1.5">
              <div className="h-2 w-10 rounded-full shimmer" />
              <div className="h-4 w-14 rounded-full shimmer" />
              <div className="h-2 w-10 rounded-full shimmer" />
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-3 w-8 rounded-full shimmer" />
              <div className="h-2 w-8 rounded-full shimmer" />
            </div>
            <div className="flex flex-col items-end space-y-1.5">
              <div className="h-2 w-10 rounded-full shimmer" />
              <div className="h-4 w-14 rounded-full shimmer" />
              <div className="h-2 w-10 rounded-full shimmer" />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-50 px-3.5 py-2.5">
            <div className="h-2.5 w-16 rounded-full shimmer" />
            <div className="h-4 w-20 rounded-full shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
