

document.addEventListener('DOMContentLoaded', () => {

  const revealEls = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

   window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  const heroImg = document.querySelector('.hero-img-wrap img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      if (offset < window.innerHeight * 1.2) {
        heroImg.style.transform = `scale(1) translateY(${offset * 0.04}px)`;
      }
    }, { passive: true });
  }

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * 8;
      const tiltY = -(x / rect.width) * 8;
      card.style.transform = `translateY(-10px) scale(1.01) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.transition = 'transform 0.1s ease, box-shadow 0.35s ease, border-color 0.3s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });
  const testiCards = document.querySelectorAll('.testi-card');
  if (testiCards.length) {
    let active = 1; // middle card
    setInterval(() => {
      testiCards.forEach((c, i) => {
        c.classList.toggle('featured', i === active);
      });
      active = (active + 1) % testiCards.length;
    }, 3500);
  }

  const form = document.getElementById('ctaForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('.btn-primary');
      if (!input.value || !input.checkValidity()) {
        input.style.borderColor = '#e05252';
        setTimeout(() => input.style.borderColor = '', 1500);
        return;
      }
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'linear-gradient(135deg, #5a9c6b, #7bc48a)';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
      }, 4000);
    });
  }

  document.querySelectorAll('.award-item').forEach((item, i) => {
    const aio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transition = `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms, opacity 0.5s ease ${i * 80}ms`;
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 0);
          aio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    aio.observe(item);
  });

});

