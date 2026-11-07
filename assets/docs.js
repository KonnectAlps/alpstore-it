/* AlpStore: documenti (privacy, condizioni, PDF) in una finestra sopra la pagina, con scarica o stampa. */
(function () {
  if (window.self !== window.top) {
    var h = document.querySelector('header'), f = document.querySelector('footer');
    if (h) h.style.display = 'none';
    if (f) f.style.display = 'none';
    return;
  }
  var DOC = /^\/(privacy|condizioni-sim|condizioni-generali)\/|\.pdf$/i;
  var PDF = { '/privacy/': '/privacy/informativa-privacy-konnectalps.pdf', '/condizioni-sim/': '/condizioni-sim/AS-01-condizioni-sim-iot.pdf' };
  var css = document.createElement('style');
  css.textContent = '#docv{width:min(980px,96vw);height:min(90vh,1100px);max-width:none;max-height:none;padding:0;border:1px solid #363636;border-radius:16px;background:#0a0a0a;color:#fff;overflow:hidden}' +
    '#docv::backdrop{background:rgba(0,0,0,.75)}#docv .bar{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #262626;font-family:"KA Sans","DejaVu Sans",Verdana,sans-serif}' +
    '#docv .bar strong{flex:1;font-size:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#docv .bar a,#docv .bar button{font:inherit;font-size:14px;font-weight:600;border-radius:10px;padding:9px 14px;cursor:pointer;text-decoration:none}' +
    '#docv .dl{background:#c4dfd8;color:#000;border:0}#docv .pr{background:none;color:#c4dfd8;border:1px solid #2f3f3a}#docv .x{background:none;color:#fff;border:1px solid #363636;width:40px;padding:9px 0}' +
    '#docv iframe{width:100%;height:calc(100% - 65px);border:0;background:#000}@media (max-width:640px){#docv{width:100vw;height:100vh;border-radius:0;border:0}#docv .pr{display:none!important}}';
  document.head.appendChild(css);
  var d = document.createElement('dialog');
  d.id = 'docv';
  d.setAttribute('aria-label', 'Documento');
  d.innerHTML = '<div class="bar"><strong></strong><a class="dl" download>Scarica PDF</a><button type="button" class="pr">Stampa o salva PDF</button><button type="button" class="x" aria-label="Chiudi">✕</button></div><iframe title="Documento"></iframe>';
  document.body.appendChild(d);
  var t = d.querySelector('strong'), fr = d.querySelector('iframe'), dl = d.querySelector('.dl'), pr = d.querySelector('.pr');
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || a.hasAttribute('download')) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || !DOC.test(u.pathname) || typeof d.showModal !== 'function') return;
    e.preventDefault();
    var isPdf = /\.pdf$/i.test(u.pathname), pdf = isPdf ? u.pathname : PDF[u.pathname];
    t.textContent = (a.textContent || 'Documento').trim();
    fr.src = u.pathname + u.hash;
    dl.style.display = pdf ? '' : 'none';
    if (pdf) dl.href = pdf;
    pr.style.display = isPdf ? 'none' : '';
    d.showModal();
  });
  d.querySelector('.x').onclick = function () { d.close(); };
  d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  d.addEventListener('close', function () { fr.src = 'about:blank'; });
  pr.onclick = function () { try { fr.contentWindow.focus(); fr.contentWindow.print(); } catch (err) { window.open(fr.src); } };
})();
