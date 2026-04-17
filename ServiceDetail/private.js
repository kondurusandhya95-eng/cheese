
  const allReveal = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  allReveal.forEach(el => revealObs.observe(el));

  const parallaxImg = document.querySelector('.hero-visual-img-wrap img');
  if (parallaxImg && window.matchMedia('(min-width:769px)'.matches)) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxImg.style.transform = `translateY(${y * 0.12}px)`;
    }, { passive: true });
  }

  window.handleSubscribe = function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = '✓ Inquiry Sent!';
    btn.style.background = 'linear-gradient(135deg,#2a6638,#3a8a4a)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  };

  const rs = document.createElement('style');
  rs.textContent = '@keyframes ripple{to{transform:scale(1);opacity:0}}';
  document.head.appendChild(rs);
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('click', e => {
      const r    = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const el   = document.createElement('span');
      el.style.cssText = `position:absolute;width:${size}px;height:${size}px;top:${e.clientY-r.top-size/2}px;left:${e.clientX-r.left-size/2}px;border-radius:50%;background:rgba(255,255,255,0.12);transform:scale(0);animation:ripple .5s linear forwards;pointer-events:none;`;
      btn.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    });
  });