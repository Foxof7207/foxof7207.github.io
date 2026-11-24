# Long-tail hub content spec (for content authors)

Goal: answer broad research questions about Minecraft survival, crossplay and
server rules, so people who were not looking for this server still find a
useful answer and discover MatchaSMP. Branded queries are a side effect, not the target.

Write ONE JSON file per hub to `scripts/content/<slug>.json`, then run
`python3 scripts/generate_longtail.py` from the repo root. The generator validates
the content and fails the build on problems.

Source of truth for facts (read these, do not invent facts):
- `wiki.html` — authoritative page, including the anchors used in links
- `llms.txt` — plain-language summary
- `assets/recipes/recipes.json` and `assets/advancements/advancements.json` — data, if needed

Known conflicts to resolve before publishing a related answer:
- AFK timing differs between the Chat section (5 min idle, then 10 more minutes) and the
  Server section and FAQ (20 minutes, 15 minutes). Check the wiki and fix it there first.

JSON schema (exact keys):

{
  "slug": "<same as filename>",
  "title": "<short topic name, used on the index card and in the browser title>",
  "updated": "YYYY-MM-DD",          // change only when the content changes; drives lastmod and dateModified
  "h1": "<topic-first H1, 6-14 words, describes the question, does not need the server name>",
  "description": "<meta description, 120-160 characters>",
  "intro": "<2-3 sentences, plain text, names the topic and says MatchaSMP is the worked example>",
  "groups": [
    {
      "title": "<topic group heading>",
      "items": [
        {
          "q": "<question phrased as a searcher with no server in mind, ends with ?>",
          "a": "<self-contained answer, 2-5 sentences, repeats the key fact; may use <a href>, <code>, <strong>>"
        }
      ]
    }
  ],
  "deeper": [{"url": "/wiki.html#anchor", "label": "Wiki: Section"}],
  "related": [{"url": "/guides/<other-slug>.html", "label": "Related hub title"}]
}

Rules:
1. 8-14 questions per hub, split across 2-4 groups.
2. Questions are broad and generic first ("Why doesn't my health regenerate in Minecraft?"),
   not branded ("Why can't I heal on MatchaSMP?"). Name the server only inside the answer
   where it explains how this server does it.
3. Every answer must be grounded in the source. Never invent a number, command, item,
   rank perk, port or version. If the wiki does not say it, leave it out.
4. Each answer stands alone: the full fact, including numbers and commands.
5. Answers may use inline HTML (<a>, <code>, <strong>). No headings, lists or scripts inside answers.
6. Internal links use absolute site paths. Links with `#anchor` must point to an id that exists in wiki.html; the validator checks this.
7. "deeper" = 2-4 links to existing deep pages. "related" = 2-3 links to other hubs.
8. Do not say "according to the wiki", do not cite sources, and do not mention that an old FAQ was wrong.
9. Do not add claims about other servers, creators, or other products that the wiki does not state. Unverifiable comparisons (for example "the only EU server") are banned.
10. Valid UTF-8 JSON, no trailing commas, no comments.

Banned or stale facts (the validator rejects these): "100 blocks", "Hard mode"
(the server is Easy), "Nether is open now" (the Nether is closed until the next major update),
"within 100", "ranged chat is".

Hub slugs and topics:
- join — joining, addresses, consoles, whitelist, paid account
- crossplay — shared worlds across platforms, account linking, name prefix, resource pack, mods
- death-and-healing — death penalties, hearts, Crystal Hearts, healing, hunger
- mobs-and-darkness — mob spawns, phantoms, true darkness, sleeping, explosions
- alloys-and-stations — alloys, metals, stations, tools, smelting
- recipes-and-advancements — recipe book, advancement guide, Bedrock limitations
- world-and-dimensions — difficulty, terrain, Nether/End, portals, seasons, world border
- ranks-and-storage — ranks, homes, ender chest, sharing, backups
- points-orders-trading — points, order market, player trades, payments, referrals
- chat-voice-afk — global chat, private messages, voice chat, AFK, colours, coordinates
- rules-support-qol — rules, PvP, griefing, cheats, appeals, quality-of-life tweaks
- what-is-matcha — what the Matcha Flavoured datapack is, spelling variants
- matcha-server — how to choose a Matcha Flavoured server (generic checklist, MatchaSMP as one option)
