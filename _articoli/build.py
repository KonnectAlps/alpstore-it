#!/usr/bin/env python3
"""Build the AlpStore articles section (/articoli/) of alpstore.it from Markdown sources.

Sources: _articoli/testi/*.md, with a small front matter block (key: value).
Output: one page per article, the /articoli index, and an updated sitemap.xml.
Standard library only, so it runs the same on a PC, in CI or from a Dot.

Usage: python _articoli/build.py   (GitHub Pages serves the repo root as alpstore.it)
"""
from __future__ import annotations

import html
import json
import re
import sys
from datetime import date
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parent
OUT = SITE / "articoli"
BASE = "https://alpstore.it"
MONTHS = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto",
          "settembre", "ottobre", "novembre", "dicembre"]
REQUIRED = ["titolo", "slug", "data", "sottotitolo", "descrizione", "tema", "copertina", "copertina_alt"]


def parse(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        sys.exit(f"{path.name}: front matter missing")
    meta = {}
    for line in m.group(1).splitlines():
        if line.strip():
            k, _, v = line.partition(":")
            meta[k.strip()] = v.strip()
    missing = [k for k in REQUIRED if not meta.get(k)]
    if missing:
        sys.exit(f"{path.name}: missing {', '.join(missing)}")
    if not re.fullmatch(r"[a-z0-9-]+", meta["slug"]):
        sys.exit(f"{path.name}: slug must be lowercase letters, digits and dashes")
    meta["date"] = date.fromisoformat(meta["data"])
    meta["body"] = m.group(2).strip()
    meta["tags"] = [t.strip() for t in meta.get("tag", "").split(",") if t.strip()]
    for img in [meta["copertina"], *re.findall(r"!\[[^\]]*\]\(([^)]+)\)", meta["body"])]:
        if not (OUT / "img" / img).is_file():
            sys.exit(f"{path.name}: image not found: articoli/img/{img}")
    return meta


def inline(s: str) -> str:
    s = html.escape(s, quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)
    s = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+)\)", r'<a href="\2">\1</a>', s)
    return s


def render_body(md: str) -> tuple[str, list[str]]:
    out, heads, para, items = [], [], [], []

    def flush():
        if para:
            out.append(f"<p>{inline(' '.join(para))}</p>")
            para.clear()
        if items:
            out.append("<ul>" + "".join(f"<li>{inline(i)}</li>" for i in items) + "</ul>")
            items.clear()

    for line in md.splitlines():
        s = line.strip()
        if not s:
            flush()
        elif s.startswith("## "):
            flush()
            heads.append(s[3:])
            out.append(f'<h2 id="d{len(heads)}">{inline(s[3:])}</h2>')
        elif s == "---":
            flush()
            out.append("<hr>")
        elif m := re.fullmatch(r"!\[([^\]]*)\]\(([^)]+)\)", s):
            flush()
            alt = html.escape(m.group(1))
            out.append(f'<figure><img src="/articoli/img/{m.group(2)}" alt="{alt}" loading="lazy" width="1600" height="900">'
                       f"<figcaption>{alt}</figcaption></figure>")
        elif s.startswith("- "):
            if para:
                flush()
            items.append(s[2:])
        else:
            if items:
                flush()
            para.append(s)
    flush()
    return "\n".join(out), heads


def strip_num(h: str) -> str:
    return re.sub(r"^\d+\.\s*", "", h)


def nice_date(d: date) -> str:
    return f"{d.day} {MONTHS[d.month - 1]} {d.year}"


def minutes(md: str) -> int:
    return max(1, round(len(re.findall(r"\w+", md)) / 200))


ICON = (SITE / "index.html").read_text(encoding="utf-8")
LOGO = re.search(r'<svg class="mk".*?</svg>', ICON, re.S).group(0)
FAVICON = re.search(r'<link rel="icon"[^>]*>', ICON).group(0)

