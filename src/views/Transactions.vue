<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  fetchTranscationRecords,
  deleteExpenseTransaction,
  deleteIncomeTransaction,
} from '../api/transactions'

const data = ref([])
const error = ref(null)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const resData = await fetchTranscationRecords(12, 2024)
    data.value = resData
  } catch (err: any) {
    error.value = err.message || 'Somthing went wrong!'
  } finally {
    loading.value = false
  }
})

function handleDeleteTransaction(type, id) {
  if (type === 'expense') {
    deleteExpenseTransaction(id)
  } else if (type === 'income') {
    deleteIncomeTransaction(id)
  }
}
</script>
<template>
  <div>
    <ul class="list-none">
      <li v-for="transactionDateKey in Object.keys(data)" :key="transactionDateKey">
        <div class="flex gap-10 justify-between mb-4 mt-4 px-2 py-2 bg-[#1e293b]">
          <h4 class="text-[#efd364] text-sm">{{ transactionDateKey }}</h4>
          <div class="flex gap-4">
            <h4
              v-if="
                data[transactionDateKey].filter(
                  (transaction: any) => transaction.type === 'expense',
                )[0]?.total
              "
              class="text-[#eb4c4c] text-sm"
            >
              Expense :{{
                data[transactionDateKey].filter(
                  (transaction: any) => transaction.type === 'expense',
                )[0]?.total
              }}
            </h4>
            <h4
              v-if="
                data[transactionDateKey].filter(
                  (transaction: any) => transaction.type === 'income',
                )[0]?.total
              "
              class="text-[#75bb6c] text-sm"
            >
              Income :
              {{
                data[transactionDateKey].filter(
                  (transaction: any) => transaction.type === 'income',
                )[0]?.total
              }}
            </h4>
          </div>
        </div>
        <div v-for="transaction in data[transactionDateKey]" :key="transaction.id">
          <div class="flex gap-10 justify-between px-2 py-2 bg-[#1e293b]">
            <div class="flex gap-2">
              <div class="text-[#fff]">icon</div>
              <h3 class="text-[#fff]">{{ transaction.note }}</h3>
            </div>
            <div class="flex gap-4">
              <h3 class="text-[#fff]">{{ transaction.amount }}</h3>
              <div class="flex gap-2">
                <button class="cursor-pointer text-[#fff]">Edit</button>
                <button
                  @click="handleDeleteTransaction(transaction.type, transaction.id)"
                  class="cursor-pointer text-[#fff]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style></style>
