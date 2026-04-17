

(function () {
  "use strict";

  const navbar        = document.getElementById("navbar");
  const hamburger     = document.getElementById("hamburger");
  const drawer        = document.getElementById("mobileDrawer");
  const overlay       = document.getElementById("navOverlay");
  const themeBtn      = document.getElementById("theme-toggle");
  const themeBtnMob   = document.getElementById("theme-toggle-mobile");   
  const accToggles    = document.querySelectorAll(".mob-acc-toggle");

  function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("show");
    hamburger.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    animateHamburger(true);
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    hamburger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    animateHamburger(false);
  }

  function animateHamburger(isOpen) {
    const bars = hamburger.querySelectorAll(".ham-bar");
    if (isOpen) {
      bars[0].style.cssText = "transform: translateY(7px) rotate(45deg)";
      bars[1].style.cssText = "opacity: 0; transform: scaleX(0)";
      bars[2].style.cssText = "transform: translateY(-7px) rotate(-45deg)";
    } else {
      bars.forEach(b => (b.style.cssText = ""));
    }
  }

  hamburger.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    isOpen ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer();
  });

  accToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.dataset.target;
      const body     = document.getElementById(targetId);
      const icon     = toggle.querySelector(".mob-acc-icon");
      const isOpen   = body.classList.contains("open");

      // Close all others first
      accToggles.forEach(t => {
        const otherId = t.dataset.target;
        const other   = document.getElementById(otherId);
        const otherIcon = t.querySelector(".mob-acc-icon");
        if (otherId !== targetId && other.classList.contains("open")) {
          other.classList.remove("open");
          otherIcon.style.transform = "";
          t.setAttribute("aria-expanded", "false");
        }
      });

      body.classList.toggle("open", !isOpen);
      icon.style.transform   = isOpen ? "" : "rotate(180deg)";
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  const THEME_KEY   = "mf-theme";
  const MOON_EMOJI  = "🌙";
  const SUN_EMOJI   = "☀️";

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("light-mode", !isDark);

    const emoji = isDark ? MOON_EMOJI : SUN_EMOJI;
    if (themeBtn)    { themeBtn.textContent    = emoji; themeBtn.classList.add("theme-toggle-anim"); }
    if (themeBtnMob) { themeBtnMob.textContent = emoji; }

    themeBtn?.addEventListener("animationend", () => {
      themeBtn.classList.remove("theme-toggle-anim");
    }, { once: true });

    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY) || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  themeBtn?.addEventListener("click", toggleTheme);
  themeBtnMob?.addEventListener("click", toggleTheme);
  const rtlBtnDesktop = document.getElementById('rtlToggle');
  const rtlBtnNavbar  = document.getElementById('rtlToggle-navbar');

  function syncRtlLabels(isRTL) {
    const label = isRTL ? 'LTR' : 'RTL';
    if (rtlBtnDesktop) rtlBtnDesktop.textContent = label;
    if (rtlBtnNavbar)  rtlBtnNavbar.textContent  = label;
  }

  const savedDir = localStorage.getItem('dir') || 'ltr';
  document.body.classList.toggle('rtl', savedDir === 'rtl');
  syncRtlLabels(savedDir === 'rtl');

  function handleRtlToggle() {
    const isRTL = document.body.classList.toggle('rtl');
    localStorage.setItem('dir', isRTL ? 'rtl' : 'ltr');
    syncRtlLabels(isRTL);
  }

  rtlBtnDesktop?.addEventListener('click', handleRtlToggle);
  rtlBtnNavbar?.addEventListener('click', handleRtlToggle);
  
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); 
  
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });

})();
