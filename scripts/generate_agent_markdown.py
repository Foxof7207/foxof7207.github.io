#!/usr/bin/env python3
"""Generate agent-readable Markdown twins for every MatchaSMP HTML page.

For each page* we write a sibling <page>.md containing the page title, meta
description, canonical URL and the visible text of <main>, with links resolved
to absolute URLs, and inject discovery links into the page's <head>:

    <link rel="alternate" type="text/markdown" href="...">
    <link rel="describedby" href="/llms.txt">

GitHub Pages is static: it cannot do Accept: text/markdown content negotiation
or set HTTP Link headers, so these HTML links and the .md files are how agents
(Cursor, Codex CLI, Claude Code) find the Markdown. Running the script twice
changes nothing (idempotent).

Requires beautifulsoup4 and markdownify in the active environment.

    VENV=~/.hermes/cache/scratch/agentready-venv
    "$VENV/bin/python" scripts/generate_agent_markdown.py

* Except redirect stubs (meta refresh / location.replace) and 404 pages: those
  are not content pages and get neither a twin nor injected links.
"""
import re
import sys
from pathlib import Path

try:
    from bs4 import BeautifulSoup, Comment
    from markdownify import markdownify as md
except ImportError as exc:
    sys.exit("Missing dependency: %s. Install beautifulsoup4 and markdownify." % exc)

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://matchasmp.eu"
SKIP_FILES = {"404.html"}
MARKDOWN_LINK = '  <link rel="alternate" type="text/markdown" href="%s" title="Markdown version">'
DESCRIBEDBY = '  <link rel="describedby" href="/llms.txt" title="LLM-friendly summary">'


def rel_url(rel: Path) -> str:
    """URL path for a source html file relative to the repo root."""
    return "/" + rel.as_posix()


def md_url(rel: Path) -> str:
    p = rel_url(rel)
    if p.endswith("/index.html") or p == "/index.html":
        p = p[: -len("index.html")] + "index.md"
    elif p.endswith(".html"):
        p = p[: -len(".html")] + ".md"
    return p


def is_redirect(soup: BeautifulSoup) -> bool:
    for meta in soup.find_all("meta"):
        if meta.get("http-equiv", "").lower() == "refresh":
            return True
    for script in soup.find_all("script"):
        if "location.replace" in (script.string or script.get_text() or ""):
            return True
    return False


def build_markdown(soup: BeautifulSoup, rel: Path) -> str:
    title = soup.title.get_text(strip=True) if soup.title else rel.name
    desc = soup.find("meta", attrs={"name": "description"})
    description = desc.get("content", "").strip() if desc else ""
    canonical = soup.find("link", rel="canonical")
    page_url = canonical.get("href", "").strip() if canonical else SITE + rel_url(rel)

    main = soup.find("main") or soup.body or soup
    # Drop interactive/navigation chrome that would be noise for an agent.
    for tag in main.find_all(["script", "style", "nav", "button", "form", "noscript"]):
        tag.decompose()
    for comment in main.find_all(string=lambda s: isinstance(s, Comment)):
        comment.extract()
    for tag in main.find_all(src=re.compile(r"\.(?:png|jpe?g|webp|gif|svg)$", re.I)):
        tag.decompose()
    for tag in main.find_all(attrs={"aria-hidden": "true"}):
        tag.decompose()

    # Resolve all links to absolute URLs so they survive being read as a .md file.
    base = SITE + rel_url(rel)
    for a in main.find_all("a", href=True):
        href = a["href"].strip()
        if href.startswith("#"):
            a["href"] = base + href
        elif href.startswith("/"):
            a["href"] = SITE + href
        elif not re.match(r"^[a-z][a-z0-9+.-]*:", href, re.I):
            # Relative to the directory of this page.
            a["href"] = re.sub(r"[^/]*$", "", base) + href

    body = md(str(main), heading_style="ATX", strip=["a"])
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    lines = ["# " + title, ""]
    if description:
        lines += ["> " + description, ""]
    lines += ["Source: " + page_url, "", "---", "", body, ""]
    return "\n".join(lines)


def inject_head(text: str, soup: BeautifulSoup, md_href: str) -> str:
    """Insert discovery links into <head> without reformatting the HTML.

    Anchors after the existing text/plain llms.txt alternate (or canonical)
    link, which every content page already has. Returns the (possibly
    unchanged) text.
    """
    head = text[: text.find("</head>")] if "</head>" in text else text
    stale = re.search(r'(  <link rel="alternate" type="text/markdown" href=")([^"]*)("[^>]*>)', head)
    if stale:
        if stale.group(2) == md_href:
            pass  # correct already
        else:
            # head is a prefix of text, so group offsets are valid in text.
            start = stale.start(2)
            text = text[:start] + md_href + text[start + len(stale.group(2)):]
        return text
    if "rel=\"describedby\"" in head:
        return text
    anchor = None
    for pat in (r'  <link rel="alternate" type="text/plain"[^>]*>',
                r'  <link rel="canonical"[^>]*>'):
        m = re.search(pat, text[: text.find("</head>")])
        if m:
            anchor = m
            break
    if anchor is None:
        return text
    insert = (MARKDOWN_LINK % md_href) + "\n" + DESCRIBEDBY + "\n"
    return text[: anchor.end()] + "\n" + insert + text[anchor.end():].lstrip("\n")


def main() -> None:
    written = injected = skipped = 0
    for rel in sorted(ROOT.rglob("*.html")):
        if ".git" in rel.parts or rel.name in SKIP_FILES:
            continue
        rel = rel.relative_to(ROOT)
        text = (ROOT / rel).read_text(encoding="utf-8")
        soup = BeautifulSoup(text, "html.parser")
        if is_redirect(soup):
            skipped += 1
            continue

        md_href = md_url(rel)
        target = ROOT / md_href.lstrip("/")
        markdown = build_markdown(soup, rel)
        if not target.exists() or target.read_text(encoding="utf-8") != markdown:
            target.write_text(markdown, encoding="utf-8")
            written += 1

        new_text = inject_head(text, soup, md_href)
        if new_text != text:
            (ROOT / rel).write_text(new_text, encoding="utf-8")
            injected += 1
    print("Markdown twins written/updated: %d; HTML heads updated: %d; skipped stubs: %d"
          % (written, injected, skipped))


if __name__ == "__main__":
    main()
