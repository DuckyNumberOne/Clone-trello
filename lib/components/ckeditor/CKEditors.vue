<template>
  <div id="app">
  <ckeditor
   v-model="data"
  :editor="editor"
  :config="editorConfig"
  />
  </div>
</template>

<script setup lang="ts">
// import { SlashCommand } from 'ckeditor5-premium-features';
// Initialize CKEditor
import { ref, watch,defineProps ,onMounted, defineEmits} from 'vue';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Markdown } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
const editor = ClassicEditor;

const props = defineProps({
  item: {
    type:String,
    default:  ''
  }
});

const data = ref(props.item)
const emit = defineEmits(["update-mark"])

// onMounted(()=>{
//   if(props.item ){
//     data.value = props.item
//   }
// })

const editorData = ref('<p>Hello from CKEditor 5 in Vue!</p>');
const editorConfig = ref({
  plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo, Markdown],
  toolbar: [
  'undo', 'redo', '|',
  'bold', 'italic', 'link', 'blockQuote', 'numberedList', 'bulletedList', 'insertTable', 'mediaEmbed',
  '|', 'heading', 'imageUpload', 'codeBlock', 'code', 'highlight', 'removeFormat'
  ],
  // licenseKey: '<YOUR_LICENSE_KEY>',
  // Other configuration options...
});

watch(data, (newData) => {
  emit("update-mark",newData )
});
</script>
<style scoped>

</style>