<script setup lang="ts">
import ChatBotVue from './components/ChatBot.vue'
// @ts-ignore
import ListBox from 'vue-material-design-icons/ListBox.vue'
// @ts-ignore
import ChartBar from 'vue-material-design-icons/ChartBar.vue'
// @ts-ignore
import GoogleAnalytics from 'vue-material-design-icons/GoogleAnalytics.vue'
// @ts-ignore
import CardAccountDetails from 'vue-material-design-icons/CardAccountDetails.vue'

// make all immdeiate child elements go black [&_*]:text-black
</script>

<template>
  <div class="flex h-full min-h-screen">
    <aside class="pt-8 px-8 h-screen w-[240px] fixed bg-green-900 [&_*]:text-white">
      <nav class="flex flex-col gap-8">
        <RouterLink class="flex gap-4 items-center" to="/">
          <span class="hover:text-[#FFA800]">
            <ListBox />
          </span>
          <span class="hover:text-[#FFA800]">Records</span>
        </RouterLink>
        <RouterLink class="flex gap-4 items-center" to="/charts">
          <span class="hover:text-[#FFA800]">
            <ChartBar />
          </span>
          <span class="hover:text-[#FFA800]"> Charts</span>
        </RouterLink>
        <RouterLink class="flex gap-4" to="/analytics">
          <span class="hover:text-[#FFA800]">
            <GoogleAnalytics />
          </span>
          <span class="hover:text-[#FFA800]">Analytics</span>
        </RouterLink>
        <RouterLink class="flex gap-4" to="/accounts">
          <span class="hover:text-[#FFA800]">
            <CardAccountDetails />
          </span>
          <span class="hover:text-[#FFA800]">Accounts</span>
        </RouterLink>
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
