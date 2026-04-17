(function () {
  "use strict";

  /* ── Theme Toggle ── */
  const THEME_KEY  = "mf-theme";
  const themeBtn   = document.getElementById("themeToggle");

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("light-mode", !isDark);

    const emoji = isDark ? "\u{1F319}" : "\u2600\uFE0F";
    if (themeBtn) {
      themeBtn.textContent = emoji;
      themeBtn.classList.add("theme-toggle-anim");
    }

    themeBtn?.addEventListener("animationend", () => {
      themeBtn.classList.remove("theme-toggle-anim");
    }, { once: true });

    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY) || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeBtn?.addEventListener("click", toggleTheme);

  /* ── RTL Toggle ── */
  const rtlBtn = document.getElementById("rtlToggle");

  function syncRtlLabel(isRTL) {
    if (rtlBtn) rtlBtn.textContent = isRTL ? "LTR" : "RTL";
  }

  const savedDir = localStorage.getItem("dir") || "ltr";
  document.body.classList.toggle("rtl", savedDir === "rtl");
  if (savedDir === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
  }
  syncRtlLabel(savedDir === "rtl");

  function handleRtlToggle() {
    const isRTL = document.body.classList.toggle("rtl");
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    localStorage.setItem("dir", isRTL ? "rtl" : "ltr");
    syncRtlLabel(isRTL);
  }

  rtlBtn?.addEventListener("click", handleRtlToggle);

})();