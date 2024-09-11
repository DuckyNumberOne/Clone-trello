<template>
    <div v-if="pending">Đang tải...</div>
    <div v-else-if="error">Có lỗi xảy ra: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const { data, pending, error } = await useFetch('https://api.example.com/posts')
  
  const posts = data.value
  </script>