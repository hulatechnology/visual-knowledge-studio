/* =========================================================
   Visual Knowledge Studio
   Edit CONFIG and the INDUSTRIES list below to update the site.
   ========================================================= */

const CONFIG = {
  // Enquiry form. If `formEndpoint` is set (e.g. a Formspree URL), submissions are
  // posted there. Otherwise the form opens the visitor's email app addressed to `enquiryEmail`.
  formEndpoint: '',
  enquiryEmail: 'hello@yourdomain.com'
};

/* ---------------------------------------------------------
   POSTER DESIGNS
   Each poster has a `layout` (stack, serif, steps, split, notes, badge) and colours:
   bg = background, fg = text, ac = accent, on = text on accent (optional), fs = headline size.
   --------------------------------------------------------- */

/* ---------------------------------------------------------
   INDUSTRIES (the poster wall)
   To add a real video: set `video` to a file path or URL (e.g. 'videos/phishing.mp4').
   Without a video, the card opens an animated sample preview.
   --------------------------------------------------------- */
const INDUSTRIES = [
  { name: 'Education and EdTech', type: 'Curriculum',
    desc: 'Curriculum lessons, revision content and concept explainers.',
    title: 'How photosynthesis turns light into energy',
    beats: ['Light reaches the leaf', 'Water and carbon dioxide combine', 'Glucose and oxygen are made'],
    video: '',
    p: { layout: 'steps', bg: '#F4EFE3', fg: '#151515', ac: '#FF3D8B', fs: '19cqw',
      top: ['Biology', 'Lesson 04'], lines: ['Photo-', 'synthesis'], steps: ['Light', 'Water + CO2', 'Glucose'] } },

  { name: 'Corporate Training and HR', type: 'Onboarding',
    desc: 'Onboarding, policies, soft skills and professional development.',
    title: 'Your first week: onboarding essentials',
    beats: ['Meet your team and tools', 'Know where to find help', 'Understand how we work'],
    video: '',
    p: { layout: 'badge', bg: '#FFD84D', fg: '#111111', ac: '#7C5CFF', fs: '17cqw',
      top: ['People & HR', 'Ep. 01'], words: ['Your', 'first', 'week'], sticker: 'On&shy;board&shy;ing', foot: 'Everything new starters need' } },

  { name: 'Healthcare and Pharmaceuticals', type: 'Patient education',
    desc: 'Patient education, treatment explainers and clinical training.',
    title: 'How vaccines train the immune system',
    beats: ['The body meets a harmless copy', 'It builds a defence', 'It remembers for next time'],
    video: '',
    p: { layout: 'split', bg: '#FFF5F8', fg: '#2A0F1C', ac: '#FF3D8B', fs: '10.5cqw',
      top: ['Patient guide', '02:20'], head: 'How vaccines train your body', foot: 'Immunity, explained' } },

  { name: 'Financial Services and Insurance', type: 'Customer education',
    desc: 'Financial literacy, product explainers and regulatory training.',
    title: 'What compound interest really does',
    beats: ['You save a little each month', 'Interest earns interest', 'Time does the heavy lifting'],
    video: '',
    p: { layout: 'notes', bg: '#EFF6EA', fg: '#0E2A1B', ac: '#0F9D63', fs: '13cqw', chart: true,
      top: ['Money basics', 'No. 12'], head: 'Compound interest', rows: ['Save a little', 'Interest earns interest', 'Time does the work'] } },

  { name: 'Cybersecurity', type: 'Awareness',
    desc: 'Security awareness, threat explainers and safe-behaviour training.',
    title: 'Spotting a phishing email before you click',
    beats: ['Check who really sent it', 'Hover before you click', 'Report it, never reply'],
    video: '',
    p: { layout: 'stack', bg: '#0E0E12', fg: '#F4EFE3', ac: '#FF3B30', fs: '27cqw',
      top: ['Security', 'Awareness'], lines: ['Spot', 'the', { t: 'phish', ac: true }], foot: 'Three checks' } },

  { name: 'Legal, Professional and Compliance', type: 'Compliance',
    desc: 'Regulations, obligations and processes in plain, accurate language.',
    title: 'Your compliance obligations, made plain',
    beats: ['What the rule says', 'What it means for you', 'What to do next'],
    video: '',
    p: { layout: 'serif', bg: '#15161C', fg: '#F1ECE2', ac: '#C8A96A', fs: '15cqw',
      top: ['Compliance', 'Module 3'], head: 'The fine print, <em>made plain.</em>', sub: 'Your obligations in four short scenes' } },

  { name: 'Retail and E-commerce', type: 'Customer guide',
    desc: 'Product education, staff training and customer guidance.',
    title: 'Returns made easy',
    beats: ['Start your return online', 'Pack and drop it off', 'Get your refund'],
    video: '',
    p: { layout: 'badge', bg: '#FF6B3D', fg: '#1A0D06', ac: '#FFFFFF', on: '#1A0D06', fs: '16cqw',
      top: ['Retail', 'Customer'], words: ['Returns', 'made', 'easy'], sticker: 'How to', foot: 'Three simple steps' } },

  { name: 'Real Estate and Property', type: 'Client guide',
    desc: 'Buying, renting and property processes made easy to follow.',
    title: 'Buying your first home, explained',
    beats: ['Get pre-approved', 'Make an offer', 'Transfer and collect your keys'],
    video: '',
    p: { layout: 'notes', bg: '#F6F1EA', fg: '#2B1D14', ac: '#C2410C', fs: '15cqw',
      top: ['Property', 'Buyer guide'], head: 'Buying a home', rows: ['Get pre-approved', 'Make an offer', 'Transfer & keys'] } }
];


