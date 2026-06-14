---
title: LevelledMobs Guide
description: Player guide for understanding how mob levels work on the SMP.
---

# Harder Mobs Guide

LevelledMobs makes hostile mobs scale in difficulty instead of every zombie, skeleton, creeper, or spider feeling the same everywhere. Mobs can spawn with a visible level, and higher-level mobs are usually more dangerous than lower-level ones.

This page explains the system from a player perspective. It does **not** list admin configuration values, because those may be adjusted during the season for balance.

## What changes?

When a mob is levelled, the server may change some of its combat stats, such as:

- health
- damage
- movement speed
- follow range
- knockback resistance
- equipment strength
- drops or rewards, depending on server configuration

A Level 1 mob is close to the baseline experience. A higher-level mob should be treated as a stronger version of that same mob, not as a completely different creature.

::: tip Quick rule
If the level number is higher than what you usually fight, assume the mob can hit harder, survive longer, or punish mistakes faster.
:::

## How mob levels are decided

The plugin can combine several levelling strategies. That means a mob level may come from more than one factor at once.

On this SMP, expect mob level to be influenced by the type of area you are exploring and the danger level of that area.

### Distance from spawn

Mobs may become stronger the farther you travel from spawn. Areas near spawn are generally safer. Remote areas are more dangerous and are intended for better-geared players.

This creates a natural progression curve:

| Area | Expected danger |
| --- | --- |
| Near spawn | Low |
| Normal wilderness | Medium |
| Far wilderness | High |
| Very remote areas | Very high |

### Depth and caves

Mob levels may also be affected by Y-level. In practice, this usually means deep caves, ancient cities, and underground expeditions can be more dangerous than the surface.

::: warning Caving risk
Do not assume a cave is safe just because it is close to home. Depth can matter as much as distance.
:::

### Random variation

Some mobs may spawn slightly stronger or weaker than expected. This keeps combat from being completely predictable.

For example, two skeletons in the same area may not always have the same level.

### Player-based scaling

The plugin supports player-sensitive levelling, where mobs can be adjusted based on nearby players or player-related values. If this is enabled, the challenge may scale differently depending on who is near the mob.

For players, the important part is simple: if a heavily geared player is nearby, the surrounding mobs may not feel tuned for a fresh player.

## Reading mob nametags

Levelled mobs shows a nametag with their level.

```
[Lv. 12] Zombie
```

Use the level as a threat indicator. It is not just cosmetic.

## Combat advice

### Early game

Stay near spawn or established roads until you have basic iron gear, food, a shield, and a bow. Avoid deep caves unless you are prepared to retreat.

### Mid game

Once you have enchanted iron or early diamond gear, you can start exploring farther out. Bring blocks, water, food, spare tools, and a way home.

### Late game

High-level mobs are intended to stay relevant even after players have strong equipment. Netherite gear helps, but it does not make you immune to bad positioning, creeper blasts, skeleton crossfire, or swarms.

## Group fights

Travelling in groups is safer, but it can also make fights more chaotic. A high-level creeper, skeleton, or baby zombie can still punish a careless group.

Recommended group habits:

- call out high-level mobs before engaging
- avoid dragging dangerous mobs into another player’s build
- light up shared paths and tunnels
- retreat instead of forcing a bad fight

## Drops and rewards

Higher-level mobs may have better drops if the server enables custom drops or reward scaling. Do not assume every high-level mob guarantees rare loot. Some rewards may be chance-based, biome-based, mob-based, or disabled for balance.

::: info
If drop rates feel too generous or too punishing, report it. Mob balance may be adjusted during the season.
:::

## What LevelledMobs does not mean

A mob being stronger does **not** mean every mob is worth fighting. Some mobs are meant to be avoided until you have better gear.

It also does not mean the server is no longer vanilla-style. The system is designed to add progression and danger while keeping normal Minecraft combat recognizable.

## Practical survival checklist

Before exploring far from spawn or deep underground, bring:

- shield
- bow or crossbow
- enough food
- torches or other light sources
- water bucket
- blocks for escape routes
- spare pickaxe
- bed or safe return method
- armor appropriate for the area