import { memo } from "react";
import { cn } from "../../../../utils/cn";
import { fa } from "../../utils/format";

export const EmojiGrid = memo(function EmojiGrid({ question, value, onChange, disabled }) {
  const selected = Array.isArray(value) ? value : [];
  const full = selected.length >= question.max;

  const toggle = (emoji) => {
    if (disabled) return;
    if (selected.includes(emoji)) {
      onChange(selected.filter((item) => item !== emoji));
      return;
    }
    if (full) return;
    onChange([...selected, emoji]);
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between text-xs font-bold">
        <span style={{ color: full ? "var(--accent)" : "var(--muted)" }} className="transition-colors duration-300">
          {full ? question.fullLabel ?? "همین کافیه 😌" : `${question.counterPrefix ?? "انتخاب کردی"} · ${fa(selected.length)} / ${fa(question.max)}`}
        </span>
        <span style={{ color: "var(--muted)" }} className="tabular-nums">
          {fa(question.min)}–{fa(question.max)}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {question.emojis.map((emoji) => {
          const isSelected = selected.includes(emoji);
          return (
            <button
              key={emoji}
              type="button"
              onClick={() => toggle(emoji)}
              aria-pressed={isSelected}
              disabled={disabled}
              className={cn(
                "emoji grid aspect-square place-items-center rounded-2xl text-[1.7rem] transition-all duration-300 hover:-translate-y-0.5 active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
                isSelected && "animate-emoji-pop",
                full && !isSelected && "opacity-25"
              )}
              style={{
                backgroundColor: isSelected ? "var(--card-selected)" : "var(--card)",
                border: `1px solid ${isSelected ? "var(--ring)" : "var(--card-border)"}`,
                boxShadow: isSelected ? "0 0 0 1px var(--ring), 0 0 22px -6px var(--ring)" : "0 12px 26px -22px var(--ring)",
              }}
            >
              {emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
});