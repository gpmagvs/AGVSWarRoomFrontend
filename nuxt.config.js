
import path from 'path';
export default {
  alias: {
    '@': path.resolve(__dirname)
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AGV戰情室',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/leaflet/dist/leaflet.css' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '~/static/css/main.css',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/element-ui', ssr: false },
    '@/plugins/moment.js',
    '@/plugins/bootstrap-vue',
    '@/plugins/axios',
    '@/plugins/router.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  axios: {
    proxy: process.env.NODE_ENV === 'development' // Use proxy only in development mode
  },
  proxy: process.env.NODE_ENV === 'development' ? {
    '/api': {
      target: 'http://127.0.0.1:5254',
      // pathRewrite: {
      //   "^/": "",
      // },
      // secure: false,
      // changeOrigin: true,
    }
  } : {},
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-icon',
    '@nuxt/ui',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
  generate: {
    dir: './dist'  // 將 'my-custom-dir' 替換為你想要的輸出目錄名稱
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.forEach(route => {
        console.log(route.name)
        if (route.name === 'index') {
          route.meta = { alias: '總覽' }
        }
        else if (route.name === 'fields') {
          route.meta = { alias: '場域' }
        } else if (route.name === 'equipments') {
          route.meta = { alias: '設備狀態' }
        } else if (route.name === '/test') {
          route.meta = { alias: '測試頁面' }
        }
        // Add more routes as needed
      })
    }
  }
}
