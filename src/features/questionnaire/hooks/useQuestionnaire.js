import { useCallback, useMemo, useReducer } from "react";
import { questions } from "../data/questions";
import { validateAnswer } from "../utils/validation";
import { resolveStageKey } from "../../../config/design";

const initialState = {
  answers: {},
  currentIndex: 0,
  direction: 1,
  status: "active",
  error: null,
  errorAt: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ANSWER":
      return { ...state, answers: { ...state.answers, [action.id]: action.value }, error: null };
    case "GO_NEXT": {
      if (state.currentIndex >= questions.length - 1) {
        return { ...state, status: "done", direction: 1, error: null };
      }
      return { ...state, currentIndex: state.currentIndex + 1, direction: 1, error: null };
    }
    case "GO_BACK":
      return { ...state, currentIndex: Math.max(0, state.currentIndex - 1), direction: -1, error: null };
    case "SET_ERROR":
      return { ...state, error: action.message, errorAt: Date.now() };
    case "RESTART":
      return { ...initialState };
    default:
      return state;
  }
}

export function useQuestionnaire() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentQuestion = questions[state.currentIndex];
  const total = questions.length;
  const isFirst = state.currentIndex === 0;
  const isLast = state.currentIndex === total - 1;
  const isDone = state.status === "done";
  const answer = state.answers[currentQuestion?.id];

  const progress = isDone ? 100 : Math.round((state.currentIndex / total) * 100);

  const themeKey = resolveStageKey(state.currentIndex, total, isDone);

  const handleChange = useCallback((value) => {
    dispatch({ type: "SET_ANSWER", id: currentQuestion.id, value });
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    const result = validateAnswer(currentQuestion, state.answers[currentQuestion.id]);
    if (!result.valid) {
      dispatch({ type: "SET_ERROR", message: result.message });
      return;
    }
    dispatch({ type: "GO_NEXT" });
  }, [currentQuestion, state.answers]);

  const handleBack = useCallback(() => {
    dispatch({ type: "GO_BACK" });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: "RESTART" });
  }, []);

  return useMemo(
    () => ({
      state,
      currentQuestion,
      total,
      isFirst,
      isLast,
      isDone,
      answer,
      progress,
      themeKey,
      handleChange,
      handleNext,
      handleBack,
      handleRestart,
    }),
    [state, currentQuestion, total, isFirst, isLast, isDone, answer, progress, themeKey, handleChange, handleNext, handleBack, handleRestart]
  );
}