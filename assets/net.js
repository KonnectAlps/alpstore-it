/* Rete animata (connettoma) dietro le fasce della home marcate con data-net: "top" = apertura, "fascia" = fasce senza testo
   fitto. Solo decorazione. Ogni fascia disegna solo quando è sullo schermo; tutto si ferma con la scheda nascosta;
   al massimo 30 fotogrammi al secondo; con «riduzione movimento» attiva resta un disegno fermo. */
(function () {
  'use strict';
  var COLS = [[196, 223, 216], [168, 196, 222], [230, 213, 168], [205, 191, 227], [185, 211, 176], [232, 185, 169]];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hosts = document.querySelectorAll('[data-net]');
  if (!hosts.length) return;
  var dpr = Math.min(2, window.devicePixelRatio || 1);

  // Bagliori pre-disegnati (uno per colore): niente gradienti nuovi a ogni fotogramma.
  var SPR = 32;
  function sprite(c, core) {
    var s = document.createElement('canvas'); s.width = s.height = SPR; var x = s.getContext('2d');
    var gr = x.createRadialGradient(SPR / 2, SPR / 2, 0, SPR / 2, SPR / 2, SPR / 2);
    if (core) gr.addColorStop(0, 'rgba(255,255,255,0.9)');
    gr.addColorStop(core ? 0.35 : 0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (core ? 0.5 : 0.35) + ')');
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, SPR, SPR); return s;
  }
  var PULSE = COLS.map(function (c) { return sprite(c, true); });
  var GLOW = COLS.map(function (c) { return sprite(c, false); });
  var RGB = COLS.map(function (c) { return c[0] + ',' + c[1] + ',' + c[2]; });

  function rnd(i, k) { var x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); }

  function Net(host) {
    this.host = host; this.kind = host.getAttribute('data-net') || 'fascia'; this.visible = true;
    var cv = this.cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:absolute;left:0;width:100%;z-index:-1;pointer-events:none;';
    document.body.appendChild(cv);
    this.g = cv.getContext('2d'); this.pulses = []; this.spawn = 0; this.last = 0;
  }
  Net.prototype.layout = function () {
    var r = this.host.getBoundingClientRect(), top = this.kind === 'top' ? 0 : Math.round(r.top + window.scrollY);
    var W = this.W = document.documentElement.clientWidth, H = this.H = Math.round(r.bottom + window.scrollY) - top;
    this.cv.style.top = top + 'px'; this.cv.style.height = H + 'px';
    this.cv.width = W * dpr; this.cv.height = H * dpr; this.g.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.kind === 'top') {
      // Il centro della rete sta a destra, lontano dal titolo; sul telefono in basso, sotto i pulsanti.
      if (W >= 900) { this.cx = W * 0.74; this.cy = H * 0.5; this.R0 = H * 0.12; this.R1 = W * 0.55; }
      else { this.cx = W / 2; this.cy = H * 0.8; this.R0 = W * 0.15; this.R1 = Math.max(W, H) * 0.7; }
    } else {
      // Fascia: anello attorno al testo centrale, il centro resta libero.
      this.cx = W / 2; this.cy = H / 2; this.R0 = Math.min(W * 0.32, 420); this.R1 = Math.max(W * 0.75, 520);
    }
    this.build();
  };
  Net.prototype.build = function () {
    var n = this.W < 700 ? 70 : 140, nodes = this.nodes = [], edges = this.edges = [], seen = {}, i, j;
    for (i = 0; i < n; i++) {
      var area = i % COLS.length, ang = (area / COLS.length + (rnd(i, 1) - 0.5) * 0.28) * 6.283;
      var rr = this.R0 + (this.R1 - this.R0) * Math.pow(rnd(i, 2), 1.1);
      nodes.push({ a: area, ang: ang, rr: rr, bx: 0, by: 0, z: (rnd(i, 3) - 0.5) * 360, s: 1.3 + rnd(i, 4) * 2.4, ph: rnd(i, 5) * 6.283, sp: 0.3 + rnd(i, 6) * 0.7, x: 0, y: 0, d: 1, hot: 0, big: rnd(i, 7) > 0.94 });
    }
    for (i = 0; i < n; i++) {
      var best = [];
      for (j = 0; j < n; j++) if (j !== i) { var dx = Math.cos(nodes[i].ang) * nodes[i].rr - Math.cos(nodes[j].ang) * nodes[j].rr, dy = (Math.sin(nodes[i].ang) * nodes[i].rr - Math.sin(nodes[j].ang) * nodes[j].rr) * 0.62; best.push([dx * dx + dy * dy, j]); }
      best.sort(function (p, q) { return p[0] - q[0]; });
      for (var k = 0; k < 3; k++) { var o = best[k][1], key = i < o ? i + '_' + o : o + '_' + i; if (!seen[key]) { seen[key] = 1; edges.push({ i: i, j: o, cross: nodes[i].a !== nodes[o].a, hot: 0 }); } }
    }
    var adj = this.adj = nodes.map(function () { return []; });
    edges.forEach(function (e, ei) { adj[e.i].push(ei); adj[e.j].push(ei); });
  };
  Net.prototype.draw = function (t) {
    var g = this.g, nodes = this.nodes, edges = this.edges, adj = this.adj, i;
    var dt = this.last ? Math.min(50, t - this.last) : 16; this.last = t;
    g.clearRect(0, 0, this.W, this.H);
    // Rotazione lenta nel piano (giro intero in circa 2 minuti e mezzo) e leggero respiro in profondità:
    // la profondità resta sempre positiva, niente raggi negativi che bloccherebbero il disegno.
    var rot = reduce ? 0 : t * 0.00004;
    for (i = 0; i < nodes.length; i++) {
      var nd = nodes[i], an = nd.ang + rot, x = Math.cos(an) * nd.rr, y = Math.sin(an) * nd.rr * 0.62, z = nd.z;
      if (!reduce) { z += Math.sin(t * 0.0003 * nd.sp + nd.ph) * 60; x += Math.sin(t * 0.0006 * nd.sp + nd.ph) * 4; y += Math.cos(t * 0.0005 * nd.sp + nd.ph) * 4; }
      var dep = 600 / (600 + z); nd.x = this.cx + x * dep; nd.y = this.cy + y * dep; nd.d = dep;
    }
    if (!reduce) {
      // Impulsi a ritmo costante (circa 14 al secondo): la rete non sembra mai ferma.
      this.spawn += 14 * dt / 1000;
      while (this.spawn >= 1) { this.spawn -= 1; this.pulses.push({ e: Math.floor(Math.random() * edges.length), t: 0, dir: Math.random() < 0.5 ? 1 : -1, v: 0.0006 + Math.random() * 0.0008 }); }
    }
    g.globalCompositeOperation = 'lighter';
    for (i = 0; i < edges.length; i++) {
      var e = edges[i], A = nodes[e.i], B = nodes[e.j]; e.hot = Math.max(0, e.hot - dt * 0.0012);
      var al = Math.min(1, 0.11 * Math.min(A.d, 1.2) * (e.cross ? 0.7 : 1) + e.hot * 0.5);
      g.strokeStyle = 'rgba(' + RGB[A.a] + ',' + al.toFixed(3) + ')'; g.lineWidth = e.cross ? 0.6 : 0.9;
      g.beginPath(); g.moveTo(A.x, A.y); g.lineTo(B.x, B.y); g.stroke();
    }
    var keep = [];
    for (i = 0; i < this.pulses.length; i++) {
      var p = this.pulses[i]; p.t += p.v * dt; var pe = edges[p.e]; if (!pe) continue;
      if (p.t >= 1) {
        var end = p.dir > 0 ? pe.j : pe.i; nodes[end].hot = 1; pe.hot = 1; var nx2 = adj[end];
        if (nx2.length && Math.random() < 0.6) { var ne = nx2[Math.floor(Math.random() * nx2.length)]; keep.push({ e: ne, t: 0, dir: edges[ne].i === end ? 1 : -1, v: p.v }); }
        continue;
      }
      keep.push(p);
      var PA = nodes[pe.i], PB = nodes[pe.j], u = p.dir > 0 ? p.t : 1 - p.t;
      g.drawImage(PULSE[PA.a], PA.x + (PB.x - PA.x) * u - 7, PA.y + (PB.y - PA.y) * u - 7, 14, 14);
    }
    this.pulses = keep.slice(-120);
    for (i = 0; i < nodes.length; i++) {
      var n2 = nodes[i]; n2.hot = Math.max(0, n2.hot - dt * 0.0015);
      var s = n2.s * n2.d * (n2.big ? 1.8 : 1) * (1 + n2.hot * 0.6);
      var gl = n2.hot + (n2.big ? 0.6 : 0);
      if (gl > 0.05) { g.globalAlpha = Math.min(1, gl); g.drawImage(GLOW[n2.a], n2.x - s * 5, n2.y - s * 5, s * 10, s * 10); g.globalAlpha = 1; }
      g.fillStyle = 'rgba(' + RGB[n2.a] + ',' + Math.min(1, 0.6 + n2.hot * 0.4).toFixed(3) + ')';
      g.beginPath(); g.arc(n2.x, n2.y, s, 0, 6.283); g.fill();
      if (n2.big) { g.strokeStyle = 'rgba(' + RGB[n2.a] + ',0.35)'; g.lineWidth = 0.8; g.beginPath(); g.arc(n2.x, n2.y, s * 2.6, 0, 6.283); g.stroke(); }
    }
    g.globalCompositeOperation = 'source-over';
  };

  var nets = Array.prototype.map.call(hosts, function (h) { return new Net(h); });
  var raf = 0, lastDraw = 0;
  function anyVisible() { for (var i = 0; i < nets.length; i++) if (nets[i].visible) return true; return false; }
  function tick(t) {
    raf = 0;
    if (document.hidden || !anyVisible()) return;
    if (t - lastDraw >= 33) { lastDraw = t; nets.forEach(function (n) { if (n.visible) { try { n.draw(t); } catch (err) { n.last = 0; } } }); }
    raf = requestAnimationFrame(tick);
  }
  function wake() { if (!reduce && !raf && !document.hidden && anyVisible()) raf = requestAnimationFrame(tick); }
  function start() {
    nets.forEach(function (n) { n.layout(); if (reduce) n.draw(0); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { nets.forEach(function (n) { if (n.host === en.target) { n.visible = en.isIntersecting; if (n.visible) n.last = 0; } }); });
        wake();
      }, { rootMargin: '100px 0px' });
      nets.forEach(function (n) { io.observe(n.host); });
    }
    wake();
  }
  var rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { nets.forEach(function (n) { n.layout(); if (reduce) n.draw(0); }); }, 150); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) { nets.forEach(function (n) { n.last = 0; }); wake(); } });
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
