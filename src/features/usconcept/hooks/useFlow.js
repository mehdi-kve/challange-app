import { useCallback, useEffect, useMemo, useReducer } from "react";
import { questions } from "../data/questions";
import { LEVELS } from "../data/levels";
import { isAnswerValid } from "../utils/validation";

const STORAGE_KEY = "project-us-answers";
const API_URL = import.meta.env.VITE_USCONCEPT_API_URL ?? null;

const initialState = {
  phase: "landing",
  index: 0,
  direction: 1,
  answers: {},
  transitionLevel: null,
  pendingIndex: null,
  toast: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...initialState, phase: "question" };
    case "SET_ANSWER":
      return { ...state, answers: { ...state.answers, [action.id]: action.value } };
    case "NEXT": {
      const index = state.index;
      if (index >= questions.length - 1) {
        return { ...state, phase: "result", direction: 1, toast: null };
      }
      const next = index + 1;
      const currentLevel = questions[index].level;
      const nextLevel = questions[next].level;
      if (nextLevel > currentLevel) {
        return {
          ...state,
          phase: "transition",
          transitionLevel: nextLevel,
          pendingIndex: next,
          direction: 1,
          toast: null,
        };
      }
      return { ...state, index: next, direction: 1, toast: null };
    }
    case "BACK": {
      if (state.index === 0) return { ...initialState };
      return { ...state, index: state.index - 1, direction: -1, toast: null };
    }
    case "FINISH_TRANSITION": {
      return {
        ...state,
        phase: "question",
        index: state.pendingIndex,
        pendingIndex: null,
        transitionLevel: null,
        direction: 1,
      };
    }
    case "HIDE_TOAST":
      return { ...state, toast: null };
    case "CLOSE":
      return { ...initialState };
    default:
      return state;
  }
}

export function useFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const question = questions[state.index] ?? null;
  const level = question ? LEVELS[question.level] : LEVELS[1];
  const isLastQuestion = state.index === questions.length - 1;

  useEffect(() => {
    if (!Object.keys(state.answers).length) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
  }, [state.answers]);

  useEffect(() => {
    if (state.phase !== "result") return;
    const payload = { answers: state.answers, completedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    console.log("project-us answers:", payload);
  }, [state.phase, state.answers]);

  const submitAnswers = useCallback(async (answers) => {
    if (!API_URL) return;
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, completedAt: new Date().toISOString() }),
      });
    } catch (error) {
      console.warn("usconcept submit failed:", error);
    }
  }, []);

  const handleStart = useCallback(() => dispatch({ type: "START" }), []);
  const handleAnswer = useCallback(
    (value) => dispatch({ type: "SET_ANSWER", id: question.id, value }),
    [question]
  );
  const handleNext = useCallback(() => {
    if (question && !isAnswerValid(question, state.answers[question.id])) return;
    if (state.index === questions.length - 1) {
      submitAnswers(state.answers);
    }
    dispatch({ type: "NEXT" });
  }, [question, state.answers, state.index, submitAnswers]);
  const handleBack = useCallback(() => dispatch({ type: "BACK" }), []);
  const handleFinishTransition = useCallback(() => dispatch({ type: "FINISH_TRANSITION" }), []);
  const handleHideToast = useCallback(() => dispatch({ type: "HIDE_TOAST" }), []);
  const handleClose = useCallback(() => dispatch({ type: "CLOSE" }), []);

  return useMemo(
    () => ({
      phase: state.phase,
      index: state.index,
      direction: state.direction,
      question,
      level,
      answers: state.answers,
      answer: question ? state.answers[question.id] : undefined,
      isLastQuestion,
      toast: state.toast,
      transitionLevel: state.transitionLevel,
      handleStart,
      handleAnswer,
      handleNext,
      handleBack,
      handleFinishTransition,
      handleHideToast,
      handleClose,
    }),
    [
      state,
      question,
      level,
      isLastQuestion,
      handleStart,
      handleAnswer,
      handleNext,
      handleBack,
      handleFinishTransition,
      handleHideToast,
      handleClose,
    ]
  );
}
