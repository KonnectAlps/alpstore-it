/* Rete di connessioni dietro la parte alta della home: nodi che si muovono piano e si collegano quando sono vicini. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:absolute;top:0;left:0;width:100%;z-index:-1;pointer-events:none;';
  document.body.appendChild(c);
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, nodes = [], LINK = 150;
  function hero() { return document.getElementById('top'); }
  function size() {
    var t = hero(); if (!t) return;
    W = document.documentElement.clientWidth; H = Math.round(t.getBoundingClientRect().bottom + window.scrollY);
    c.style.height = H + 'px'; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.max(24, Math.min(90, Math.round(W * H / 15000)));
    while (nodes.length < n) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, r: 1 + Math.random() * 1.2 });
    nodes.length = n;
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      for (var j = i + 1; j < nodes.length; j++) {
        var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) { ctx.strokeStyle = 'rgba(196,223,216,' + (0.24 * (1 - d / LINK)).toFixed(3) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
    }
    for (i = 0; i < nodes.length; i++) { a = nodes[i]; ctx.fillStyle = 'rgba(196,223,216,0.6)'; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill(); }
  }
  function step() {
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i]; a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
    }
    draw();
    if (!document.hidden) raf = requestAnimationFrame(step);
  }
  var raf = 0;
  function start() { size(); if (reduce) { draw(); return; } cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
  window.addEventListener('resize', function () { size(); if (reduce) draw(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); } });
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
