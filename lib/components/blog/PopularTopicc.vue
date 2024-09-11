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
import { getBlog } from '~/api/posts.api';

interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
}

const router = useRouter();

const { data } = await useAsyncData<Post[]>(
  'popular-topics',
  async () => getBlog()
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
