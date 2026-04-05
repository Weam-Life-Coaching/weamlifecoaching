// ── LANGUAGE TOGGLE ──
const langToggle = document.getElementById('langToggle');
const body = document.body;

function setLang(lang) {
  if (lang === 'ar') {
    body.classList.add('ar');
    langToggle.textContent = 'English';
    document.documentElement.lang = 'ar';
    localStorage.setItem('weam-lang', 'ar');
  } else {
    body.classList.remove('ar');
    langToggle.textContent = 'العربية';
    document.documentElement.lang = 'en';
    localStorage.setItem('weam-lang', 'en');
  }
}

// Restore saved language
const savedLang = localStorage.getItem('weam-lang');
if (savedLang) setLang(savedLang);

langToggle.addEventListener('click', () => {
  setLang(body.classList.contains('ar') ? 'en' : 'ar');
});

// ── MOBILE NAV ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── NAV SCROLL SHADOW ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 2px 20px rgba(30,35,64,0.08)'
    : 'none';
});

// ── FADE IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.session-card, .value-item, .session-full-card, .expect-list li').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── EVIL EYE CONTACT ALIGNMENT ──
function updateEvilEye() {
  const el = document.getElementById('evil-eye-contact');
  if (!el) return;
  el.style.textAlign = document.body.classList.contains('ar') ? 'right' : 'left';
}

// Run on load and on toggle
updateEvilEye();
const origSetLang = setLang;
// Patch setLang to also update evil eye
const _origToggle = langToggle.onclick;
langToggle.addEventListener('click', () => {
  setTimeout(updateEvilEye, 10);
});

// Also run on page load after lang restored
document.addEventListener('DOMContentLoaded', updateEvilEye);
setTimeout(updateEvilEye, 100);
