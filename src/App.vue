<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Records</RouterLink>
        <RouterLink to="/charts">Charts</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />

  <p>test if amazon amplify deploys Automatically after configuration - New build</p>
</template>

<style scoped></style>
