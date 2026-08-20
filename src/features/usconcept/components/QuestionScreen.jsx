import { cn } from "../../../utils/cn";
import { fa, faPad } from "../utils/format";
import { isAnswerValid } from "../utils/validation";
import { ChevronLeft, ChevronRight } from "./icons";
import { OptionList } from "./answers/OptionList";
import { EmojiGrid } from "./answers/EmojiGrid";
import { TagPicker } from "./answers/TagPicker";
import { TextAreaInput } from "./answers/TextAreaInput";
import { PalettePicker } from "./answers/PalettePicker";

const renderers = {
  single: OptionList,
  multiple: OptionList,
  emoji: EmojiGrid,
  tags: TagPicker,
  text: TextAreaInput,
  letter: TextAreaInput,
  palette: PalettePicker,
};

export function QuestionScreen({ question, index, total, level, direction, answer, onAnswer, onNext, onBack, isFirst }) {
  const Renderer = renderers[question.type] ?? OptionList;

  const canContinue = isAnswerValid(question, answer);
  const showProgress = true;
  const percent = Math.min(100, Math.round(((index + 1) / total) * 100));
  const isLast = index === total - 1;

  return (
    <div className="flex min-h-full flex-col">
      <header className="pb-6">
        <div className="flex items-center gap-3">
          {!isFirst ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="سؤال قبلی"
              className="grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              style={{
                borderColor: "var(--card-border)",
                backgroundColor: "var(--card)",
                color: "var(--muted)",
                boxShadow: "0 10px 24px -18px var(--ring)",
              }}
            >
              <ChevronRight className="size-5" />
            </button>
          ) : (
            <span className="size-11 shrink-0" aria-hidden />
          )}

          {showProgress && (
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-baseline justify-between gap-3 text-[11px] font-bold">
                <span className="truncate" style={{ color: "var(--accent)" }}>
                  مرحله {faPad(level.index)} · {level.title}
                </span>
                <span className="shrink-0 tabular-nums" style={{ color: "var(--muted)" }}>
                  {faPad(level.index)} / {faPad(5)}
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full transition-all duration-700"
                style={{ backgroundColor: "color-mix(in srgb, var(--accent) 18%, transparent)" }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{ width: `${percent}%`, background: "linear-gradient(to left, var(--accent), var(--accent-2))" }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div
          key={question.id}
          className={cn("flex flex-1 flex-col", direction === 1 ? "animate-step-in" : "animate-step-in-back")}
        >
          <div>
            <div className="mb-4">
              <span
                className="inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-black"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)",
                  color: "var(--accent)",
                }}
              >
                {question.label ?? `سؤال ${fa(index + 1)}`}
              </span>
            </div>

            <h1 className="text-[1.4rem] font-black leading-9 sm:text-2xl sm:leading-10" style={{ color: "var(--ink)" }}>
              {question.title}
            </h1>
            {question.subtitle && (
              <p className="mt-3 text-sm font-semibold leading-7" style={{ color: "var(--muted)" }}>
                {question.subtitle}
              </p>
            )}
          </div>

          <div className="mt-8 flex-1">
            <Renderer question={question} value={answer} onChange={onAnswer} />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 z-10 flex flex-col items-stretch gap-3 pt-8 pb-5">
        {isLast ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!canContinue}
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) disabled:cursor-not-allowed"
            style={{
              color: "var(--base)",
              backgroundColor: "var(--accent)",
              boxShadow: "0 18px 40px -18px var(--ring)",
              opacity: canContinue ? 1 : 0.45,
            }}
          >
            <span className="emoji" aria-hidden>
              🥺
            </span>
            ارسال
            <ChevronLeft className="size-5" strokeWidth={2.4} />
          </button>
        ) : (
          canContinue && (
            <button
              type="button"
              onClick={onNext}
              className="animate-rise inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              style={{
                color: "var(--base)",
                background: "linear-gradient(to left, var(--accent), var(--accent-2))",
                boxShadow: "0 18px 40px -18px var(--ring)",
              }}
            >
              ادامه
              <ChevronLeft className="size-5" strokeWidth={2.4} />
            </button>
          )
        )}
        {!canContinue && question.type === "emoji" && (
          <p className="mt-3 text-center text-[11px] font-semibold" style={{ color: "var(--muted)" }}>
            حداقل {fa(question.min)} تا انتخاب کن
          </p>
        )}
      </footer>
    </div>
  );
}