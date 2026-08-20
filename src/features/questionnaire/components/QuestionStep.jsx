import { AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Button } from "../../../components/ui/Button";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import { QuestionRenderer } from "../../../components/question/QuestionRenderer";

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-(--accent) to-(--accent-2) text-slate-950 shadow-[0_8px_24px_-8px_var(--accent)]">
        <Sparkles className="size-5" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-extrabold">چالشِ من</p>
        <p className="text-[11px] text-white/50">سفرِ چندقدمیِ بهتر شدن</p>
      </div>
    </div>
  );
}

export function QuestionStep({
  index,
  total,
  progress,
  direction,
  error,
  errorAt,
  question,
  answer,
  onChange,
  onNext,
  onBack,
  isFirst,
  isLast,
}) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex items-center justify-between pb-6">
        <Brand />
        <button
          type="button"
          onClick={onBack}
          disabled={isFirst}
          aria-label="بازگشت به سؤال قبل"
          className="grid size-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRight className="size-5" />
        </button>
      </header>

      <div key={`progress-${index}`} className="animate-fade-in">
        <ProgressBar
          value={progress}
          label={`مرحله ${index + 1} از ${total}`}
        />
      </div>

      <main className="mt-9 flex flex-1 flex-col">
        <div
          key={question.id}
          className={cn(
            "flex flex-1 flex-col",
            direction === 1 ? "animate-step-in" : "animate-step-in-back",
          )}
        >
          <div>
            <p
              className={cn(
                "mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold",
                error ? "text-red-300" : "text-(--accent)",
              )}
            >
              سؤال {index + 1}
            </p>
            <h1 className="text-xl font-extrabold leading-9 sm:text-2xl sm:leading-10">
              {question.title}
            </h1>
            {question.description && (
              <p className="mt-2 text-sm leading-7 text-white/60">
                {question.description}
              </p>
            )}
          </div>

          <div className="mt-7">
            <QuestionRenderer
              question={question}
              value={answer}
              onChange={onChange}
              error={error}
            />
          </div>
        </div>
      </main>

      <footer className="pt-8">
        {error && (
          <p
            key={errorAt}
            role="alert"
            className="mb-4 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-200 animate-shake"
          >
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </p>
        )}
        <Button variant="primary" size="lg" onClick={onNext}>
          {isLast ? "مشاهده نتیجه" : "ادامه"}
        </Button>
      </footer>
    </div>
  );
}
