import {
  Zap,
  Feather,
  Sparkles,
  Compass,
  Dumbbell,
  BookOpen,
  Puzzle,
  Palette,
  Plane,
  ChefHat,
  Sunrise,
  Sun,
  Sunset,
  Moon,
} from "lucide-react";

export const questions = [
  {
    id: "q1",
    type: "single",
    title: "برای شروع، کدوم انرژی تو رو بهتر توصیف می‌کنه؟",
    description: "جواب درستی وجود نداره؛ فقط بر اساس اولین حست انتخاب کن.",
    options: [
      { id: "energy", label: "انرژی", description: "همیشه پر از تحرک و نشاطم", icon: Zap },
      { id: "calm", label: "آرامش", description: "تعادل و سکون رو ترجیح می‌دم", icon: Feather },
      { id: "creative", label: "خلاقیت", description: "ایده‌های تازه دنبال منن", icon: Sparkles },
      { id: "curious", label: "کنجکاوی", description: "همیشه دنبال کشف چیزهای جدیدم", icon: Compass },
    ],
  },
  {
    id: "q2",
    type: "yesno",
    title: "دوست داری آدم‌های جدید و محیط‌های تازه رو تجربه کنی؟",
    description: "یه دنیای پر از آدم، مکان و ماجراهای جدید.",
  },
  {
    id: "q3",
    type: "slider",
    title: "میزان آمادگیت برای شروع یک چالش تازه چقدره؟",
    description: "بکش به سمت راست یا چپ؛ مقدار دقیقش مهم نیست.",
    min: 0,
    max: 100,
    step: 5,
    unit: "٪",
  },
  {
    id: "q4",
    type: "multiple",
    title: "کدوم فعالیت‌ها برات جذابن؟",
    description: "هرچند مورد که دوست داری انتخاب کن؛ می‌تونی بعداً برگردی و تغییرش بدی.",
    options: [
      { id: "sport", label: "ورزش", icon: Dumbbell },
      { id: "read", label: "مطالعه", icon: BookOpen },
      { id: "brain", label: "بازی فکری", icon: Puzzle },
      { id: "art", label: "هنر و موسیقی", icon: Palette },
      { id: "travel", label: "سفر", icon: Plane },
      { id: "cook", label: "آشپزی", icon: ChefHat },
    ],
  },
  {
    id: "q5",
    type: "card",
    title: "بهترین زمان روز برای تو کدومه؟",
    description: "وقتی بیشترین تمرکز و حالِ خوب رو داری.",
    options: [
      { id: "morning", label: "صبح زود", description: "قبل از اینکه شهر بیدار بشه", icon: Sunrise },
      { id: "noon", label: "ظهر", description: "وسط روز و پرانرژی", icon: Sun },
      { id: "evening", label: "عصر", description: "بعد از خستگی روزانه", icon: Sunset },
      { id: "night", label: "شب", description: "وقتی همه‌چیز ساکته", icon: Moon },
    ],
  },
  {
    id: "q6",
    type: "select",
    title: "موقع کار و تمرکز چه نوع موسیقی رو بیشتر دوست داری؟",
    description: "انتخاب‌ها رو ببین و یکی رو برگزین.",
    placeholder: "یک گزینه انتخاب کن",
    options: [
      { id: "instrumental", label: "بکلام" },
      { id: "pop", label: "پاپ" },
      { id: "classical", label: "کلاسیک" },
      { id: "electronic", label: "الکترونیک" },
      { id: "ambient", label: "محیطی و ملایم" },
      { id: "none", label: "اصلاً موسیقی نه" },
    ],
  },
  {
    id: "q7",
    type: "number",
    title: "به‌طور متوسط چند ساعت وقت خالی در روز داری؟",
    description: "فقط یه عدد تقریبی بنویس.",
    placeholder: "مثلاً ۳",
    min: 1,
    max: 12,
    unit: "ساعت",
  },
  {
    id: "q8",
    type: "text",
    title: "اگه قرار باشه همین امروز یک قدم کوچیک به سمت هدفت برداری، چیکار می‌کنی؟",
    description: "این جواب، شروع مسیر خودته؛ با خیال راحت بنویس.",
    placeholder: "مثلاً: نیم ساعت پیاده‌روی، شروع یه کتاب، یادداشت ایده‌ها...",
  },
];

export const optionLabelMap = questions.reduce((acc, question) => {
  (question.options ?? []).forEach((option) => {
    acc[option.id] = { label: option.label, icon: option.icon };
  });
  return acc;
}, {});
