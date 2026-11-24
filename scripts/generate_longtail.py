#!/usr/bin/env python3
"""Generate the long-tail SEO guide hubs for the MatchaSMP site, in four languages.

Visible Q&A text and FAQPage JSON-LD come from the same JSON content files, so the two
cannot drift:
    scripts/content/<slug>.json        English (en)
    scripts/content/fr/<slug>.json     French (fr)
    scripts/content/de/<slug>.json     German (de)
    scripts/content/es/<slug>.json     Spanish (es)

Outputs, per language (en at the root, the others under /fr/, /de/, /es/):
    guides/<slug>.html, guides/index.html

Also rebuilds the guide and page entries in sitemap.xml (with hreflang alternates) and
the long-tail section of llms.txt. Run from anywhere:

    python3 scripts/generate_longtail.py
"""
import html
import json
import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "scripts" / "content"
SITE = "https://matchasmp.eu"
OG_IMAGE = SITE + "/assets/og-image.jpg"
ANALYTICS_ID = "2aae1459-9c84-422e-a850-317547da79fc"
LANGS = ["en", "fr", "de", "es"]

SLUGS = [
    "join", "crossplay", "death-and-healing", "mobs-and-darkness",
    "alloys-and-stations", "recipes-and-advancements", "world-and-dimensions",
    "ranks-and-storage", "points-orders-trading", "chat-voice-afk",
    "rules-support-qol", "matcha-server", "what-is-matcha",
]
FEATURED = {"what-is-matcha", "matcha-server", "join"}
CARD_ICONS = {
    "join": "gamepad", "crossplay": "globe", "death-and-healing": "shield",
    "mobs-and-darkness": "sprout", "alloys-and-stations": "hammer",
    "recipes-and-advancements": "book", "world-and-dimensions": "globe",
    "ranks-and-storage": "shield", "points-orders-trading": "users",
    "chat-voice-afk": "message", "rules-support-qol": "scale",
    "matcha-server": "globe", "what-is-matcha": "book",
}
ICONS = {
    "hammer": "hammer", "sprout": "sprout", "book": "book-open",
    "globe": "globe", "shield": "shield-check", "scale": "scale",
    "users": "users", "gamepad": "gamepad-2", "message": "discord",
}

# Facts the wiki no longer supports; the build fails if any appear in a guide.
BANNED = ["100 blocks", "Hard mode", "Nether is open now", "within 100", "ranged chat is"]
DESC_RANGE = (120, 160)  # meta description length, characters
QUESTIONS_RANGE = (8, 14)

INDEX_DESCRIPTION = {
    "en": ("Guides to Minecraft survival: crossplay between Java, Bedrock and console, "
           "hearts and healing, mobs and darkness, crafting and alloys, server economy "
           "and rules, with examples from MatchaSMP."),
    "fr": ("Guides de survie Minecraft : crossplay entre Java, Bedrock et console, cœurs "
           "et soins, monstres et obscurité, artisanat et alliages, économie et règles "
           "de serveur, avec des exemples tirés de MatchaSMP."),
    "de": ("Leitfäden zum Minecraft-Survival: Crossplay zwischen Java, Bedrock und Konsole, "
           "Herzen und Heilung, Mobs und Dunkelheit, Crafting und Legierungen, Serverwirtschaft "
           "und Regeln, mit Beispielen von MatchaSMP."),
    "es": ("Guías de supervivencia de Minecraft: crossplay entre Java, Bedrock y consola, "
           "corazones y curación, mobs y oscuridad, crafteo y aleaciones, economía del servidor "
           "y reglas, con ejemplos de MatchaSMP."),
}

