import { projects, contacts, imageUrl, originalUrl } from './projects.js';

const $ = selector => document.querySelector(selector);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const grid = $('#project-grid');
let visibleProjects = [...projects];
let currentIndex = 0;
let lastTrigger;
const dialog = $('#project-dialog');
let dialogRequest = 0;

// Secondary source is still Google Drive, never a copy in this repository.
function attachImageFallback(img, onFailure) {
  let triedSecondary = false;
  img.addEventListener('error', () => {
    if (!triedSecondary) {
      triedSecondary = true;
      img.src = `https://lh3.googleusercontent.com/d/${encodeURIComponent(img.dataset.driveId)}=w1200`;
    } else { img.hidden = true; onFailure?.(); }
  });
}

function projectCard(project, index) {
  const card = document.createElement('article');
  card.className = 'project-card reveal';
  card.dataset.id = project.id;
  const button = document.createElement('button');
  button.className = `project-art ${project.tone}`;
  button.setAttribute('aria-label', `Xem tác phẩm: ${project.title}`);
  const img = document.createElement('img');
  img.dataset.driveId = project.id;
  img.alt = project.title;
  img.width = project.width;
  img.height = project.height;
  img.loading = index < 2 ? 'eager' : 'lazy';
  img.decoding = 'async';
  img.referrerPolicy = 'no-referrer';
  attachImageFallback(img, () => {
    const fallback = document.createElement('div');
    fallback.className = 'image-error';
    const icon = document.createElement('span'); icon.textContent = '↗';
    const title = document.createElement('strong'); title.textContent = project.title;
    const hint = document.createElement('small'); hint.textContent = 'Chưa tải được ảnh từ Drive. Bấm để mở thông tin và liên kết bản gốc.';
    fallback.append(icon, title, hint); button.append(fallback);
  });
  img.src = imageUrl(project.id);
  const hover = document.createElement('span'); hover.className = 'view-label'; hover.textContent = 'XEM TÁC PHẨM ↗';
  button.append(img, hover);
  button.addEventListener('click', () => { lastTrigger = button; openProject(visibleProjects.findIndex(p => p.id === project.id)); });
  const meta = document.createElement('div'); meta.className = 'project-meta';
  const details = document.createElement('div');
  const title = document.createElement('h3'); title.textContent = project.title;
  const subtitle = document.createElement('p'); subtitle.textContent = `${project.category} / ${String(index + 1).padStart(2, '0')}`;
  details.append(title, subtitle);
  const link = document.createElement('a'); link.href = originalUrl(project.id); link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = '↗'; link.setAttribute('aria-label', `Mở bản gốc ${project.title} trên Drive`);
  meta.append(details, link); card.append(button, meta); return card;
}

const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: .08 }) : null;
if (observer && !reducedMotion.matches) document.documentElement.classList.add('motion-ready');
function observeReveals() { document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer?.observe(el)); }
function renderProjects(filter = 'Tất cả') {
  visibleProjects = projects.filter(project => filter === 'Tất cả' || project.category === filter);
  grid.replaceChildren(...visibleProjects.map(projectCard));
  $('#work-count').textContent = `${visibleProjects.length} tác phẩm`;
  observeReveals();
}
renderProjects();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  renderProjects(button.dataset.filter);
}));

function openProject(index) {
  if (index < 0 || index >= visibleProjects.length) return;
  currentIndex = index;
  const project = visibleProjects[index];
  $('#dialog-title').textContent = project.title;
  $('#dialog-category').textContent = project.category;
  $('#dialog-file').textContent = project.file;
  $('#dialog-original').href = originalUrl(project.id);
  $('#dialog-position').textContent = `${index + 1} / ${visibleProjects.length}`;
  $('#previous-project').disabled = index === 0;
  $('#next-project').disabled = index === visibleProjects.length - 1;
  const img = document.createElement('img');
  img.id = 'dialog-image'; img.alt = project.title; img.dataset.driveId = project.id; img.referrerPolicy = 'no-referrer';
  const request = ++dialogRequest;
  $('#dialog-error').hidden = true;
  attachImageFallback(img, () => { if (request === dialogRequest) $('#dialog-error').hidden = false; });
  $('#dialog-image').replaceWith(img);
  img.src = imageUrl(project.id, 2000);
  if (!dialog.open) { dialog.showModal(); document.body.classList.add('modal-open'); }
}
$('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastTrigger?.focus({ preventScroll: true }); });
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
$('#previous-project').addEventListener('click', () => openProject(currentIndex - 1));
$('#next-project').addEventListener('click', () => openProject(currentIndex + 1));
dialog.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { event.preventDefault(); openProject(currentIndex - 1); } if (event.key === 'ArrowRight') { event.preventDefault(); openProject(currentIndex + 1); } });

const menu = $('.menu-toggle');
menu.addEventListener('click', () => { const expanded = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(expanded)); menu.setAttribute('aria-label', expanded ? 'Đóng menu' : 'Mở menu'); $('#navigation').classList.toggle('open', expanded); });
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Mở menu'); $('#navigation').classList.remove('open'); }
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });

