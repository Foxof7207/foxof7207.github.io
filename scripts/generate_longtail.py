#!/usr/bin/env python3
"""Generate long-tail SEO guide hubs for the Gilly SMP wiki.

Visible Q&A text and FAQPage JSON-LD come from the same JSON content files in
scripts/content/, so the two cannot drift. Run from anywhere:

    python3 scripts/generate_longtail.py

Also wires the generated pages into sitemap.xml, llms.txt and wiki.html.
"""
import html
import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "scripts" / "content"
OUT = ROOT / "guides"
SITE = "https://craft.gillyb.net"
LAST_MOD = date.today().isoformat()
ANALYTICS_ID = "2aae1459-9c84-422e-a850-317547da79fc"

SLUGS = [
    "join", "crossplay", "death-and-healing", "mobs-and-darkness",
    "alloys-and-stations", "recipes-and-advancements", "world-and-dimensions",
    "ranks-and-storage", "points-orders-trading", "chat-voice-afk",
    "rules-support-qol", "matcha-server", "what-is-matcha",
]

ICONS = {
    "hammer": "hammer", "sprout": "sprout", "book": "book-open",
    "globe": "globe", "shield": "shield-check", "scale": "scale",
    "users": "users", "gamepad": "gamepad-2", "message": "discord",
}


def esc(s):
    return html.escape(str(s), quote=True)


def icon(name):
    return ('<i class="ic" style="--i:url(/assets/icons/%s.svg)" aria-hidden="true"></i>'
            % ICONS.get(name, "book-open"))


def nav():
    return """  <header class="nav">
    <div class="nav-inner">
      <nav class="nav-links left" aria-label="Community">
        <a href="https://modrinth.com/server/gilly-smp" rel="noopener" target="%s"><i class="ic" style="--i:url(/assets/icons/modrinth.svg)" aria-hidden="true"></i> Modrinth</a>
        <a href="https://discord.gg/QjfVSgzDNe" rel="noopener" target="%s"><i class="ic" style="--i:url(/assets/icons/discord.svg)" aria-hidden="true"></i> Discord</a>
        <a href="https://gillysmp.craftingstore.net/" rel="noopener" target="%s"><i class="ic" style="--i:url(/assets/icons/shopping-bag.svg)" aria-hidden="true"></i> Store</a>
      </nav>
      <a class="brand" href="/"><span>Gilly<b>SMP</b></span></a>
      <nav class="nav-links right" aria-label="Resources">
        <a href="/recipes.html">%s Recipes</a>
        <a href="/advancements.html">%s Advancements</a>
        <a href="/wiki.html">%s Wiki</a>
        <a href="/guides/" aria-current="page">%s Guides</a>
      </nav>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><i class="ic" style="--i:url(/assets/icons/menu.svg)"></i></button>
    </div>
  </header>""" % ("_blank", "_blank", "_blank", icon("hammer"), icon("sprout"),
                  icon("book"), icon("globe"))


