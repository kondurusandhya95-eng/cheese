(function () {
  "use strict";

  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if (revealEls.length) {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealEls.forEach(el => obs.observe(el));
  }

  const scrollWrap = document.querySelector(".seasonal__scroll-wrap");
  if (scrollWrap) {
    let isDown = false, startX, scrollLeft;

    scrollWrap.addEventListener("mousedown", e => {
      isDown = true;
      startX = e.pageX - scrollWrap.offsetLeft;
      scrollLeft = scrollWrap.scrollLeft;
      scrollWrap.style.cursor = "grabbing";
    });
    window.addEventListener("mouseup", () => {
      isDown = false;
      scrollWrap.style.cursor = "grab";
    });
    scrollWrap.addEventListener("mouseleave", () => { isDown = false; scrollWrap.style.cursor = "grab"; });
    scrollWrap.addEventListener("mousemove", e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollWrap.offsetLeft;
      scrollWrap.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });

    const dragHint = document.querySelector(".seasonal__drag-hint");
    scrollWrap.addEventListener("scroll", () => {
      if (dragHint && scrollWrap.scrollLeft > 20) {
        dragHint.style.opacity = "0";
        dragHint.style.transition = "opacity .4s";
      }
    }, { passive: true });
  }

  const pairItems = document.querySelectorAll(".pair-item");
  pairItems.forEach(item => {
    const toggle = item.querySelector(".pair-item__toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const isOpen = item.classList.contains("pair-item--open");

      pairItems.forEach(pi => {
        pi.classList.remove("pair-item--open");
        const arrow = pi.querySelector(".pair-item__arrow");
        if (arrow) arrow.style.transform = "";
      });

      if (!isOpen) {
        item.classList.add("pair-item--open");
        const arrow = item.querySelector(".pair-item__arrow");
        if (arrow) arrow.style.transform = "rotate(180deg)";
      }
    });

    toggle.setAttribute("aria-expanded", item.classList.contains("pair-item--open") ? "true" : "false");
  });


  const affSteps = document.querySelectorAll(".aff-step");
  if (affSteps.length) {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          affSteps.forEach((s, i) => {
            setTimeout(() => s.classList.add("revealed"), i * 130);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (affSteps[0]?.parentElement) obs.observe(affSteps[0].parentElement);
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
        border-radius:50%;background:rgba(255,255,255,0.12);
        transform:scale(0);animation:ripple .5s linear forwards;pointer-events:none;
      `;
      btn.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    });
  });


  const stack = document.querySelector(".quiz-cta__card-stack");
  if (stack) {
    stack.addEventListener("mousemove", e => {
      const r = stack.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width  - 0.5;
      const cy = (e.clientY - r.top)  / r.height - 0.5;
      stack.style.transform = `perspective(600px) rotateY(${cx * 6}deg) rotateX(${-cy * 5}deg)`;
    });
    stack.addEventListener("mouseleave", () => {
      stack.style.transform = "";
      stack.style.transition = "transform .5s var(--ease)";
    });
  }

  const regions = document.querySelectorAll(".provenance__region");
  regions.forEach(r => {
    r.addEventListener("mouseenter", () => {
      regions.forEach(o => { if (o !== r) o.style.opacity = ".55"; });
    });
    r.addEventListener("mouseleave", () => {
      regions.forEach(o => { o.style.opacity = ""; });
    });
  });

})();
