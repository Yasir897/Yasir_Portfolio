/* ============================================
   PORTFOLIO MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── CINEMATIC INTRO ─── */
  const overlay     = document.getElementById('intro-overlay');
  const introTop    = document.getElementById('introTop');
  const introBot    = document.getElementById('introBottom');
  const introName   = document.getElementById('introName');
  const introFirst  = document.getElementById('introFirst');
  const introLast   = document.getElementById('introLast');
  const introInit   = document.querySelector('.intro-initials');
  const introSub    = document.querySelector('.intro-subtitle');
  const heroSection = document.getElementById('hero');

  // Hero waits below — rises when overlay fades
  heroSection.style.opacity   = '0';
  heroSection.style.transform = 'translateY(80px)';

  // Phase 1 — Name slides in, staggered
  setTimeout(() => introInit  && introInit.classList.add('visible'),  200);
  setTimeout(() => introFirst && introFirst.classList.add('visible'), 380);
  setTimeout(() => introLast  && introLast.classList.add('visible'),  600);
  setTimeout(() => introSub   && introSub.classList.add('visible'),   800);

  // Phase 2 — Hold 2 seconds (800ms → 2800ms)

  // Phase 3 — Name fades out
  setTimeout(() => introName.classList.add('hidden-name'), 2800);

  // Phase 4 — Overlay bg instantly → WHITE, pieces split ↖ and ↘
  setTimeout(() => {
    overlay.classList.add('split-ready');
    introTop.classList.add('exit');
    introBot.classList.add('exit');
  }, 2950);

  // Phase 6 — Overlay fades away + Hero rises from below simultaneously
  setTimeout(() => {
    overlay.classList.add('fading');
    heroSection.style.transition = 'opacity 1.1s ease, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
    heroSection.style.opacity    = '1';
    heroSection.style.transform  = 'translateY(0)';
  }, 4100);

  // Phase 7 — Overlay completely removed, cleanup
  setTimeout(() => {
    overlay.classList.add('done');
    heroSection.style.transition = '';
    heroSection.style.opacity    = '';
    heroSection.style.transform  = '';
  }, 4900);

  /* ─── CUSTOM CURSOR ─── */
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .tech-tag, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  /* ─── PARTICLE CANVAS ─── */
  // The animated web + silk threads + spider now live in ONE lightweight
  // canvas (see "BACKGROUND SPIDER" below) — this keeps scrolling smooth.
  // The old heavy particle field (120 dots + per-dot shadow + double web)
  // was removed because it caused jank while scrolling.

  /* ─── NAVBAR (scroll work handled by consolidated handler below) ─── */
  const navbar = document.getElementById('navbar');

  /* ─── MOBILE MENU ─── */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ─── ACTIVE NAV HIGHLIGHT ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavLink() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) link.classList.add('active');
        });
      }
    });
  }

  /* ─── TYPED TEXT ─── */
  const typedEl = document.getElementById('typedText');
  if (typedEl && typeof typedRoles !== 'undefined') {
    let roleIdx = 0, charIdx = 0, deleting = false;
    function type() {
      const current = typedRoles[roleIdx];
      if (deleting) {
        charIdx--;
        typedEl.textContent = current.substring(0, charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % typedRoles.length; setTimeout(type, 400); return; }
        setTimeout(type, 40);
      } else {
        charIdx++;
        typedEl.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
        setTimeout(type, 80);
      }
    }
    setTimeout(type, 1600);
  }

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.getPropertyValue('--delay') || '0ms';
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay) || 0);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ─── SKILL BAR ANIMATION ─── */
  const skillBars = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = width + '%'; }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ─── COUNT UP ANIMATION ─── */
  const countEls = document.querySelectorAll('.stat-num[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
          else { el.textContent = Math.floor(current); }
        }, 35);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countEls.forEach(el => countObserver.observe(el));

  /* ─── CURSOR: light/dark section detection ─── */
  const lightSects = document.querySelectorAll('.light-section');
  const cursorObserver = new IntersectionObserver((entries) => {
    let anyLight = false;
    lightSects.forEach(s => {
      const r = s.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5) anyLight = true;
    });
    document.body.classList.toggle('cursor-light', anyLight);
  }, { threshold: [0, 0.5, 1] });
  lightSects.forEach(s => cursorObserver.observe(s));

  /* ─── CONSOLIDATED SCROLL HANDLER (rAF-throttled → no scroll jank) ─── */
  const decoCircles = document.querySelectorAll('.deco-circle');
  const progressBarEl = document.getElementById('scroll-progress');
  let scrollTick = false;
  function onScrollFrame() {
    scrollTick = false;
    const sy = window.scrollY;
    navbar.classList.toggle('scrolled', sy > 50);
    if (progressBarEl) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progressBarEl.style.transform = `scaleX(${max > 0 ? sy / max : 0})`;
    }
    highlightNavLink();
    for (const el of decoCircles) {
      el.style.transform = `translateY(${sy * 0.08}px) rotate(${sy * 0.02}deg)`;
    }
    let anyLight = false;
    lightSects.forEach(s => {
      const r = s.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5) anyLight = true;
    });
    document.body.classList.toggle('cursor-light', anyLight);
  }
  window.addEventListener('scroll', () => {
    if (!scrollTick) { scrollTick = true; requestAnimationFrame(onScrollFrame); }
  }, { passive: true });
  onScrollFrame();

  /* ─── TEXT SCRAMBLE on section titles ─── */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$';
  function scramble(el) {
    const original = el.textContent;
    let iter = 0;
    const id = setInterval(() => {
      el.textContent = original.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < iter) return original[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      iter += 0.4;
      if (iter >= original.length) { el.textContent = original; clearInterval(id); }
    }, 28);
  }
  const scrambleTitles = document.querySelectorAll('.scramble-title');
  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scramble(entry.target);
        scrambleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  scrambleTitles.forEach(el => scrambleObserver.observe(el));

  /* ─── MAGNETIC BUTTONS ─── */
  document.querySelectorAll('.magnetic-btn, .btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.28;
      const y = (e.clientY - r.top  - r.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ─── 3D TILT ON CARDS ─── */
  const tiltCards = document.querySelectorAll('.project-card, .skill-category-card, .timeline-content');
  tiltCards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-py * 7).toFixed(2);
      const ry = (px * 9).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ─── AURORA BLOBS REACT TO MOUSE ─── */
  const blobs = document.querySelectorAll('.aurora-blob');
  let blobRX = 0, blobRY = 0;
  document.addEventListener('mousemove', e => {
    blobRX = (e.clientX / window.innerWidth - 0.5);
    blobRY = (e.clientY / window.innerHeight - 0.5);
  });
  function driftBlobs() {
    blobs.forEach((b, i) => {
      const depth = (i + 1) * 14;
      b.style.marginLeft = (blobRX * depth) + 'px';
      b.style.marginTop = (blobRY * depth) + 'px';
    });
    requestAnimationFrame(driftBlobs);
  }
  driftBlobs();

  /* ─── PARALLAX is handled by the consolidated scroll handler above ─── */

  /* ─── SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── FREE-FLOATING TECH LOGOS (random drift, physics, never pauses) ─── */
  (function initOrbit() {
    const system = document.querySelector('.orbit-system');
    if (!system) return;
    const icons = Array.from(system.querySelectorAll('.orbit-icon'));
    if (!icons.length) return;

    const ICON_HALF = 26;       // half chip size (px)
    const R_MIN = 0.55;         // keep clear of the name (fraction of system radius)
    const R_MAX = 0.92;         // stay inside the system
    const MIN_DIST = 66;        // min centre-to-centre between logos (no overlap)
    const V_MIN = 16, V_MAX = 46;   // px/s speed bounds (always moving)

    function radius() {
      const w = system.offsetWidth;
      return (w && w > 0 ? w : Math.min(window.innerWidth * 0.86, 560)) / 2;
    }

    // Initial spread at varied radii + random headings
    let r0 = radius();
    const st = icons.map((el, i) => {
      const ang = (i / icons.length) * Math.PI * 2 + Math.random() * 0.6;
      const rad = r0 * (0.6 + Math.random() * 0.28);
      const sp = 22 + Math.random() * 16;
      const dir = Math.random() * Math.PI * 2;
      const s = {
        el, frozen: false, kick: 1 + Math.random() * 2.5,
        x: Math.cos(ang) * rad, y: Math.sin(ang) * rad,
        vx: Math.cos(dir) * sp, vy: Math.sin(dir) * sp
      };
      // Hover → freeze this logo (so it's easy to click) + highlight
      el.addEventListener('mouseenter', () => { s.frozen = true; el.classList.add('is-hover'); });
      el.addEventListener('mouseleave', () => { s.frozen = false; el.classList.remove('is-hover'); });
      return s;
    });

    let last = performance.now();
    function frame(now) {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05;   // clamp after tab switch

      const R = radius();
      const rMin = R * R_MIN;
      const rMax = R * R_MAX - ICON_HALF;

      for (const s of st) {
        if (s.frozen) continue;   // held still under the cursor → clickable
        // occasional random kick → breaks any circular pattern (true random drift)
        s.kick -= dt;
        if (s.kick <= 0) {
          const kd = Math.random() * Math.PI * 2, ks = V_MIN + Math.random() * (V_MAX - V_MIN);
          s.vx = Math.cos(kd) * ks; s.vy = Math.sin(kd) * ks;
          s.kick = 1.2 + Math.random() * 2.5;
        }
        // random wander
        s.vx += (Math.random() - 0.5) * 60 * dt;
        s.vy += (Math.random() - 0.5) * 60 * dt;
        // keep speed in range so they never stop and never bolt
        let sp = Math.hypot(s.vx, s.vy) || 0.001;
        if (sp < V_MIN) { const f = V_MIN / sp; s.vx *= f; s.vy *= f; }
        else if (sp > V_MAX) { const f = V_MAX / sp; s.vx *= f; s.vy *= f; }
        // move
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        // bounce off the name zone (inner) and the outer edge
        let d = Math.hypot(s.x, s.y) || 0.001;
        if (d > rMax) {
          const nx = s.x / d, ny = s.y / d, dot = s.vx * nx + s.vy * ny;
          s.x = nx * rMax; s.y = ny * rMax;
          s.vx -= 2 * dot * nx; s.vy -= 2 * dot * ny;
        } else if (d < rMin) {
          const nx = s.x / d, ny = s.y / d, dot = s.vx * nx + s.vy * ny;
          s.x = nx * rMin; s.y = ny * rMin;
          s.vx -= 2 * dot * nx; s.vy -= 2 * dot * ny;
        }
      }

      // separation — push apart any overlapping logos
      for (let a = 0; a < st.length; a++) {
        for (let b = a + 1; b < st.length; b++) {
          const A = st[a], B = st[b];
          let dx = B.x - A.x, dy = B.y - A.y;
          let d = Math.hypot(dx, dy) || 0.001;
          if (d < MIN_DIST) {
            const nx = dx / d, ny = dy / d, push = (MIN_DIST - d) / 2;
            if (!A.frozen) { A.x -= nx * push; A.y -= ny * push; A.vx -= nx * 6; A.vy -= ny * 6; }
            if (!B.frozen) { B.x += nx * push; B.y += ny * push; B.vx += nx * 6; B.vy += ny * 6; }
          }
        }
      }

      for (const s of st) {
        const sc = s.frozen ? ' scale(1.25)' : '';
        s.el.style.transform = `translate(-50%, -50%) translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px)${sc}`;
      }
      requestAnimationFrame(frame);
    }
    frame(performance.now());
    requestAnimationFrame(frame);
  })();

  /* ─── TOP SCROLL PROGRESS BAR is updated by the consolidated handler ─── */

  /* ─── BACKGROUND WEB + SPIDER (single lightweight canvas) ─── */
  (function initSpider() {
    const c = document.getElementById('spider-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    const ACC = '168,85,247';            // aurora purple
    let w = 0, h = 0, dpr = 1, nodes = [];

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // adaptive node count → light enough to stay smooth while scrolling
      const N = Math.max(34, Math.min(80, Math.floor(w * h / 18000)));
      nodes = [];
      for (let i = 0; i < N; i++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .26, vy: (Math.random() - .5) * .26 });
      }
    }
    build();
    window.addEventListener('resize', build);

    let heading = 0, t = 0;
    const mouse = { x: w / 2, y: h / 2, has: false, movedAt: -999 };
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.has = true; mouse.movedAt = t;
    }, { passive: true });

    const spider = { x: w / 2, y: h / 2 };
    const feet = []; for (let i = 0; i < 8; i++) feet.push({ x: w / 2, y: h / 2 });

    function drawSpider() {
      const sideAngles = [0.95, 1.4, 1.95, 2.45];
      ctx.lineCap = 'round';
      for (let i = 0; i < 8; i++) {
        const side = i < 4 ? 1 : -1;
        const a = heading + side * sideAngles[i % 4];
        const reach = 30 + Math.sin(t * 0.12 + i * 1.3) * 4;
        const txp = spider.x + Math.cos(a) * reach;
        const typ = spider.y + Math.sin(a) * reach;
        const f = feet[i];
        f.x += (txp - f.x) * 0.28; f.y += (typ - f.y) * 0.28;
        const shx = spider.x + Math.cos(a) * 4, shy = spider.y + Math.sin(a) * 4;
        const mxp = (shx + f.x) / 2 + Math.cos(a) * 6;
        const myp = (shy + f.y) / 2 + Math.sin(a) * 6 - 5;
        ctx.strokeStyle = 'rgba(' + ACC + ',0.8)';
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(shx, shy); ctx.quadraticCurveTo(mxp, myp, f.x, f.y); ctx.stroke();
        ctx.fillStyle = 'rgba(34,211,238,0.85)';
        ctx.beginPath(); ctx.arc(f.x, f.y, 1.4, 0, 6.2832); ctx.fill();
      }
      // abdomen
      const bx = spider.x - Math.cos(heading) * 6, by = spider.y - Math.sin(heading) * 6;
      ctx.save();
      ctx.shadowColor = 'rgba(' + ACC + ',0.7)'; ctx.shadowBlur = 14;
      const g = ctx.createRadialGradient(bx, by, 1, bx, by, 9);
      g.addColorStop(0, 'rgba(236,72,153,0.95)');
      g.addColorStop(1, 'rgba(124,58,237,0.85)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.ellipse(bx, by, 7, 8.5, heading, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = 'rgba(' + ACC + ',0.95)'; ctx.lineWidth = 1.3; ctx.stroke();
      // head
      const fx = spider.x + Math.cos(heading) * 4, fy = spider.y + Math.sin(heading) * 4;
      ctx.fillStyle = 'rgba(34,211,238,0.9)';
      ctx.beginPath(); ctx.ellipse(fx, fy, 4, 4, heading, 0, 6.2832); ctx.fill();
      ctx.restore();
    }

    function draw() {
      t++;
      ctx.clearRect(0, 0, w, h);
      // Follow the cursor; if it hasn't moved for a bit (e.g. while scrolling),
      // gently wander so the spider stays alive instead of looking frozen.
      let tx, ty;
      if (mouse.has && (t - mouse.movedAt) < 80) {
        tx = mouse.x; ty = mouse.y;
      } else {
        tx = w * 0.5 + Math.cos(t * 0.006) * w * 0.3;
        ty = h * 0.45 + Math.sin(t * 0.0085) * h * 0.25;
      }

      // drift nodes
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      // faint background web (node ↔ node)
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = 'rgba(200,190,255,' + (0.05 * (1 - d / 120)) + ')';
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of nodes) {
        ctx.fillStyle = 'rgba(200,190,255,0.2)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, 6.2832); ctx.fill();
      }

      // spider follows the cursor with a fast lerp → keeps up, no lag
      spider.x += (tx - spider.x) * 0.12;
      spider.y += (ty - spider.y) * 0.12;
      let diff = Math.atan2(ty - spider.y, tx - spider.x) - heading;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      heading += diff * 0.1;

      // silk threads from the SPIDER to nearby nodes
      const R = 210;
      for (const p of nodes) {
        const dx = p.x - spider.x, dy = p.y - spider.y, d = Math.hypot(dx, dy);
        if (d < R) {
          ctx.strokeStyle = 'rgba(' + ACC + ',' + (0.5 * (1 - d / R)) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(spider.x, spider.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        }
      }
      drawSpider();
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* ─── GLITCH EFFECT ON HERO NAME ─── */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    setInterval(() => {
      heroName.style.textShadow = `${Math.random() * 4 - 2}px 0 rgba(255,255,255,0.1)`;
      setTimeout(() => { heroName.style.textShadow = 'none'; }, 80);
    }, 4000);
  }

});
