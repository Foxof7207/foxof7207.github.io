// .vitepress/theme/index.ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AnnouncementPopup from './components/AnnouncementPopup.vue'
import JoinGuide from './components/JoinGuide.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () => h(AnnouncementPopup)
        })
    },
    enhanceApp({ app }) {
        app.component('JoinGuide', JoinGuide)
    }
} as Theme
