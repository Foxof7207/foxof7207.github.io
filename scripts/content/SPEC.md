# Long-tail hub content spec (for content authors)

Write ONE JSON file per hub to `/home/foxof7207/Github/foxof7207.github.io/scripts/content/<slug>.json`.

Source of truth (read these, do not invent facts):
- `/home/foxof7207/.hermes/cache/scratch/wiki_text.txt` — all wiki sections extracted as plain text (primary source)
- `/home/foxof7207/Github/foxof7207.github.io/wiki.html` — authoritative page
- `/home/foxof7207/Github/foxof7207.github.io/llms.txt` — plain-language summary
- `/home/foxof7207/Github/foxof7207.github.io/assets/recipes/recipes.json` and `assets/advancements/advancements.json` — data, if needed

IMPORTANT FACT CORRECTION: chat is GLOBAL on Gilly SMP. There is no ranged chat and no need to shout with `!`. The FAQ block in wiki.html still has a stale claim about 100-block chat and `!` — ignore it. The Chat section and llms.txt are correct.

JSON schema (exact keys):

{
  "slug": "<same as filename>",
  "title": "<short browser-title topic, e.g. 'Death & Healing'>",
  "h1": "<keyword-rich H1, 6-14 words, includes 'Gilly SMP'>",
  "description": "<meta description, 120-160 chars, specific and keyword-rich>",
  "intro": "<2-3 sentences, plain text, names the server and this topic>",
  "groups": [
    {
      "title": "<topic group heading>",
      "items": [
        {
          "q": "<question, phrased as a real searcher would ask, ends with ?>",
          "a": "<self-contained answer, 2-5 sentences, repeats the key fact rather than saying 'see above'; may contain <a href=\"/wiki.html#anchor\">links</a>, <code>commands</code>, <strong>bold</strong>>"
        }
      ]
    }
  ],
  "deeper": [
    {"url": "/wiki.html#anchor", "label": "Wiki: Section name"},
    {"url": "/recipes.html", "label": "Recipe Book"}
  ],
  "related": [
    {"url": "/guides/<other-slug>.html", "label": "Related hub title"}
  ]
}

Rules:
1. 8-14 questions total per hub, split across 2-4 groups. Quality over quantity.
2. Every answer must be grounded in the source text. NEVER invent a number, command, item name, rank perk, port, or version.
3. Each answer must stand alone: a reader (or AI assistant) extracting just that Q&A gets the full fact, including the specific numbers/commands.
4. Questions should be the specific, conversational, question-shaped queries people actually type (long-tail), e.g. "How many hearts do you lose when you die on Gilly SMP?" not "Death rules".
5. Answers may include inline HTML: <a href="...">, <code>, <strong>. No headings, lists, images, or scripts inside answers. Escape quotes correctly for JSON.
6. Internal links use absolute paths from site root: /wiki.html#basics, /recipes.html, /advancements.html, /guides/crossplay.html etc.
7. "deeper" = 2-4 links to existing deep pages for this topic. "related" = 2-3 links to other hubs in the list below.
8. Do NOT mention "according to the wiki" or cite sources in the visible copy. Do NOT mention that the old FAQ was wrong.
9. Valid UTF-8 JSON, no trailing commas, no comments.

Hub slugs and topics (link to these with /guides/<slug>.html):
- join — joining, addresses, consoles, whitelist, paid account
- crossplay — crossplay, account linking, name prefix, resource pack, mods
- death-and-healing — death penalties, hearts, Crystal Hearts, healing, hunger
- mobs-and-darkness — mob spawns, phantoms, true darkness, sleeping, explosions, endgame safety
- alloys-and-stations — alloys, metals, stations, tools, silver, smelting gating
- recipes-and-advancements — recipe book, advancement guide, Bedrock limitations, fish almanac
- world-and-dimensions — world generation, difficulty, seasons, Nether/End, portals, border
- ranks-and-storage — ranks/perks, homes counts, ender chest, sharing, backups
- points-orders-trading — points, order market, player trades, payments, referrals
- chat-voice-afk — global chat, private messages, voice chat, AFK, /menu, commands
- rules-support-qol — rules, PvP, griefing, bans, appeals, quality-of-life tweaks

Banned/stale facts (do not publish): ranged chat, `!` for global, "chat only 100 blocks", "Gilly SMP is Hard mode" (it is Easy), "Nether is open" (it is closed until after the next major update).