/* ---------------------------------------------------------
   Helpers
   --------------------------------------------------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------------------------------------------------
   Poster renderer
   --------------------------------------------------------- */
function poster(p, extraClass = '') {
  const vars = `--pb:${p.bg};--pf:${p.fg};--pa:${p.ac};${p.on ? `--pon:${p.on};` : ''}${p.fs ? `--fs:${p.fs};` : ''}`;
  const top = p.top ? `<div class="p-top"><span>${esc(p.top[0])}</span><span>${esc(p.top[1])}</span></div>` : '';
  const line = l => typeof l === 'string' ? `<span>${esc(l)}</span>` : `<span class="${l.ac ? 'p-ac' : ''}">${esc(l.t)}</span>`;
  const foot = txt => `<div class="p-foot"><i></i><i></i><i></i><em>${esc(txt)}</em></div>`;
  let body = '';

  switch (p.layout) {
    case 'stack':
      body = `<div class="pz">${top}<div class="p-big">${p.lines.map(line).join('')}</div>
        ${p.bars ? `<div class="p-bars">${[38, 62, 48, 80, 56, 100].map(h => `<b style="height:${h}%"></b>`).join('')}</div>` : foot(p.foot || '')}</div>`;
      break;
    case 'serif':
      body = `<div class="pz">${top}<div class="p-serif">${p.head}</div>
        <div><div class="p-rule"></div><div class="p-sub">${esc(p.sub)}</div><div class="p-dots"><i></i><i></i><i></i><i></i></div></div></div>`;
      break;
    case 'steps':
      body = `<div class="pz">${top}<div class="p-big">${p.lines.map(line).join('')}</div>
        <div class="p-steps">${p.steps.map((s, i) => `<div><b>${pad(i + 1)}</b><span>${esc(s)}</span></div>`).join('')}</div>
        <div class="p-arrow"><i>&rarr;</i></div></div>`;
      break;
    case 'split':
      body = `<div class="p-split">
        <div class="p-split__top">${top}<div class="p-split__head">${esc(p.head)}</div></div>
        <div class="p-split__bot"><span class="p-shape p-shape--c"></span><span class="p-shape p-shape--s"></span><span class="p-shape p-shape--t"></span>${foot(p.foot || '')}</div></div>`;
      break;
    case 'notes':
      body = `<div class="pz">${top}<div class="p-notes__head">${esc(p.head)}</div>
        ${p.chart ? `<svg class="p-chart" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 38 C20 36 35 33 50 27 S80 10 100 2" fill="none" stroke="${p.ac}" stroke-width="2.2" vector-effect="non-scaling-stroke"/>
          <path d="M0 38 C20 36 35 33 50 27 S80 10 100 2 V40 H0Z" fill="${p.ac}" opacity=".14"/></svg>` : ''}
        <div class="p-rows">${p.rows.map(r => `<div><i></i>${esc(r)}</div>`).join('')}</div></div>`;
      break;
    case 'badge':
      body = `<div class="pz">${top}<div class="p-sticker">${p.sticker}</div>
        <div class="p-badge">${p.words.map(w => `<span>${esc(w)}</span>`).join('')}</div>${foot(p.foot || '')}</div>`;
      break;
  }
  return `<div class="poster ${extraClass}" style="${vars}">${body}</div>`;
}

/* ---------------------------------------------------------
   Navigation
   --------------------------------------------------------- */
