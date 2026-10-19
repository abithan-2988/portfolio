/* =====================================================
   ABITHAN T — GAME DEV PORTFOLIO | main.js
   Terminal/Hacker-Themed Interactive JavaScript
===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initNavbar();
  initHeroTerminal();
  initPixelGrid();
  initScrollAnimations();
  initSkillBars();
  initTraitBars();
  smoothScrollLinks();
});

/* =====================================================
   1. MATRIX RAIN
===================================================== */
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコ0123456789ABCDEF{}<>()#@!$%^&*_+-=|/\\';
  const fontSize = 13;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.random() * canvas.height);

  function draw() {
    ctx.fillStyle = 'rgba(2, 11, 8, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.95
        ? '#ffffff'
        : `rgba(0, ${Math.floor(180 + Math.random() * 75)}, ${Math.floor(30 + Math.random() * 30)}, ${0.4 + Math.random() * 0.6})`;
      ctx.fillText(char, i * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.5 + Math.random() * 0.5;
    });
  }

  setInterval(draw, 45);
}

/* =====================================================
   2. NAVBAR SCROLL + HAMBURGER
===================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* =====================================================
   3. HERO TERMINAL TYPEWRITER
===================================================== */
function initHeroTerminal() {
  const steps = [
    { delay: 400,  show: 'term-out-1' },
    { delay: 1000, show: 'term-line-2' },
    { delay: 1600, show: 'term-out-2', typeCmd: 'term-cmd-2' },
    { delay: 2600, show: 'term-line-3' },
  ];

  steps.forEach(step => {
    setTimeout(() => {
      const el = document.getElementById(step.show);
      if (el) el.classList.remove('hidden');
      if (step.typeCmd) {
        const cmd = document.getElementById(step.typeCmd);
        if (cmd) {
          cmd.style.overflow = 'hidden';
          cmd.style.whiteSpace = 'nowrap';
          cmd.style.animation = 'typing 0.7s steps(16) forwards';
        }
      }
    }, step.delay);
  });
}

/* =====================================================
   4. PIXEL GRID (HERO DECORATION)
===================================================== */
function initPixelGrid() {
  const grid = document.getElementById('pixel-grid');
  if (!grid) return;

  // Simple space invader pixel pattern
  const pattern = [
    [0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0],
    [0,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,1],
    [0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,1,1,0,0,1,1,0,0,0,1,1,0,0,1,1,0,0,0],
    [0,1,1,0,0,0,0,1,1,0,1,1,0,0,0,0,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  ];

  pattern.forEach(row => {
    row.forEach(cell => {
      const div = document.createElement('div');
      div.style.width = '12px';
      div.style.height = '12px';
      div.style.background = cell ? '#00ff41' : 'transparent';
      div.style.boxShadow = cell ? '0 0 4px rgba(0,255,65,0.5)' : 'none';
      div.style.transition = 'all 0.3s ease';
      if (cell) {
        setInterval(() => {
          if (Math.random() > 0.97) {
            div.style.opacity = Math.random() > 0.5 ? '0.3' : '1';
          }
        }, 200);
      }
      grid.appendChild(div);
    });
  });
}

/* =====================================================
   5. SCROLL-BASED ANIMATIONS (IntersectionObserver)
===================================================== */
function initScrollAnimations() {
  // Add fade-in to all major elements
  const targets = document.querySelectorAll(
    '.about-bio-card, .traits-card, .mission-card, .skill-node, ' +
    '.game-card, .cs-slot, .contact-link, .info-card, .quote-block, ' +
    '.section-header, .library-terminal, .contact-terminal'
  );

  targets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* =====================================================
   6. SKILL BARS ANIMATION
===================================================== */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

/* =====================================================
   7. TRAIT BARS ANIMATION
===================================================== */
function initTraitBars() {
  const fills = document.querySelectorAll('.trait-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  fills.forEach(fill => observer.observe(fill));
}

/* =====================================================
   8. SMOOTH SCROLL
===================================================== */
function smoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* =====================================================
   9. GLITCH EFFECT ON HOVER (Section titles)
===================================================== */
document.querySelectorAll('.section-title').forEach(title => {
  title.addEventListener('mouseenter', () => {
    title.style.animation = 'glitch 0.3s ease forwards';
    setTimeout(() => { title.style.animation = ''; }, 350);
  });
});

// Add glitch keyframes dynamically
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes glitch {
    0%  { transform: translateX(0); text-shadow: none; }
    20% { transform: translateX(-3px); text-shadow: 3px 0 #00ff41; color: #fff; }
    40% { transform: translateX(3px); text-shadow: -3px 0 #ff00ff; }
    60% { transform: translateX(-2px); text-shadow: 2px 0 #00ff41; }
    80% { transform: translateX(2px); text-shadow: -2px 0 #ff00ff; }
    100%{ transform: translateX(0); text-shadow: none; }
  }
`;
document.head.appendChild(glitchStyle);

/* =====================================================
   10. CURSOR TRAIL (subtle green dots)
===================================================== */
const dots = [];
const DOT_COUNT = 8;

for (let i = 0; i < DOT_COUNT; i++) {
  const dot = document.createElement('div');
  Object.assign(dot.style, {
    position: 'fixed',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#00ff41',
    pointerEvents: 'none',
    zIndex: '9999',
    opacity: '0',
    transition: `all ${0.05 + i * 0.04}s ease`,
    boxShadow: '0 0 6px rgba(0,255,65,0.6)',
  });
  document.body.appendChild(dot);
  dots.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateDots() {
  let prevX = mouseX, prevY = mouseY;

  dots.forEach((dot, i) => {
    dot.x += (prevX - dot.x) * (1 - i * 0.08);
    dot.y += (prevY - dot.y) * (1 - i * 0.08);
    dot.el.style.left = `${dot.x - 2}px`;
    dot.el.style.top = `${dot.y - 2}px`;
    dot.el.style.opacity = `${(1 - i / DOT_COUNT) * 0.6}`;
    prevX = dot.x;
    prevY = dot.y;
  });

  requestAnimationFrame(animateDots);
}

animateDots();

/* =====================================================
   11. CONTACT TERMINAL TYPEWRITER
===================================================== */
window.addEventListener('load', () => {
  const cmd = document.getElementById('contact-cmd');
  if (!cmd) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      cmd.style.overflow = 'hidden';
      cmd.style.whiteSpace = 'nowrap';
      cmd.style.animation = 'typing 1s steps(28) forwards';
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(cmd);
});
