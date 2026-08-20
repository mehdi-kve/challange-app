import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { ChevronLeft } from "./icons";
import { questions } from "../data/questions";
import { buildPayload } from "../utils/payload";

const REVEALS = [
  {
    at: 0,
    node: (
      <p className="text-6xl font-black tracking-tight">خب سوالات تموم شد</p>
    ),
  },
  {
    at: 700,
    node: (
      <p className="text-sm font-semibold">
        خسته نباشی{" "}
        <span className="emoji" aria-hidden>
          ☺
        </span>
      </p>
    ),
  },
  {
    at: 1500,
    node: (
      <p className="text-lg font-black leading-10">
        مرسی ازت که جواب دادی. <span>🥺❤️</span>
      </p>
    ),
  },
];

const EPILOGUE_AT = 5400;
const QR_AT = EPILOGUE_AT + 600;

export function ResultScreen({ answers, onClose }) {
  const [shown, setShown] = useState(1);
  const [epilogue, setEpilogue] = useState(false);
  const [ready, setReady] = useState(false);
  const [qr, setQr] = useState(null);
  const timers = useRef([]);

  useEffect(() => {
    timers.current = REVEALS.map((item, index) =>
      setTimeout(
        () => setShown((count) => Math.max(count, index + 1)),
        item.at,
      ),
    );
    timers.current.push(setTimeout(() => setEpilogue(true), EPILOGUE_AT));
    timers.current.push(setTimeout(() => setReady(true), QR_AT));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const payload = useMemo(
    () => buildPayload(answers ?? {}, questions),
    [answers],
  );
  const payloadJson = useMemo(() => JSON.stringify(payload), [payload]);

  useEffect(() => {
    QRCode.toDataURL(payloadJson, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 720,
      color: { dark: "#0f0a18", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(null));
  }, [payloadJson]);

  const download = async () => {
    if (!qr) return;
    const link = document.createElement("a");
    link.href = qr;
    link.download = "project-us-answers.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const share = async () => {
    if (!qr) return;
    try {
      const blob = await (await fetch(qr)).blob();
      const file = new File([blob], "project-us-answers.png", {
        type: "image/png",
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "پاسخ‌های Project UsConcept",
          text: payloadJson,
        });
        return;
      }
    } catch (error) {
      if (error.name === "AbortError") return;
    }
    download();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center text-center">
      <div className="flex min-h-72 flex-col items-center gap-4">
        {REVEALS.slice(0, shown).map((item) => (
          <div
            key={item.at}
            className="animate-line-in"
            style={{ color: "var(--ink)" }}
          >
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

      <div className="flex w-full flex-col items-center gap-4 pt-6">
        {ready && (
          <>
            <div className="animate-line-in rounded-3xl bg-white p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
              {qr ? (
                <img
                  src={qr}
                  alt="QR کد پاسخ‌ها"
                  className="h-52 w-52 rounded-2xl"
                />
              ) : (
                <div
                  className="h-52 w-52 animate-pulse-slow rounded-2xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
                />
              )}
            </div>

            <p
              className="animate-line-in max-w-xs text-xs font-semibold leading-6"
              style={{ color: "var(--muted)" }}
            >
              این QR جواب‌های تو رو داره؛ اسکنش کن تا جواب‌ها رو ببینی.
            </p>

            <div className="animate-line-in flex w-full max-w-xs flex-col gap-2.5">
              <button
                type="button"
                onClick={share}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                style={{
                  color: "var(--base)",
                  background:
                    "linear-gradient(to left, var(--accent), var(--accent-2))",
                  boxShadow: "0 18px 40px -18px var(--ring)",
                }}
              >
                اشتراک‌گذاری QR
              </button>
              <button
                type="button"
                onClick={download}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                style={{
                  borderColor: "var(--card-border)",
                  color: "var(--ink)",
                  backgroundColor: "var(--card)",
                }}
              >
                دانلود QR
              </button>
            </div>

            <a
              href="#/scan"
              className="animate-line-in inline-flex items-center gap-1.5 text-[11px] font-bold transition-colors duration-300 hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              اسکن روی دستگاه دیگه
            </a>

            <div className="flex min-h-8 items-center">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
                style={{
                  color: "var(--ink)",
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--card-border)",
                }}
              >
                بستن این بخش
                <ChevronLeft className="size-5" strokeWidth={2.2} />
              </button>
            </div>

            <p
              className="animate-line-in pt-4 text-[11px] font-bold"
              style={{ color: "var(--muted)" }}
            >
              ساخته شده با{" "}
              <span className="emoji" aria-hidden>
                ❤️
              </span>{" "}
              توسط m3hdi.kve
            </p>
          </>
        )}
      </div>
    </div>
  );
}
