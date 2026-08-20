import { AppShell } from "../../../components/layout/AppShell";
import { STAGES } from "../../../config/design";
import { useQuestionnaire } from "../hooks/useQuestionnaire";
import { QuestionStep } from "./QuestionStep";
import { ResultScreen } from "./ResultScreen";
import { calculateResult } from "../utils/result";

export function QuestionnaireFlow() {
  const questionnaire = useQuestionnaire();
  const theme = STAGES[questionnaire.themeKey];
  const result = questionnaire.isDone ? calculateResult(questionnaire.state.answers) : null;

  return (
    <AppShell theme={theme}>
      {questionnaire.isDone ? (
        <ResultScreen
          result={result}
          answers={questionnaire.state.answers}
          onRestart={questionnaire.handleRestart}
        />
      ) : (
        <QuestionStep
          index={questionnaire.state.currentIndex}
          total={questionnaire.total}
          progress={questionnaire.progress}
          direction={questionnaire.state.direction}
          error={questionnaire.state.error}
          errorAt={questionnaire.state.errorAt}
          question={questionnaire.currentQuestion}
          answer={questionnaire.answer}
          onChange={questionnaire.handleChange}
          onNext={questionnaire.handleNext}
          onBack={questionnaire.handleBack}
          isFirst={questionnaire.isFirst}
          isLast={questionnaire.isLast}
        />
      )}
    </AppShell>
  );
}