import { memo } from "react";
import { cn } from "../../../../utils/cn";
import { fa } from "../../utils/format";

export const TagPicker = memo(function TagPicker({ question, value, onChange, disabled }) {
  const selected = Array.isArray(value) ? value : [];
  const isFull = question.exact ? selected.length >= question.exact : selected.length >= (question.max ?? Infinity);

  const toggle = (id) => {
    if (disabled) return;
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
      return;
    }
    if (isFull) return;
    onChange([...selected, id]);
  };

  const countLabel = question.exact
    ? `${fa(selected.length)} / ${fa(question.exact)}`
    : `${fa(selected.length)} / ${fa(question.max)}`;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between text-xs font-bold">
        <span style={{ color: isFull ? "var(--accent)" : "var(--muted)" }} className="transition-colors duration-300">
          {countLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {question.options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              aria-pressed={isSelected}
              disabled={disabled}
              className={cn(
                "rounded-full border px-4.5 py-2.5 text-sm font-extrabold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
                isSelected && "animate-emoji-pop"
              )}
              style={{
                color: isSelected ? "var(--accent)" : "var(--ink)",
                backgroundColor: isSelected ? "var(--card-selected)" : "var(--card)",
                borderColor: isSelected ? "var(--ring)" : "var(--card-border)",
                boxShadow: isSelected ? "0 0 0 1px var(--ring)" : "0 12px 26px -22px var(--ring)",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});