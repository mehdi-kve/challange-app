import { memo } from "react";
import { cn } from "../../../../utils/cn";
import { CheckMark } from "../icons";

export const PalettePicker = memo(function PalettePicker({ question, value, onChange, disabled }) {
  const selected = value?.id ?? null;

  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.title}>
      {question.options.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              if (disabled) return;
              onChange({ id: option.id });
            }}
            aria-pressed={isSelected}
            className={cn(
              "group flex w-full items-center gap-4 rounded-2xl border p-3 transition-all duration-300 active:scale-[0.985]",
              "hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
              selected && !isSelected && "opacity-40 hover:opacity-70"
            )}
            style={{
              backgroundColor: isSelected ? "var(--card-selected)" : "var(--card)",
              borderColor: isSelected ? "var(--ring)" : "var(--card-border)",
              boxShadow: isSelected ? "0 0 0 1px var(--ring), 0 16px 36px -22px var(--ring)" : "0 14px 30px -26px var(--ring)",
            }}
          >
            <span
              className="flex h-12 flex-1 overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
              style={{
                border: "1px solid rgba(255,255,255,0.16)",
                boxShadow: isSelected ? "0 0 0 1px var(--ring), 0 10px 24px -12px var(--ring)" : "inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              {option.colors.map((color, index) => (
                <span
                  key={`${option.id}-${index}`}
                  className="flex-1"
                  style={{
                    background: `linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.05) 42%, rgba(0,0,0,0.12) 100%), ${color}`,
                  }}
                  aria-hidden
                />
              ))}
            </span>
            <span
              className="grid shrink-0 place-items-center rounded-full transition-all duration-300"
              style={{
                width: 22,
                height: 22,
                backgroundColor: isSelected ? "var(--accent)" : "color-mix(in srgb, var(--ink) 8%, transparent)",
                color: "#fff",
                opacity: isSelected ? 1 : 0.5,
              }}
            >
              <CheckMark className="size-3" />
            </span>
          </button>
        );
      })}
    </div>
  );
});