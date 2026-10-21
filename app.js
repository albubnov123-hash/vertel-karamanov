(() => {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // FAQ: keep one panel open
  const items = [...document.querySelectorAll('.faq details')];
  items.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
  }));

  // gallery: drag-to-scroll with the mouse, arrow keys on the strip
  const strip = document.getElementById('strip');
  if (strip) {
    let down = false, startX = 0, startLeft = 0;
    strip.addEventListener('pointerdown', (e) => {
      down = true; startX = e.clientX; startLeft = strip.scrollLeft;
      strip.setPointerCapture(e.pointerId);
    });
    strip.addEventListener('pointermove', (e) => {
      if (!down) return;
      strip.scrollLeft = startLeft - (e.clientX - startX);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) =>
      strip.addEventListener(ev, () => { down = false; }));
    strip.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') strip.scrollBy({ left: 360, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') strip.scrollBy({ left: -360, behavior: 'smooth' });
    });
  }

  // save data / slow network: don't autoplay the hero video
  const v = document.querySelector('.hero__video');
  const conn = navigator.connection;
  if (v && conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) {
    v.removeAttribute('autoplay');
    v.pause();
  }
})();
