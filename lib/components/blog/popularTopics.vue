<template>
  <section class="popular-topics">
    <p class="popular-topics_header">Popular topics</p>
    <div  class="popular-topics-content">
      <div  v-for="(items, index) in data" :key="index">
        <div class="box-content" @click="navigateToPage(items.id)">
          <!-- <img class="popular-topics__image" :src="`/images/blog/images/${items.image}`" alt="{{ items.title }}"> -->
          <img class="popular-topics__image" :src="isValidUrl(items.image) ? items.image : `/images/blog/images/${items.image}`" :alt="items.title"/>
          <p>{{ items.date }}</p>
          <p class="popular-topics__title">{{ items.title }}</p>
          <span class="popular-topics__description">{{ items.summary }}</span>
          </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

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

const router = useRouter()
const data = ref<FormData[]>([]);
const error = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const fetchData = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('https://66de629ede4426916ee0fc32.mockapi.io/post',{
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

const navigateToPage = (pageId: string) => {
  router.push({ path: `/blog/${pageId}` });
};

const isValidUrl = (url: string) => {
  const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/;
  return urlRegex.test(url);
};

</script>

<style scoped>
</style>