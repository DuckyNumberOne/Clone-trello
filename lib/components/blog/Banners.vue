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
import { getBlog } from '~/api/posts.api';

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

const { data } = await useAsyncData<Post[]>(
 'banner',
  async () => getBlog()
);

</script>

<style scoped>
</style>
