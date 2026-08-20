export function SliderQuestion({ question, value, onChange }) {
  const current = value ?? question.min;
  const fill = (current - question.min) / (question.max - question.min);

  return (
    <div className="mx-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/50">{question.min}</span>
        <span className="glass grid min-w-16 place-items-center rounded-2xl px-4 py-2 text-lg font-extrabold tabular-nums text-(--accent)">
          {current}
          {question.unit}
        </span>
        <span className="text-xs font-medium text-white/50">{question.max}</span>
      </div>
      <input
        type="range"
        className="range-input"
        dir="ltr"
        min={question.min}
        max={question.max}
        step={question.step}
        value={current}
        aria-label={question.title}
        style={{
          background: `linear-gradient(to right, var(--accent) ${fill * 100}%, rgb(255 255 255 / 0.12) ${fill * 100}%)`,
        }}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}