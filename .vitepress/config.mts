import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
  }
})
