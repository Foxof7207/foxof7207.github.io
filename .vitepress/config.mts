import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";

export default withPwa(
  defineConfig({
    base: "/",
    sitemap: {
      hostname: "https://craft.gillyb.net",
    },
    head: [
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
    locales: {
      root: {
        label: "English",
        lang: "en-US",
        title: "Gilly-SMP Wiki",
        description: "The Official wiki of Gilly-SMP",
        themeConfig: {
          nav: [
            { text: "Home", link: "/" },
            { text: "Rules", link: "/rules" },
            { text: "Features", link: "/features/" },
            { text: "How to Join", link: "/how-to-join" },
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
                { text: "Lifesteal", link: "/features/lifesteal" },
                { text: "Teleportation", link: "/features/teleportation" },
              ],
            },
          ],
        },
      },
      fr: {
        label: "Français",
        lang: "fr-FR",
        title: "Wiki Gilly-SMP",
        description: "Le wiki officiel de Gilly-SMP",
        themeConfig: {
          nav: [
            { text: "Accueil", link: "/fr/" },
            { text: "Règles", link: "/fr/rules" },
            { text: "Fonctionnalités", link: "/fr/features/" },
            { text: "Comment rejoindre", link: "/fr/how-to-join" },
          ],
          sidebar: [
            {
              text: "Pour commencer",
              items: [
                { text: "Comment rejoindre", link: "/fr/how-to-join" },
                { text: "Règles", link: "/fr/rules" },
              ],
            },
            {
              text: "Fonctionnalités",
              items: [
                { text: "Lifesteal", link: "/fr/features/lifesteal" },
                { text: "Téléportation", link: "/fr/features/teleportation" },
              ],
            },
          ],
        },
      },
    },
    themeConfig: {
      search: {
        provider: "local",
        options: {
          locales: {
            fr: {
              translations: {
                button: {
                  buttonText: "Rechercher",
                  buttonAriaLabel: "Rechercher",
                },
                modal: {
                  displayDetails: "Afficher les détails",
                  noResultsText: "Aucun résultat trouvé",
                  resetButtonTitle: "Réinitialiser la recherche",
                  footer: {
                    selectText: "pour sélectionner",
                    navigateText: "pour naviguer",
                    closeText: "pour fermer",
                  },
                },
              },
            },
          },
        },
      },
      socialLinks: [
        { icon: "github", link: "https://github.com/foxof7207/foxof7207.github.io" },
      ],
    },
    pwa: {
      injectRegister: "script-defer",
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
