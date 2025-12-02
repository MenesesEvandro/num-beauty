import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Num-Beauty",
    description: "Beautiful number formatting for modern web apps",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Core', link: '/core/formatting' },
            { text: 'Integrations', link: '/integrations/react' },
            { text: 'Cookbook', link: '/cookbook/' }
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Guide',
                    items: [
                        { text: 'Getting Started', link: '/guide/getting-started' },
                        { text: 'Installation', link: '/guide/installation' },
                        { text: 'Configuration', link: '/guide/configuration' }
                    ]
                }
            ],
            '/core/': [
                {
                    text: 'Core Features',
                    items: [
                        { text: 'Formatting', link: '/core/formatting' },
                        { text: 'Currencies', link: '/core/currencies' },
                        { text: 'Units & Abbreviation', link: '/core/units' },
                        { text: 'Locales', link: '/core/locales' },
                        { text: 'Advanced Math', link: '/core/advanced' }
                    ]
                }
            ],
            '/integrations/': [
                {
                    text: 'Integrations',
                    items: [
                        { text: 'React', link: '/integrations/react' },
                        { text: 'Vue', link: '/integrations/vue' },
                        { text: 'Svelte', link: '/integrations/svelte' }
                    ]
                },
                {
                    text: 'Tools',
                    items: [
                        { text: 'CLI', link: '/integrations/cli' },
                        { text: 'Playground', link: '/integrations/playground' }
                    ]
                }
            ],
            '/cookbook/': [
                {
                    text: 'Cookbook',
                    items: [
                        { text: 'Overview', link: '/cookbook/' },
                        { text: 'Crypto & High Precision', link: '/cookbook/crypto' },
                        { text: 'Currency Input', link: '/cookbook/currency-input' },
                        { text: 'Charts Integration', link: '/cookbook/charts' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/MenesesEvandro/num-beauty' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present Num-Beauty Contributors'
        },

        search: {
            provider: 'local'
        }
    }
})
