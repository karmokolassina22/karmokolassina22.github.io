/* =============================================
   PARTICLES
   ============================================= */
(function createParticles() {
  var container = document.getElementById('particles');
  if (!container) return;
  for (var i = 0; i < 30; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    var size = (1 + Math.random() * 2.5).toFixed(1) + 'px';
    p.style.cssText = [
      'left:' + (Math.random() * 100) + 'vw',
      'width:' + size,
      'height:' + size,
      'animation-duration:' + (10 + Math.random() * 18) + 's',
      'animation-delay:' + (Math.random() * 12) + 's'
    ].join(';');
    container.appendChild(p);
  }
})();

/* =============================================
   TYPING EFFECT
   ============================================= */
(function typingEffect() {
  var phrases = [
    'DevOps',
    'Développeur Backend',
    'Développeur Web Full-Stack',
    'Java · Python · JavaScript',
    'Docker & Jenkins'
  ];
  var el = document.getElementById('typed-text');
  if (!el) return;

  var phraseIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    var current = phrases[phraseIdx];
    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 450);
        return;
      }
      setTimeout(tick, 55);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        setTimeout(function () { deleting = true; tick(); }, 2000);
        return;
      }
      setTimeout(tick, 95);
    }
  }
  tick();
})();

/* =============================================
   SKILL BARS – animate when visible
   ============================================= */
(function animateBars() {
  var groups = document.querySelectorAll('.skill-group');
  if (!groups.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(function (bar) {
          bar.style.width = (bar.dataset.w || 0) + '%';
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  groups.forEach(function (g) { obs.observe(g); });
})();

/* =============================================
   NAV – active link on scroll + shadow on scroll
   ============================================= */
(function navBehavior() {
  var navbar   = document.getElementById('navbar');
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('.nav-links a');

  function onScroll() {
    var scrollY = window.scrollY;

    /* scrolled shadow */
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 60);
    }

    /* active link */
    var current = '';
    sections.forEach(function (s) {
      if (scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* =============================================
   MOBILE MENU TOGGLE
   ============================================= */
(function mobileMenu() {
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navLinks');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });

  /* close on link click */
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
    });
  });
})();

/* =============================================
   CONTACT FORM
   ============================================= */
(function contactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('.btn-submit');
    var orig = btn.textContent;
    var data = new FormData(form);

    fetch('https://formspree.io/f/xrerozep', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      if (res.ok) {
        btn.textContent = '✓ Message envoyé !';
        btn.style.background = '#059669';
        btn.disabled = true;
        form.reset();
        setTimeout(function() {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
        }, 3500);
      } else {
        btn.textContent = '❌ Erreur, réessaie';
        btn.style.background = '#dc2626';
        setTimeout(function() {
          btn.textContent = orig;
          btn.style.background = '';
        }, 3000);
      }
    })
    .catch(function() {
      btn.textContent = '❌ Erreur réseau';
      btn.style.background = '#dc2626';
      setTimeout(function() {
        btn.textContent = orig;
        btn.style.background = '';
      }, 3000);
    });
  });
})();

/* =============================================
   FADE-IN ON SCROLL (cards & sections)
   ============================================= */
(function fadeIn() {
  var targets = document.querySelectorAll(
    '.acard, .pcard, .fcard, .tl-item, .info-card, .skill-group'
  );
  if (!targets.length) return;

  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { obs.observe(el); });
})();