STR = {
    "en": {
        "html_lang": "en", "base": "", "locale": "en_US", "label": "EN",
        "skip": "Skip to content", "toggle": "Toggle menu", "language": "Language",
        "community": "Community", "resources": "Resources",
        "modrinth": "Modrinth", "discord": "Discord", "store": "Store",
        "recipes": "Recipes", "advancements": "Advancements", "wiki": "Wiki", "guides": "Guides",
        "explore": "Explore", "home": "Home", "how_to_join": "How to Join",
        "recipe_book": "Recipe Book", "advancement_guide": "Advancement Guide",
        "last_updated": "Last updated",
        "tagline": "A non pay-to-win crossplay survival SMP. Java, Bedrock and console, one world.",
        "legal": ("MatchaSMP is not an official Minecraft service and is not approved by or "
                  "associated with Mojang or Microsoft. Item textures come from Minecraft and "
                  "the server resource pack."),
        "crumb_home": "Home", "crumb_wiki": "Wiki", "crumb_guides": "Guides",
        "answers": "answers", "full_wiki": "Full wiki →", "go_deeper": "Go deeper",
        "related": "Related guides", "read": "Read guide →", "browse": "Browse by topic",
        "hub_suffix": " – MatchaSMP Guide",
        "index_title": "Minecraft Survival Guides – Crossplay, Rules & Progression",
        "index_name": "Minecraft survival guides", "index_h1": "Minecraft survival <em>guides</em>",
        "index_sub": ("Clear answers to common Minecraft survival questions: crossplay, hearts and "
                      "healing, mobs, crafting, economy and server rules. Examples come from MatchaSMP."),
    },
    "fr": {
        "html_lang": "fr", "base": "/fr", "locale": "fr_FR", "label": "FR",
        "skip": "Aller au contenu", "toggle": "Ouvrir le menu", "language": "Langue",
        "community": "Communauté", "resources": "Ressources",
        "modrinth": "Modrinth", "discord": "Discord", "store": "Boutique",
        "recipes": "Recettes", "advancements": "Progrès", "wiki": "Wiki", "guides": "Guides",
        "explore": "Explorer", "home": "Accueil", "how_to_join": "Comment rejoindre",
        "recipe_book": "Livre de recettes", "advancement_guide": "Guide des progrès",
        "last_updated": "Dernière mise à jour",
        "tagline": "Un SMP survie crossplay sans pay-to-win. Java, Bedrock et console, un seul monde.",
        "legal": ("MatchaSMP n'est pas un service officiel de Minecraft et n'est ni approuvé ni "
                  "associé à Mojang ou Microsoft. Les textures des objets viennent de Minecraft "
                  "et du pack de ressources du serveur."),
        "crumb_home": "Accueil", "crumb_wiki": "Wiki", "crumb_guides": "Guides",
        "answers": "réponses", "full_wiki": "Wiki complet →", "go_deeper": "Pour aller plus loin",
        "related": "Guides liés", "read": "Lire le guide →", "browse": "Parcourir par thème",
        "hub_suffix": " – Guide MatchaSMP",
        "index_title": "Guides de survie Minecraft – Crossplay, règles et progression",
        "index_name": "Guides de survie Minecraft", "index_h1": "Guides de <em>survie</em> Minecraft",
        "index_sub": ("Réponses claires aux questions courantes sur la survie Minecraft : crossplay, "
                      "cœurs et soins, monstres, artisanat, économie et règles du serveur. "
                      "Les exemples viennent de MatchaSMP."),
    },
    "de": {
        "html_lang": "de", "base": "/de", "locale": "de_DE", "label": "DE",
        "skip": "Zum Inhalt springen", "toggle": "Menü umschalten", "language": "Sprache",
        "community": "Community", "resources": "Ressourcen",
        "modrinth": "Modrinth", "discord": "Discord", "store": "Shop",
        "recipes": "Rezepte", "advancements": "Fortschritte", "wiki": "Wiki", "guides": "Leitfäden",
        "explore": "Entdecken", "home": "Startseite", "how_to_join": "So trittst du bei",
        "recipe_book": "Rezeptbuch", "advancement_guide": "Fortschrittsleitfaden",
        "last_updated": "Zuletzt aktualisiert",
        "tagline": "Ein Crossplay-Survival-SMP ohne Pay-to-Win. Java, Bedrock und Konsole, eine Welt.",
        "legal": ("MatchaSMP ist kein offizieller Minecraft-Dienst und weder von Mojang noch von "
                  "Microsoft genehmigt oder mit ihnen verbunden. Item-Texturen stammen von Minecraft "
                  "und vom Ressourcenpaket des Servers."),
        "crumb_home": "Startseite", "crumb_wiki": "Wiki", "crumb_guides": "Leitfäden",
        "answers": "Antworten", "full_wiki": "Gesamtes Wiki →", "go_deeper": "Weiterlesen",
        "related": "Verwandte Leitfäden", "read": "Leitfaden lesen →", "browse": "Nach Thema durchsuchen",
        "hub_suffix": " – MatchaSMP Leitfaden",
        "index_title": "Minecraft-Survival-Leitfäden – Crossplay, Regeln & Fortschritt",
        "index_name": "Minecraft-Survival-Leitfäden",
        "index_h1": "Minecraft-Survival-<em>Leitfäden</em>",
        "index_sub": ("Klare Antworten auf häufige Survival-Fragen zu Minecraft: Crossplay, Herzen "
                      "und Heilung, Mobs, Crafting, Wirtschaft und Serverregeln. Beispiele stammen "
                      "von MatchaSMP."),
    },
    "es": {
        "html_lang": "es", "base": "/es", "locale": "es_ES", "label": "ES",
        "skip": "Ir al contenido", "toggle": "Abrir menú", "language": "Idioma",
        "community": "Comunidad", "resources": "Recursos",
        "modrinth": "Modrinth", "discord": "Discord", "store": "Tienda",
        "recipes": "Recetas", "advancements": "Logros", "wiki": "Wiki", "guides": "Guías",
        "explore": "Explorar", "home": "Inicio", "how_to_join": "Cómo unirse",
        "recipe_book": "Libro de recetas", "advancement_guide": "Guía de logros",
        "last_updated": "Última actualización",
        "tagline": "Un SMP de supervivencia crossplay sin pay-to-win. Java, Bedrock y consola, un solo mundo.",
        "legal": ("MatchaSMP no es un servicio oficial de Minecraft y no está aprobado ni asociado "
                  "con Mojang o Microsoft. Las texturas de los objetos provienen de Minecraft y del "
                  "paquete de recursos del servidor."),
        "crumb_home": "Inicio", "crumb_wiki": "Wiki", "crumb_guides": "Guías",
        "answers": "respuestas", "full_wiki": "Wiki completa →", "go_deeper": "Para saber más",
        "related": "Guías relacionadas", "read": "Leer guía →", "browse": "Explorar por tema",
        "hub_suffix": " – Guía de MatchaSMP",
        "index_title": "Guías de supervivencia de Minecraft – Crossplay, reglas y progresión",
        "index_name": "Guías de supervivencia de Minecraft",
        "index_h1": "Guías de <em>supervivencia</em> de Minecraft",
        "index_sub": ("Respuestas claras a preguntas comunes sobre supervivencia en Minecraft: "
                      "crossplay, corazones y curación, mobs, crafteo, economía y reglas del servidor. "
                      "Los ejemplos vienen de MatchaSMP."),
    },
}

