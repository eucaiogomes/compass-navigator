import { useEffect, useState, useCallback } from "react";

const KEY = "copsoq-answers-v1";

export type Answers = Record<number, number>;

export function useSurveyState(total: number) {
  const [answers, setAnswers] = useState<Answers>({});
  const [current, setCurrent] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.current === "number") setCurrent(parsed.current);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ answers, current }));
    } catch {}
  }, [answers, current, hydrated]);

  const setAnswer = useCallback((id: number, value: number) => {
    setAnswers((a) => ({ ...a, [id]: value }));
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    setCurrent(0);
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= total) return;
      setCurrent(idx);
    },
    [total],
  );

  return { answers, current, setAnswer, setCurrent: goTo, reset };
}
