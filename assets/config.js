// assets/config.js
export const STORAGE_KEY = "ostathi:cfg:v1";

export const DEFAULT_CFG = {
  brandName: "أستاذي",
  brandTag: "معلّم ذكي يتكيّف معك",
  logoChar: "أ",

  showProblem: true,
  showSolution: true,

  colors: {
    bg: "#070b12",
    card: "#0c1320",
    accent: "#3b82f6",
    accent2: "#22c55e"
  },

  nav: [
    { title: "الرئيسية", href: "index.html" },
    { title: "المشكلة", href: "problem.html" },
    { title: "الحل", href: "solution.html" },
    { title: "كيف يعمل", href: "how.html" },
    { title: "أمثلة", href: "examples.html" },
    { title: "ابدأ", href: "start.html" }
  ],

  heroTitle: "أستاذي… معلّمك الذكي اللي يفهمك",
  heroSub: "تعليم، تسميع، تصحيح أخطاء، وتحفيز—بنبرة تربوية ذكية بدون تهريج. يتكيّف مع العمر والمستوى وطريقة التعلّم.",

  kpis: [
    { title:"تفاعل حقيقي", desc:"مو فيديو جامد ولا شرح ممل" },
    { title:"تخصيص فوري", desc:"العمر • الهدف • الأسلوب" },
    { title:"جاهز للتوسّع", desc:"فئات جديدة بدون إعادة بناء" }
  ],

  problemList: [
    "الطفل يمل بسرعة، والشرح الطويل يطفّيه.",
    "الحفظ بدون فهم = نسيان سريع.",
    "الواجبات تتراكم وتتحول لضغط يومي.",
    "كل طالب يتعلّم بطريقة مختلفة."
  ],

  solutionText: "معلّم ذكي تفاعلي: يعلّم، يسمّع، يصحح، ويحفز بطريقة تربوية واضحة.",
  solutionList: [
    "خطوة واحدة كل مرة (بدون محاضرات).",
    "تصحيح واضح بدون إحراج.",
    "اختبارات قصيرة تقيس الفهم.",
    "خطة بسيطة حسب وقتك."
  ],

  howList: [
    "تختار الفئة والهدف (تعليم/تسميع/اختبار/خطة).",
    "أستاذي يبدأ بخطوة قصيرة + سؤال تثبيت.",
    "إذا أخطأت: تصحيح + إعادة للمقطع فقط.",
    "إذا أتقنت: تشجيع + تحدي بسيط.",
    "في النهاية: ملخص + خطة قصيرة."
  ],
  howNote: "حاليًا صفحات عرض (MVP). ربط الشات الحقيقي والذكاء نخليه في المرحلة الأخيرة.",

  examples: [
    { user:"علّمني سورة الفاتحة", bot:"تمام! بنبدأ آية آية… اسمعها وراي، وبعدها سمّعني." },
    { user:"ما ودي أذاكر", bot:"واضح إنك تعبان… خلنا 5 دقايق فقط، وبعدها أنت تختار." },
    { user:"اختبرني بسرعة", bot:"تمام: سؤال 1… (وبعدها تقييم مختصر)" }
  ]
};

export function loadCfg() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_CFG);
    const obj = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_CFG),
      ...obj,
      colors: { ...DEFAULT_CFG.colors, ...(obj.colors || {}) },
      nav: Array.isArray(obj.nav) ? obj.nav : DEFAULT_CFG.nav
    };
  } catch {
    return structuredClone(DEFAULT_CFG);
  }
}

export function saveCfg(cfg) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}