MONTHS = {
    "fr": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
           "septembre", "octobre", "novembre", "décembre"],
    "de": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August",
           "September", "Oktober", "November", "Dezember"],
    "es": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
           "septiembre", "octubre", "noviembre", "diciembre"],
}


def esc(s):
    return html.escape(str(s), quote=True)


def P(lang, path):
    """Site path in a language: P('fr', '/wiki.html') -> '/fr/wiki.html', P('fr', '/') -> '/fr/'."""
    return STR[lang]["base"] + path


def page_url(lang, slug=None):
    """Canonical absolute URL of a hub, or of the guides index when slug is None."""
    return SITE + P(lang, "/guides/") + ("" if slug is None else slug + ".html")


def alternates(rel_path):
    """hreflang block for one page in all four languages, plus x-default (English)."""
    lines = ['  <link rel="alternate" hreflang="%s" href="%s">' % (l, SITE + P(l, rel_path)) for l in LANGS]
    lines.append('  <link rel="alternate" hreflang="x-default" href="%s">' % (SITE + rel_path))
    return "\n".join(lines)


def ic(file):
    """Icon element for a file name in /assets/icons (without the .svg extension)."""
    return '<i class="ic" style="--i:url(/assets/icons/%s.svg)" aria-hidden="true"></i>' % file


