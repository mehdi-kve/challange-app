import { CheckCircle2, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { questions, optionLabelMap } from "../data/questions";
import { Button } from "../../../components/ui/Button";

function answerSummary(question, value) {
  if (value === undefined || value === null || value === "") return null;
  switch (question.type) {
    case "multiple":
      return value.map((id) => optionLabelMap[id]?.label).filter(Boolean).join("، ");
    case "slider":
      return `${value}${question.unit}`;
    case "number":
      return `${value} ${question.unit}`;
    case "text":
      return value.length > 60 ? `${value.slice(0, 60)}…` : value;
    default: {
      const meta = optionLabelMap[value];
      return meta?.label ?? value;
    }
  }
}

export function ResultScreen({ result, answers, onRestart }) {
  const ResultIcon = result.icon;
  const summaryItems = questions
    .map((question) => ({ question, text: answerSummary(question, answers[question.id]) }))
    .filter((item) => item.text);

  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-center justify-between pb-6">
        <div className="flex items-center gap-2.5">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-(--accent) to-(--accent-2) text-slate-950 shadow-[0_8px_24px_-8px_var(--accent)]">
            <Trophy className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-extrabold">چالشِ من</p>
            <p className="text-[11px] text-white/50">نتیجه سفر تو</p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center py-8">
        <div className="w-full animate-rise text-center">
          <p className="mx-auto mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold text-(--accent)">
            <Sparkles className="size-3.5" />
            نتیجه تمرین تو
          </p>

          <div className="glass relative mx-auto grid size-28 place-items-center rounded-[2rem]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-(--accent) to-(--accent-2) opacity-25 blur-xl animate-pulse-slow" />
            <ResultIcon className="relative size-14 text-(--accent)" strokeWidth={1.6} />
          </div>

          <p className="mt-6 text-3xl font-black leading-12">
            تو یه <span className="text-(--accent)">{result.title}</span> هستی
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-8 text-white/65">{result.description}</p>

          <div className="mt-8 grid grid-cols-1 gap-2.5 text-start">
            {summaryItems.map(({ question, text }) => (
              <div
                key={question.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <span className="shrink-0 basis-1/3 text-[11px] font-bold leading-5 text-white/45">
                  {question.title.length > 28 ? `${question.title.slice(0, 28)}…` : question.title}
                </span>
                <span className="flex-1 text-sm font-semibold leading-6 text-white/85">‌{text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="pt-8">
        <Button variant="primary" size="lg" onClick={onRestart}>
          <RotateCcw className="size-4" />
          شروعِ دوباره
        </Button>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
          <CheckCircle2 className="size-3.5 text-(--accent)" />
          پاسخ‌های تو ذخیره شد
        </p>
      </footer>
    </div>
  );
}