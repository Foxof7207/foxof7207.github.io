# Gilly SMP wiki — long-tail SEO strategy

Implemented; `scripts/generate_longtail.py` is the single source of truth for the generated pages. This document records the approved plan.

Approved decisions:
* Split the original 6 clusters into 11 narrower topic hubs, then added 2 non-branded discovery hubs (13 total).
* Chat is global — there is no ranged chat and no need to shout with `!`. The stale FAQ line in `wiki.html` was corrected as part of this work.
* Non-branded expansion targets players searching for a European Matcha Flavoured server with Java–Bedrock crossplay, plus spelling variants (Matcha Flavoured / Flavored).

## Why this approach

The reference article argues that long-tail queries each bring only a handful of searches, but collectively make up most search traffic — and that AI search (AI Overviews, AI Mode, chat assistants) favors them because they are phrased as specific, conversational questions. Two mechanics matter:

1. Query fan-out: AI systems expand one query into many sub-queries. Covering a cluster of natural-language variations makes more of them match.
2. Passage retrieval: assistants extract a specific passage, not a whole page. A page structured as one question heading followed by one self-contained answer is the cleanest unit to extract.

The same article explicitly warns against creating one thin page per keyword: fragmented long-tail queries should be **grouped by search intent onto consolidated pages**, so the cluster's volume is captured without near-duplicate content. So this plan creates a small number of rich, question-and-answer hub pages plus structured data — not one page per item/recipe.

Gilly SMP-specific angle: the server has an unusual ruleset (no natural regen, heart loss on death, no Nether/End, custom stations, crossplay with account linking). These are exactly the kind of specific "how does X work on Gilly SMP" queries that generic Minecraft results answer poorly, and that AI assistants can only answer from a page that states them explicitly. Existing FAQ content is already largely question-shaped, so the raw material exists; the gap is that it lives inside one large page and has no machine-readable Q&A structure.

## Final page clusters (split per review)

Each hub: one H2 per topic group, one H3 question + self-contained answer per Q&A, FAQPage JSON-LD, canonical/OG/meta, and links to the wiki anchor / deep tool it belongs to.

| File | Hub topic | Representative target queries |
| --- | --- | --- |
| `guides/join.html` | Joining & server address | "Gilly SMP server address", "how to join Gilly SMP Java", "Bedrock port 19132", "Gilly SMP console join", "cracked launcher Gilly SMP", "whitelist Gilly SMP", "paid account Gilly SMP" |
| `guides/crossplay.html` | Crossplay & accounts | "Java Bedrock crossplay Gilly SMP", "Gilly SMP link account inventory sync", "Gilly SMP shared progress", "why Bedrock name underscore", "can Bedrock use resource pack Gilly SMP", "Gilly SMP mods allowed" |
| `guides/death-and-healing.html` | Death, hearts, healing | "why can't I heal Gilly SMP", "no natural regeneration Gilly SMP", "what happens when you die Gilly SMP", "how to get hearts back Crystal Heart", "minimum hearts Gilly SMP", "do you lose XP on death Gilly SMP" |
| `guides/mobs-and-darkness.html` | Mobs, sleeping, darkness | "why no creepers Gilly SMP", "are phantoms disabled Gilly SMP", "Gilly SMP true darkness", "how does sleeping work Gilly SMP", "when is the surface safe Gilly SMP", "explosions drop blocks Gilly SMP" |
| `guides/alloys-and-stations.html` | Alloys, stations, tools | "how to make steel Gilly SMP", "Hepatizon Shakudo Gilly SMP", "Electrum Adamant Gilly SMP", "what does Mud Kiln do", "Oven vs Blast Furnace Gilly SMP", "Mattock Dolabra Gilly SMP", "where to find silver Gilly SMP", "why can't I smelt iron in the Kiln" |
| `guides/recipes-and-advancements.html` | Finding recipes, advancement guide | "Gilly SMP recipe book", "Bedrock recipe book missing recipes", "how to follow advancements Bedrock Gilly SMP", "Gilly SMP advancement guide", "how many recipes advancements Gilly SMP", "Gilly SMP Angler's Almanac" |
| `guides/world-and-dimensions.html` | World rules, Nether/End, border | "is the Nether open Gilly SMP", "can you go to the End Gilly SMP", "Gilly SMP world border", "what is the world like Gilly SMP", "world reset season Gilly SMP", "difficulty Gilly SMP Easy" |
| `guides/ranks-and-storage.html` | Ranks, ender chest | "Gilly SMP ranks perks", "how many homes Gold rank Gilly SMP", "how big is ender chest Gilly SMP", "how to share ender chest Gilly SMP", "do I lose items if rank expires Gilly SMP", "ender chest backup Gilly SMP" |
| `guides/points-orders-trading.html` | Points, order market, trades, referrals | "how to get points Gilly SMP", "how does order market work Gilly SMP", "Gilly SMP trade cooldown", "how to pay player Gilly SMP", "how to teleport to friend Gilly SMP", "RTP cannon Gilly SMP", "public homes Gilly SMP", "Gilly SMP referral diamonds" |
| `guides/chat-voice-afk.html` | Chat, voice, AFK, Bedrock menu | "is chat global Gilly SMP", "how to private message Gilly SMP", "Gilly SMP voice chat proximity", "push to talk Gilly SMP", "why was I muted Gilly SMP", "why disconnected AFK Gilly SMP", "AFK zone server restart Gilly SMP", "Gilly SMP /menu Bedrock", "why is command not available Gilly SMP" |
| `guides/rules-support-qol.html` | Rules, appeals, quality of life | "is Gilly SMP pay to win", "is PvP allowed Gilly SMP", "griefing Gilly SMP rules", "can I claim land Gilly SMP", "how to appeal ban Gilly SMP", "how to lock chests Gilly SMP", "can I sit on stairs Gilly SMP", "chunk loader Gilly SMP", "what commands Gilly SMP" |

