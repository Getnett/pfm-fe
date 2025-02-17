<script setup lang="ts">
import ChatBotVue from './components/ChatBot.vue'

// make all immdeiate child elements go black [&_*]:text-black
</script>

<template>
  <div class="flex h-full min-h-screen">
    <aside class="pt-8 px-8 h-screen w-[240px] fixed bg-green-700 [&_*]:text-white">
      <nav class="flex flex-col gap-8">
        <RouterLink class="hover:text-yellow-300" to="/">Records</RouterLink>
        <RouterLink class="hover:text-yellow-300" to="/charts">Charts</RouterLink>
        <RouterLink class="hover:text-yellow-300" to="/analytics">Analytics</RouterLink>
        <RouterLink class="hover:text-yellow-300" to="/accounts">Accounts</RouterLink>
      </nav>
    </aside>

    <main class="flex-1 pt-8 px-8 bg-slate-100 ml-[240px]">
      <div>
        <RouterView />
      </div>
      <ChatBotVue />
    </main>
  </div>
</template>

<style scoped></style>