CSS = """
@font-face{font-family:"KA Sans";src:url(/fonts/ka-sans-400.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"KA Sans";src:url(/fonts/ka-sans-700.woff2) format("woff2");font-weight:700;font-display:swap}
@font-face{font-family:"KA Mono";src:url(/fonts/ka-mono-400.woff2) format("woff2");font-weight:400;font-display:swap}
@font-face{font-family:"KA Mono";src:url(/fonts/ka-mono-700.woff2) format("woff2");font-weight:700;font-display:swap}
:root{color-scheme:dark;--bg:#000;--panel:#0A0A0A;--line:#1A1A1A;--line2:#2A2A2A;--ink:#fff;--muted:#A7B1AD;--dim:#8F9A96;--mint:#C4DFD8;--live:#90FD94;
--sans:"KA Sans","DejaVu Sans",Verdana,sans-serif;--mono:"KA Mono","DejaVu Sans Mono",Consolas,monospace}
*{box-sizing:border-box}html,body{margin:0;background:var(--bg);color:var(--ink)}
body{font-family:var(--sans);font-size:17px;line-height:1.65;min-height:100vh;display:flex;flex-direction:column;
background-image:linear-gradient(rgba(196,223,216,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(196,223,216,.045) 1px,transparent 1px);background-size:60px 60px}
a{color:var(--mint)}a:hover{color:#fff}:focus-visible{outline:2px solid var(--live);outline-offset:3px}
.wrap{width:100%;max-width:1180px;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left));padding-right:max(20px,env(safe-area-inset-right))}
header{border-bottom:1px solid var(--line);background:rgba(0,0,0,.85)}
.bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding-top:18px;padding-bottom:18px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff}.mk{width:46px;height:46px;flex:none}
.bt{display:flex;flex-direction:column;line-height:1.1}.bt b{font-size:22px}.bt b i{font-style:normal;color:var(--mint)}
.bt small{font-family:var(--mono);font-size:11px;letter-spacing:.12em;color:var(--muted);margin-top:3px}
nav.top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
nav.top a{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);text-decoration:none;padding:10px 12px}
nav.top a:hover,nav.top a[aria-current]{color:#fff}nav.top a[aria-current]{box-shadow:inset 0 -2px var(--mint)}
.crumb{font-family:var(--mono);font-size:12px;color:var(--dim);padding-top:22px}.crumb a{color:var(--dim);text-decoration:none}.crumb a:hover{color:#fff}
.over{font-family:var(--mono);font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--mint);display:flex;align-items:center;gap:10px}
.over::before{content:"";width:4px;height:16px;background:var(--mint)}
main{flex:1}
.head{padding-top:26px;padding-bottom:10px;display:flex;flex-direction:column;gap:16px;max-width:900px}
h1{margin:0;font-size:clamp(34px,5.2vw,58px);line-height:1.06;letter-spacing:-.025em;text-wrap:balance}
.sub{margin:0;color:var(--mint);font-size:20px;max-width:60ch}
.meta{font-family:var(--mono);font-size:12px;letter-spacing:.06em;color:var(--dim)}
.cover{margin:26px 0 0;border:1px solid var(--line2);border-radius:20px;overflow:hidden;background:var(--panel)}
.cover img,figure img{display:block;width:100%;height:auto}
.layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:56px;padding-top:40px;padding-bottom:64px;align-items:start}
.body{max-width:72ch}.body p,.body li{color:#DCE3E0}.body h2{font-size:clamp(22px,2.6vw,28px);line-height:1.2;margin:40px 0 10px;letter-spacing:-.01em;scroll-margin-top:20px}
.body strong{color:#fff}.body ul{padding-left:22px}.body li{margin:6px 0}.body li::marker{color:var(--mint)}
.body hr{border:0;border-top:1px solid var(--line2);margin:40px 0}
figure{margin:28px 0;border:1px solid var(--line2);border-radius:16px;overflow:hidden;background:var(--panel)}
figcaption{font-size:13px;color:var(--dim);padding:10px 14px;border-top:1px solid var(--line)}
.pay{font-size:22px;font-weight:700;margin:28px 0 6px}.pay i{font-style:normal;color:var(--mint)}
aside{position:sticky;top:20px;display:flex;flex-direction:column;gap:14px}
.box{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px}
.box h3{margin:8px 0 8px;font-size:17px;line-height:1.3}.box p{margin:0;color:var(--muted);font-size:14px}
.box ol{margin:10px 0 0;padding:0;list-style:none;counter-reset:d}
.box ol li{counter-increment:d;border-top:1px solid var(--line);padding:8px 0;font-size:14px}
.box ol li a{color:#DCE3E0;text-decoration:none}.box ol li a:hover{color:#fff}
.box ol li::before{content:counter(d) " · ";font-family:var(--mono);color:var(--mint)}
.btn{display:flex;justify-content:center;font-family:var(--mono);font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;padding:14px 18px;border-radius:10px;background:var(--mint);color:#000;margin-top:14px;box-shadow:0 8px 24px rgb(196 223 216/.18)}
.btn:hover{background:#fff;color:#000}.tel{display:block;font-family:var(--mono);font-size:14px;margin-top:10px;color:var(--muted);text-decoration:none}
.more a{display:block;border-top:1px solid var(--line);padding:9px 0;font-size:14px;color:#DCE3E0;text-decoration:none}.more a:hover{color:#fff}
.tags{display:flex;flex-wrap:wrap;gap:6px}.tags span{font-family:var(--mono);font-size:11px;letter-spacing:.06em;border:1px solid var(--line2);border-radius:999px;padding:5px 10px;color:var(--dim)}
.li{font-family:var(--mono);font-size:12px;color:var(--dim)}
.list{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:16px;padding-top:30px;padding-bottom:64px}
.card{display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-radius:16px;overflow:hidden;text-decoration:none;color:#fff;transition:border-color .2s cubic-bezier(.2,.6,.2,1)}
.card:hover{border-color:var(--mint)}.card img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-bottom:1px solid var(--line)}
.card div{padding:18px 20px 22px;display:flex;flex-direction:column;gap:8px}.card b{font-size:20px;line-height:1.25}.card span{color:var(--muted);font-size:15px}
footer{border-top:1px solid var(--line);padding-top:22px;padding-bottom:max(26px,env(safe-area-inset-bottom));font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7A8581}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px}footer a{color:#7A8581}
@media (max-width:900px){.layout{grid-template-columns:1fr;gap:28px}aside{position:static}}
@media (max-width:640px){nav.top a{padding:8px 8px 8px 0}.bt small{display:none}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
"""


