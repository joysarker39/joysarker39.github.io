// ============================================================
// THEME TOGGLE (light / dark)
// ============================================================
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// Icon is set on load; theme already set by inline script in <head>
applyTheme(html.getAttribute('data-theme') || 'light');

// Only a click is saved, so visitors who never click keep following their device setting
themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
});

// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
}

hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.getElementById('progress');

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.value = pct;
}, { passive: true });

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
// Only sections with a nav link are watched, so the last link stays lit through sections without one
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...navAs].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAs.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach(s => observer.observe(s));

// The last section is too short to reach that band, so its link is lit at the bottom of the page
window.addEventListener('scroll', () => {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) navAs.forEach((a, i) => a.classList.toggle('active', i === navAs.length - 1));
}, { passive: true });
