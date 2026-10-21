(() => {
  const header = document.querySelector('.top');
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 40);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    const close = () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); };
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') { close(); document.body.style.overflow = ''; }
    });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); document.body.style.overflow = ''; } });
  }

  const items = document.querySelectorAll('.reveal');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'));
        const i = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(i, 3) * 70 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }

  // video: don't fight low-power / data-saver modes
  const v = document.querySelector('.hero__vid');
  if (v) {
    const conn = navigator.connection;
    if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) {
      v.removeAttribute('autoplay'); v.pause();
    }
  }

  // FAQ: only one open at a time
  const faq = document.querySelectorAll('.faq details');
  faq.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faq.forEach((o) => { if (o !== d) o.open = false; });
  }));
})();
