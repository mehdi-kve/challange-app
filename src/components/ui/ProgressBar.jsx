export function ProgressBar({ value, label }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-white/60">{label}</span>
        <span className="font-bold tabular-nums text-(--accent)">{value}٪</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-l from-(--accent) to-(--accent-2) transition-[width] duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}