# 🚀 Server Features & Commands

Welcome! Here you will find all the commands and features available on the server to enhance your gameplay experience.

---

::: details ⚙️ Player Options
Personalize your gameplay setup.

| Command | Description |
| :--- | :--- |
| `/pvp` | Toggle your PvP status ON or OFF. |
| `/discord link` | Link your Minecraft account with our Discord server. |
:::

::: details 🏰 Claim Management
Protect your land and collaborate with others using the claim system.

| Command | Description |
| :--- | :--- |
| `/claim [radius]` | Claim a territory (chunk) around you. |
| `/claim main` | Open the main claim management GUI. |
| `/claim settings` | Open the settings for your claim. |
| `/claim members` | Manage members of your claim. |
| `/claim chunks` | Manage individual chunks within your claim. |
| `/claim add <player>` | Add a player to your claim (use `*` for all claims). |
| `/claim remove <player>` | Remove a player from your claim (use `*` for all claims). |
| `/claim ban <player>` | Ban a player from your claim. |
| `/claim unban <player>` | Unban a player from your claim. |
| `/claim bans` | View all banned players in your claim. |
| `/claim kick <player>` | Physically eject a player from your claim. |
| `/claim owner <player>` | Transfer ownership of your claim. |
| `/claim tp` | Teleport to one of your territories. |
| `/claim see` | Visualize the chunk borders with particles. |
| `/claim map` | View a map of nearby claims in chat. |
| `/claim automap` | Toggle automatic map display when changing chunks. |
| `/claim autoclaim` | Toggle automatic claiming while walking. |
| `/claim autounclaim` | Toggle automatic unclaiming while walking. |
| `/claim fly` | Enable or disable flight within your claim. |
| `/claim autofly` | Automatically enable flight when entering your claim. |
| `/claim list` | List all your current claims. |
| `/claim chat` | Toggle between public and claim-specific chat. |
| `/claim setspawn` | Set the teleportation point for your claim. |
| `/claim setname` | Rename your claim. |
| `/claim setdesc` | Change the description of your claim. |
| `/claim merge` | Merge two adjacent claims into one. |
| `/claim addchunk` | Add the current chunk to an existing claim. |
| `/claim delchunk` | Remove a chunk using format `world;x;z`. |
| `/claim autoaddchunk` | Automatically add chunks to a specified claim. |
| `/claim autodelchunk` | Automatically remove chunks from a specified claim. |
| `/claims` | View all claims across the server. |
| `/unclaim [*]` | Delete a claim (use `*` for all your claims). |
:::

::: details 🧑‍🌾 Villagers Management
Efficiently manage your villagers with these specialized actions.

| Action | How to Use | Description |
| :--- | :--- | :--- |
| **Pickup** | `Shift + Right Click` | Pick up a villager into your inventory. |
| **Place** | `Right Click` | Place the villager head to release them (works in boats/minecarts). |
| **Anchor** | `Shift + Right Click` with **Shears** | Prevent the villager from moving. |
| **Claim** | `Shift + Right Click` with **Shovel** | Protect the villager from taking damage. |
| **Menu** | `Shift + Right Click` | Open management menu (biome, trading, partners) on a claimed villager. |
| **Hoppers** | `Crafting` | Use `1 Hopper` + `1 Emerald` to create an auto-pickup hopper. |
| **Trades** | `Description/Menu` | View trades in the villager's description or reset in the trading menu. |
:::

::: details 💰 Economy
Trade items and manage your wealth.

> [!WARNING]
>The market system adjusts item prices based on supply and demand.


| Command | Description |
| :--- | :--- |
| `/ehelp` | Display economy help documentation. |
| `/readmail` | Check your economy-related notifications. |
| `/clearmail <all/unread/read>` | Delete your economy mail. |
| `/balance [player]` | Check your or another player's balance. |
| `/pay <player> <amount>` | Send cash to another player. |
| `/baltop` | See the wealthiest players on the server. |
| `/search <item>` | Look up items in the market. |
| `/buy <item> <amount>` | Purchase items from the market. |
| `/sell <item> <amount>` | Sell items to the market. |
| `/sellall [items]` | Sell all matching items in your inventory. |
| `/handbuy <amount>` | Buy more of the item you are currently holding. |
| `/handsell <amount>` | Sell the item you are currently holding. |
| `/value <item> <amount>` | Check the current market value of an item. |
| `/information <item>` | Get detailed market data for an item. |
| `/handinformation` | Get market data for the item in your hand. |
| `/handvalue <amount>` | Get the value of the items in your hand. |
| `/ping` | A simple connection test (returns "Pong!"). |
:::

::: details 🎟️ Lottery
Test your luck and win big in the server lottery!

#### 🎮 Player Commands
| Command | Description |
| :--- | :--- |
| `/lottery buy <amount>` | Buy lottery tickets |
| `/lottery leaderboard` | View the leaderboard |
| `/lottery claim` | Claim unclaimed rewards |
| `/lottery status` | Check pot, next draw, and your tickets |
| `/lottery help` | Provide the list of commands players can use |


:::

