import { OptionCard } from "./OptionCard";

export function MultipleChoice({ question, value, onChange, error }) {
  const selected = Array.isArray(value) ? value : [];

  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  };

  return (
    <div className="flex flex-col gap-3" role="group" aria-label={question.title}>
      {question.options.map((option) => (
        <OptionCard
          key={option.id}
          option={option}
          multi
          selected={selected.includes(option.id)}
          invalid={Boolean(error)}
          onSelect={() => toggle(option.id)}
        />
      ))}
    </div>
  );
}