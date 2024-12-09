<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchTranscationRecords } from '../api/records'

const data = ref([])
const error = ref(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const resData = await fetchTranscationRecords()
    data.value = resData
  } catch (err: any) {
    error.value = err.message || 'Somthing went wrong!'
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div>
    <ul class="list-none">
      <li v-for="expense in data" :key="expense.id">
        Amount: {{ expense.amount }} - Reason : {{ expense.note }} - record type: -{{
          expense.type
        }}
      </li>
    </ul>
  </div>
</template>

<style></style>
