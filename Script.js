/* ===================================
   KIKILABS — script.js
   =================================== */

/* ---- Fade-in on scroll (Intersection Observer) ---- */
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.12,       // trigger when 12% of element is visible
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing once visible (no re-animation)
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));


/* ---- Mobile nav toggle ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


/* ---- Navbar background on scroll ---- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.backgroundColor = 'rgba(11, 11, 11, 0.98)';
  } else {
    navbar.style.backgroundColor = 'rgba(11, 11, 11, 0.9)';
  }
}, { passive: true });
