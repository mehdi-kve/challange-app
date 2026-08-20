import { useEffect, useState } from "react";
import { ChevronLeft } from "./icons";
import { faPad } from "../utils/format";

const TYPE_SPEED = 110;
const BUTTON_DELAY = 420;

const ORDINALS = { 1: "اول", 2: "دوم", 3: "سوم", 4: "چهارم", 5: "نهایی" };

export function TransitionScreen({ level, onFinish }) {
  const text = `مرحله ${ORDINALS[level.index] ?? faPad(level.index)}`;
  const [typed, setTyped] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!level) return;
    let index = 0;
    const typeTimer = setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) clearInterval(typeTimer);
    }, TYPE_SPEED);
    const readyTimer = setTimeout(() => setReady(true), text.length * TYPE_SPEED + BUTTON_DELAY);
    return () => {
      clearInterval(typeTimer);
      clearTimeout(readyTimer);
    };
  }, [level, text]);

  if (!level) return null;

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden text-center">
      <div className="w-full max-w-md animate-rise px-6">
        <p
          className="mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-black tracking-[0.25em]"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)",
            color: "var(--accent)",
          }}
        >
          مرحله بعدی
        </p>

        <h2
          className="mt-6 text-6xl font-black tabular-nums tracking-tight sm:text-7xl"
          style={{ color: "var(--ink)" }}
        >
          {typed}
          <span className="animate-pulse" style={{ color: "var(--accent)" }}>
            _
          </span>
        </h2>
      </div>

      <div className="relative mt-14 flex min-h-14 items-center">
        {ready && (
          <button
            type="button"
            onClick={onFinish}
            className="animate-rise inline-flex items-center gap-2.5 rounded-2xl px-10 py-4 text-base font-black transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            style={{
              color: "var(--base)",
              background: "linear-gradient(to left, var(--accent), var(--accent-2))",
              boxShadow: "0 18px 44px -16px var(--ring)",
            }}
          >
            ادامه
            <ChevronLeft className="size-5" strokeWidth={2.4} />
          </button>
        )}
      </div>
    </div>
  );
}