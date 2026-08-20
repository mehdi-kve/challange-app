import { Background } from "./Background";

export function AppShell({ theme, children }) {
  return (
    <div
      className="relative min-h-dvh font-sans"
      style={{
        color: theme.ink ?? "#fff",
        "--base": theme.base ?? "#0f172a",
        "--accent": theme.accent,
        "--accent-2": theme.accent2,
        "--ink": theme.ink ?? "#fff",
        "--muted": theme.muted ?? "rgba(255,255,255,0.6)",
        "--card": theme.card ?? "rgba(255,255,255,0.05)",
        "--card-selected": theme.cardSelected ?? "rgba(255,255,255,0.1)",
        "--card-border": theme.cardBorder ?? "rgba(255,255,255,0.1)",
        "--ring": theme.ring ?? "rgba(120,120,120,0.3)",
      }}
    >
      <Background theme={theme} />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-6 sm:px-8">
        {children}
      </div>
    </div>
  );
}