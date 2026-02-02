const CONFIG_URL = "./assets/config.json";
const LS_KEY = "ostathi_config_override_v1";

/** تحميل الإعدادات: الافتراضي من config.json + override من localStorage */
export async function loadConfig() {
  const base = await fetchJSON(CONFIG_URL);
  const override = safeJSONParse(localStorage.getItem(LS_KEY));
  return deepMerge(structuredClone(base), override || {});
}

/** حفظ override (الفرق) على جهاز المستخدم */
export function saveOverride(nextConfig) {
  localStorage.setItem(LS_KEY, JSON.stringify(nextConfig, null, 2));
}

/** مسح override والرجوع للإعدادات الافتراضية */
export function resetOverride() {
  localStorage.removeItem(LS_KEY);
}

/** تشغيل صفحة حسب نوعها */
export async function boot(pageId) {
  const cfg = await loadConfig();

  applyTheme(cfg);
  renderBrand(cfg);
  renderNav(cfg);

  // صفحات
  if (pageId === "home") renderHome(cfg);
  if (pageId === "admin") renderAdmin(cfg);

  // إخفاء روابط حسب flags
  applyFlags(cfg);
}

/* ----------------- Renderers ----------------- */

function applyTheme(cfg) {
  const t = cfg.theme || {};
  const root = document.documentElement;
  root.style.setProperty("--bg", t.bg || "#0b1020");
  root.style.setProperty("--card", t.card || "rgba(255,255,255,0.06)");
  root.style.setProperty("--text", t.text || "#e9efff");
  root.style.setProperty("--muted", t.muted || "rgba(233,239,255,0.70)");
  root.style.setProperty("--accent", t.accent || "#39d98a");
}

function renderBrand(cfg) {
  const s = cfg.site || {};
  setText("brandName", s.name || "");
  setText("brandTag", s.tagline || "");
  setText("logoChar", s.logoChar || "");
}

function renderNav(cfg) {
  const nav = document.getElementById("navLinks");
  if (!nav) return;

  const links = (cfg.nav && cfg.nav.links) ? cfg.nav.links : [];
  nav.innerHTML = links
    .map(l => `<a class="pill" href="${escapeHTML(l.href)}">${escapeHTML(l.label)}</a>`)
    .join("");
}

function renderHome(cfg) {
  setText("heroTitle", cfg.home?.heroTitle || "");
  setText("heroSub", cfg.home?.heroSub || "");
}

function applyFlags(cfg) {
  const f = cfg.flags || {};
  // مثال: لو عندك أقسام بعناوين/Ids تقدر تخفيها هنا
  // حالياً بس نقدر نخفي روابط nav حسب الصفحة:
  // (ممكن نوسّعها بعد ما تثبت ملفات الصفحات)
}

/* ----------------- Admin ----------------- */

function renderAdmin(cfg) {
  // عرض JSON كامل في textarea
  const area = document.getElementById("adminJson");
  if (area) area.value = JSON.stringify(cfg, null, 2);

  // أزرار
  on("btnApply", "click", () => {
    const parsed = safeJSONParse(area.value);
    if (!parsed) return alert("JSON غير صحيح. تأكد من الفواصل والأقواس.");
    saveOverride(parsed);
    alert("تم الحفظ على جهازك ✅ افتح الصفحة الرئيسية لتشوف التغيير.");
  });

  on("btnReset", "click", () => {
    resetOverride();
    alert("تم الرجوع للإعدادات الافتراضية ✅");
    location.reload();
  });

  on("btnOpenHome", "click", () => {
    window.location.href = "./index.html";
  });
}

/* ----------------- Helpers ----------------- */

async function fetchJSON(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.json();
}

function deepMerge(target, source) {
  if (!source || typeof source !== "object") return target;
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (Array.isArray(sv)) target[key] = sv.slice();
    else if (sv && typeof sv === "object") {
      target[key] = deepMerge(tv && typeof tv === "object" ? tv : {}, sv);
    } else {
      target[key] = sv;
    }
  }
  return target;
}

function safeJSONParse(str) {
  if (!str) return null;
  try { return JSON.parse(str); } catch { return null; }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text ?? "";
}

function on(id, evt, fn) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(evt, fn);
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}
