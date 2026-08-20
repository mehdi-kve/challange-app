import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "./icons";

const REVEALS = [
  { at: 0, node: <p className="text-6xl font-black tracking-tight">تمام شد.</p> },
  { at: 700, node: <p className="text-sm font-semibold">خب...</p> },
  {
    at: 1500,
    node: (
      <p className="text-lg font-black leading-10">
        حالا یه راهنمای کوچیک دارم
        <br />
        برای اینکه بهتر بفهممت. <span>❤️</span>
      </p>
    ),
  },
  {
    at: 2600,
    node: (
      <p className="text-sm font-semibold" style={{ color: "var(--muted)" }}>
        ممنون که جواب دادی.
      </p>
    ),
  },
];

const EPILOGUE_AT = 5400;
const BUTTON_AT = EPILOGUE_AT + 800;

export function ResultScreen({ onClose }) {
  const [shown, setShown] = useState(1);
  const [epilogue, setEpilogue] = useState(false);
  const [ready, setReady] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    timers.current = REVEALS.map((item, index) => setTimeout(() => setShown((count) => Math.max(count, index + 1)), item.at));
    timers.current.push(setTimeout(() => setEpilogue(true), EPILOGUE_AT));
    timers.current.push(setTimeout(() => setReady(true), BUTTON_AT));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center text-center">
      <div className="flex min-h-80 flex-col items-center gap-4">
        {REVEALS.slice(0, shown).map((item) => (
          <div key={item.at} className="animate-line-in" style={{ color: "var(--ink)" }}>
            {item.node}
          </div>
        ))}

        {epilogue && (
          <p
            className="animate-line-in mt-8 max-w-xs text-xs font-semibold leading-7"
            style={{ color: "var(--muted)" }}
          >
            بعضی جواب‌ها فقط جواب یه سؤال نیستن.
          </p>
        )}
      </div>

      <div className="flex min-h-16 items-center">
        {ready && (
          <button
            type="button"
            onClick={onClose}
            className="animate-line-in inline-flex items-center gap-2 rounded-2xl px-6 py-4 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            style={{
              color: "var(--base)",
              background: "linear-gradient(to left, var(--accent), var(--accent-2))",
              boxShadow: "0 18px 40px -18px var(--ring)",
            }}
          >
            بستن این بخش
            <ChevronLeft className="size-5" strokeWidth={2.2} />
          </button>
        )}
      </div>
    </div>
  );
}