import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

export function OptionCard({ option, selected, onSelect, multi = false, invalid = false }) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-invalid={invalid || undefined}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-start transition-all duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
        selected
          ? "border-(--accent)/70 bg-(--accent)/10 shadow-[0_0_30px_-12px_var(--accent)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
        invalid && "border-red-400/60"
      )}
    >
      {Icon && (
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-300",
            selected ? "bg-(--accent)/20 text-(--accent)" : "bg-white/5 text-white/60"
          )}
        >
          <Icon className="size-5" strokeWidth={1.8} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        {option.label && (
          <span className={cn("block text-sm font-bold leading-6", selected ? "text-white" : "text-white/90")}>
            {option.label}
          </span>
        )}
        {option.description && (
          <span className="mt-0.5 block text-xs leading-5 text-white/50">{option.description}</span>
        )}
      </span>
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-full border transition-all duration-300",
          selected ? "border-(--accent) bg-(--accent) text-slate-950" : "border-white/20 text-transparent",
          multi && "rounded-md"
        )}
      >
        <Check className="size-3.5" strokeWidth={3.5} />
      </span>
    </button>
  );
}