<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  fetchTranscationRecords,
  deleteExpenseTransaction,
  deleteIncomeTransaction,
} from '../api/transactions'
import type { TransactionType } from '../types/types'
import TransactionsList from '../components/TransactionsList.vue'

const data = ref({} as TransactionType)
const error = ref(null)
const loading = ref(false)

async function getTransactions() {
  loading.value = true
  try {
    const resData = await fetchTranscationRecords(12, 2024)
    data.value = resData as TransactionType
  } catch (err: any) {
    error.value = err?.message || 'Somthing went wrong!'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  getTransactions()
})

// TODO
// 1) Extract component - [DONE]
// 2) Re-render the component - [DONE]
// 3) Edit modal - In progress
// 4) If possible fix the https issue

async function handleDeleteTransaction(type: string, id: number) {
  if (type === 'expense') {
    await deleteExpenseTransaction(id)
    await getTransactions()
  } else if (type === 'income') {
    await deleteIncomeTransaction(id)
    await getTransactions()
  }
}
</script>
<template>
  <TransactionsList :data="data" @delete-transaction="handleDeleteTransaction" />
</template>

<style></style>
