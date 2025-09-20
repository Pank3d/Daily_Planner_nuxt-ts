// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module'
  ],
  vuetify: {
    moduleOptions: {
      theme: {
        defaultTheme: 'light'
      }
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi'
      }
    }
  },
  css: ['@mdi/font/css/materialdesignicons.min.css']
})
