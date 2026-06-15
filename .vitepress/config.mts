import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";

export default withPwa(
  defineConfig({
    lang: "en-US",
    base: "/",
    title: "Gilly-SMP Wiki",
    description: "The Official wiki of Gilly-SMP",
    head: [
      ["meta", { name: "robots", content: "index, follow" }],
      ["meta", { name: "keywords", content: "Gilly-SMP, Minecraft, wiki, guilds, features, rules, join guide, economy, claims, team" }],
      ["meta", { property: "og:title", content: "Gilly-SMP Wiki" }],
      ["meta", { property: "og:description", content: "The official Gilly-SMP wiki for server features, guilds, rules, and how to join." }],
      ["meta", { property: "og:url", content: "https://craft.gillyb.net" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["link", { rel: "icon", href: "/favicon.png" }],
      [
        "script",
        {
          defer: "",
          src: "https://u.crbo.dev/script.js",
          "data-website-id": "2aae1459-9c84-422e-a850-317547da79fc",
        },
      ],

    ],
    themeConfig: {
      search: {
        provider: 'local'
      },
      nav: [
        { text: "Home", link: "/" },
        { text: "How to Join", link: "/how-to-join" },
        { text: "Rules", link: "/rules" },
        { text: "Features", link: "/features/" },
        { text: "Guilds", link: "/guilds/" },
      ],

      sidebar: [
        {
          text: "Getting Started",
          items: [
            { text: "How to Join", link: "/how-to-join" },
            { text: "Rules", link: "/rules" },
          ],
        },
        {
          text: "Features",
          items: [
            { text: "Features Overview", link: "/features/" },
            { text: "Economy & Market", link: "/features/economy" },
            { text: "Claims & Teams", link: "/features/claims-and-teams" },
            { text: "Skills & Enchants", link: "/features/skills" },
            { text: "Lifesteal", link: "/features/lifesteal" },
            { text: "Villager Management", link: "/features/villagers" },
            { text: "Teleportation", link: "/features/teleportation" },
            { text: "The Nether", link: "/features/nether" },
            { text: "The End", link: "/features/end" },
            { text: "Custom Spawners", link: "/features/spawners" },
            { text: "Expand the World", link: "/features/expand-the-world" },
            { text: "Ranks", link: "/features/ranks" },
            { text: "Server Tweaks", link: "/features/the-tweaks" },
            { text: "Harder Mobs", link: "/features/harder-mobs" },
          ],
        },
        {
          text: "Guilds",
          items: [
            { text: "Guilds Overview", link: "/guilds/" },
            { text: "Ashwalkers", link: "/guilds/ashwalker" },
            { text: "Driftwood", link: "/guilds/driftwood" },
            { text: "Everlook", link: "/guilds/everlook" },
          ],
        },
      ],

      socialLinks: [
        { icon: "github", link: "https://github.com/foxof7207/foxof7207.github.io" },
      ],
    },
    pwa: {
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "logo.png"],
      manifest: {
        name: "Gilly-SMP Wiki",
        short_name: "Gilly Wiki",
        description: "The Official wiki of Gilly-SMP",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/u\.crbo\.dev\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "analytics-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|woff2)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    },
  }),
);
