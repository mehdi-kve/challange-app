import { cn } from "../../utils/cn";

export function NumberQuestion({ question, value, onChange, error }) {
  return (
    <div className="relative">
      <input
        type="number"
        className={cn("field-input py-4 text-2xl font-extrabold tabular-nums")}
        value={value ?? ""}
        placeholder={question.placeholder}
        min={question.min}
        max={question.max}
        aria-label={question.title}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.target.blur();
          }
        }}
      />
      <span className="pointer-events-none absolute end-5 top-1/2 -translate-y-1/2 text-sm font-bold text-white/40">
        {question.unit}
      </span>
    </div>
  );
}