(function nav() {
  const header = $('.nav'), toggle = $('.nav__toggle'), menu = $('#mobile-menu');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 16 || !menu.hidden);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    onScroll();
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => { if (window.innerWidth > 960) setMenu(false); });

  const links = $$('.nav__links a');
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => l.classList.remove('is-active'));
    const a = map.get(e.target.id);
    if (a) a.classList.add('is-active');
  }), { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();


/* ---------------------------------------------------------
   Poster wall
   --------------------------------------------------------- */
(function wall() {
  const grid = $('#wall');
  if (!grid) return;
  const PLAY = '<svg viewBox="0 0 12 14" aria-hidden="true"><path d="M0 0l12 7-12 7z"/></svg>';
  grid.innerHTML = INDUSTRIES.map((d, i) => `
    <button class="tile" data-i="${i}" aria-label="Preview: ${esc(d.title)} (${esc(d.name)})">
      <div style="position:relative;container-type:inline-size">${poster(d.p)}<span class="tile__play">${PLAY}</span></div>
      <div class="tile__label"><span class="tile__name">${esc(d.name)}</span><span class="tile__type">${esc(d.type)}</span></div>
      <p class="tile__desc">${esc(d.desc)}</p>
    </button>`).join('');
  grid.addEventListener('click', e => {
    const t = e.target.closest('.tile');
    if (t) openModal(INDUSTRIES[+t.dataset.i], t);
  });
})();

/* Posters inside the "Built for people who teach" cards */
$$('[data-poster]').forEach(el => { el.innerHTML = poster(INDUSTRIES[+el.dataset.poster].p); });

/* ---------------------------------------------------------
   Preview modal
   --------------------------------------------------------- */
const modal = $('#modal');
let lastFocus = null, raf = null;

function openModal(item, trigger) {
  lastFocus = trigger;
  const media = $('#modal-media'), beatsEl = $('#modal-beats'), fill = $('#modal-fill');
  $('#modal-cat').textContent = `${item.name} · ${item.type}`;
  $('#modal-title').textContent = item.title;
  $('#modal-desc').textContent = item.desc;
  $('#modal-ph').hidden = !!item.video;
  beatsEl.innerHTML = item.beats.map((b, i) => `<li><b>${pad(i + 1)}</b>${esc(b)}</li>`).join('');
  media.innerHTML = item.video
    ? `<video src="${esc(item.video)}" controls autoplay playsinline></video>`
    : poster(item.p, 'is-playing');

  const lis = $$('li', beatsEl), BEAT = 2400, total = BEAT * lis.length, start = performance.now();
  cancelAnimationFrame(raf);
  const tick = now => {
    const t = (now - start) % total, b = Math.floor(t / BEAT);
    lis.forEach((li, i) => li.classList.toggle('on', i === b));
    fill.style.width = (t / total * 100) + '%';
    raf = requestAnimationFrame(tick);
  };
  if (reduceMotion) lis.forEach(li => li.classList.add('on')); else raf = requestAnimationFrame(tick);

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  $('.modal__close', modal).focus();
}
function closeModal(restoreFocus = true) {
  cancelAnimationFrame(raf);
  modal.hidden = true;
  $('#modal-media').innerHTML = '';
  document.body.style.overflow = '';
  if (restoreFocus && lastFocus) lastFocus.focus();
}
modal.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) closeModal();
  if (e.target.closest('[data-close-go]')) {
    const item = $('#modal-title').textContent;
    closeModal(false);
    $('#f-msg').value = `I'd like a lesson like "${item}".`;
  }
});
document.addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') {
    const f = $$('button, video, [href]', modal).filter(el => el.offsetParent !== null);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------------------------------------------------------
   Pricing buttons pre-select the matching interest in the form
   --------------------------------------------------------- */
$$('[data-plan]').forEach(b => b.addEventListener('click', () => {
  $$('#enquiry input[name="interest"]').forEach(c => { c.checked = c.value === b.dataset.plan; });
}));

/* ---------------------------------------------------------
   Reveal on scroll
   --------------------------------------------------------- */
(function reveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(el => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const sibs = [...e.target.parentElement.children];
    e.target.style.transitionDelay = (sibs.indexOf(e.target) % 4) * 70 + 'ms';
    e.target.classList.add('is-in');
    setTimeout(() => { e.target.style.transitionDelay = ''; }, 1200);
    io.unobserve(e.target);
  }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ---------------------------------------------------------
   Enquiry form
   --------------------------------------------------------- */
(function form() {
  const f = $('#enquiry');
  if (!f) return;
  const status = $('#form-status');
  const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  f.addEventListener('submit', async e => {
    e.preventDefault();
    const name = f.elements.name, email = f.elements.email;
    const nameBad = !name.value.trim(), emailBad = !emailOk(email.value.trim());
    name.closest('.field').classList.toggle('has-error', nameBad);
    email.closest('.field').classList.toggle('has-error', emailBad);
    if (nameBad || emailBad) { (nameBad ? name : email).focus(); status.textContent = ''; return; }

    const data = new FormData(f);
    const interests = data.getAll('interest').join(', ') || 'Not specified';

    if (CONFIG.formEndpoint) {
      status.className = 'form__status'; status.textContent = 'Sending...';
      try {
        const r = await fetch(CONFIG.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error();
        f.reset();
        status.className = 'form__status is-ok';
        status.textContent = 'Thank you. Your enquiry has been sent and we will be in touch shortly.';
      } catch {
        status.className = 'form__status';
        status.textContent = `Something went wrong. Please email us directly at ${CONFIG.enquiryEmail}.`;
      }
      return;
    }

    const body = [
      `Name: ${data.get('name')}`, `Email: ${data.get('email')}`,
      `Organisation: ${data.get('organisation') || '-'}`, `I represent: ${data.get('type')}`,
      `Interested in: ${interests}`, '', data.get('message') || ''
    ].join('\n');
    const subject = `Enquiry from ${data.get('name')}${data.get('organisation') ? ' (' + data.get('organisation') + ')' : ''}`;
    window.location.href = `mailto:${CONFIG.enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.className = 'form__status is-ok';
    status.textContent = 'Your email app should now open with your enquiry ready to send.';
  });
  $$('input', f).forEach(i => i.addEventListener('input', () => i.closest('.field').classList.remove('has-error')));
})();

const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
