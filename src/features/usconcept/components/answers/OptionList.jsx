import { memo } from "react";
import { cn } from "../../../../utils/cn";
import { CheckMark } from "../icons";

function freeTextOptions(question) {
  const options = question.options ?? [];
  if (question.type === "single" && question.freeTextHint && !options.some((o) => o.other)) {
    return [...options, { id: "other", label: "خودت بنویس", emoji: "✍️", other: true }];
  }
  return options;
}

function Card({ children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-start",
        "transition-all duration-300 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)",
        props.className
      )}
    >
      {children}
    </button>
  );
}

export const OptionList = memo(function OptionList({ question, value, onChange, disabled, onAutoAdvance }) {
  const isMultiple = question.type === "multiple";
  const options = freeTextOptions(question);
  const selected = isMultiple ? value?.ids ?? [] : value?.id;
  const hasSelection = isMultiple ? selected.length > 0 : Boolean(value?.id || value?.text);

  const toggleOption = (option) => {
    if (disabled) return;
    if (isMultiple) {
      const next = selected.includes(option.id)
        ? selected.filter((id) => id !== option.id)
        : [...selected, option.id];
      if (!selected.includes(option.id) && question.max && next.length > question.max) return;
      onChange({ ids: next, text: value?.text ?? "" });
      return;
    }
    if (option.other) {
      onChange({ id: option.id, text: value?.text ?? "" });
      return;
    }
    onChange({ id: option.id });
    if (question.advance === "auto" && onAutoAdvance) onAutoAdvance();
  };

  const handleOtherText = (text) => {
    if (isMultiple) {
      onChange({ ids: selected, text });
    } else {
      onChange({ id: "other", text });
    }
  };

  const showOtherInput = isMultiple ? selected.includes("other") : value?.id === "other";

  return (
    <div className="flex flex-col gap-2.5" role={isMultiple ? "group" : "radiogroup"} aria-label={question.title}>
      {options.map((option) => {
        const isSelected = isMultiple ? selected.includes(option.id) : value?.id === option.id;
        return (
          <Card
            key={option.id}
            onClick={() => toggleOption(option)}
            aria-pressed={isSelected}
            className={cn("hover:-translate-y-0.5", !isMultiple && hasSelection && !isSelected && "opacity-40 hover:opacity-70")}
            style={{
              backgroundColor: isSelected ? "var(--card-selected)" : "var(--card)",
              borderColor: isSelected ? "var(--ring)" : "var(--card-border)",
              boxShadow: isSelected ? "0 0 0 1px var(--ring), 0 16px 36px -22px var(--ring)" : "0 14px 30px -26px var(--ring)",
            }}
          >
            {option.emoji && (
              <span
                className="emoji grid size-11 shrink-0 place-items-center rounded-full text-[1.35rem]"
                style={{
                  backgroundColor: isSelected
                    ? "color-mix(in srgb, var(--accent) 18%, transparent)"
                    : "color-mix(in srgb, var(--accent) 10%, transparent)",
                  transform: isSelected ? "scale(1.08)" : undefined,
                  transition: "transform 250ms ease, background-color 300ms ease",
                }}
                aria-hidden
              >
                {option.emoji}
              </span>
            )}
            <span className="min-w-0 flex-1 text-[15px] font-extrabold leading-6" style={{ color: "var(--ink)" }}>
              {option.label}
            </span>
            <span
              className="grid size-5.5 shrink-0 place-items-center rounded-full transition-all duration-300"
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
          </Card>
        );
      })}

      {showOtherInput && (
        <div className="animate-fade-in">
          <textarea
            value={isMultiple ? value?.text : value?.text ?? ""}
            onChange={(event) => handleOtherText(event.target.value)}
            placeholder={question.freeTextHint ?? "اینجا بنویس..."}
            aria-label="پاسخ دلخواه"
            rows={2}
            className="w-full resize-none rounded-2xl border px-4 py-3 text-sm font-medium leading-6 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
            style={{
              color: "var(--ink)",
              backgroundColor: "var(--card)",
              borderColor: "var(--card-border)",
            }}
          />
        </div>
      )}
    </div>
  );
});