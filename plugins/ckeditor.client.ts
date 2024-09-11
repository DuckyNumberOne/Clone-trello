import { defineNuxtPlugin } from '#app'
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'
import {ClassicEditor } from 'ckeditor5';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CkeditorPlugin);
  return {
    provide: {
      ckeditor: {
        classicEditor: ClassicEditor,
      },
    },
  };
});
