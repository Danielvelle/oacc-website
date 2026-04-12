// ── Mobile nav ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Nav background on scroll ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.borderBottomColor = 'rgba(30, 30, 40, 1)';
  } else {
    nav.style.borderBottomColor = 'rgba(30, 30, 40, 0.5)';
  }
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
    customerType: form.querySelector('#customer-type').value,
    message: form.message.value.trim(),
  };

  if (!data.name || !data.email || !data.message) {
    formStatus.textContent = 'Fyll inn alle obligatoriske felter.';
    formStatus.className = 'form-status error';
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sender...</span>';

  try {
    const subject = encodeURIComponent(
      `Henvendelse fra ${data.name}${data.service ? ` – ${data.service}` : ''}`
    );
    const body = encodeURIComponent(
      `Navn: ${data.name}\nE-post: ${data.email}\nTelefon: ${data.phone || 'Ikke oppgitt'}\nTjeneste: ${data.service || 'Ikke valgt'}\nKundetype: ${data.customerType || 'Ikke valgt'}\n\nMelding:\n${data.message}`
    );

    window.location.href = `mailto:post@oacc.no?subject=${subject}&body=${body}`;

    formStatus.textContent = 'E-postklienten din skal ha aapnet seg. Hvis ikke, send direkte til post@oacc.no';
    formStatus.className = 'form-status success';
    form.reset();
  } catch (err) {
    formStatus.textContent = 'Noe gikk galt. Send direkte til post@oacc.no';
    formStatus.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalHTML;
  }
});

// ── Intersection Observer for fade-in ──
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .why-card, .audience-card, .taxi-card, .process-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