def page(title: str, desc: str, canonical: str, og_img: str, body: str, ld: list, og_type: str = "website") -> str:
    t, d = html.escape(title), html.escape(desc)
    return f"""<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{t}</title>
<meta name="description" content="{d}">
<meta name="theme-color" content="#000000">
<link rel="canonical" href="{canonical}">
<meta name="robots" content="index,follow">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="AlpStore by KonnectAlps">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<meta property="og:url" content="{canonical}">
<meta property="og:locale" content="it_IT">
<meta property="og:image" content="{og_img}">
<meta name="twitter:card" content="summary_large_image">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
{FAVICON}
<link rel="preload" href="/fonts/ka-sans-400.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json">{json.dumps({"@context": "https://schema.org", "@graph": ld}, ensure_ascii=False)}</script>
<style>{CSS}</style>
</head>
<body>
<header><div class="wrap bar">
<a class="brand" href="/" aria-label="AlpStore by KonnectAlps">{LOGO}<span class="bt"><b>AlpStore<i>.</i></b><small>BY KONNECTALPS</small></span></a>
<nav class="top" aria-label="Sezioni"><a href="/#configura">Configura</a><a href="/#partner">Partner</a><a href="/articoli/" aria-current="page">Articoli</a><a href="/#domande">Domande</a><a href="https://console.alpstore.it/login">Area clienti</a></nav>
</div></header>
<main>
{body}
</main>
<footer><div class="wrap"><span>AlpStore by KonnectAlps · <a href="https://konnectalps.it">konnectalps.it</a> · 0471 840048</span><span>Configurato da noi. Controllato da te.</span></div></footer>
</body>
</html>
"""


ORG = {"@type": "Organization", "@id": "https://konnectalps.it/#org", "name": "KonnectAlps S.r.l.",
       "url": "https://konnectalps.it/", "logo": f"{BASE}/icon-512.png"}


def article_page(a: dict, others: list[dict]) -> str:
    body_html, heads = render_body(a["body"])
    url = f"{BASE}/articoli/{a['slug']}"
    img = f"{BASE}/articoli/img/{a['copertina']}"
    toc = "".join(f'<li><a href="#d{i}">{inline(strip_num(h))}</a></li>' for i, h in enumerate(heads, 1))
    more = "".join(f'<a href="/articoli/{o["slug"]}">{html.escape(o["titolo"])}</a>' for o in others[:3])
    tags = "".join(f"<span>#{html.escape(t.replace(' ', ''))}</span>" for t in a["tags"])
    li = f'<p class="li">Pubblicato anche su <a href="{html.escape(a["linkedin"])}">LinkedIn</a></p>' if a.get("linkedin") else ""
    ld = [ORG, {"@type": "BlogPosting", "headline": a["titolo"], "description": a["descrizione"], "image": img,
                "datePublished": a["data"], "dateModified": a["data"], "inLanguage": "it-IT",
                "mainEntityOfPage": url, "author": {"@id": ORG["@id"]}, "publisher": {"@id": ORG["@id"]}},
          {"@type": "BreadcrumbList", "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "AlpStore", "item": f"{BASE}/"},
              {"@type": "ListItem", "position": 2, "name": "Articoli", "item": f"{BASE}/articoli/"},
              {"@type": "ListItem", "position": 3, "name": a["titolo"], "item": url}]}]
    body = f"""<div class="wrap">
<nav class="crumb" aria-label="Percorso"><a href="/">Home</a> › <a href="/articoli/">Articoli</a> › {html.escape(a['tema'].split('·')[0].strip())}</nav>
<div class="head">
<span class="over">{html.escape(a['tema'])}</span>
<h1>{html.escape(a['titolo'])}</h1>
<p class="sub">{html.escape(a['sottotitolo'])}</p>
<span class="meta"><time datetime="{a['data']}">{nice_date(a['date'])}</time> · {minutes(a['body'])} min di lettura · AlpStore by KonnectAlps</span>
</div>
<figure class="cover"><img src="/articoli/img/{a['copertina']}" alt="{html.escape(a['copertina_alt'])}" width="1600" height="900"></figure>
<div class="layout">
<article class="body">
{body_html}
<p class="pay">Configurato da noi<i>.</i> Controllato da te<i>.</i></p>
{li}
</article>
<aside>
<div class="box"><span class="over">In breve</span><h3>Le {len(heads)} domande</h3><ol>{toc}</ol></div>
<div class="box"><span class="over">Ne parliamo?</span><h3>Hai un impianto da collegare?</h3><p>Raccontaci dove si trova, cosa deve comunicare e chi deve accedervi.</p>
<a class="btn" href="mailto:commerciale@konnectalps.it?subject={html.escape('Articolo AlpStore: ' + a['titolo'])}">Scrivici</a><a class="tel" href="tel:+390471840048">0471 840048</a></div>
{f'<div class="box more"><span class="over">Altri articoli</span>{more}</div>' if more else ''}
<div class="tags">{tags}</div>
</aside>
</div>
</div>"""
    return page(f"{a['titolo']} · AlpStore", a["descrizione"], url, img, body, ld, "article")