def icon(name):
    return ic(ICONS.get(name, "book-open"))


def nav(lang, current, rel):
    """Header. rel is the page's path in the default language; the switch links to its twin."""
    s = STR[lang]
    switch = "\n".join(
        '          <a href="%s" hreflang="%s" lang="%s" aria-current="%s">%s</a>'
        % (P(l, rel), l, l, "true" if l == lang else "false", STR[l]["label"]) for l in LANGS)
    return """  <header class="nav">
    <div class="nav-inner">
      <nav class="nav-links left" aria-label="%(community)s">
        <span class="lang-switch" role="group" aria-label="%(language)s">
%(switch)s
        </span>
        <a href="https://modrinth.com/server/gilly-smp" rel="noopener" target="_blank">%(modrinth_i)s %(modrinth)s</a>
        <a href="https://discord.gg/QjfVSgzDNe" rel="noopener" target="_blank">%(discord_i)s %(discord)s</a>
        <a href="https://gillysmp.craftingstore.net/" rel="noopener" target="_blank">%(shop_i)s %(store)s</a>
      </nav>
      <a class="brand" href="%(home)s"><span>Matcha<b>SMP</b></span></a>
      <nav class="nav-links right" aria-label="%(resources)s">
        <a href="%(recipes)s">%(hammer_i)s %(recipes_l)s</a>
        <a href="%(adv)s"%(adv_cur)s>%(sprout_i)s %(advancements)s</a>
        <a href="%(wiki)s">%(book_i)s %(wiki_l)s</a>
        <a href="%(guides)s"%(guides_cur)s>%(globe_i)s %(guides_l)s</a>
      </nav>
      <button class="nav-toggle" aria-label="%(toggle)s" aria-expanded="false"><i class="ic" style="--i:url(/assets/icons/menu.svg)"></i></button>
    </div>
  </header>""" % dict(
        s, switch=switch,
        modrinth_i=ic("modrinth"), discord_i=ic("discord"), shop_i=ic("shopping-bag"),
        hammer_i=ic("hammer"), sprout_i=ic("sprout"), book_i=ic("book-open"), globe_i=ic("globe"),
        home=P(lang, "/"), recipes=P(lang, "/recipes.html"), adv=P(lang, "/advancements.html"),
        wiki=P(lang, "/wiki.html"), guides=P(lang, "/guides/"),
        recipes_l=s["recipes"], wiki_l=s["wiki"], guides_l=s["guides"],
        adv_cur=' aria-current="page"' if current == "advancements" else "",
        guides_cur=' aria-current="page"' if current == "guides" else "",
    )


def pretty_date(lang, iso):
    d = datetime.strptime(iso, "%Y-%m-%d")
    if lang == "en":
        return d.strftime("%B %-d, %Y")
    if lang == "de":
        return "%d. %s %d" % (d.day, MONTHS["de"][d.month - 1], d.year)
    if lang == "es":
        return "%d de %s de %d" % (d.day, MONTHS["es"][d.month - 1], d.year)
    return "%d %s %d" % (d.day, MONTHS["fr"][d.month - 1], d.year)


