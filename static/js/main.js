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
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Aurora particle palette
  const AURORA_COLORS = ['168,85,247', '34,211,238', '236,72,153', '124,58,237', '59,130,246'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.6 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.15;
      this.color = AURORA_COLORS[Math.floor(Math.random() * AURORA_COLORS.length)];
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H || this.life > this.maxLife) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity * (1 - this.life / this.maxLife);
      ctx.fillStyle = `rgb(${this.color})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgb(${this.color})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  let mouseParticleX = -1000, mouseParticleY = -1000;
  window.addEventListener('mousemove', e => {
    mouseParticleX = e.clientX;
    mouseParticleY = e.clientY;
  });

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 110) * 0.14;
          ctx.strokeStyle = `rgb(${particles[i].color})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
      const dx = particles[i].x - mouseParticleX;
      const dy = particles[i].y - mouseParticleY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 160) * 0.35;
        ctx.strokeStyle = `rgb(${particles[i].color})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseParticleX, mouseParticleY);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightNavLink();
  });

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
  window.addEventListener('scroll', () => {
    let anyLight = false;
    lightSects.forEach(s => {
      const r = s.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5) anyLight = true;
    });
    document.body.classList.toggle('cursor-light', anyLight);
  }, { passive: true });

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

  /* ─── PARALLAX EFFECT ─── */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.deco-circle').forEach(el => {
      el.style.transform = `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg)`;
    });
  });

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

    // Initial spread on a mid ring, each with a random heading
    let r0 = radius();
    const st = icons.map((el, i) => {
      const ang = (i / icons.length) * Math.PI * 2 + Math.random() * 0.5;
      const rad = r0 * 0.74;
      const sp = 22 + Math.random() * 16;
      const dir = Math.random() * Math.PI * 2;
      return { el, x: Math.cos(ang) * rad, y: Math.sin(ang) * rad, vx: Math.cos(dir) * sp, vy: Math.sin(dir) * sp };
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
        // random wander
        s.vx += (Math.random() - 0.5) * 34 * dt;
        s.vy += (Math.random() - 0.5) * 34 * dt;
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
            A.x -= nx * push; A.y -= ny * push;
            B.x += nx * push; B.y += ny * push;
            A.vx -= nx * 6; A.vy -= ny * 6;
            B.vx += nx * 6; B.vy += ny * 6;
          }
        }
      }

      for (const s of st) {
        s.el.style.transform = `translate(-50%, -50%) translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px)`;
      }
      requestAnimationFrame(frame);
    }
    frame(performance.now());
    requestAnimationFrame(frame);
  })();

  /* ─── TOP SCROLL PROGRESS BAR ─── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? doc.scrollTop / max : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ─── BACKGROUND SPIDER (follows the cursor) ─── */
  (function initSpider() {
    const c = document.getElementById('spider-canvas');
    if (!c) return;
    const x = c.getContext('2d');
    let W, H;
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    let mx = window.innerWidth / 2, my = window.innerHeight * 0.4;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const body = { x: mx, y: my, heading: 0 };
    const REACH = 68, STEP_THRESH = 40, TURN = 0.12, MAX_SPEED = 5;

    // 8 legs — 4 each side, spread around the body's perpendicular
    const legs = [];
    [-1, 1].forEach(side => {
      [0.55, 0.2, -0.2, -0.55].forEach(spread => {
        legs.push({ side, spread, foot: { x: body.x, y: body.y }, stepping: false });
      });
    });

    function frame() {
      // Turn toward the cursor first, then walk forward along the heading
      // (so it scuttles like a spider instead of gliding/flying sideways).
      const dx = mx - body.x, dy = my - body.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 6) {
        const desired = Math.atan2(dy, dx);
        let diff = desired - body.heading;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));  // normalise to -PI..PI
        body.heading += diff * TURN;                         // rotate gradually
        const speed = Math.min(dist * 0.05, MAX_SPEED);
        body.x += Math.cos(body.heading) * speed;
        body.y += Math.sin(body.heading) * speed;
      }
      const hd = body.heading;

      x.clearRect(0, 0, W, H);

      // legs
      for (const leg of legs) {
        const perp = hd + (Math.PI / 2) * leg.side;
        const sx = body.x + Math.cos(perp) * 7;
        const sy = body.y + Math.sin(perp) * 7;
        const footAngle = hd + leg.side * (Math.PI / 2) + leg.spread;
        const ix = body.x + Math.cos(footAngle) * REACH;
        const iy = body.y + Math.sin(footAngle) * REACH;

        if (Math.hypot(leg.foot.x - ix, leg.foot.y - iy) > STEP_THRESH) leg.stepping = true;
        if (leg.stepping) {
          leg.foot.x += (ix - leg.foot.x) * 0.3;
          leg.foot.y += (iy - leg.foot.y) * 0.3;
          if (Math.hypot(leg.foot.x - ix, leg.foot.y - iy) < 4) leg.stepping = false;
        }

        // bent knee (lift perpendicular to the leg line)
        const midx = (sx + leg.foot.x) / 2, midy = (sy + leg.foot.y) / 2;
        const lAng = Math.atan2(leg.foot.y - sy, leg.foot.x - sx);
        const lift = leg.stepping ? 26 : 14;   // raise the knee while taking a step
        const knx = midx + Math.cos(lAng - (Math.PI / 2) * leg.side) * lift;
        const kny = midy + Math.sin(lAng - (Math.PI / 2) * leg.side) * lift;

        x.beginPath();
        x.moveTo(sx, sy);
        x.quadraticCurveTo(knx, kny, leg.foot.x, leg.foot.y);
        x.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        x.lineWidth = 1.8;
        x.shadowBlur = 8;
        x.shadowColor = 'rgba(168, 85, 247, 0.6)';
        x.stroke();

        x.beginPath();
        x.arc(leg.foot.x, leg.foot.y, 2, 0, Math.PI * 2);
        x.fillStyle = 'rgba(34, 211, 238, 0.7)';
        x.fill();
      }

      // abdomen
      const ax = body.x - Math.cos(hd) * 11, ay = body.y - Math.sin(hd) * 11;
      x.shadowBlur = 18; x.shadowColor = 'rgba(168, 85, 247, 0.8)';
      const g = x.createRadialGradient(ax, ay, 1, ax, ay, 13);
      g.addColorStop(0, 'rgba(236, 72, 153, 0.9)');
      g.addColorStop(1, 'rgba(124, 58, 237, 0.65)');
      x.beginPath();
      x.ellipse(ax, ay, 12, 9.5, hd, 0, Math.PI * 2);
      x.fillStyle = g;
      x.fill();

      // head
      const hx = body.x + Math.cos(hd) * 6, hy = body.y + Math.sin(hd) * 6;
      x.beginPath();
      x.arc(hx, hy, 6, 0, Math.PI * 2);
      x.fillStyle = 'rgba(34, 211, 238, 0.9)';
      x.fill();
      x.shadowBlur = 0;

      requestAnimationFrame(frame);
    }
    frame();
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
