// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "vuetify-nuxt-module"],
  vuetify: {
    moduleOptions: {
      theme: {
        defaultTheme: "light",
      },
      styles: false,
    },
    vuetifyOptions: {
      icons: {
        defaultSet: "mdi",
      },
    },
  },
  vite: {
    server: {
      fs: {
        allow: ["..", ".", "C:\\Users\\max20"],
      },
    },
  },
  css: ["@mdi/font/css/materialdesignicons.min.css"],
});