// Scroll-driven archive: poster cards fly outward around the heading, as in the supplied video.
const flying = projects.slice(0, 4).map((project, index) => {
  const card = document.createElement('div'); card.className = `flying-card flying-${index}`;
  card.style.setProperty('--art-ratio', `${project.width} / ${project.height}`);
  const img = document.createElement('img');
  img.alt = ''; img.width = project.width; img.height = project.height;
  img.loading = 'eager'; img.decoding = 'async'; img.referrerPolicy = 'no-referrer';
  img.dataset.driveId = project.id;
  attachImageFallback(img, () => {
    const hint = document.createElement('span');
    hint.className = 'archive-image-error';
    hint.textContent = `${project.title} — Ảnh chưa tải được. Xem bản gốc trong mục Tác phẩm.`;
    card.append(hint);
  });
  img.src = imageUrl(project.id, 650);
  card.append(img); $('.flying-works').append(card); return card;
});
const archive = $('#archive');
const portrait = $('.portrait-stage');
const progress = $('.scroll-progress');
let framePending = false;
const clamp = value => Math.min(1, Math.max(0, value));
function updateScroll() {
  framePending = false;
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
  if (reducedMotion.matches) portrait.style.transform = '';
  const rect = archive.getBoundingClientRect();
  const amount = reducedMotion.matches ? 1 : clamp((innerHeight * .8 - rect.top) / Math.max(1, rect.height - innerHeight * .2));
  const narrow = innerWidth <= 700;
  const spread = narrow ? innerWidth * .36 : innerWidth * .34;
  const rise = innerHeight * .20;
  const positions = [[-1, -.72, -15], [1, -.55, 13], [-.9, .75, -9], [1.05, .8, 12]];
  flying.forEach((card, i) => {
    const [x, y, rotation] = positions[i];
    const startX = (i % 2 ? 1 : -1) * innerWidth * .10;
    const startY = innerHeight * .65 + i * 45;
    const tx = startX + (x * spread - startX) * amount;
    const ty = startY + (y * rise - startY) * amount;
    card.style.transform = `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, 0) rotate(${rotation * amount}deg) scale(${.75 + .25 * amount})`;
  });
  if (!reducedMotion.matches) portrait.style.transform = `translate3d(0, ${Math.min(scrollY, innerHeight) * .07}px, 0)`;
}
function requestScrollUpdate() { if (!framePending) { framePending = true; requestAnimationFrame(updateScroll); } }
addEventListener('scroll', requestScrollUpdate, { passive: true });
addEventListener('resize', requestScrollUpdate);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) document.documentElement.classList.remove('motion-ready'); requestScrollUpdate(); });
updateScroll(); observeReveals();

// Subtle pointer motion, restricted to precise pointers and disabled for reduced motion.
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const hero = $('.hero');
  hero.addEventListener('pointermove', event => {
    if (reducedMotion.matches) return;
    const box = hero.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    $('.portrait-disc').style.transform = `translate(${x * -14}px, ${y * -14}px)`;
  });
  hero.addEventListener('pointerleave', () => { $('.portrait-disc').style.transform = ''; });
}
$('#year').textContent = new Date().getFullYear();
const contactEntries = Object.entries(contacts).filter(([type, value]) => value && (type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : /^https:\/\//.test(value)));
if (contactEntries.length) {
  $('#contact-links').replaceChildren(...contactEntries.map(([type, value]) => {
    const a = document.createElement('a'); a.href = type === 'email' ? `mailto:${value}` : value; a.textContent = type === 'email' ? value : `${type} ↗`; if (type !== 'email') { a.target = '_blank'; a.rel = 'noopener noreferrer'; } return a;
  }));
}

// Keep the supplied clip intact and respect reduced-motion preferences.
const signatureVideo = document.querySelector('.signature-video');
function respectSignatureMotion() {
  if (signatureVideo && reducedMotion.matches) {
    signatureVideo.autoplay = false;
    signatureVideo.pause();
  }
}
respectSignatureMotion();
reducedMotion.addEventListener('change', respectSignatureMotion);

// Decorative star sky.
const sky = document.createElement('div');
sky.className = 'star-sky';
sky.setAttribute('aria-hidden', 'true');
const starColors = ['blue', 'yellow', 'pink', 'white'];
for (let i = 0; i < 56; i++) {
  const star = document.createElement('i');
  star.className = `sky-star sky-star--${starColors[i % 4]}`;
  star.style.cssText = `left:${(i * 61.8034 + 3) % 100}%;top:${(i * 37.719 + 2) % 100}%;--size:${10 + (i * 7 % 19)}px;--duration:${9 + i % 9}s;--delay:-${i % 13}s;--drift:${i % 2 ? 9 : -9}px`;
  sky.append(star);
}
document.body.prepend(sky);
