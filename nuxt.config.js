export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-typescript-login',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './plugins/vue-carousel.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://portfolio-maxime-back.maxime-eloir.fr',
  },

  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: 'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/jwt-auth/v1/token', method: 'post', propertyName: 'token' },
  //         user: { url: 'https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/users/me', method: 'get', propertyName: false },
  //         logout: false
  //       }
  //     }
  //   }
  // },
  auth: {
    strategies: {
      local: {
        scheme: "local",
        token: {
          property: "token",
          global: true,
          // Or you can specify the name of the token that you set in the server side
          // name: "Authorization",
          // type: "Bearer"
        },
        user: {
          property: "",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "https://portfolio-maxime-back.maxime-eloir.fr/wp-json/jwt-auth/v1/token",
            method: "post",
          },
          logout: {
            // url: "/api/auth/logout",
            // method: "post",
          },
          user: {
            url: "https://portfolio-maxime-back.maxime-eloir.fr/wp-json/wp/v2/users/me",
            method: "get",
          },
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/",
      home: "/",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
