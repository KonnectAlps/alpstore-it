/* Connettoma dietro la parte alta della home: lo stesso disegno del cervello di Jarvis (rete 3D che ruota lenta
   attorno al riquadro del portale, aree colorate, impulsi che viaggiano sui collegamenti). Solo decorazione.
   Fermo con «riduzione movimento», si ferma con la scheda nascosta, al massimo 30 fotogrammi al secondo. */
(function () {
  'use strict';
  var COLS = [[196, 223, 216], [168, 196, 222], [230, 213, 168], [205, 191, 227], [185, 211, 176], [232, 185, 169]];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;top:0;left:0;width:100%;z-index:-1;pointer-events:none;';
  document.body.appendChild(cv);
  var g = cv.getContext('2d'), W = 0, H = 0, cx = 0, cy = 0, R0 = 0, R1 = 0, nodes = [], edges = [], adj = [], pulses = [], last = 0, lastDraw = 0, raf = 0;
  function rnd(i, k) { var x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); }
  function layout() {
    var top = document.getElementById('top'); if (!top) return false;
    var card = top.querySelector('[aria-label="Esempio del portale"]');
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    W = document.documentElement.clientWidth; H = Math.round(top.getBoundingClientRect().bottom + window.scrollY);
    cv.style.height = H + 'px'; cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    var r = card ? card.getBoundingClientRect() : null;
    if (r && W >= 900) { cx = r.left + r.width / 2; cy = r.top + window.scrollY + r.height / 2; R0 = Math.min(r.width, r.height) * 0.42; R1 = Math.min(W - cx, cx) * 1.6; }
    else { cx = W / 2; cy = H * 0.42; R0 = Math.min(W, H) * 0.18; R1 = Math.max(W, H) * 0.7; }
    return true;
  }
  function build() {
    var n = W < 700 ? 90 : 180; nodes = []; edges = []; adj = [];
    for (var i = 0; i < n; i++) {
      var area = i % COLS.length, ang = (area / COLS.length + (rnd(i, 1) - 0.5) * 0.28) * 6.283;
      var rr = R0 + (R1 - R0) * Math.pow(rnd(i, 2), 1.1);
      nodes.push({ a: area, bx: Math.cos(ang) * rr, by: Math.sin(ang) * rr * 0.62, z: (rnd(i, 3) - 0.5) * 360, s: 1.3 + rnd(i, 4) * 2.4, ph: rnd(i, 5) * 6.283, sp: 0.3 + rnd(i, 6) * 0.7, x: 0, y: 0, d: 1, hot: 0, big: rnd(i, 7) > 0.94 });
    }
    var seen = {};
    for (i = 0; i < n; i++) {
      var best = [];
      for (var j = 0; j < n; j++) if (j !== i) { var dx = nodes[i].bx - nodes[j].bx, dy = nodes[i].by - nodes[j].by; best.push([dx * dx + dy * dy, j]); }
      best.sort(function (p, q) { return p[0] - q[0]; });
      for (var k = 0; k < 3; k++) { var o = best[k][1], key = i < o ? i + '_' + o : o + '_' + i; if (!seen[key]) { seen[key] = 1; edges.push({ i: i, j: o, cross: nodes[i].a !== nodes[o].a, hot: 0 }); } }
    }
    adj = nodes.map(function () { return []; });
    edges.forEach(function (e, ei) { adj[e.i].push(ei); adj[e.j].push(ei); });
  }
  function project(nd, t) {
    var x = nd.bx, y = nd.by, z = nd.z;
    if (!reduce) { var a = t * 0.00005, ca = Math.cos(a), sa = Math.sin(a), nx = x * ca - z * sa; z = x * sa + z * ca; x = nx; x += Math.sin(t * 0.0004 * nd.sp + nd.ph) * 3; y += Math.cos(t * 0.00035 * nd.sp + nd.ph) * 3; }
    var dep = 600 / (600 + z); nd.x = cx + x * dep; nd.y = cy + y * dep; nd.d = dep;
  }
  function draw(t) {
    var dt = last ? Math.min(50, t - last) : 16; last = t;
    g.clearRect(0, 0, W, H);
    for (var i = 0; i < nodes.length; i++) project(nodes[i], t);
    if (!reduce) { var spawn = 10 * dt / 1000; while (spawn > 0) { if (Math.random() < spawn) pulses.push({ e: Math.floor(Math.random() * edges.length), t: 0, dir: Math.random() < 0.5 ? 1 : -1, v: 0.0005 + Math.random() * 0.0008 }); spawn -= 1; } }
    g.globalCompositeOperation = 'lighter';
    edges.forEach(function (e) {
      var A = nodes[e.i], B = nodes[e.j], c = COLS[A.a]; e.hot = Math.max(0, e.hot - dt * 0.0012);
      var al = Math.min(1, 0.11 * Math.min(A.d, 1.2) * (e.cross ? 0.7 : 1) + e.hot * 0.5);
      g.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + al.toFixed(3) + ')'; g.lineWidth = e.cross ? 0.6 : 0.9;
      g.beginPath(); g.moveTo(A.x, A.y); g.lineTo(B.x, B.y); g.stroke();
    });
    var keep = [];
    pulses.forEach(function (p) {
      p.t += p.v * dt; var e = edges[p.e]; if (!e) return;
      if (p.t >= 1) { var end = p.dir > 0 ? e.j : e.i; nodes[end].hot = 1; e.hot = 1; var nx = adj[end]; if (nx.length && Math.random() < 0.6) { var ne = nx[Math.floor(Math.random() * nx.length)]; keep.push({ e: ne, t: 0, dir: edges[ne].i === end ? 1 : -1, v: p.v }); } return; }
      keep.push(p);
      var A = nodes[e.i], B = nodes[e.j], u = p.dir > 0 ? p.t : 1 - p.t, x = A.x + (B.x - A.x) * u, y = A.y + (B.y - A.y) * u, c = COLS[A.a];
      var gr = g.createRadialGradient(x, y, 0, x, y, 7); gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(0.35, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.5)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, 7, 0, 6.283); g.fill();
    });
    pulses = keep.slice(-120);
    nodes.forEach(function (nd) {
      var c = COLS[nd.a]; nd.hot = Math.max(0, nd.hot - dt * 0.0015);
      var s = nd.s * nd.d * (nd.big ? 1.8 : 1) * (1 + nd.hot * 0.6), al = Math.min(1, 0.6 + nd.hot * 0.4);
      if (nd.hot > 0.05 || nd.big) { var gr = g.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, s * 5); gr.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (0.35 * (nd.hot + (nd.big ? 0.6 : 0))).toFixed(3) + ')'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.arc(nd.x, nd.y, s * 5, 0, 6.283); g.fill(); }
      g.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + al.toFixed(3) + ')'; g.beginPath(); g.arc(nd.x, nd.y, s, 0, 6.283); g.fill();
      if (nd.big) { g.strokeStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0.35)'; g.lineWidth = 0.8; g.beginPath(); g.arc(nd.x, nd.y, s * 2.6, 0, 6.283); g.stroke(); }
    });
    g.globalCompositeOperation = 'source-over';
  }
  function tick(t) {
    raf = 0; if (document.hidden) return;
    if (t - lastDraw >= 33) { lastDraw = t; draw(t); }
    raf = requestAnimationFrame(tick);
  }
  function start() { if (!layout()) return; build(); if (reduce) { draw(0); return; } if (!raf) raf = requestAnimationFrame(tick); }
  var rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { layout(); build(); if (reduce) draw(0); }, 150); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !reduce && !raf) raf = requestAnimationFrame(tick); });
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
