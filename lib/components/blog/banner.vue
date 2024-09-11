<template>
  <section class="banner" v-if="data && data.length > 0">
    <div>
      <div class="contentBanner">
        <div>
          <div>
            <div class="cardCategoryBanner"><span>{{ data[0]?.category }}</span></div>
            <h2 class="titleBanner">{{ data[0]?.title }}</h2>
            <div class="thumbnailBanner">
              <p class="thumbnailDate">{{ data[0]?.date }}</p>
              <p class="thumbnailSummary">{{ data[0]?.summary }}</p>
              <p class="thumbnailSummary">{{ console.log("data[0]?.thumbnail",data[0]?.thumbnail)
               }}</p>

            </div>
          </div>
        </div>
      </div>
      <img class="bannerImage" :src="`/images/blog/thumbnails/${data[0]?.thumbnail}`" alt="Banner Image">
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAsyncData } from '#app';

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  category: string;
  thumbnail: string;
}

const error = ref<string | null>(null);

const { data, error: fetchError, status } = await useAsyncData<Post[]>(
  'banner',
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

      const result: Post[] = await response.json();
      return result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Error fetching data:', error.value);
      throw err; 
    }
  }
);

</script>

<style scoped>
</style>
