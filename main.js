console.log(
  '%c hi :) %csource → github.com/ankitsxchdeva/ankitsxchdeva.github.io',
  'font-size:14px; color:#355691; font-weight:700',
  'font-size:12px; color:#7e7c94'
);

// Tab system
(function () {
  var links = document.querySelectorAll('.tab-link');
  var panels = document.querySelectorAll('.tab-panel');

  var baseTitle = document.title;
  var valid = Array.from(links).map(function (l) { return l.dataset.tab; });

  function activate(tab, sub, user) {
    links.forEach(function (l) {
      var isActive = l.dataset.tab === tab;
      l.classList.toggle('active', isActive);
      if (isActive) l.setAttribute('aria-current', 'page');
      else l.removeAttribute('aria-current');
    });
    panels.forEach(function (p) {
      p.classList.toggle('active', p.id === 'tab-' + tab);
    });
    if (user) {
      var heading = document.querySelector('#tab-' + tab + ' h1, #tab-' + tab + ' h2');
      if (heading) heading.focus({ preventScroll: true });
    }
    if (tab === 'blog') showBlog(sub || null);
    else document.title = user && tab !== 'home' ? tab + ' · ' + baseTitle : baseTitle;
    window.scrollTo(0, 0);
  }

  function showBlog(slug) {
    var panel = document.getElementById('tab-blog');
    if (!panel) return;
    var index = panel.querySelector('.blog-index');
    var posts = panel.querySelectorAll('.blog-post');
    var match = null;
    if (slug) {
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].dataset.slug === slug) { match = posts[i]; break; }
      }
      if (!match) {
        history.replaceState(null, '', '#blog');
      }
    }
    if (match) {
      if (index) index.hidden = true;
      posts.forEach(function (p) { p.hidden = p !== match; });
      var title = match.querySelector('.blog-post-title');
      document.title = (title ? title.textContent.trim() + ' · ' : '') + baseTitle;
      match.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    } else {
      if (index) index.hidden = false;
      posts.forEach(function (p) { p.hidden = true; });
      document.title = baseTitle;
    }
  }

  function parseHash() {
    var raw = location.hash.replace(/^#/, '');
    var parts = raw.split('/');
    return { tab: parts[0] || '', sub: parts.slice(1).join('/') || null };
  }

  links.forEach(function (l) {
    l.addEventListener('click', function (e) {
      e.preventDefault();
      var tab = l.dataset.tab;
      var target = '#' + tab;
      if (location.hash !== target) history.pushState(null, '', target);
      activate(tab, null, true);
    });
  });

  function syncFromHash() {
    var h = parseHash();
    var t = h.tab && valid.indexOf(h.tab) !== -1 ? h.tab : 'home';
    activate(t, h.sub);
  }

  window.addEventListener('hashchange', syncFromHash);

  window.__tabActivate = activate;

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-blog-slug]');
    if (t) {
      e.preventDefault();
      var slug = t.getAttribute('data-blog-slug');
      var target = '#blog/' + slug;
      if (location.hash !== target) history.pushState(null, '', target);
      activate('blog', slug, true);
      return;
    }
    var b = e.target.closest && e.target.closest('[data-blog-back]');
    if (b) {
      e.preventDefault();
      if (location.hash !== '#blog') history.pushState(null, '', '#blog');
      activate('blog', null, true);
    }
  });

  var initial = parseHash();
  activate(valid.indexOf(initial.tab) !== -1 ? initial.tab : 'home', initial.sub);
})();

// Cool tab (entries are static HTML; this just staggers the fade-in)
(function () {
  var entries = document.querySelectorAll('#cool-list .cool-entry');
  if (!('IntersectionObserver' in window)) {
    entries.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (items) {
    items.forEach(function (item) {
      if (item.isIntersecting) {
        item.target.classList.add('visible');
        observer.unobserve(item.target);
      }
    });
  }, { threshold: 0.1 });
  entries.forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i * 0.07, 0.6) + 's';
    observer.observe(el);
  });
})();

// Keyboard tab shortcuts (1–5) + legend toggle (?)
(function () {
  var map = { '1': 'home', '2': 'projects', '3': 'music', '4': 'blog', '5': 'cool' };
  var legend = document.getElementById('kbd-legend');

  function showLegend() {
    if (!legend) return;
    legend.classList.add('visible');
    legend.setAttribute('aria-hidden', 'false');
  }
  function hideLegend() {
    if (!legend) return;
    legend.classList.remove('visible');
    legend.setAttribute('aria-hidden', 'true');
  }
  function legendVisible() {
    return legend && legend.classList.contains('visible');
  }

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

    if (e.key === '?') {
      e.preventDefault();
      if (legendVisible()) hideLegend(); else showLegend();
      return;
    }
    if (e.key === 'Escape') {
      if (legendVisible()) { hideLegend(); e.preventDefault(); }
      return;
    }
    var tab = map[e.key];
    if (tab && window.__tabActivate) {
      if (legendVisible()) hideLegend();
      var target = '#' + tab;
      if (location.hash !== target) history.pushState(null, '', target);
      window.__tabActivate(tab, null, true);
    }
  });
})();

// Copy email to clipboard (desktop only — mobile uses the native mailto)
(function () {
  if (window.matchMedia('(max-width: 600px)').matches) return;
  var link = document.querySelector('a[href^="mailto:"]');
  if (!link) return;
  var email = link.href.replace('mailto:', '');
  var orig = link.innerHTML;
  link.addEventListener('click', function (e) {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(function () {
      link.textContent = 'copied!';
      setTimeout(function () { link.innerHTML = orig; }, 1800);
    }).catch(function () {
      window.location.href = 'mailto:' + email;
    });
  });
})();

// Resume prefetch
(function () {
  var link = document.querySelector('a[href*="ankitsachdeva.com/resume"]');
  if (!link) return;
  link.addEventListener('mouseenter', function () {
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = 'https://ankitsachdeva.com/resume/Ankit_Sachdeva_Resume.pdf';
    document.head.appendChild(l);
  }, { once: true });
})();
