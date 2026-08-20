import { AppShell } from "../../../components/layout/AppShell";
import { LANDING_THEME, RESULT_THEME, LEVELS } from "../data/levels";
import { questions } from "../data/questions";
import { useFlow } from "../hooks/useFlow";
import { useReviewFlow } from "../hooks/useReviewFlow";
import { LandingScreen } from "./LandingScreen";
import { TransitionScreen } from "./TransitionScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";

export function UsConceptFlow({ reviewPayload }) {
  const normalFlow = useFlow();
  const reviewFlow = useReviewFlow(reviewPayload);
  const flow = reviewPayload ? reviewFlow : normalFlow;
  const { phase } = flow;

  if (reviewPayload) {
    return (
      <AppShell theme={flow.level?.theme ?? LANDING_THEME}>
        {flow.phase === "review" && (
          <QuestionScreen
            mode="review"
            question={flow.question}
            index={flow.index}
            total={questions.length}
            level={flow.level}
            direction={flow.direction}
            answer={flow.answer}
            onAnswer={() => {}}
            onNext={flow.next}
            onBack={flow.back}
            isFirst={flow.isFirst}
            onClose={flow.close}
          />
        )}
      </AppShell>
    );
  }

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

      {phase === "result" && <ResultScreen answers={flow.answers} onClose={flow.handleClose} />}
    </AppShell>
  );
}