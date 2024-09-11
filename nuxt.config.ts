// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false ,
  generate: {
    routes: ['/', '/blog']
  },
  css: [
    './assets/styles/global.css',
  ],
  plugins: [
    { src: './plugins/ckeditor.client.ts', mode: 'client' }
  ],
  alias: {
    './lib/components': '@/components'
  }
})
