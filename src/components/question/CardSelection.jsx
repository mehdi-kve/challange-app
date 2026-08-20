import { OptionCard } from "./OptionCard";

export function CardSelection({ question, value, onChange, error }) {
  return (
    <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label={question.title}>
      {question.options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          selected={value === option.id}
          invalid={Boolean(error)}
          onSelect={() => onChange(option.id)}
        />
      ))}
    </div>
  );
}