(function () {
  "use strict";

   const revealEls = document.querySelectorAll(".reveal-up,.reveal-left,.reveal-right,.reveal-fade");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -48px 0px" });
  revealEls.forEach(el => io.observe(el));

   function animateCounter(el, target, suffix) {
    let start = 0;
    const dur = 1600;
    const step = timestamp => {
      if (!start) start = timestamp;
      const p = Math.min((timestamp - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    const nums = [
      { el: document.querySelectorAll(".stat-item__num")[0], val: 40, suf: "+" },
      { el: document.querySelectorAll(".stat-item__num")[1], val: 18, suf: "" },
      { el: document.querySelectorAll(".stat-item__num")[2], val: 36, suf: "mo" },
      { el: document.querySelectorAll(".stat-item__num")[3], val: 100, suf: "%" },
    ];
    const cio = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        nums.forEach(n => { if (n.el) { n.el.textContent = "0" + n.suf; animateCounter(n.el, n.val, n.suf); } });
        cio.disconnect();
      }
    }, { threshold: 0.3 });
    cio.observe(statsSection);
  }

})();
