<script setup lang="ts">
import Autocomplete from '@/components/UI/Autocomplete.vue'

import { ref } from 'vue'
const options = ref([
  { id: 1, name: 'Getnet' },
  { id: 2, name: 'Abel' },
])
</script>
<template>
  <div>Accounts</div>
</template>
