// ── LOADER ──────────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('out');
    }, 1600);
});

// ── CUSTOM CURSOR ────────────────────────────
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ── NAV STICKY ───────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('sticky', window.scrollY > 60);
});

// ── MOBILE NAV ───────────────────────────────
const toggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    const isOpen = mobileNav.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
    spans[1].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
});
mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
});

// ── SCROLL REVEAL ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.about-left, .about-right, .skill-block, .project-featured, .project-card, .contact-inner'
).forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
    revealObserver.observe(el);
});

// ── SMOOTH ANCHOR SCROLL ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

console.log('%cArfa Phansopkar — Portfolio', 'color: #c97b84; font-family: Georgia; font-size: 1.2rem; font-style: italic;');
