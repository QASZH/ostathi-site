// assets/app.js
import { loadCfg, saveCfg, DEFAULT_CFG } from "./config.js";

const $ = (id) => document.getElementById(id);

function applyTheme(cfg){
  document.documentElement.style.setProperty("--bg", cfg.colors.bg);
  document.documentElement.style.setProperty("--card", cfg.colors.card);
  document.documentElement.style.setProperty("--accent", cfg.colors.accent);
  document.documentElement.style.setProperty("--accent2", cfg.colors.accent2);
  document.documentElement.style.setProperty("--logo-size", (cfg.logoSize || 40) + "px");
}

function renderNav(cfg){
  const links = $("navLinks");
  if(!links) return;
  links.innerHTML = "";
  cfg.nav.forEach(x=>{
    if(x.href.includes("problem") && cfg.showProblem === false) return;
    if(x.href.includes("solution") && cfg.showSolution === false) return;

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

export function getConfig() {
  return loadCfg();
}

export function setConfig(patch) {
  const current = loadCfg();
  const merged = { ...current, ...patch };
  saveCfg(merged);
  applyTheme(merged); // Immediate visual feedback if called
}

export function replaceConfig(cfg) {
  saveCfg(cfg);
  applyTheme(cfg);
}

export function resetConfig() {
  saveCfg(structuredClone(DEFAULT_CFG));
}

export function exportConfig() {
  return JSON.stringify(loadCfg(), null, 2);
}

const SESS_KEY = "ostathi:sess:v1";

export function login(user, pass) {
  const cfg = loadCfg();
  const u = (cfg.users || []).find(x => x.name === user && x.pass === pass);
  if (u) {
    localStorage.setItem(SESS_KEY, JSON.stringify(u));
    return { success: true, user: u };
  }
  return { success: false, msg: "اسم المستخدم أو كلمة المرور غير صحيحة" };
}

export function logout() {
  localStorage.removeItem(SESS_KEY);
  window.location.href = "login.html";
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESS_KEY));
  } catch {
    return null;
  }
}

export function checkAuth(requiredRole) {
  const u = getCurrentUser();
  if (!u) {
    window.location.href = "login.html";
    return false;
  }
  if (requiredRole && u.role !== requiredRole && u.role !== "admin") {
    alert("عذرًا، ليس لديك صلاحية للدخول لهذه الصفحة.");
    window.location.href = "index.html";
    return false;
  }
  return true;
}

export function boot(pageName){
  const cfg = loadCfg();
  applyTheme(cfg);

  // Header common
  setText("logoChar", cfg.logoChar);
  setText("brandName", cfg.brandName);
  setText("brandTag", cfg.brandTag);
  renderNav(cfg);

  const currentUser = getCurrentUser();
  if (currentUser) {
    const links = $("navLinks");
    if(links) {
      // Add Logout Button
      const a = document.createElement("a");
      a.className = "chip";
      a.style.borderColor = "rgba(255,100,100,0.4)";
      a.href = "#";
      a.textContent = `خروج (${currentUser.name})`;
      a.onclick = (e) => { e.preventDefault(); logout(); };
      links.appendChild(a);
    }
  }

  // Page specific
  if(pageName === "home"){
    setText("heroTitle", cfg.heroTitle);
    setText("heroSub", cfg.heroSub);
    renderKpis(cfg);
  }

  if(pageName === "start"){
    setText("startTitle", cfg.startPage?.title);
    setText("startSub", cfg.startPage?.sub);
    setText("startBtn", cfg.startPage?.btn);
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
}