def footer():
    return """  <footer class="footer">
    <div class="container footer-grid">
      <div class="f-brand">
        <a class="brand" href="/"><img class="pixel" src="/assets/logo.webp" width="40" height="40" alt=""><span>Gilly<b>SMP</b></span></a>
        <p>A non pay-to-win crossplay survival SMP. Java, Bedrock and console, one world.</p>
      </div>
      <nav class="f-col" aria-label="Explore">
        <h3 class="f-title">Explore</h3>
        <a href="/"><i class="ic" style="--i:url(/assets/icons/house.svg)" aria-hidden="true"></i> Home</a>
        <a href="/#join"><i class="ic" style="--i:url(/assets/icons/gamepad-2.svg)" aria-hidden="true"></i> How to Join</a>
        <a href="/wiki.html"><i class="ic" style="--i:url(/assets/icons/book-open.svg)" aria-hidden="true"></i> Wiki</a>
        <a href="/guides/"><i class="ic" style="--i:url(/assets/icons/globe.svg)" aria-hidden="true"></i> Guides</a>
        <a href="/recipes.html"><i class="ic" style="--i:url(/assets/icons/book-open.svg)" aria-hidden="true"></i> Recipe Book</a>
        <a href="/advancements.html"><i class="ic" style="--i:url(/assets/icons/sprout.svg)" aria-hidden="true"></i> Advancement Guide</a>
      </nav>
      <nav class="f-col" aria-label="Community">
        <h3 class="f-title">Community</h3>
        <a href="https://discord.gg/QjfVSgzDNe" rel="noopener" target="_blank"><i class="ic" style="--i:url(/assets/icons/discord.svg)" aria-hidden="true"></i> Discord</a>
        <a href="https://modrinth.com/server/gilly-smp" rel="noopener" target="_blank"><i class="ic" style="--i:url(/assets/icons/modrinth.svg)" aria-hidden="true"></i> Modrinth</a>
        <a href="https://gillysmp.craftingstore.net/" rel="noopener" target="_blank"><i class="ic" style="--i:url(/assets/icons/shopping-bag.svg)" aria-hidden="true"></i> Store</a>
      </nav>
    </div>
    <div class="container footer-bottom">
      <p>© 2026 Gilly SMP · Last updated <time datetime="%s">Guide pages</time></p>
      <p class="legal">Gilly SMP is not an official Minecraft service and is not approved by or associated with Mojang or Microsoft. Item textures come from Minecraft and the server resource pack.</p>
    </div>
  </footer>""" % LAST_MOD


def head(title, description, url, jsonld):
    ld = json.dumps(jsonld, ensure_ascii=False, indent=2).replace("</", "<\\/")
    return """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' https://u.crbo.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'; upgrade-insecure-requests">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>%s</title>
  <meta name="description" content="%s">
  <link rel="canonical" href="%s">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly summary">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <meta name="theme-color" content="#123820">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Gilly SMP">
  <meta property="og:title" content="%s">
  <meta property="og:description" content="%s">
  <meta property="og:url" content="%s">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" href="/assets/fonts/titan-one-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/poppins-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/guides.css">
  <script type="application/ld+json">
%s
  </script>
  <script defer src="https://u.crbo.dev/script.js" data-website-id="%s" data-exclude-hash="true" data-do-not-track="true"></script>
  <script defer src="https://u.crbo.dev/recorder.js" data-website-id="%s"></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
%s""" % (esc(title), esc(description), esc(url), esc(title), esc(description),
         esc(url), ld, ANALYTICS_ID, ANALYTICS_ID, nav())


def page_shell(body, title, description, url, jsonld):
    return (head(title, description, url, jsonld) + "\n" + body + "\n  " + footer() +
            '\n  <script src="/js/main.js"></script>\n</body>\n</html>\n')


def strip_tags(s):
    return re.sub(r"<[^>]+>", "", str(s))


