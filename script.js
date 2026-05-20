/* ============================================================
   PACT — script.js
   ============================================================ */

/* ---- Waitlist form handler (stub) ----
   Swap the body of this for a real endpoint when you wire up
   a provider (Loops, ConvertKit, Formspark, etc.). */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-primary');
  const input = form.querySelector('input');
  const original = btn.innerHTML;

  btn.innerHTML = "You're in. Day 0 starts when we launch.";
  input.value = '';
  input.disabled = true;

  setTimeout(() => {
    btn.innerHTML = original;
    input.disabled = false;
  }, 4200);

  return false;
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Intersection-based reveals ---- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => io.observe(el));

  /* ---- Animated counters ---- */
  function animateCounter(el, target, duration, suffix) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(eased * target) + (suffix || '');
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function watchCounter(selector, attr, duration, suffix) {
    const els = document.querySelectorAll(selector);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = parseInt(entry.target.dataset[attr], 10);
        animateCounter(entry.target, target, duration, suffix);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    els.forEach(el => obs.observe(el));
  }

  watchCounter('[data-count]', 'count', 1400, '%');
  watchCounter('[data-streak]', 'streak', 1200, '');
  watchCounter('[data-money]', 'money', 1600, '');

  /* ---- Progress bar fill ---- */
  const progressBars = document.querySelectorAll('[data-progress]');
  const progressIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = parseInt(entry.target.dataset.progress, 10);
      setTimeout(() => { entry.target.style.width = target + '%'; }, 200);
      progressIO.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  progressBars.forEach(el => progressIO.observe(el));

  /* ---- SOS interactive demo (90 → 0 countdown) ---- */
  const sosBtn = document.querySelector('.sos-button');
  if (sosBtn) {
    sosBtn.addEventListener('click', () => {
      if (sosBtn.dataset.running === '1') return;
      sosBtn.dataset.running = '1';
      const original = sosBtn.textContent;
      let count = 90;
      sosBtn.textContent = count;
      sosBtn.style.animation = 'none';

      const interval = setInterval(() => {
        count--;
        if (count >= 0) {
          sosBtn.textContent = count;
        } else {
          clearInterval(interval);
          sosBtn.textContent = 'OK';
          setTimeout(() => {
            sosBtn.textContent = original;
            sosBtn.style.animation = '';
            sosBtn.dataset.running = '0';
          }, 1500);
        }
      }, 40); // sped-up demo (real flow would run ~90s)
    });
  }

});