def footer(lang, updated):
    s = STR[lang]
    return """  <footer class="footer">
    <div class="container footer-grid">
      <div class="f-brand">
        <a class="brand" href="%(home)s"><img class="pixel" src="/assets/logo.webp" width="40" height="40" alt=""><span>Matcha<b>SMP</b></span></a>
        <p>%(tagline)s</p>
      </div>
      <nav class="f-col" aria-label="%(explore)s">
        <h3 class="f-title">%(explore)s</h3>
        <a href="%(home)s">%(house_i)s %(home_l)s</a>
        <a href="%(join)s">%(gamepad_i)s %(how_to_join)s</a>
        <a href="%(wiki)s">%(book_i)s %(wiki_l)s</a>
        <a href="%(guides)s">%(globe_i)s %(guides_l)s</a>
        <a href="%(recipes)s">%(book_i)s %(recipe_book)s</a>
        <a href="%(adv)s">%(sprout_i)s %(advancement_guide)s</a>
      </nav>
      <nav class="f-col" aria-label="%(community)s">
        <h3 class="f-title">%(community)s</h3>
        <a href="https://discord.gg/QjfVSgzDNe" rel="noopener" target="_blank">%(discord_i)s %(discord)s</a>
        <a href="https://modrinth.com/server/gilly-smp" rel="noopener" target="_blank">%(modrinth_i)s %(modrinth)s</a>
        <a href="https://gillysmp.craftingstore.net/" rel="noopener" target="_blank">%(shop_i)s %(store)s</a>
      </nav>
    </div>
    <div class="container footer-bottom">
      <p>© 2026 MatchaSMP · %(last_updated)s <time datetime="%(updated)s">%(pretty)s</time></p>
      <p class="legal">%(legal)s</p>
    </div>
  </footer>""" % dict(
        s,
        home=P(lang, "/"), join=P(lang, "/#join"), wiki=P(lang, "/wiki.html"),
        guides=P(lang, "/guides/"), recipes=P(lang, "/recipes.html"), adv=P(lang, "/advancements.html"),
        house_i=ic("house"), gamepad_i=ic("gamepad-2"), book_i=ic("book-open"),
        globe_i=ic("globe"), sprout_i=ic("sprout"), discord_i=ic("discord"),
        modrinth_i=ic("modrinth"), shop_i=ic("shopping-bag"),
        home_l=s["home"], wiki_l=s["wiki"], guides_l=s["guides"], discord=s["discord"],
        modrinth=s["modrinth"], store=s["store"], how_to_join=s["how_to_join"],
        recipe_book=s["recipe_book"], advancement_guide=s["advancement_guide"],
        explore=s["explore"], community=s["community"],
        last_updated=s["last_updated"], updated=updated, pretty=pretty_date(lang, updated),
        legal=s["legal"], tagline=s["tagline"],
    )


def head(lang, title, description, url, jsonld, alt_block, md_href):
    s = STR[lang]
    ld = json.dumps(jsonld, ensure_ascii=False, indent=2).replace("</", "<\\/")
    return """<!DOCTYPE html>
<html lang="%(html_lang)s">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' https://u.crbo.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'; upgrade-insecure-requests">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <script src="/js/legacy-redirect.js"></script>
  <title>%(title)s</title>
  <meta name="description" content="%(description)s">
  <link rel="canonical" href="%(url)s">
%(alt_block)s
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly summary">
  <link rel="alternate" type="text/markdown" href="%(md_href)s" title="Markdown version">
  <link rel="describedby" href="/llms.txt" title="LLM-friendly summary">
  <link rel="icon" type="image/png" href="/assets/favicon.png">
  <meta name="theme-color" content="#123820">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="MatchaSMP">
  <meta property="og:locale" content="%(locale)s">
  <meta property="og:title" content="%(title)s">
  <meta property="og:description" content="%(description)s">
  <meta property="og:url" content="%(url)s">
  <meta property="og:image" content="%(og_image)s">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="%(title)s">
  <meta name="twitter:description" content="%(description)s">
  <meta name="twitter:image" content="%(og_image)s">
  <link rel="preload" href="/assets/fonts/titan-one-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/poppins-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/guides.css">
  <script type="application/ld+json">
%(ld)s
  </script>
  <script defer src="https://u.crbo.dev/script.js" data-website-id="%(aid)s" data-exclude-hash="true"></script>
  <script defer src="https://u.crbo.dev/recorder.js" data-website-id="%(aid)s"></script>
</head>
<body>
  <a class="skip" href="#main">%(skip)s</a>
""" % dict(html_lang=s["html_lang"], title=esc(title), description=esc(description),
           url=esc(url), alt_block=alt_block, md_href=esc(md_href), locale=s["locale"], og_image=OG_IMAGE,
           ld=ld, aid=ANALYTICS_ID, skip=s["skip"])


