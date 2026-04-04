/* ============================================
   Main JavaScript - Lukas Bozinov Portfolio
   ============================================ */

// --- Navigation scroll effect ---
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// --- Mobile navigation toggle ---
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
      faq.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// --- Scroll reveal animations ---
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);

// --- Active nav link ---
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (path.endsWith(href) || (path === '/' && href === 'index.html') || (path.endsWith('/') && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNav();

// --- Contact form handler (GitHub Pages - no backend) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Open mailto as fallback
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:lbozinov@uwo.ca?subject=${subject}&body=${body}`;
  });
}
