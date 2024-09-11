<template>
  <section class="popular-topics">
    <p class="popular-topics_header">Popular topics</p>
    <div class="popular-topics-content">
      <div v-for="item in data" :key="item.id">
        <div class="box-content" @click="navigateToPage(item.id)">
          <img class="popular-topics__image" :src="isValidUrl(item.image) ? item.image : `/images/blog/images/${item.image}`" :alt="item.title" />
          <p>{{ item.date }}</p>
          <p class="popular-topics__title">{{ item.title }}</p>
          <span class="popular-topics__description">{{ item.summary }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncData } from '#app';

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
}

const router = useRouter();
const error = ref<string | null>(null);

const { data, status, refresh } = await useAsyncData<Post[]>(
  'popular-topics',
  async () => {
    try {
      const response = await fetch('https://66de629ede4426916ee0fc32.mockapi.io/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      return response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error fetching data:', error.value);
      throw err; 
    }
  }
);

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