Cross-links instead of duplicated answers where a query spans hubs (AFK, ranks, Bedrock).

## Structure of each page

* H1: e.g. "Gilly SMP survival rules: healing, deaths, mobs and difficulty explained"
* Intro paragraph naming the server and the specific cluster, with a canonical link.
* Topic `<h2>` groups (~4–6 per page), each containing `<h3>` question + 2–5 sentence self-contained answer.
* A "Go deeper" block linking to the relevant `wiki.html#anchor`, `recipes.html`, or `advancements.html`.
* `FAQPage` JSON-LD mirroring every visible Q&A (question = `<h3>` text, answer = same text as the visible paragraph) so AI systems and search get one consistent source.
* `BreadcrumbList` JSON-LD: Home → Wiki → current hub.
* Same header/nav/footer/CSS/analytics as existing pages; `<meta name="description">`, canonical, Open Graph title/description, `lang="en"`.

## Where to target the queries (visibility, not just existence)

* `sitemap.xml`: add the six pages with today's date and priority 0.6 (same as recipes/advancements).
* `llms.txt`: add a "Long-tail guides" section listing each page URL with a one-line description of the questions it answers.
* `wiki.html`: add a "More guides" nav/link row (or extend Resources nav) pointing to the six hubs; add cross-links from the relevant sections so the hubs get crawlable internal links.
* `recipes.html` and `advancements.html`: small "Guides" link back to `progression-and-items.html` for context.
* Existing FAQ blocks in `wiki.html` stay as-is (they already target the head terms); the hubs extend them with the specific, question-shaped variants.

## Out of scope (for now)

* One page per recipe/advancement/item — explicitly rejected by the source article as thin, near-duplicate content.
* Keyword tools / volume data — this is a small community server; clusters are derived from the wiki's real Q&A content rather than paid keyword databases. If you have Semrush/GSC data, feed it in and I can re-prioritize.
* Non-English long-tail pages (the site has a `fr/` tree and translated code-of-conduct): can be a phase 2 if requested.

## Verification plan (before I report done)

1. Generate all six HTML files from a single Python generator script committed under `scripts/` (so Q&A text and JSON-LD can't drift).
2. Validate: every generated page parses; JSON-LD blocks are valid JSON and their Q&A count matches the visible `<h3>` count; no duplicate IDs; canonical URLs correct.
3. Serve locally and check each page returns 200 with expected title, and that nav links resolve.
4. Check sitemap.xml is valid XML and lists exactly the new pages; llms.txt includes them.
5. `git diff --stat` review, no unintended changes.

## Fact-check gate before implementation

`wiki.html` currently contradicts itself on one point that the chat hub would publish:

* FAQ section: "Chat only reaches players within 100 blocks. Start your message with ! to talk to everyone."
* Chat section and `llms.txt`: "Chat is global: there is no ranged chat and no need to shout with !"

The chat section and `llms.txt` agreed with each other, so the FAQ was stale. The new pages use the global-chat version, and the old FAQ line in `wiki.html` was corrected at the same time so searchers and AI systems don't get two conflicting answers from the same domain.

## Non-branded discovery layer (second pass)

The first 121 questions all contained "Gilly SMP", so they only matched searches from people who already knew the name. The second pass adds `guides/matcha-server.html` and `guides/what-is-matcha.html`, plus one or two non-branded questions in five existing hubs. Target vocabulary comes from live web research on the Matcha datapack: "Matcha Flavoured" (creator's spelling), "Matcha Flavored" (US spelling), "Matcha datapack server", "plug and play", "no hunger / no natural regeneration", and the EU crossplay gap. The "only EU server with Bedrock crossplay" line is the operator's positioning, not an independently verified fact; keep it attributed to Gilly SMP rather than stated as a neutral industry fact.

## Verification results (ran after implementation)

1. Content validation: 13 hubs, 153 Q&As, zero link/schema/stale-fact issues.
2. `scripts/generate_longtail.py` generated 13 hubs + `/guides/` index.
3. JSON-LD: every page has one valid block; `FAQPage.mainEntity` count equals visible `<h3>` count (153 total); no duplicate ids.
4. `sitemap.xml`: valid XML, 14 guide URLs (13 hubs + index).
5. `llms.txt`: 14 guide links in a "Long-tail guides" section.
6. wiki.html stale chat FAQ corrected to global chat; new Guides link added in the CTA area.
7. Local HTTP server: all 22 page/asset paths returned 200.
8. Real headless browser: index rendered 13 cards; clicking the first card navigated to `/guides/join.html` with 13 visible Q&As = 13 JSON-LD entries; both new non-branded hubs rendered 13 visible Q&As = 13 JSON-LD entries with 12 non-branded questions each; all CSS/font/icon assets loaded 200.

## Old open questions (resolved)

1. Six hubs → split into 11 (approved).
2. Link placement → wiki.html CTA link + sitemap + llms.txt + site-wide nav/footer on every generated page.
3. Seed queries → derived from the wiki's real Q&A content.
4. Chat FAQ → corrected to global chat (no ranged chat, no `!`).