def build_page(data):
    slug = data["slug"]
    url = "%s/guides/%s.html" % (SITE, slug)
    qas = [(g["title"], item) for g in data["groups"] for item in g["items"]]
    faq = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "url": url, "inLanguage": "en", "dateModified": LAST_MOD,
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}}
            for _, it in qas for q, a in [(it["q"], it["a"])]
        ],
    }
    crumbs = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Wiki", "item": SITE + "/wiki.html"},
            {"@type": "ListItem", "position": 3, "name": "Guides", "item": SITE + "/guides/"},
            {"@type": "ListItem", "position": 4, "name": data["title"], "item": url},
        ],
    }
    web = {
        "@context": "https://schema.org", "@type": "WebPage",
        "name": data["h1"], "url": url, "description": data["description"],
        "inLanguage": "en", "dateModified": LAST_MOD,
        "isPartOf": {"@id": SITE + "/#website"},
    }
    graph = {"@context": "https://schema.org", "@graph": [web, faq, crumbs]}

    b = ['  <main id="main" class="guide container">']
    b.append('    <p class="breadcrumbs"><a href="/">Home</a><span>›</span>'
             '<a href="/wiki.html">Wiki</a><span>›</span>'
             '<a href="/guides/">Guides</a><span>›</span>%s</p>' % esc(data["title"]))
    b.append('    <section class="hero page-hero">')
    b.append('      <div class="hero-inner container">')
    b.append('        <img class="hero-logo pixel" src="/assets/logo.webp" width="72" height="72" alt="">')
    b.append('        <h1>%s</h1>' % esc(data["h1"]))
    b.append('        <p class="intro">%s</p>' % data["intro"])
    b.append('        <p class="badges"><span class="badge y">%s answers</span>'
             '<a class="badge" href="/wiki.html">Full wiki →</a></p>' % len(qas))
    b.append('      </div>')
    b.append('      <div class="ground" aria-hidden="true"></div>')
    b.append('    </section>')
    last = None
    for group_title, item in qas:
        if group_title != last:
            b.append('    <h2 class="topic-title">%s</h2>' % esc(group_title))
            last = group_title
        b.append('    <article class="qa">')
        b.append('      <h3>%s</h3>' % esc(item["q"]))
        b.append('      <p>%s</p>' % item["a"])
        b.append('    </article>')
    b.append('    <section class="guide-deeper">')
    b.append('      <h2>Go deeper</h2>')
    b.append('      <ul class="guide-links">')
    for l in data["deeper"]:
        b.append('        <li><a href="%s">%s</a></li>' % (esc(l["url"]), esc(l["label"])))
    b.append('      </ul>')
    b.append('    </section>')
    if data.get("related"):
        b.append('    <section class="guide-related">')
        b.append('      <h2>Related guides</h2>')
        b.append('      <ul class="guide-links">')
        for l in data["related"]:
            b.append('        <li><a href="%s">%s</a></li>' % (esc(l["url"]), esc(l["label"])))
        b.append('      </ul>')
        b.append('    </section>')
    b.append('  </main>')
    return page_shell("\n".join(b), data["title"] + " – Gilly SMP Guide",
                      data["description"], url, graph), len(qas)


def build_index(datas):
    url = SITE + "/guides/"
    featured = {"matcha-server", "what-is-matcha", "join"}
    card_icons = {
        "join": "gamepad", "crossplay": "globe", "death-and-healing": "shield",
        "mobs-and-darkness": "sprout", "alloys-and-stations": "hammer",
        "recipes-and-advancements": "book", "world-and-dimensions": "globe",
        "ranks-and-storage": "shield", "points-orders-trading": "users",
        "chat-voice-afk": "message", "rules-support-qol": "scale",
        "matcha-server": "globe", "what-is-matcha": "book",
    }
    ld = {
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": "Gilly SMP player guides", "url": url,
        "description": "Topic guides answering specific questions about Gilly SMP.",
        "isPartOf": {"@id": SITE + "/#website"},
    }
    b = ['  <main id="main" class="guide container">']
    b.append('    <p class="breadcrumbs"><a href="/">Home</a><span>›</span>'
             '<a href="/wiki.html">Wiki</a><span>›</span>Guides</p>')
    b.append('    <section class="hero page-hero">')
    b.append('      <div class="hero-inner container">')
    b.append('        <img class="hero-logo pixel" src="/assets/logo.webp" width="72" height="72" alt="">')
    b.append('        <h1>Player <em>guides</em></h1>')
    b.append('        <p class="sub">Short, specific answers to the questions players ask most about Gilly SMP — joining, crossplay, survival, ranks, commands and more.</p>')
    b.append('      </div>')
    b.append('      <div class="ground" aria-hidden="true"></div>')
    b.append('    </section>')
    b.append('    <section class="guide-index">')
    b.append('      <h2>Browse by topic</h2>')
    b.append('      <ul class="guide-masonry">')
    for d in datas:
        slug = d["slug"]
        cls = "guide-card featured" if slug in featured else "guide-card"
        n = sum(len(g["items"]) for g in d["groups"])
        b.append('        <li><a class="%s" href="/guides/%s.html">' % (cls, slug))
        b.append('          <span class="guide-card-top">%s<span class="guide-card-count">%d answers</span></span>'
                 % (icon(card_icons.get(slug, "book")), n))
        b.append('          <strong>%s</strong>' % esc(d["title"]))
        b.append('          <span class="guide-card-desc">%s</span>' % esc(d["description"]))
        b.append('          <span class="guide-card-more">Read guide →</span>')
        b.append('        </a></li>')
    b.append('      </ul>')
    b.append('    </section>')
    b.append('  </main>')
    return page_shell("\n".join(b), "Gilly SMP Player Guides – Answers to Specific Questions",
                      "Topic guides answering specific questions about joining, crossplay, survival rules, ranks, economy, commands and more on Gilly SMP.",
                      url, ld)