::: details ✨ Enchants
Discover unique custom enchantments created in collaboration between Gilly-SMP and plugin developers!

| Enchant | Effect |
| :--- | :--- |
| **Timber** | Mine a tree instantly with a single hit. |
| **Swift Edge** | Increases your movement speed after dealing damage. |
| **Frostbite** | Slows enemies and grants you resistance when you hit them. |
| **Lifesteal** | Heals you for a portion of the damage you deal to enemies. |
| **Bloodlust** | Heals you and gives strength when you defeat enemies. |
| **Beheader** | Drop the heads of players you defeat in PvP. |

:::

::: details 🌀 Teleportation
Getting around the world quickly.

| Command | Description |
| :--- | :--- |
| `/tpa <player>` | Send a teleport request to another player. |
| `/back` | Teleport back to your previous location. |
| `/suicide` | Instantly kill your character (use as a last resort). |
:::

::: details 🛗 Elevators
Fast vertical travel using matching blocks.

#### 🏗️ Setup
1. Place an **iron block** on the ground.
2. Place another elevator block directly above it at the desired floor.

#### 📜 Rules
- Blocks must be in line vertically.
- Maximum distance between floors is **48 blocks**.
- No limit to the number of floors in a single stack.

#### 🎮 Usage
- **Go Up:** Stand on the block and **Jump**.
- **Go Down:** Stand on the block and **Crouch**.
:::

::: details 🛸 Teleporters
Link two distant points for instant travel.

#### 🏗️ Setup
1. Place a **iron block** on the ground.
2. Stand on it and use `/teleporter add` (take note of the ID).
3. Repeat at the destination.
4. Link them: `/teleporter link [id1] [id2]`.

#### 🛠️ Management
| Command | Description |
| :--- | :--- |
| `/teleporter list` | View all registered teleporters, coordinates, and links. |
| `/teleporter remove [id]` | Delete a teleporter. |
| `/teleporter unlink [id]` | Remove the connection between two teleporters. |

#### 🎮 Usage
- Stand on the teleporter block and **Crouch**.
:::

::: details 📦 Spawners
Manage and stack your mob spawners.

- **Stack One:** Right-click with a spawner in hand to add it to an existing stack.
- **Stack All:** `Shift + Right Click` to add all spawners in your inventory to the stack.
:::

::: details ⚔️ EliteMobs
Brave the challenges and earn unique rewards!

> [!TIP]
> Visit the **Guild** and speak with the villagers to start your first quest. They will provide beginner equipment to help you survive. Quests are designed for **solo play**.

| Command | Description |
| :--- | :--- |
| `/em` | Main EliteMobs menu. |
| `/ag` | Adventurer's Guild menu. |
| `/em rank` | View and advance your rank. |
| `/em shop` | Access procedural, custom, and sell shops. |
| `/em repair` | Repair your Elite items. |
| `/em enchant` | Access the custom enchantment menu. |
| `/em scrap` | Scrap unwanted items for materials. |
| `/em unbind` | Unbind soulbound items. |
| `/em money check` | Check your Elite Coins balance. |
| `/em pay <player> <amount>` | Send Elite Coins to another player. |
| `/em spawntp` | Teleport to the EliteMobs spawn. |
| `/em shareItem` | Show the item in your hand to the server chat. |
| `/em quest check` | Manage your active quests. |
| `/em loot` | Collect your pending loot. |
| `/em scroll` | Manage your magical scrolls. |
:::

::: details 🔥 Nether
Survive the harsh environments and unique phenomena of the Nether.

#### 🫀 Environmental Hazards
- **Melting Boots**: Standing on blocks like **Netherrack**, **Crimson Nylium**, or **Nether Bricks** will slowly damage your boots. If they break, you'll take direct damage!
- **Basalt Deltas Hazards**: Entering the **Basalt Deltas** biome without a **Carved Pumpkin** on your head will cause blindness and slowness due to the ash-filled air.
- **Soul Sand Effect**: Walking on **Soul Sand** or **Soul Soil** applies the **Wither** effect, making these blocks even more dangerous.
- **Warped Nylium Levitation**: Stepping on **Warped Nylium** gives you a **levitation** effect, adding a unique twist to exploration.
:::

::: details 🐉 The END
Fight the Ender Dragon with special mechanics and challenges!

#### 🎮 Dragon Fight Features
- **Cooperative Dragon Fight**: The Ender Dragon fight is a team activity! Each player can contribute up to 3 Eyes of Ender to open the End Portal. All contributors must be present in the portal room for it to activate.
- **Harder Dragon**: The Ender Dragon is significantly stronger with **1000 HP** (instead of 200) and gains increasing resistance levels as its HP decreases, making the fight progressively more challenging.
- **Dragon Egg Buffs**: Pick up the Dragon Egg in your inventory to gain powerful passive effects.

#### ⚡ What to Know
- Portal requires **all contributors** to be present or it will close.
- Each player can only place **3 Eyes of Ender** per portal.
- Once the Ender Dragon is defeated for the first time, End Portals revert to normal behavior.
- The Dragon Egg grants buffs while held; effects are lost if dropped or placed.

:::



