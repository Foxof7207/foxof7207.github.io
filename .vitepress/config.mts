import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  title: "Gilly-SMP Wiki",
  description: "THe Official wiki of Gilly-SMP",
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
