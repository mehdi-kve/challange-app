import { cn } from "../../utils/cn";

export function TextQuestion({ question, value, onChange, error }) {
  return (
    <textarea
      className={cn("field-input min-h-36 resize-none leading-6")}
      value={value ?? ""}
      placeholder={question.placeholder}
      aria-invalid={error ? true : undefined}
      aria-label={question.title}
      rows={4}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
          onChange(event.target.value);
        }
      }}
    />
  );
}