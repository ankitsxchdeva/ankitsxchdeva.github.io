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
  var map = { '1': 'home', '2': 'projects', '3': 'music' };
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

// ─── Home shape: a die that rolls into a new organic gem each throw ────────
// Every roll cuts a fresh random crystal — a handful of points scattered on a
// sphere, nudged apart so the facets read balanced but never symmetric, then
// convex-hulled — so no two shapes ever repeat. Each throw sends the die up
// and, mid-tumble, the old wireframe lattice unknits while the next one knits
// — vertices travel across the sphere between the two solids — trailed by
// fading ghost outlines of the tumble. At rest the die is solid: flat-shaded
// ink facets. Hand-rolled canvas — no dependency, colors from the theme vars,
// pauses off-screen, static solid frame under reduced motion.
(function () {
  var canvas = document.getElementById('dice');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var verts = [], faces = [], edges = [];
  var morph = null, MORPH_MS = 450;        // wireframe re-knit between shapes
  var ghosts = [], ghostTimer = 0, GHOST_MS = 380; // motion-trail snapshots

  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function unit(a) {
    var l = Math.sqrt(dot(a, a)) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  }
  function nlerp(a, b, t) {
    return unit([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
  }

  // A fresh organic gem: n random directions on the unit sphere, nudged apart
  // by a few rounds of mutual repulsion so the facets read balanced but never
  // symmetric. Every point stays on the sphere, so the hull is always a clean
  // convex crystal and every gem lands at the same visual size.
  function randomPoints(n) {
    var pts = [], i, j, it;
    for (i = 0; i < n; i++) {
      var z = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2;
      var r = Math.sqrt(Math.max(0, 1 - z * z));
      pts.push([Math.cos(th) * r, Math.sin(th) * r, z]);
    }
    for (it = 0; it < 14; it++) {
      var f = pts.map(function () { return [0, 0, 0]; });
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) {
        var d = sub(pts[i], pts[j]);
        var k = 1 / (dot(d, d) + 0.05);
        f[i][0] += d[0] * k; f[i][1] += d[1] * k; f[i][2] += d[2] * k;
        f[j][0] -= d[0] * k; f[j][1] -= d[1] * k; f[j][2] -= d[2] * k;
      }
      var step = 0.6 / n;
      for (i = 0; i < n; i++) {
        pts[i] = unit([pts[i][0] + f[i][0] * step,
                       pts[i][1] + f[i][1] * step,
                       pts[i][2] + f[i][2] * step]);
      }
    }
    return pts;
  }

  // Brute-force convex hull triangles: (i,j,k) is a hull face iff every other
  // point sits on one side of its plane. O(n⁴), trivial at n ≤ 27.
  function hullTris(V) {
    var n = V.length, out = [], i, j, k, m, eps = 1e-7;
    for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) for (k = j + 1; k < n; k++) {
      var nor = cross(sub(V[j], V[i]), sub(V[k], V[i]));
      if (!nor[0] && !nor[1] && !nor[2]) continue;
      var pos = false, neg = false;
      for (m = 0; m < n; m++) {
        if (m === i || m === j || m === k) continue;
        var s = dot(nor, sub(V[m], V[i]));
        if (s > eps) pos = true; else if (s < -eps) neg = true;
        if (pos && neg) break;
      }
      if (!(pos && neg)) out.push([i, j, k]);
    }
    return out;
  }

  // Merge coplanar hull triangles into flat polygon faces (so a cube is six
  // quads with twelve edges, not a mess of diagonals), each with an outward
  // normal and its vertices ordered around the face centroid.
  function mergeFaces(V, tris) {
    var groups = [], t, i;
    for (t = 0; t < tris.length; t++) {
      var tr = tris[t];
      var n = unit(cross(sub(V[tr[1]], V[tr[0]]), sub(V[tr[2]], V[tr[0]])));
      var c = [(V[tr[0]][0] + V[tr[1]][0] + V[tr[2]][0]) / 3,
               (V[tr[0]][1] + V[tr[1]][1] + V[tr[2]][1]) / 3,
               (V[tr[0]][2] + V[tr[1]][2] + V[tr[2]][2]) / 3];
      if (dot(n, c) < 0) n = [-n[0], -n[1], -n[2]];
      var g = null;
      for (i = 0; i < groups.length; i++) {
        if (dot(groups[i].n, n) > 0.9999) { g = groups[i]; break; }
      }
      if (!g) { g = { n: n, vs: {} }; groups.push(g); }
      g.vs[tr[0]] = g.vs[tr[1]] = g.vs[tr[2]] = 1;
    }
    return groups.map(function (g2) {
      var idx = Object.keys(g2.vs).map(Number);
      var c2 = [0, 0, 0];
      idx.forEach(function (ix) { c2[0] += V[ix][0]; c2[1] += V[ix][1]; c2[2] += V[ix][2]; });
      c2 = [c2[0] / idx.length, c2[1] / idx.length, c2[2] / idx.length];
      var u = unit(sub(V[idx[0]], c2)), w = cross(g2.n, u);
      function ang(ix) { var p = sub(V[ix], c2); return Math.atan2(dot(p, w), dot(p, u)); }
      idx.sort(function (a, b) { return ang(a) - ang(b); });
      return { v: idx, n: g2.n };
    });
  }

  function faceEdges(F) {
    var seen = {}, out = [];
    F.forEach(function (f) {
      for (var i = 0; i < f.v.length; i++) {
        var a = f.v[i], b = f.v[(i + 1) % f.v.length];
        var key = a < b ? a + '_' + b : b + '_' + a;
        if (!seen[key]) { seen[key] = 1; out.push([a, b]); }
      }
    });
    return out;
  }

  function buildShape(n) {
    verts = randomPoints(n);
    faces = mergeFaces(verts, hullTris(verts));
    edges = faceEdges(faces);
  }
  buildShape(9);

  // ── render + physics state ──
  var rotX = 0.55, rotY = 0.45, rotZ = 0;  // orientation (rad)
  var wx = 0, wy = 0, wz = 0;              // angular velocity (rad/ms)
  var IDLE = 0.00011;                       // slow rest drift (rad/ms)
  var offY = 0, vy = 0;                     // vertical offset + velocity (css px)
  var grounded = true, restTimer = 0, REST_MS = 1600;
  var sol = 1;                              // 1 = solid, 0 = wireframe
  var LIGHT = unit([-0.4, -0.65, 0.6]);     // upper-left key light (view space)
  var lineColor = '#30292f';
  var size = 0, scale = 0, dpr = 1, GRAV = 0.003, apex = 24;

  function readColor() {
    lineColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--fg').trim() || '#30292f';
  }
  function resize() {
    var rect = canvas.getBoundingClientRect();
    size = Math.max(1, Math.min(rect.width, rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    scale = size * 0.35;
    GRAV = size * 0.00001;                  // px/ms², scales with the canvas
    apex = size * 0.10;                     // hop height
    readColor();
  }

  function draw() {
    var w = canvas.width, h = canvas.height, s0 = scale * dpr;
    var cx = w / 2, cy = h * 0.52 + offY * dpr;
    ctx.clearRect(0, 0, w, h);

    var cxr = Math.cos(rotX), sxr = Math.sin(rotX);
    var cyr = Math.cos(rotY), syr = Math.sin(rotY);
    var czr = Math.cos(rotZ), szr = Math.sin(rotZ);
    function rot(p3) {
      var x1 = p3[0] * cyr + p3[2] * syr, z1 = -p3[0] * syr + p3[2] * cyr;   // yaw
      var y2 = p3[1] * cxr - z1 * sxr, z2 = p3[1] * sxr + z1 * cxr;          // pitch
      return [x1 * czr - y2 * szr, x1 * szr + y2 * czr, z2];                 // roll
    }
    function projectAt(list, rx, ry, rz, oy) {
      var ca = Math.cos(rx), sa = Math.sin(rx);
      var cb = Math.cos(ry), sb = Math.sin(ry);
      var cc = Math.cos(rz), sc = Math.sin(rz);
      var yy = h * 0.52 + oy * dpr, out = [], i2, q;
      for (i2 = 0; i2 < list.length; i2++) {
        q = list[i2];
        var x1 = q[0] * cb + q[2] * sb, z1 = -q[0] * sb + q[2] * cb;
        var y2 = q[1] * ca - z1 * sa, z2 = q[1] * sa + z1 * ca;
        out.push([cx + (x1 * cc - y2 * sc) * s0, yy + (x1 * sc + y2 * cc) * s0, z2]);
      }
      return out;
    }
    function wires(pts, elist, aScale, dots) {
      if (aScale <= 0.004) return;
      for (var e = 0; e < elist.length; e++) {
        var a2 = pts[elist[e][0]], b2 = pts[elist[e][1]];
        var td = ((a2[2] + b2[2]) * 0.5 + 1) * 0.5;
        ctx.globalAlpha = Math.min(1, aScale * (0.15 + 0.85 * td));
        ctx.beginPath(); ctx.moveTo(a2[0], a2[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke();
      }
      if (!dots) return;
      for (var vd = 0; vd < pts.length; vd++) {
        ctx.globalAlpha = Math.min(1, aScale * (0.2 + 0.8 * ((pts[vd][2] + 1) * 0.5)));
        ctx.beginPath(); ctx.arc(pts[vd][0], pts[vd][1], Math.max(1, dpr) * 1.3, 0, 6.2832); ctx.fill();
      }
    }

    ctx.lineWidth = Math.max(1, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    // Motion trail — faded snapshots of the tumble, oldest dimmest, wiped as
    // the die solidifies.
    for (var g = 0; g < ghosts.length; g++) {
      var gh = ghosts[g];
      wires(projectAt(verts, gh.rx, gh.ry, gh.rz, gh.oy), edges,
            (1 - gh.age / GHOST_MS) * 0.18 * (1 - sol), false);
    }

    // Wireframe pass — during a morph the old lattice unknits while the new
    // one knits, vertices travelling across the sphere between the two.
    if (sol < 0.98) {
      var pw = 1 - sol;
      if (morph) {
        var t = morph.t * morph.t * (3 - 2 * morph.t);       // smoothstep
        wires(projectAt(morph.va.map(function (pr) { return nlerp(pr[0], pr[1], t); }),
                        rotX, rotY, rotZ, offY), morph.ea, (1 - t) * pw, true);
        wires(projectAt(morph.vb.map(function (pr) { return nlerp(pr[0], pr[1], t); }),
                        rotX, rotY, rotZ, offY), morph.eb, t * pw, true);
      } else {
        wires(projectAt(verts, rotX, rotY, rotZ, offY), edges, pw, true);
      }
    }

    // Solid pass — front faces flat-shaded in ink, crisp facet outlines.
    if (sol > 0.02) {
      var p = [], i;
      for (i = 0; i < verts.length; i++) {
        var r = rot(verts[i]);
        p.push([cx + r[0] * s0, cy + r[1] * s0, r[2]]);
      }
      for (var f = 0; f < faces.length; f++) {
        var nr = rot(faces[f].n);
        if (nr[2] <= 0) continue;                              // backface cull
        var lit = Math.max(0, dot(nr, LIGHT));                 // 1 = facing light
        ctx.beginPath();
        var fv = faces[f].v;
        ctx.moveTo(p[fv[0]][0], p[fv[0]][1]);
        for (i = 1; i < fv.length; i++) ctx.lineTo(p[fv[i]][0], p[fv[i]][1]);
        ctx.closePath();
        ctx.globalAlpha = sol * (0.05 + 0.20 * (1 - lit));
        ctx.fill();
        ctx.globalAlpha = sol * 0.7;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  // A roll: cut a fresh gem, throw, and set up the wireframe morph — each old
  // vertex travels to its nearest new one (and vice versa), so the lattice
  // visibly re-knits mid-air.
  function roll() {
    var fromV = verts, fromE = edges;
    buildShape(5 + Math.floor(Math.random() * 14));   // 5–18 points
    function nearest(set, v) {
      var best = set[0], bd = -2;
      for (var i = 0; i < set.length; i++) {
        var d = dot(set[i], v);
        if (d > bd) { bd = d; best = set[i]; }
      }
      return best;
    }
    morph = {
      va: fromV.map(function (v) { return [v, nearest(verts, v)]; }),
      ea: fromE,
      vb: verts.map(function (v) { return [nearest(fromV, v), v]; }),
      eb: edges,
      t: 0
    };
    vy = -Math.sqrt(2 * GRAV * apex);       // launch up; gravity brings it back
    grounded = false;
    var mag = 0.003 + Math.random() * 0.003;
    function spin(f) { return (Math.random() < 0.5 ? -1 : 1) * mag * f * (0.6 + Math.random() * 0.7); }
    wx = spin(1); wy = spin(1); wz = spin(0.6);
  }

  var running = false, rafId = 0, last = 0;
  function frame(now) {
    if (!last) last = now;
    var dt = Math.min(48, now - last); last = now;

    vy += GRAV * dt; offY += vy * dt;       // gravity + integrate
    if (offY >= 0) {                         // floor at the rest line
      offY = 0;
      if (vy > 0.05 * (size / 300 + 1)) {    // bounce: restitution + spin loss
        vy = -vy * 0.42; wx *= 0.55; wy *= 0.55; wz *= 0.55;
      } else { vy = 0; grounded = true; }
    }
    rotX += wx * dt; rotY += (wy + IDLE) * dt; rotZ += wz * dt;

    if (morph) {
      morph.t = Math.min(1, morph.t + dt / MORPH_MS);
      if (morph.t >= 1) morph = null;
    }
    ghostTimer += dt;                        // trail snapshots while tumbling
    if (sol < 0.6 && ghostTimer >= 50) {
      ghostTimer = 0;
      ghosts.push({ rx: rotX, ry: rotY, rz: rotZ, oy: offY, age: 0 });
      if (ghosts.length > 5) ghosts.shift();
    }
    for (var gi = ghosts.length - 1; gi >= 0; gi--) {
      ghosts[gi].age += dt;
      if (ghosts[gi].age >= GHOST_MS) ghosts.splice(gi, 1);
    }

    if (grounded) {
      var fr = Math.pow(0.85, dt / 16); wx *= fr; wy *= fr; wz *= fr;
      if (Math.abs(wx) + Math.abs(wy) + Math.abs(wz) < 0.00035) {
        wx = wy = wz = 0; restTimer += dt;
        if (restTimer >= REST_MS) { restTimer = 0; roll(); }
      } else restTimer = 0;
    } else {
      var fa = Math.pow(0.998, dt / 16); wx *= fa; wy *= fa; wz *= fa; // air drag
    }

    // Solidity: dissolve fast on the throw, re-set slowly after landing.
    var target = grounded ? 1 : 0;
    var k = target > sol ? Math.pow(0.90, dt / 16) : Math.pow(0.72, dt / 16);
    sol += (target - sol) * (1 - k);

    draw();
    rafId = requestAnimationFrame(frame);
  }

  function homeVisible() {
    var panel = document.getElementById('tab-home');
    return !document.hidden && panel && panel.classList.contains('active');
  }
  function start() {
    if (running || reduce) return;
    running = true; last = 0; rafId = requestAnimationFrame(frame);
  }
  function stop() { running = false; if (rafId) cancelAnimationFrame(rafId); rafId = 0; }
  function update() {
    if (homeVisible()) { resize(); if (reduce) draw(); else start(); }
    else stop();
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (homeVisible()) { resize(); draw(); } }, 120);
  });
  document.addEventListener('visibilitychange', update);
  var home = document.getElementById('tab-home');
  if (home && 'MutationObserver' in window) {
    new MutationObserver(update).observe(home, { attributes: true, attributeFilter: ['class'] });
  }
  var darkMq = window.matchMedia('(prefers-color-scheme: dark)');
  (darkMq.addEventListener ? darkMq.addEventListener.bind(darkMq, 'change')
                           : darkMq.addListener.bind(darkMq))(
    function () { readColor(); if (!running) draw(); }
  );

  update();
})();
