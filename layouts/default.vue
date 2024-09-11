<template>
  <header class="default-header">
    <div>
      <li><NuxtLink class="logo" to="/blog">Blog</NuxtLink></li>
      <nav>
        <ul class="menu-default-header">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li><NuxtLink to="/admin/create">Create post</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <slot />
  </main>
  <footer>
  <div class="footer-container">
    <div class="footer-section">
      <h3>Contact the Publisher</h3>
      <p>mike@rumo.com</p>
      <p>+944 450 904 505</p>
    </div>
    <div class="footer-section">
      <h3>Explore</h3>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Partners</a></li>
        <li><a href="#">Job Opportunities</a></li>
        <li><a href="#">Advertise</a></li>
        <li><a href="#">Membership</a></li>   

      </ul>
    </div>
    <div class="footer-section">   
      <h3>Headquarter</h3>
      <p>997 Middleville Road,</p>
      <p>NY 1001, Sydney,</p>
      <p>Australia</p>
    </div>
    <div class="footer-section">
      <h3>Connections</h3>
      <ul class="social-icons">
        <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
        <li><a href="#"><i class="fab fa-youtube"></i></a></li>   

        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
      </ul>
    </div>
  </div>   
  <div class="footer-bottom">
    <div>
      <p>2021 | RUNO Publisher Studio</p>
      <a href="#">Subscribe Now</a>
    </div>
  </div>
</footer>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>