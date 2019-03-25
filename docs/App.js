import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\assets\\styles.scss'

import _6f6c098b from './layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"XNB","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"},{"name":"theme-color","content":"#f86e8f"},{"name":"robots","content":"index, follow"},{"property":"og:type","content":"profile"},{"property":"og:updated_time","content":"2019-03-25T22:50:11.434Z"}],"link":[{"rel":"preload","as":"font","href":"\u002Ffonts\u002FFiraCode-Bold.ttf","type":"font\u002Ftruetype","crossorigin":"anonymous"},{"rel":"preload","as":"font","href":"\u002Ffonts\u002FFiraCode-Light.ttf","type":"font\u002Ftruetype","crossorigin":"anonymous"},{"rel":"preload","as":"font","href":"\u002Ffonts\u002FFiraCode-Medium.ttf","type":"font\u002Ftruetype","crossorigin":"anonymous"},{"rel":"preload","as":"font","href":"\u002Ffonts\u002FFiraCode-Regular.ttf","type":"font\u002Ftruetype","crossorigin":"anonymous"},{"rel":"preload","as":"font","href":"\u002Ffonts\u002FFiraCode-Retina.ttf","type":"font\u002Ftruetype","crossorigin":"anonymous"},{"rel":"icon","type":"image\u002Fpng","href":"\u002Ffavicons\u002Ffavicon-16x16.png","sizes":"16x16"},{"rel":"icon","type":"image\u002Fpng","href":"\u002Ffavicons\u002Ffavicon-32x32.png","sizes":"32x32"},{"rel":"icon","type":"image\u002Fpng","href":"\u002Ffavicons\u002Fandroid-chrome-256x256.png","sizes":"256x256"},{"rel":"apple-touch-icon","href":"\u002Ffavicons\u002Fapple-touch-icon.png","sizes":"180x180"},{"rel":"mask-icon","type":"image\u002Fpng","href":"\u002Ffavicons\u002Fsafari-pinned-tab.svg","color":"#c1c1c1"},{"rel":"manifest","href":"\u002Fmanifest.json"}],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
