(() => {
  'use strict';
  let activeModal = null, lastFocus = null;
  const openModal = modal => {
    if (!modal) return;
    if (activeModal) closeModal();
    lastFocus = document.activeElement;
    activeModal = modal;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    (modal.querySelector('button') || modal).focus();
  };
  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove('open');
    activeModal.setAttribute('aria-hidden', 'true');
    activeModal = null;
    document.body.style.overflow = '';
    lastFocus?.focus();
  }
  document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => openModal(document.getElementById('fl-modal-' + btn.dataset.open))));
  document.querySelectorAll('[data-close],.fl-preview-modal-close').forEach(btn => btn.addEventListener('click', closeModal));
  document.querySelectorAll('.fl-modal,.fl-preview-modal').forEach(modal => {
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  });
  document.querySelectorAll('.fl-modal-close').forEach(btn => btn.setAttribute('aria-label','Fermer'));
  document.addEventListener('keydown', e => {
    if (!activeModal) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      const elements = [...activeModal.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')];
      const first = elements[0], last = elements[elements.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let checkoutUrl = '';
  try {
    const value = window.OFFER_CONFIG?.checkoutUrl;
    if (value && new URL(value).protocol === 'https:') checkoutUrl = value;
  } catch {}
  document.querySelectorAll('[data-checkout]').forEach(link => {
    if (checkoutUrl) link.href = checkoutUrl;
    else link.addEventListener('click', e => { e.preventDefault(); openModal(document.getElementById('checkout-demo')); });
  });
  const track = document.getElementById('fl-preview-track');
  const slides = [...track.querySelectorAll('.fl-preview-slide')];
  const dotsWrap = document.getElementById('fl-preview-dots');
  let current = 0;
  const dots = slides.map((slide, index) => {
    const dot = document.createElement('button');
    dot.className = 'fl-preview-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Voir l’activité ' + (index + 1));
    dot.addEventListener('click', () => go(index));
    dotsWrap.append(dot);
    slide.querySelector('.fl-preview-zoom').addEventListener('click', () => {
      const modal = document.getElementById('fl-preview-modal');
      const img = modal.querySelector('img');
      img.src = slide.querySelector('img').src;
      img.alt = slide.querySelector('img').alt;
      openModal(modal);
    });
    return dot;
  });
  function update(index) {
    current = index;
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === index); dot.setAttribute('aria-current', String(i === index)); });
    document.querySelector('.fl-preview-prev').disabled = index === 0;
    document.querySelector('.fl-preview-next').disabled = index === slides.length - 1;
  }
  function go(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    const t = track.getBoundingClientRect(), s = slides[index].getBoundingClientRect();
    track.scrollTo({left:track.scrollLeft+s.left-t.left-(track.clientWidth-s.width)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    update(index);
  }
  document.querySelector('.fl-preview-prev').addEventListener('click', () => go(current - 1));
  document.querySelector('.fl-preview-next').addEventListener('click', () => go(current + 1));
  let scrollTimer;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let nearest = 0, distance = Infinity;
      slides.forEach((slide, i) => { const r = slide.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - center); if (d < distance) { distance = d; nearest = i; } });
      update(nearest);
    },80);
  },{passive:true});
  update(0);
  document.querySelectorAll('.fl-stat-num[data-target]').forEach(el => {
    const target = Number(el.dataset.target);
    el.textContent = el.dataset.decimal === 'true' ? (target / 10).toFixed(1).replace('.', ',') : (el.dataset.prefix || '') + target;
  });
})();
