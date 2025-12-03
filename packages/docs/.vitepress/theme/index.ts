import DefaultTheme from 'vitepress/theme'
import InteractivePlayground from '../../components/InteractivePlayground.vue'
import './custom.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('InteractivePlayground', InteractivePlayground)
    }
}
