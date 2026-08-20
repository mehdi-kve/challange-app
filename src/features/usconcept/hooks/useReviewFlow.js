import { useCallback, useMemo, useState } from "react";
import { questions } from "../data/questions";
import { LEVELS } from "../data/levels";
import { toViewShape } from "../utils/payload";

export const REVIEW_STORAGE_KEY = "project-us-review";

export function useReviewFlow(payload) {
  const [index, setIndex] = useState(0);

  const answers = useMemo(() => payload?.answers ?? {}, [payload]);
  const question = questions[Math.min(index, questions.length - 1)] ?? questions[0];
  const level = LEVELS[question.level] ?? LEVELS[1];
  const isFirst = index === 0;
  const isLast = index === questions.length - 1;

  const answer = useMemo(() => toViewShape(question, answers[question.id]), [question, answers]);

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, questions.length - 1)), []);
  const back = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const close = useCallback(() => {
    sessionStorage.removeItem(REVIEW_STORAGE_KEY);
    window.location.hash = "/";
  }, []);

  return { phase: "review", index, direction: 1, question, level, answer, next, back, close, isFirst, isLast };
}