def page_shell(lang, body, title, description, url, jsonld, updated, current, alt_block, rel):
    md_href = rel[:-5] + ".md" if rel.endswith(".html") else rel + "index.md"
    return (head(lang, title, description, url, jsonld, alt_block, md_href) + nav(lang, current, rel) + "\n"
            + body + "\n" + footer(lang, updated) +
            '\n  <script src="/js/main.js"></script>\n</body>\n</html>\n')


def strip_tags(s):
    return re.sub(r"<[^>]+>", "", str(s))


def build_page(lang, data):
    s = STR[lang]
    slug = data["slug"]
    url = page_url(lang, slug)
    qas = [(g["title"], item) for g in data["groups"] for item in g["items"]]
    faq = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "url": url, "inLanguage": lang, "dateModified": data["updated"],
        "mainEntity": [
            {"@type": "Question", "name": q,
             "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}}
            for _, it in qas for q, a in [(it["q"], it["a"])]
        ],
    }
    crumbs = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": s["crumb_home"], "item": SITE + P(lang, "/")},
            {"@type": "ListItem", "position": 2, "name": s["crumb_wiki"], "item": SITE + P(lang, "/wiki.html")},
            {"@type": "ListItem", "position": 3, "name": s["crumb_guides"], "item": page_url(lang)},
            {"@type": "ListItem", "position": 4, "name": data["title"], "item": url},
        ],
    }
    web = {
        "@context": "https://schema.org", "@type": "WebPage",
        "name": data["h1"], "url": url, "description": data["description"],
        "inLanguage": lang, "dateModified": data["updated"],
        "isPartOf": {"@id": SITE + "/#website"},
    }
    graph = {"@context": "https://schema.org", "@graph": [web, faq, crumbs]}

    b = ['  <main id="main" class="guide container">']
    b.append('    <p class="breadcrumbs"><a href="%s">%s</a><span>›</span>'
             '<a href="%s">%s</a><span>›</span><a href="%s">%s</a><span>›</span>%s</p>'
             % (P(lang, "/"), s["crumb_home"], P(lang, "/wiki.html"), s["crumb_wiki"],
                P(lang, "/guides/"), s["crumb_guides"], esc(data["title"])))
    b.append('    <section class="hero page-hero">')
    b.append('      <div class="hero-inner container">')
    b.append('        <img class="hero-logo pixel" src="/assets/logo.webp" width="72" height="72" alt="">')
    b.append('        <h1>%s</h1>' % esc(data["h1"]))
    b.append('        <p class="intro">%s</p>' % data["intro"])
    b.append('        <p class="badges"><span class="badge y">%d %s</span>'
             '<a class="badge" href="%s">%s</a></p>'
             % (len(qas), s["answers"], P(lang, "/wiki.html"), s["full_wiki"]))
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
    b.append('      <h2>%s</h2>' % s["go_deeper"])
    b.append('      <ul class="guide-links">')
    for l in data["deeper"]:
        b.append('        <li><a href="%s">%s</a></li>' % (esc(l["url"]), esc(l["label"])))
    b.append('      </ul>')
    b.append('    </section>')
    if data.get("related"):
        b.append('    <section class="guide-related">')
        b.append('      <h2>%s</h2>' % s["related"])
        b.append('      <ul class="guide-links">')
        for l in data["related"]:
            b.append('        <li><a href="%s">%s</a></li>' % (esc(l["url"]), esc(l["label"])))
        b.append('      </ul>')
        b.append('    </section>')
    b.append('  </main>')
    rel = "/guides/%s.html" % slug
    return page_shell(lang, "\n".join(b), data["title"] + s["hub_suffix"],
                      data["description"], url, graph, data["updated"], "guides",
                      alternates(rel), rel), len(qas)


