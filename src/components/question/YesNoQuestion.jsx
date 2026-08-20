import { Check, X } from "lucide-react";
import { cn } from "../../utils/cn";

const choices = [
  { id: "yes", label: "بله", description: "قطعاً؛ دلم می‌خواد", icon: Check },
  { id: "no", label: "نه", description: "فعلاً ترجیح می‌دم همون‌قدر بچسبم", icon: X },
];

export function YesNoQuestion({ value, onChange, error }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {choices.map((choice) => {
        const Icon = choice.icon;
        const selected = value === choice.id;
        return (
          <button
            key={choice.id}
            type="button"
            onClick={() => onChange(choice.id)}
            aria-pressed={selected}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
              selected
                ? "border-(--accent)/70 bg-(--accent)/10 shadow-[0_0_30px_-12px_var(--accent)]"
                : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
              error && "border-red-400/60"
            )}
          >
            <span
              className={cn(
                "grid size-12 place-items-center rounded-2xl transition-colors",
                selected ? "bg-(--accent)/20 text-(--accent)" : "bg-white/5 text-white/60"
              )}
            >
              <Icon className="size-6" strokeWidth={1.8} />
            </span>
            <span className="text-sm font-bold text-white/90">{choice.label}</span>
            <span className="text-[11px] leading-4 text-white/45">{choice.description}</span>
          </button>
        );
      })}
    </div>
  );
}