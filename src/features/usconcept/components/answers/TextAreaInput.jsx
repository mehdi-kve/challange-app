import { memo } from "react";
import { cn } from "../../../../utils/cn";

export const TextAreaInput = memo(function TextAreaInput({ question, value, onChange, disabled }) {
  const isLetter = question.type === "letter";
  return (
    <textarea
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={question.placeholder}
      disabled={disabled}
      aria-label={question.title}
      rows={isLetter ? 11 : 6}
      className={cn(
        "w-full resize-none rounded-[1.75rem] border px-5 py-5 text-base font-medium leading-9 transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)",
        isLetter && "min-h-72 leading-10"
      )}
      style={{
        color: "var(--ink)",
        backgroundColor: "var(--card)",
        borderColor: "var(--card-border)",
        boxShadow: "0 20px 44px -30px var(--ring)",
      }}
    />
  );
});