def build_index(lang, datas):
    s = STR[lang]
    url = page_url(lang)
    updated = max(d["updated"] for d in datas)
    desc = INDEX_DESCRIPTION[lang]
    ld = {
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": s["index_name"], "url": url,
        "description": desc, "dateModified": updated, "inLanguage": lang,
        "isPartOf": {"@id": SITE + "/#website"},
    }
    b = ['  <main id="main" class="guide container">']
    b.append('    <p class="breadcrumbs"><a href="%s">%s</a><span>›</span>'
             '<a href="%s">%s</a><span>›</span>%s</p>'
             % (P(lang, "/"), s["crumb_home"], P(lang, "/wiki.html"), s["crumb_wiki"], s["guides"]))
    b.append('    <section class="hero page-hero">')
    b.append('      <div class="hero-inner container">')
    b.append('        <img class="hero-logo pixel" src="/assets/logo.webp" width="72" height="72" alt="">')
    b.append('        <h1>%s</h1>' % s["index_h1"])
    b.append('        <p class="sub">%s</p>' % esc(s["index_sub"]))
    b.append('      </div>')
    b.append('      <div class="ground" aria-hidden="true"></div>')
    b.append('    </section>')
    b.append('    <section class="guide-index">')
    b.append('      <h2>%s</h2>' % s["browse"])
    b.append('      <ul class="guide-masonry">')
    for d in datas:
        slug = d["slug"]
        cls = "guide-card featured" if slug in FEATURED else "guide-card"
        n = sum(len(g["items"]) for g in d["groups"])
        b.append('        <li><a class="%s" href="%s">' % (cls, P(lang, "/guides/%s.html" % slug)))
        b.append('          <span class="guide-card-top">%s<span class="guide-card-count">%d %s</span></span>'
                 % (icon(CARD_ICONS.get(slug, "book")), n, s["answers"]))
        b.append('          <strong>%s</strong>' % esc(d["title"]))
        b.append('          <span class="guide-card-desc">%s</span>' % esc(d["description"]))
        b.append('          <span class="guide-card-more">%s</span>' % s["read"])
        b.append('        </a></li>')
    b.append('      </ul>')
    b.append('    </section>')
    b.append('  </main>')
    return page_shell(lang, "\n".join(b), s["index_title"], desc, url, ld, updated, "guides",
                      alternates("/guides/"), "/guides/")


def content_dir(lang):
    return CONTENT if lang == "en" else CONTENT / lang


def load(lang, slug):
    return json.loads((content_dir(lang) / (slug + ".json")).read_text(encoding="utf-8"))


def validate(lang, datas):
    """Fail the build on SEO or accuracy problems instead of shipping them."""
    errors = []
    anchors = set(re.findall(r'id="([\w-]+)"', (ROOT / "wiki.html").read_text(encoding="utf-8")))
    for d in datas:
        slug = "%s/%s" % (lang, d.get("slug", "?"))
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", d.get("updated", "")):
            errors.append("%s: missing or invalid 'updated' date" % slug)
        n = sum(len(g["items"]) for g in d["groups"])
        if not QUESTIONS_RANGE[0] <= n <= QUESTIONS_RANGE[1]:
            errors.append("%s: %d questions, expected %d-%d" % (slug, n, *QUESTIONS_RANGE))
        if not DESC_RANGE[0] <= len(d["description"]) <= DESC_RANGE[1]:
            errors.append("%s: description is %d chars, expected %d-%d"
                          % (slug, len(d["description"]), *DESC_RANGE))
        text = " ".join([d["intro"], d["h1"]] + [i["q"] + " " + i["a"]
                        for g in d["groups"] for i in g["items"]])
        for bad in BANNED:
            if bad.lower() in text.lower():
                errors.append("%s: contains banned claim %r" % (slug, bad))
        for link in d["deeper"] + d.get("related", []):
            url = link["url"]
            if "#" in url:
                target = url.split("#", 1)[1]
                if target not in anchors:
                    errors.append("%s: link %s points to a missing wiki anchor" % (slug, url))
    if errors:
        raise SystemExit("Validation failed:\n  " + "\n  ".join(errors))


