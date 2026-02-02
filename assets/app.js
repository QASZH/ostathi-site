// assets/app.js
import { loadCfg, saveCfg, DEFAULT_CFG } from "./config.js";

const $ = (id) => document.getElementById(id);

function applyTheme(cfg){
  document.documentElement.style.setProperty("--bg", cfg.colors.bg);
  document.documentElement.style.setProperty("--card", cfg.colors.card);
  document.documentElement.style.setProperty("--accent", cfg.colors.accent);
  document.documentElement.style.setProperty("--accent2", cfg.colors.accent2);
}

function renderNav(cfg){
  const links = $("navLinks");
  links.innerHTML = "";
  cfg.nav.forEach(x=>{
    const a = document.createElement("a");
    a.className = "chip";
    a.href = x.href;
    a.textContent = x.title;
    links.appendChild(a);
  });
}

function setText(id, value){ if($(id)) $(id).textContent = value ?? ""; }

function setList(id, items){
  const el = $(id);
  if(!el) return;
  el.innerHTML = (items || []).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function renderKpis(cfg){
  const el = $("kpis");
  if(!el) return;
  el.innerHTML = "";
  (cfg.kpis||[]).forEach(x=>{
    const d=document.createElement("div");
    d.className="kpi";
    d.innerHTML = `<b>${escapeHtml(x.title||"")}</b><span>${escapeHtml(x.desc||"")}</span>`;
    el.appendChild(d);
  });
}

function renderExamples(cfg){
  const box = $("examplesBox");
  if(!box) return;
  box.innerHTML = "";
  (cfg.examples||[]).forEach(e=>{
    const d=document.createElement("div");
    d.className="demo";
    d.innerHTML = `
      <div class="bubble"><small>الطالب</small><strong>${escapeHtml(e.user)}</strong></div>
      <div class="bubble"><small>أستاذي</small><strong>${escapeHtml(e.bot)}</strong></div>
    `;
    box.appendChild(d);
  });
}

function initAdmin(cfg){
  // بسيط: تعديل الأساسيات + استيراد/تصدير + رجوع افتراضي
  const out = $("adminJson");
  if(!out) return;

  out.value = JSON.stringify(cfg, null, 2);

  $("btnSave")?.addEventListener("click", ()=>{
    try{
      const obj = JSON.parse(out.value);
      saveCfg(obj);
      alert("تم الحفظ ✅ افتح الصفحات وشوف التغيير");
    }catch(e){
      alert("JSON فيه خطأ: " + e.message);
    }
  });

  $("btnReset")?.addEventListener("click", ()=>{
    if(!confirm("ترجع للافتراضي؟")) return;
    saveCfg(structuredClone(DEFAULT_CFG));
    out.value = JSON.stringify(DEFAULT_CFG, null, 2);
    alert("تم ✅");
  });

  $("btnExport")?.addEventListener("click", ()=>{
    const blob = new Blob([out.value], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href=url; a.download="ostathi-config.json";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });

  $("btnImport")?.addEventListener("click", ()=>{
    const inp = document.createElement("input");
    inp.type="file"; inp.accept="application/json";
    inp.onchange = async ()=>{
      const f = inp.files?.[0]; if(!f) return;
      const text = await f.text();
      try{
        JSON.parse(text);
        out.value = text;
        alert("تم تحميل الملف. اضغط حفظ لتطبيقه ✅");
      }catch(e){
        alert("ملف غير صالح: " + e.message);
      }
    };
    inp.click();
  });
}

export function getConfig() {
  return loadCfg();
}

export function setConfig(patch) {
  const current = loadCfg();
  const merged = { ...current, ...patch };
  saveCfg(merged);
}

export function resetConfig() {
  saveCfg(structuredClone(DEFAULT_CFG));
}

export function exportConfig() {
  return JSON.stringify(loadCfg(), null, 2);
}

export function boot(pageName){
  const cfg = loadCfg();
  applyTheme(cfg);

  // Header common
  setText("logoChar", cfg.logoChar);
  setText("brandName", cfg.brandName);
  setText("brandTag", cfg.brandTag);
  renderNav(cfg);

  // Page specific
  if(pageName === "home"){
    setText("heroTitle", cfg.heroTitle);
    setText("heroSub", cfg.heroSub);
    renderKpis(cfg);
  }

  if(pageName === "problem") setList("problemList", cfg.problemList);
  if(pageName === "solution"){
    setText("solutionText", cfg.solutionText);
    setList("solutionList", cfg.solutionList);
  }
  if(pageName === "how"){
    const ol = $("howList");
    if(ol) ol.innerHTML = (cfg.howList||[]).map(x=>`<li>${escapeHtml(x)}</li>`).join("");
    setText("howNote", cfg.howNote);
  }
  if(pageName === "examples") renderExamples(cfg);
  if(pageName === "admin") initAdmin(cfg);
}
