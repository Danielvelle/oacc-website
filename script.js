// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Contact form ──
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    service: form.service.value,
    message: form.message.value.trim(),
  };

  if (!data.name || !data.email || !data.message) {
    formStatus.textContent = 'Fyll inn alle obligatoriske felter.';
    formStatus.className = 'form-status error';
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sender...';

  try {
    // Option 1: mailto fallback (works without backend)
    const subject = encodeURIComponent(
      `Henvendelse fra ${data.name}${data.service ? ` - ${data.service}` : ''}`
    );
    const body = encodeURIComponent(
      `Navn: ${data.name}\nE-post: ${data.email}\nTelefon: ${data.phone || 'Ikke oppgitt'}\nTjeneste: ${data.service || 'Ikke valgt'}\n\nMelding:\n${data.message}`
    );

    window.location.href = `mailto:post@oacc.no?subject=${subject}&body=${body}`;

    formStatus.textContent = 'E-postklienten din skal ha åpnet seg. Hvis ikke, send direkte til post@oacc.no';
    formStatus.className = 'form-status success';
    form.reset();
  } catch (err) {
    formStatus.textContent = 'Noe gikk galt. Prøv å sende direkte til post@oacc.no';
    formStatus.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send henvendelse';
  }
});

// ── Smooth scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
