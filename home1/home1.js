
(function () {
  "use strict";

  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  const revealObs = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("revealed"); revealObs.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach(el => revealObs.observe(el));


  const viewport  = document.querySelector(".boxes__viewport");
  const track     = document.getElementById("boxTrack");
  const prevBtn   = document.getElementById("boxPrev");
  const nextBtn   = document.getElementById("boxNext");

  if (track && prevBtn && nextBtn) {
    let idx = 0;

    const cardW = () => {
      const c = track.querySelector(".box-card");
      return c ? c.offsetWidth + 22 : 310; // 22 = gap
    };
    const visible = () => Math.floor((viewport?.offsetWidth || 900) / cardW());
    const maxIdx  = () => Math.max(0, track.querySelectorAll(".box-card").length - visible());

    const slideTo = (n) => {
      idx = Math.max(0, Math.min(n, maxIdx()));
      track.style.transform = `translateX(-${idx * cardW()}px)`;
      prevBtn.style.opacity = idx === 0 ? ".35" : "1";
      nextBtn.style.opacity = idx >= maxIdx() ? ".35" : "1";
    };

    prevBtn.addEventListener("click", () => slideTo(idx - 1));
    nextBtn.addEventListener("click", () => slideTo(idx + 1));

    let dragging = false, startX = 0, startOff = 0;
    viewport.addEventListener("mousedown", e => { dragging = true; startX = e.clientX; startOff = idx * cardW(); });
    window.addEventListener("mousemove", e => {
      if (!dragging) return;
      const raw = startOff + (startX - e.clientX);
      track.style.transform = `translateX(-${Math.max(0, raw)}px)`;
    });
    window.addEventListener("mouseup", e => {
      if (!dragging) return;
      dragging = false;
      slideTo(idx + Math.round((startX - e.clientX) / cardW()));
    });

    let tx = 0;
    viewport.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener("touchend",   e => {
      const d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 48) slideTo(idx + (d > 0 ? 1 : -1));
    });

    slideTo(0);
    window.addEventListener("resize", () => slideTo(idx));
  }


  const tTrack  = document.getElementById("testiTrack");
  const tPrev   = document.getElementById("testiPrev");
  const tNext   = document.getElementById("testiNext");
  const dotsWrap= document.getElementById("testiDots");

  if (tTrack && tPrev && tNext && dotsWrap) {
    const cards = tTrack.querySelectorAll(".testi-card");
    let cur = 0, timer = null;

    cards.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "testi-dot" + (i === 0 ? " active" : "");
      d.setAttribute("aria-label", `Review ${i + 1}`);
      d.addEventListener("click", () => go(i));
      dotsWrap.appendChild(d);
    });

    const syncDots = () =>
      dotsWrap.querySelectorAll(".testi-dot").forEach((d, i) => d.classList.toggle("active", i === cur));

    const go = (n) => {
      cur = ((n % cards.length) + cards.length) % cards.length;
      tTrack.style.transform = `translateX(-${cur * 100}%)`;
      syncDots();
    };

    const startAuto = () => { stopAuto(); timer = setInterval(() => go(cur + 1), 5200); };
    const stopAuto  = () => clearInterval(timer);

    tPrev.addEventListener("click", () => { go(cur - 1); startAuto(); });
    tNext.addEventListener("click", () => { go(cur + 1); startAuto(); });
    tTrack.parentElement.addEventListener("mouseenter", stopAuto);
    tTrack.parentElement.addEventListener("mouseleave", startAuto);

    let ts = 0;
    tTrack.addEventListener("touchstart", e => { ts = e.touches[0].clientX; }, { passive: true });
    tTrack.addEventListener("touchend",   e => {
      const d = ts - e.changedTouches[0].clientX;
      if (Math.abs(d) > 55) { go(cur + (d > 0 ? 1 : -1)); startAuto(); }
    });

    go(0); startAuto();
  }


  const expLine = document.querySelector(".exp-line");
  if (expLine) {
    new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { expLine.classList.add("drawn"); } },
      { threshold: 0.4 }
    ).observe(expLine);
  }

  const expSteps = document.querySelectorAll(".exp-step");
  if (expSteps.length) {
    new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          expSteps.forEach((s, i) => setTimeout(() => s.classList.add("revealed"), i * 110));
        }
      },
      { threshold: 0.18 }
    ).observe(expSteps[0]);
  }


  const rs = document.createElement("style");
  rs.textContent = "@keyframes ripple{to{transform:scale(1);opacity:0}}";
  document.head.appendChild(rs);

  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const r    = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const el   = document.createElement("span");
      el.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;
        top:${e.clientY - r.top - size/2}px;left:${e.clientX - r.left - size/2}px;
        border-radius:50%;background:rgba(255,255,255,0.13);
        transform:scale(0);animation:ripple .5s linear forwards;pointer-events:none;
      `;
      btn.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    });
  });

})();
