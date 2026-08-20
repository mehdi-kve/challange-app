import { OptionCard } from "./OptionCard";

export function SingleChoice({ question, value, onChange, error }) {
  return (
    <div className="flex flex-col gap-3" role="radiogroup" aria-label={question.title}>
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