def wire_sitemap():
    """Give every language version of every page its own <url> entry, with all alternates.

    Other URLs already in sitemap.xml (for example the 404-free helper pages) are kept.
    """
    p = ROOT / "sitemap.xml"
    s = p.read_text(encoding="utf-8")
    entries = re.findall(r"  <url>.*?</url>", s)
    pages = [("/", "2026-11-21", "1.0"), ("/wiki.html", "2026-11-21", "0.9"),
             ("/recipes.html", "2026-11-21", "0.8"), ("/advancements.html", "2026-11-21", "0.8"),
             ("/guides/", max(load("en", slug)["updated"] for slug in SLUGS), "0.6")]
    for slug in SLUGS:
        pages.append(("/guides/%s.html" % slug, load("en", slug)["updated"], "0.6"))
    page_urls = {SITE + P(l, path) for path, _, _ in pages for l in LANGS}

    def loc_of(entry):
        return re.search(r"<loc>(.*?)</loc>", entry).group(1)

    keep = [e for e in entries if "/guides/" not in e and loc_of(e) not in page_urls]
    new = []
    for path, date, prio in pages:
        links = "".join('<xhtml:link rel="alternate" hreflang="%s" href="%s"/>'
                        % (l, SITE + P(l, path)) for l in LANGS)
        for lang in LANGS:
            new.append("  <url><loc>%s</loc>%s<lastmod>%s</lastmod><priority>%s</priority></url>"
                       % (SITE + P(lang, path), links, date, prio))
    header = ('<?xml version="1.0" encoding="UTF-8"?>\n'
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
              'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n')
    p.write_text(header + "\n".join(keep + new) + "\n</urlset>\n", encoding="utf-8")


def wire_llms(datas):
    p = ROOT / "llms.txt"
    s = p.read_text(encoding="utf-8")
    # Replace the two generated sections in place; tolerate them being absent.
    s = re.sub(r"\n*## Long-tail guides\n.*?(?=\n## |\Z)", "\n", s, flags=re.S)
    s = re.sub(r"\n*## Machine-readable pages\n.*?(?=\n## |\Z)", "\n", s, flags=re.S)
    lines = ["", "## Long-tail guides",
             "Short, question-shaped pages answering specific MatchaSMP queries. Each page is a consolidated hub with self-contained answers (FAQPage structured data). Translations live under /fr/guides/, /de/guides/ and /es/guides/."]
    for d in datas:
        lines.append("- [%s](%s): %s" % (d["title"], page_url("en", d["slug"]), d["description"]))
    lines.append("- [All guides](%s): index of every topic hub." % page_url("en"))
    lines += ["",
              "## Machine-readable pages",
              "Every page has a Markdown twin at the same path with a .md suffix. "
              "Fetch these directly or follow the <link rel=\"alternate\" type=\"text/markdown\"> "
              "element in each page's head.",
              "- [Home (Markdown)](https://matchasmp.eu/index.md)",
              "- [Wiki (Markdown)](https://matchasmp.eu/wiki.md)",
              "- [Recipes (Markdown)](https://matchasmp.eu/recipes.md)",
              "- [Advancements (Markdown)](https://matchasmp.eu/advancements.md)"]
    for d in datas:
        url = page_url("en", d["slug"]).rstrip("/")
        if url.endswith(".html"):
            url = url[: -len(".html")]
        lines.append("- [%s (Markdown)](%s.md)" % (d["title"], url))
    lines.append("- [All guides (Markdown)](%sindex.md)" % page_url("en"))
    s = s.rstrip() + "\n" + "\n".join(lines) + "\n"
    p.write_text(s, encoding="utf-8")


def main():
    datas = {}
    for lang in LANGS:
        datas[lang] = [load(lang, slug) for slug in SLUGS]
        for slug, data in zip(SLUGS, datas[lang]):
            assert data["slug"] == slug, (lang, slug, data["slug"])
        validate(lang, datas[lang])

    count = 0
    for lang in LANGS:
        out = ROOT / P(lang, "/guides/").lstrip("/")
        out.mkdir(parents=True, exist_ok=True)
        for data in datas[lang]:
            html_text, n = build_page(lang, data)
            (out / (data["slug"] + ".html")).write_text(html_text, encoding="utf-8")
            count += n
        (out / "index.html").write_text(build_index(lang, datas[lang]), encoding="utf-8")

    wire_sitemap()
    wire_llms(datas["en"])
    print("Generated %d hubs + index in %d languages, %d Q&As total"
          % (len(SLUGS), len(LANGS), count))


if __name__ == "__main__":
    main()
