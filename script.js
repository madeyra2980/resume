// ===== TYPEWRITER =====
const roles = [
  'Flutter-разработчик',
  'Mobile Developer',
  'Web-платформы',
  'Стартап-продукты',
  'Full-cycle разработка',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const el = document.getElementById('typewriter');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    el.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 60);
  } else {
    el.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
    setTimeout(type, 90);
  }
}
setTimeout(type, 1400);

// ===== PARTICLES =====
const container = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 2;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    bottom: -10px;
    width: ${size}px;
    height: ${size}px;
    opacity: ${Math.random() * 0.5};
    animation-duration: ${Math.random() * 8 + 6}s;
    animation-delay: ${Math.random() * 6}s;
  `;
  container.appendChild(p);
}

// ===== SCROLL REVEAL =====
const revealEls = [];
function addReveal(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
    revealEls.push(el);
  });
}
addReveal('.about-grid > *');
addReveal('.skill-group');
addReveal('.project-card');
addReveal('.contact-grid > *');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ===== NAV ACTIVE =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#818cf8' : '';
  });
}, { passive: true });

// ===== NAV BURGER =====
const burger = document.getElementById('burger');
const navLinksList = document.querySelector('.nav-links');
burger.addEventListener('click', () => navLinksList.classList.toggle('open'));
navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '✓ Сообщение отправлено! Свяжусь с вами в ближайшее время.';
  this.reset();
  setTimeout(() => note.textContent = '', 5000);
});
