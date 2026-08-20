import { ChevronLeft } from "./icons";

export function LandingScreen({ onStart }) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center text-center">
      <div className="w-full max-w-sm animate-rise">
        <div
          className="emoji mx-auto mb-8 grid size-24 place-items-center rounded-[2rem] text-6xl"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--ring)",
            color: "var(--accent)",
            boxShadow: "0 24px 48px -28px var(--ring)",
          }}
          aria-hidden
        >
          😎
        </div>

        <h1 className="text-[2.6rem] font-black leading-tight tracking-tight" style={{ color: "var(--ink)" }}>
          سلام سلام
        </h1>
        <p className="mt-3 text-base font-bold" style={{ color: "var(--muted)" }}>
          این یه چالشه؛ سعی کن بهترین جواب‌ها رو انتخاب کنی.
        </p>

        <div className="my-9" aria-hidden>
          <div className="mx-auto h-px w-16" style={{ backgroundColor: "var(--card-border)" }} />
        </div>

        <p className="text-[15px] font-medium leading-8" style={{ color: "var(--ink)" }}>
          بعضی سؤال‌ها آسونن؛
          <br />
          بعضی‌ها شاید یه کم بیشتر به فکر فرو ببرنت.
        </p>

        <div
          className="mx-auto mt-9 grid size-14 place-items-center rounded-full text-2xl font-black"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--card-border)", boxShadow: "0 0 40px -10px var(--ring)", color: "var(--accent)" }}
          aria-hidden
        >
          ؟
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-10 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-base font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
          style={{
            color: "var(--base)",
            background: "linear-gradient(to left, var(--accent), var(--accent-2))",
            boxShadow: "0 18px 40px -18px var(--ring)",
          }}
        >
          شروع می‌کنم
          <ChevronLeft className="size-5" />
        </button>
      </div>
    </div>
  );
}