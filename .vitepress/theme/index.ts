import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import JoinGuide from './components/JoinGuide.vue'
import GuildList from './components/GuildList.vue'
import LaunchTimerBanner from './components/LaunchTimerBanner.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('JoinGuide', JoinGuide)
        app.component('GuildList', GuildList)
        app.component('LaunchTimerBanner', LaunchTimerBanner)
    }
} as Theme
