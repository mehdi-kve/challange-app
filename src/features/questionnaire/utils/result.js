import { Gamepad2, Paintbrush, Brain, Scale } from "lucide-react";

const TYPES = [
  {
    key: "adventurous",
    title: "ماجراجو",
    description:
      "تو آدمِ حرکت و‌ هیجان هستی. دنیا برای تو یه مسیرِ بازه؛ کافیه اولین قدم رو برداری.",
    icon: Gamepad2,
  },
  {
    key: "creative",
    title: "خلاق",
    description:
      "ذهن تو کارخانه‌ی ایده‌ست. بهترین چالش برای تو اونیه که راهِ متفاوت بسازه، نه راهِ آماده.",
    icon: Paintbrush,
  },
  {
    key: "thoughtful",
    title: "متفکر",
    description:
      "قبل از هر قدم، عمیق فکر می‌کنی و با آگاهی حرکت می‌کنی. آروم، دقیق و قابل اعتماد.",
    icon: Brain,
  },
  {
    key: "balanced",
    title: "متعادل",
    description:
      "تو هم آهسته‌ای و هم پیوسته. بهترین چالش برای تو اونیه که به زندگی‌ات نظم و آرامش اضافه کنه.",
    icon: Scale,
  },
];

const q = (answers) => ({
  q1: answers.q1,
  q2: answers.q2,
  q3: Number(answers.q3) || 0,
  q4: Array.isArray(answers.q4) ? answers.q4 : [],
  q5: answers.q5,
});

export function calculateResult(answers) {
  const { q1, q2, q3, q4, q5 } = q(answers);
  const scores = { adventurous: 0, creative: 0, thoughtful: 0, balanced: 0 };

  const add = (key, n = 1) => {
    scores[key] += n;
  };

  switch (q1) {
    case "energy":
      add("adventurous", 2);
      break;
    case "creative":
      add("creative", 2);
      break;
    case "curious":
      add("adventurous");
      add("thoughtful");
      break;
    default:
      add("balanced", 2);
  }

  if (q2 === "yes") add("adventurous");
  else add("thoughtful");

  if (q3 >= 70) add("adventurous");
  if (q3 <= 40) add("balanced");

  if (q4.includes("sport")) add("adventurous");
  if (q4.includes("travel")) add("adventurous");
  if (q4.includes("art")) add("creative");
  if (q4.includes("brain")) add("thoughtful");
  if (q4.includes("read")) add("thoughtful");
  if (q4.includes("cook")) add("balanced");

  switch (q5) {
    case "morning":
      add("balanced");
      add("thoughtful");
      break;
    case "night":
      add("creative");
      break;
    case "evening":
      add("creative");
      add("adventurous");
      break;
    default:
      add("adventurous");
  }

  const sorted = TYPES.map((type) => ({ ...type, score: scores[type.key] })).sort(
    (a, b) => b.score - a.score
  );

  return sorted[0];
}