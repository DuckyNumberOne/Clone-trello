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
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { marked } from 'marked';

interface FormData {
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
const data = ref<FormData | null>(null);
const error = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const handleUpdateBlog =() =>{
  router.push({ path: `/admin/edit/${params.id}` });
}

const handleDeleteBlog = async() =>{
  const response = await fetch(`https://66de629ede4426916ee0fc32.mockapi.io/post/${params.id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      alert('Network response was not ok');
    }else{
      alert('Delete success !');
      router.push({ path: `/blog` });
    }
}

const fetchData = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`https://66de629ede4426916ee0fc32.mockapi.io/post/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data.value = await response.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error('Error fetching data:', error.value);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const convertedMarkdown = computed(() => {
  return data.value ? marked(data.value.markdown) : '';
});
</script>

<style scoped></style>
