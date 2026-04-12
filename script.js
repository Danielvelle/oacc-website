// Nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' }); }
  });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const d = { name: f.name.value, email: f.email.value, phone: f.phone.value, service: f.service.value, ctype: f.ctype.value, message: f.message.value };
  if (!d.name || !d.email || !d.message) {
    document.getElementById('formStatus').textContent = 'Fyll inn alle obligatoriske felter.';
    document.getElementById('formStatus').style.color = '#f87171';
    return;
  }
  const s = encodeURIComponent(`Henvendelse fra ${d.name}${d.service ? ' – ' + d.service : ''}`);
  const b = encodeURIComponent(`Navn: ${d.name}\nE-post: ${d.email}\nTelefon: ${d.phone || 'Ikke oppgitt'}\nTjeneste: ${d.service || 'Ikke valgt'}\nKundetype: ${d.ctype || 'Ikke valgt'}\n\nMelding:\n${d.message}`);
  window.location.href = `mailto:post@oacc.no?subject=${s}&body=${b}`;
  document.getElementById('formStatus').textContent = 'E-postklienten din skal ha åpnet seg.';
  document.getElementById('formStatus').style.color = '#4ade80';
  f.reset();
});

// Fade-in on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); } });
}, { threshold: 0.08 });

document.querySelectorAll('.svc-card,.svc-featured,.why-point,.aud-card,.proc-step,.gal-inner,.hero-card').forEach(el => {
  el.classList.add('fade-target');
  obs.observe(el);
});

// Add fade CSS dynamically
const style = document.createElement('style');
style.textContent = `.fade-target{opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease}.fade-target.vis{opacity:1;transform:translateY(0)}`;
document.head.appendChild(style);
