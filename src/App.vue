<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex h-full">
    <aside class="pt-8 px-8 bg-green-700 basis-60 [&_*]:text-white">
      <nav class="flex flex-col">
        <RouterLink class="hover:text-yellow-300" to="/">Records</RouterLink>
        <RouterLink class="hover:text-yellow-300" to="/charts">Charts</RouterLink>
      </nav>
    </aside>
    <main class="flex-1 pt-8 px-8 bg-slate-100 [&_*]:text-black">
      <div>
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