def index_page(arts: list[dict]) -> str:
    cards = "".join(
        f'<a class="card" href="/articoli/{a["slug"]}"><img src="/articoli/img/{a["copertina"]}" alt="" loading="lazy" width="1600" height="900">'
        f'<div><span class="meta">{nice_date(a["date"])} · {html.escape(a["tema"])}</span><b>{html.escape(a["titolo"])}</b>'
        f'<span>{html.escape(a["sottotitolo"])}</span></div></a>' for a in arts)
    url = f"{BASE}/articoli/"
    ld = [ORG, {"@type": "Blog", "@id": f"{url}#blog", "name": "Articoli AlpStore", "url": url, "inLanguage": "it-IT",
                "publisher": {"@id": ORG["@id"]},
                "blogPost": [{"@type": "BlogPosting", "headline": a["titolo"], "url": f"{BASE}/articoli/{a['slug']}",
                              "datePublished": a["data"]} for a in arts]}]
    body = f"""<div class="wrap">
<nav class="crumb" aria-label="Percorso"><a href="/">Home</a> › Articoli</nav>
<div class="head"><span class="over">Articoli</span><h1>Prima della linea, le domande giuste<span style="color:var(--mint)">.</span></h1>
<p class="sub">Guide pratiche per collegare impianti, sensori, telecamere e sedi remote.</p></div>
<div class="list">{cards}</div>
</div>"""
    desc = "Guide pratiche di AlpStore by KonnectAlps per scegliere e gestire Connettività IoT: accesso remoto, traffico, sicurezza DNS, siti remoti."
    return page("Articoli su Connettività IoT, 5G e sicurezza · AlpStore", desc, url, f"{BASE}/articoli/img/{arts[0]['copertina']}", body, ld)


def sitemap(arts: list[dict]) -> str:
    """Keep every existing entry that is not an article, then add the articles section."""
    old = (SITE / "sitemap.xml").read_text(encoding="utf-8")
    keep = [m for m in re.findall(r"  <url>.*?</url>", old, re.S) if "/articoli/" not in m]
    newest = max(a["date"] for a in arts).isoformat()
    rows = keep + [f"  <url><loc>{BASE}/articoli/</loc><lastmod>{newest}</lastmod></url>"]
    rows += [f"  <url><loc>{BASE}/articoli/{a['slug']}</loc><lastmod>{a['data']}</lastmod></url>" for a in arts]
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(rows) + "\n</urlset>\n"


def main() -> None:
    arts = sorted((parse(p) for p in (HERE / "testi").glob("*.md")), key=lambda a: a["date"], reverse=True)
    if not arts:
        sys.exit("no articles")
    slugs = [a["slug"] for a in arts]
    if len(set(slugs)) != len(slugs):
        sys.exit("duplicate slug")
    for old in OUT.glob("*.html"):
        old.unlink()
    for a in arts:
        (OUT / f"{a['slug']}.html").write_text(article_page(a, [o for o in arts if o is not a]), encoding="utf-8")
    (OUT / "index.html").write_text(index_page(arts), encoding="utf-8")
    (SITE / "sitemap.xml").write_text(sitemap(arts), encoding="utf-8")
    print(f"{len(arts)} articles -> articoli/")


if __name__ == "__main__":
    main()
