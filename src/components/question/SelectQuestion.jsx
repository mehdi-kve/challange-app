import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export function SelectQuestion({ question, value, onChange }) {
  return (
    <div className="relative">
      <select
        className={cn(
          "field-input cursor-pointer appearance-none ps-4 pe-12",
          value ? "text-white" : "text-white/40"
        )}
        value={value ?? ""}
        aria-label={question.title}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled>
          {question.placeholder}
        </option>
        {question.options.map((option) => (
          <option key={option.id} value={option.id} className="bg-slate-900 text-white">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-white/40" />
    </div>
  );
}