<template>
  <div v-if="data">
    <p>{{ data.title }}</p>
    <p>{{ data.thumbnail }}</p>
    <p>{{ data.summary }}</p>
    <p>{{ data.section }}</p>
    <!-- Convert markdown to HTML and render it -->
    <div v-html="convertedMarkdown"></div>
    <p>{{ data.image }}</p>
    <p>{{ data.date }}</p>
    <p>{{ data.category }}</p>
    <button @click="handleUpdateBlog" class="updateBlog">Update</button>
    <button @click="handleDeleteBlog" class="deleteBlog">Delete</button>
  </div>
  <div v-else-if="error">
    <p>Error: {{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { marked } from 'marked';
import { deleteBlogById, getBlogById } from '~/api/posts.api';

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  category: string;
  thumbnail: string;
  section: string;
  markdown: string;
}

const {params} = useRoute();
const router = useRouter()
const error = ref<string | null>(null);

const handleUpdateBlog =() =>{
  router.push({ path: `/admin/edit/${params.id}` });
}

const handleDeleteBlog = async() =>{
  const response = await deleteBlogById(String(params.id))
    if (!response) {
      alert('Network response was not ok');
    }else{
      alert('Delete success !');
      router.push({ path: `/blog` });
    }
}

const { data } = await useAsyncData<Post>(
  'popular-topics',
  async () => getBlogById(String(params.id))
);


const convertedMarkdown = computed(() => {
  return data.value ? marked(data.value.markdown || '') : '';
});
</script>

<style scoped></style>
