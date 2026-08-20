import { useEffect } from "react";
import { AppShell } from "../../../components/layout/AppShell";
import { LANDING_THEME, RESULT_THEME, LEVELS } from "../data/levels";
import { questions } from "../data/questions";
import { useFlow } from "../hooks/useFlow";
import { LandingScreen } from "./LandingScreen";
import { TransitionScreen } from "./TransitionScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";

const TOAST_HIDE_MS = 2800;

function Toast({ message, onDismiss }) {
  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-5">
      <button
        type="button"
        onClick={onDismiss}
        className="animate-rise rounded-full border px-5 py-3 text-sm font-black shadow-[0_20px_44px_-18px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
        style={{
          color: "var(--ink)",
          backgroundColor: "var(--card-selected)",
          borderColor: "var(--ring)",
          boxShadow: "0 16px 40px -18px var(--ring)",
        }}
      >
        {message}
      </button>
    </div>
  );
}

export function UsConceptFlow() {
  const flow = useFlow();
  const { phase, handleHideToast } = flow;

  useEffect(() => {
    if (!flow.toast) return;
    const timer = setTimeout(() => handleHideToast(), TOAST_HIDE_MS);
    return () => clearTimeout(timer);
  }, [flow.toast, handleHideToast]);

  const theme = (() => {
    if (phase === "landing") return LANDING_THEME;
    if (phase === "result") return RESULT_THEME;
    if (phase === "transition") return LEVELS[flow.transitionLevel]?.theme ?? LANDING_THEME;
    return flow.level?.theme ?? LANDING_THEME;
  })();

  return (
    <AppShell theme={theme}>
      {phase === "landing" && <LandingScreen onStart={flow.handleStart} />}

      {phase === "transition" && (
        <TransitionScreen
          key={flow.transitionLevel}
          level={flow.transitionLevel ? LEVELS[flow.transitionLevel] : null}
          onFinish={flow.handleFinishTransition}
        />
      )}

      {phase === "question" && (
        <QuestionScreen
          question={flow.question}
          index={flow.index}
          total={questions.length}
          level={flow.level}
          direction={flow.direction}
          answer={flow.answer}
          onAnswer={flow.handleAnswer}
          onNext={flow.handleNext}
          onBack={flow.handleBack}
          isFirst={flow.index === 0}
        />
      )}

      {phase === "result" && <ResultScreen onClose={flow.handleClose} />}

      {flow.toast && <Toast message={flow.toast} onDismiss={handleHideToast} />}
    </AppShell>
  );
}