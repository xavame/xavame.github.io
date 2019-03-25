const builtAt = new Date().toISOString()
const path = require('path')
import blogs from './contents/blogs.js'
import lectures from './contents/lectures.js'
import markdownThat from './plugins/markdown-that'

const baseUrl = 'https://xava.me';

module.exports = {
  env: {
    baseUrl
  },
  head: {
    title: 'XNB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { name: 'theme-color', content: '#f86e8f' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt }
    ],
    link: [
      { rel:'preload', as:'font', href: '/fonts/FiraCode-Bold.ttf', type:'font/truetype', crossorigin:'anonymous'},
      { rel:'preload', as:'font', href: '/fonts/FiraCode-Light.ttf', type:'font/truetype', crossorigin:'anonymous'},
      { rel:'preload', as:'font', href: '/fonts/FiraCode-Medium.ttf', type:'font/truetype', crossorigin:'anonymous'},
      { rel:'preload', as:'font', href: '/fonts/FiraCode-Regular.ttf', type:'font/truetype', crossorigin:'anonymous'},
      { rel:'preload', as:'font', href: '/fonts/FiraCode-Retina.ttf', type:'font/truetype', crossorigin:'anonymous'},
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-256x256.png', sizes: '256x256' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'mask-icon', type: 'image/png', href: '/favicons/safari-pinned-tab.svg', color: '#c1c1c1' },
      { rel: 'manifest', href: '/manifest.json' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#f86e8f',
    height: '3px'
  },

  /*
  ** Build configuration
  */
  css: [
    '@/assets/styles.scss'
  ],

  buildDir: 'docs',

  build: {
    analyze: true,
    analyze: {
      analyzerMode: 'static'
    },
    extend (config) {
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/');
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          markdown: markdownThat.md,
          vue: {
            root: "markdown"
          }
        }
      }, {
        test: /\.(gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      });
    }
  },

  plugins: ['~/plugins/lazyload', '~/plugins/globalComponents', { src: '~plugins/ga.js', ssr: false }],

  modules: [
    ['nuxt-sass-resources-loader', [
        '@/assets/css/utilities/_variables.scss',
        '@/assets/css/utilities/_helpers.scss',
        '@/assets/css/base/_grid.scss',
        '@/assets/css/base/_buttons.scss'
    ]]
  ],

  generate: {
    routes: []
    .concat(blogs.map(w => `/blog/${w}`))
  }
}