def wire_sitemap(paths):
    p = ROOT / "sitemap.xml"
    s = p.read_text(encoding="utf-8")
    s = re.sub(r"\n  <url><loc>%s/guides/.*?</url>" % re.escape(SITE), "", s)
    entries = ["  <url><loc>%s/guides/</loc><lastmod>%s</lastmod><priority>0.6</priority></url>"
               % (SITE, LAST_MOD)]
    for slug in SLUGS:
        entries.append("  <url><loc>%s/guides/%s.html</loc><lastmod>%s</lastmod><priority>0.6</priority></url>"
                       % (SITE, slug, LAST_MOD))
    s = s.replace("</urlset>", "\n".join(entries) + "\n</urlset>")
    p.write_text(s, encoding="utf-8")


def wire_llms():
    p = ROOT / "llms.txt"
    s = p.read_text(encoding="utf-8")
    s = re.sub(r"\n## Long-tail guides\n.*?(?=\n## |\Z)", "", s, flags=re.S)
    lines = ["", "## Long-tail guides",
             "Short, question-shaped pages answering specific Gilly SMP queries. Each page is a consolidated hub with self-contained answers (FAQPage structured data)."]
    for d in [json.loads((CONTENT / (s + ".json")).read_text(encoding="utf-8")) for s in SLUGS]:
        lines.append("- [%s](%s/guides/%s.html): %s" % (d["title"], SITE, d["slug"], d["description"]))
    lines.append("- [All guides](%s/guides/): index of every topic hub." % SITE)
    s = s.rstrip() + "\n" + "\n".join(lines) + "\n"
    p.write_text(s, encoding="utf-8")


def wire_wiki():
    p = ROOT / "wiki.html"
    s = p.read_text(encoding="utf-8")

    # Fix the stale ranged-chat FAQ (the Chat section and llms.txt are authoritative).
    old = ("<h3>My chat messages aren't seen by everyone.</h3>"
           "<p>Chat only reaches players within 100 blocks. Start your message with <code>!</code> "
           "to talk to everyone. See <a href=\"#chat\">Chat, voice &amp; AFK</a>.</p>")
    if old in s:
        s = s.replace(old, "<h3>My chat messages aren't seen by everyone.</h3>"
                      "<p>Chat is global on Gilly SMP: everyone sees your messages. There is no ranged "
                      "chat and no need to use <code>!</code>. If a message looks missing, check whether "
                      "you were muted for spam. See <a href=\"#chat\">Chat, voice &amp; AFK</a>.</p>")

    # Add a visible Guides link next to "Looking for a specific item?" in the CTA area.
    marker = "Looking for a specific item?"
    if marker in s and "/guides/" not in s:
        idx = s.index(marker)
        end = s.index("</p>", idx)
        addition = (' <a href="/guides/">Browse the topic guides</a> for specific '
                    'joining, survival, ranks and commands questions.')
        s = s[:end] + addition + s[end:]
    p.write_text(s, encoding="utf-8")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    count = 0
    datas = []
    for slug in SLUGS:
        path = CONTENT / (slug + ".json")
        data = json.loads(path.read_text(encoding="utf-8"))
        assert data["slug"] == slug, (slug, data["slug"])
        html_text, n = build_page(data)
        (OUT / (slug + ".html")).write_text(html_text, encoding="utf-8")
        count += n
        datas.append(data)
    (OUT / "index.html").write_text(build_index(datas), encoding="utf-8")
    wire_sitemap(OUT)
    wire_llms()
    wire_wiki()
    print("Generated %d hubs + index, %d Q&As total, in %s" % (len(SLUGS), count, OUT))


if __name__ == "__main__":
    main()
