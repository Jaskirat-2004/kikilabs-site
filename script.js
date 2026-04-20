/* =========================================
   KIKILABS — script.js  v3
   ========================================= */

/* ---- Fade-in on scroll ---- */
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));


/* ---- Animated number counters ---- */
function animateCounter(el, target, duration = 1600) {
  let start = null;
  const startVal = 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// Observe stats section — fire counters when visible
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target, 10);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach(el => counterObserver.observe(el));


/* ---- Mobile nav toggle ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


/* ---- Navbar solid on scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.backgroundColor = window.scrollY > 30
    ? 'rgba(11,11,11,0.98)'
    : 'rgba(11,11,11,0.9)';
}, { passive: true });


/* ---- KIKI Sound (Web Audio API — no file needed) ---- */
const soundBtn = document.getElementById('soundBtn');

function playKikiSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const chirps = [0, 0.13, 0.26, 0.39];

  chirps.forEach((delay, i) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const pitch = i % 2 === 0 ? 920 : 1100;
    osc.frequency.setValueAtTime(pitch, ctx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.55, ctx.currentTime + delay + 0.1);
    osc.type = 'sine';

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.11);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.13);
  });

  // Visual flash on button
  soundBtn.style.borderColor = '#C8A96E';
  soundBtn.style.color = '#C8A96E';
  setTimeout(() => {
    soundBtn.style.borderColor = '';
    soundBtn.style.color = '';
  }, 700);
}

soundBtn.addEventListener('click', playKikiSound);


/* ---- Hero monkey subtle parallax (desktop only) ---- */
const heroSection  = document.querySelector('.hero');
const heroMonkeys  = document.querySelectorAll('.hero .mk');
const isDesktop    = window.matchMedia('(min-width: 769px)').matches;

if (heroSection && isDesktop) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = (e.clientX - rect.left)  / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)   / rect.height - 0.5;

    heroMonkeys.forEach((mk, i) => {
      const depth = (i + 1) * 7;
      // Only apply translate, preserve existing rotate/scale transforms
      mk.style.marginLeft = `${cx * depth}px`;
      mk.style.marginTop  = `${cy * depth}px`;
    });
  }, { passive: true });
}