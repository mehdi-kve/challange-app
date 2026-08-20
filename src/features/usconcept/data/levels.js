const INK = "#f7efe6";
const MUTED = "rgba(247,239,230,0.6)";
const CARD = "rgba(255,252,246,0.08)";
const BORDER = "rgba(255,252,246,0.12)";

export const LEVELS = {
  1: {
    index: 1,
    title: "فقط یه بازی",
    playful: true,
    theme: {
      base: "#171020",
      blobs: ["#7c3aed", "#a855f7", "#312e81"],
      topGlow: "rgba(167,139,250,0.2)",
      accent: "#a78bfa",
      accent2: "#d8b4fe",
      ink: "#f3eefc",
      muted: "rgba(243,238,252,0.62)",
      card: "rgba(255,255,255,0.07)",
      cardSelected: "rgba(167,139,250,0.18)",
      cardBorder: "rgba(255,255,255,0.12)",
      ring: "rgba(167,139,250,0.5)",
      blobOpacity: 0.42,
    },
  },
  2: {
    index: 2,
    title: "شناختن تو",
    playful: false,
    theme: {
      base: "#141714",
      blobs: ["#3f7a5f", "#7d6a45", "#2e3b35"],
      topGlow: "rgba(157,195,166,0.14)",
      accent: "#9dc3a6",
      accent2: "#d9c7a3",
      ink: INK,
      muted: MUTED,
      card: CARD,
      cardSelected: "rgba(157,195,166,0.16)",
      cardBorder: BORDER,
      ring: "rgba(157,195,166,0.42)",
      blobOpacity: 0.36,
    },
  },
  3: {
    index: 3,
    title: "بین خط‌ها",
    playful: false,
    theme: {
      base: "#1a1216",
      blobs: ["#a04b5e", "#6e3f52", "#8a5a86"],
      topGlow: "rgba(224,141,157,0.16)",
      accent: "#e08d9d",
      accent2: "#f0a58e",
      ink: INK,
      muted: MUTED,
      card: CARD,
      cardSelected: "rgba(224,141,157,0.18)",
      cardBorder: BORDER,
      ring: "rgba(224,141,157,0.44)",
      blobOpacity: 0.4,
    },
  },
  4: {
    index: 4,
    title: "یه ذره صادق‌تر",
    playful: false,
    theme: {
      base: "#10131f",
      blobs: ["#3b5bdb", "#5f3dc4", "#16213d"],
      topGlow: "rgba(122,148,235,0.2)",
      accent: "#7a94eb",
      accent2: "#b3c2ff",
      ink: "#eef1fb",
      muted: "rgba(238,241,251,0.62)",
      card: "rgba(255,255,255,0.07)",
      cardSelected: "rgba(122,148,235,0.18)",
      cardBorder: "rgba(255,255,255,0.12)",
      ring: "rgba(122,148,235,0.5)",
      blobOpacity: 0.4,
    },
  },
  5: {
    index: 5,
    title: "حالا می‌دونی چرا",
    playful: false,
    theme: {
      base: "#261019",
      blobs: ["#e84393", "#fd79a8", "#4a1733"],
      topGlow: "rgba(255,121,168,0.22)",
      accent: "#ff8fb3",
      accent2: "#ffc9d9",
      ink: "#fff0f5",
      muted: "rgba(255,240,245,0.62)",
      card: "rgba(255,240,246,0.08)",
      cardSelected: "rgba(255,143,179,0.2)",
      cardBorder: "rgba(255,240,246,0.12)",
      ring: "rgba(255,143,179,0.5)",
      blobOpacity: 0.42,
    },
  },
};

export const LANDING_THEME = {
  base: "#171020",
  blobs: ["#7c3aed", "#a855f7", "#312e81"],
  topGlow: "rgba(167,139,250,0.2)",
  accent: "#a78bfa",
  accent2: "#d8b4fe",
  ink: "#f3eefc",
  muted: "rgba(243,238,252,0.62)",
  card: "rgba(255,255,255,0.07)",
  cardSelected: "rgba(167,139,250,0.18)",
  cardBorder: "rgba(255,255,255,0.12)",
  ring: "rgba(167,139,250,0.5)",
  blobOpacity: 0.42,
};

export const RESULT_THEME = {
  ...LEVELS[5].theme,
  topGlow: "rgba(255,121,168,0.22)",
};

export function levelMetaForNumber(number) {
  return LEVELS[number];
}