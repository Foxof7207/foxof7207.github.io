import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LaunchTimerBanner from './components/LaunchTimerBanner.vue'
import JoinGuide from './components/JoinGuide.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('LaunchTimerBanner', LaunchTimerBanner)
        app.component('JoinGuide', JoinGuide)
    }
} as Theme
