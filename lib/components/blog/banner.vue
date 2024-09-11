<template>
    <section class="banner">
      <div>
        <div class="contentBanner">
          <div>
            <div>
              <div class="cardCategoryBanner"><span>{{ fakeData[0].category }}</span> </div>
              <h2 class="titleBanner">{{ fakeData[0].title }}</h2>
              <div class="thumbnailBanner">
                <p class="thumbnailDate">{{ fakeData[0].date }}</p>
                <p class="thumbnailSummary">{{ fakeData[0].summary }}</p>
              </div>
            </div>
            </div>
        </div>
      <img class="bannerImage" :src="`/images/blog/thumbnails/${fakeData[0].thumbnail}`" alt="{{ fakeData[0].title }}">
    </div>
    </section>
  </template> 
  
  <script setup lang="ts">
  import {fakeData} from "../../config/fakeData"
  </script>
  
  <style scoped>
  
  </style>
  