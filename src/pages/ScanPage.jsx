import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { AppShell } from "../components/layout/AppShell";
import { LANDING_THEME } from "../features/usconcept/data/levels";
import { parsePayload } from "../features/usconcept/utils/payload";
import { REVIEW_STORAGE_KEY } from "../features/usconcept/hooks/useReviewFlow";
import { ChevronLeft, ChevronRight } from "../features/usconcept/components/icons";

export function ScanPage() {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [manual, setManual] = useState("");

  const handlePayload = (payload) => {
    sessionStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(payload));
    window.location.hash = "/review";
  };

  useEffect(() => {
    let scanner = null;
    let cancelled = false;

    (async () => {
      try {
        scanner = new Html5Qrcode("scan-reader");
        scannerRef.current = scanner;
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 230, height: 230 } },
          (decoded) => {
            const payload = parsePayload(decoded);
            if (payload) {
              handlePayload(payload);
            } else {
              setError("این QR معتبر نیست؛ مطمئن شو از همین اپ اسکن میکنی.");
            }
          },
          () => {}
        );
        if (!cancelled) setScanning(true);
      } catch {
        if (!cancelled) setError("دوربین در دسترس نیست یا دسترسی داده نشده.");
      }
    })();

    return () => {
      cancelled = true;
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch(() => {})
          .then(() => scannerRef.current.clear())
          .catch(() => {});
        scannerRef.current = null;
      }
    };
  }, []);

  const submitManual = () => {
    const payload = parsePayload(manual.trim());
    if (payload) {
      handlePayload(payload);
    } else {
      setError("متن وارد شده معتبر نیست؛ باید متن کامل داخل QR باشه.");
    }
  };

  return (
    <AppShell theme={LANDING_THEME}>
      <div className="flex min-h-full flex-col">
        <header className="flex items-center gap-3 pb-6">
          <a
            href="#/"
            aria-label="بازگشت"
            className="grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
            style={{
              borderColor: "var(--card-border)",
              backgroundColor: "var(--card)",
              color: "var(--muted)",
              boxShadow: "0 10px 24px -18px var(--ring)",
            }}
          >
            <ChevronRight className="size-5" />
          </a>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-black" style={{ color: "var(--ink)" }}>
              اسکن QR
            </h1>
            <p className="text-[11px] font-bold" style={{ color: "var(--muted)" }}>
              QR رو جلوی دوربین بگیر تا جواب‌ها رو ببینی
            </p>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-5">
          <div
            id="scan-reader"
            className="overflow-hidden rounded-3xl border"
            style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card)" }}
          />

          {scanning && (
            <p className="text-center text-[11px] font-bold" style={{ color: "var(--muted)" }}>
              منتظر QR هستم...
            </p>
          )}

          {error && (
            <p
              className="rounded-2xl border px-4 py-3 text-center text-xs font-bold leading-6"
              style={{
                color: "var(--ink)",
                backgroundColor: "color-mix(in srgb, #ff5f6d 14%, transparent)",
                borderColor: "rgba(255,95,109,0.4)",
              }}
            >
              {error}
            </p>
          )}

          <div
            className="rounded-3xl border p-5"
            style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card)" }}
          >
            <p className="mb-3 text-xs font-black" style={{ color: "var(--ink)" }}>
              دوربین کار نمیکنه؟ متن QR رو اینجا بچسبون
            </p>
            <textarea
              value={manual}
              onChange={(event) => setManual(event.target.value)}
              placeholder='مثلاً {"v":1,"app":"usconcept",...}'
              rows={3}
              className="w-full resize-none rounded-2xl border px-4 py-3 text-xs font-medium leading-5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
              style={{ color: "var(--ink)", backgroundColor: "var(--base)", borderColor: "var(--card-border)" }}
            />
            <button
              type="button"
              onClick={submitManual}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
              style={{
                color: "var(--base)",
                background: "linear-gradient(to left, var(--accent), var(--accent-2))",
                boxShadow: "0 18px 40px -18px var(--ring)",
              }}
            >
              مشاهده پاسخ‌ها
              <ChevronLeft className="size-5" strokeWidth={2.4} />
            </button>
          </div>
        </main>
      </div>
    </AppShell>
  );
}

export default ScanPage;