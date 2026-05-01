// ── LOADER ──────────────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1800);
});

// ── CUSTOM CURSOR ────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Scale cursor on hoverable elements
document.querySelectorAll('a, button, .tag, .about-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2.5)';
        follower.style.transform += ' scale(1.5)';
        follower.style.borderColor = 'rgba(201,169,110,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.borderColor = 'rgba(201,169,110,0.5)';
    });
});

// ── NAV SCROLL EFFECT ─────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ── MOBILE MENU ───────────────────────────────────
const navMenu = document.getElementById('nav-menu');
const mobileMenu = document.getElementById('mobile-menu');

navMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = navMenu.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = navMenu.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ── SCROLL REVEAL ─────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 100);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.about-card, .skill-category, .project-card, .about-text, .about-cards, .contact-content').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ── SMOOTH SCROLL ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── PARALLAX HERO ─────────────────────────────────
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
        heroContent.style.opacity = 1 - scrollY * 0.002;
    }
});

// ── SKILL TAGS STAGGER ────────────────────────────
const tagObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.tag');
            tags.forEach((tag, i) => {
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, i * 60);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => {
    cat.querySelectorAll('.tag').forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    tagObserver.observe(cat);
});

// ── TYPED NAME EFFECT (Hero) ──────────────────────
// Adds a subtle glow flicker to the hero name
const heroNameLast = document.querySelector('.hero-name-last');
if (heroNameLast) {
    setInterval(() => {
        heroNameLast.style.webkitTextStrokeColor = `rgba(255,255,255,${0.3 + Math.random() * 0.2})`;
    }, 2000);
}

console.log('%cArfa Phansopkar | Portfolio', 'color: #c9a96e; font-size: 1.2rem; font-weight: bold; font-family: Georgia;');
console.log('%cAI Engineer · Data Scientist · Full-Stack Developer', 'color: #888; font-size: 0.8rem;');
