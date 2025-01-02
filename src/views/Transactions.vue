<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  fetchTranscationRecords,
  deleteExpenseTransaction,
  deleteIncomeTransaction,
} from '../api/transactions'
import type { TransactionType } from '../types/types'
import TransactionsList from '@/components/TransactionsList.vue'
import EditTransaction from '@/components/EditTransaction.vue'

const data = ref({} as TransactionType)
const openEditModal = ref(false)
const transactionId = ref<number | null>(null)
const transactionType = ref('')

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
// 1) Display category and income source for expense and income reviews respectively and  Update categories and income sources respectively for expenses and incomes
// 2) Layout including to add filters and summary of expenses,income and balance. [ TODO ]
// 3) Loading state and error handling
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

function handleOpenEditModal(id: number, type: string) {
  openEditModal.value = true
  transactionId.value = id
  transactionType.value = type
}

async function handleCloseEditModal() {
  openEditModal.value = false
  await getTransactions()
}
</script>
<template>
  <div>
    <TransactionsList
      :data="data"
      @deleteTransaction="handleDeleteTransaction"
      @editTransaction="handleOpenEditModal"
    />

    <EditTransaction
      v-if="openEditModal"
      :open="openEditModal"
      :id="transactionId"
      :transactionType="transactionType"
      @closeEditModal="handleCloseEditModal"
    />
  </div>
</template>

<style></style>
