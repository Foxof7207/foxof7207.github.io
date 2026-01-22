import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  base: '/',
  title: "Gilly-SMP Wiki",
  description: "The Official wiki of Gilly-SMP",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['script', { defer: '', src: 'https://u.crbo.dev/script.js', 'data-website-id': '2aae1459-9c84-422e-a850-317547da79fc' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Rules', link: '/rules' },
      { text: 'Features', link: '/features' },
      { text: 'How to Join', link: '/how-to-join' }
    ],

    sidebar: [
      {
        text: 'Information',
        items: [
          { text: 'Rules', link: '/rules' },
          { text: 'Features', link: '/features' },
          { text: 'How to Join', link: '/how-to-join' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  pwa: {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.png', 'logo.png'],
    manifest: {
      name: 'Gilly-SMP Wiki',
      short_name: 'Gilly Wiki',
      description: 'The Official wiki of Gilly-SMP',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'maskable-icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}']
    }
  }
}))
