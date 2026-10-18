const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const typedText = document.getElementById('typed');
const phrases = [
  'echo "let\'s build something"',
  'git push origin main',
  'python3 manage.py runserver',
];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typePhrase() {
  const phrase = phrases[phraseIndex];

  if (isDeleting) {
    characterIndex -= 1;
    typedText.textContent = phrase.slice(0, characterIndex);

    if (characterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  } else {
    characterIndex += 1;
    typedText.textContent = phrase.slice(0, characterIndex);

    if (characterIndex === phrase.length) {
      isDeleting = true;
      window.setTimeout(typePhrase, 1800);
      return;
    }
  }

  window.setTimeout(typePhrase, isDeleting ? 35 : 65);
}

let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;

if (prefersReducedMotion) {
  typedText.textContent = phrases[0];
} else {
  typePhrase();
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}
