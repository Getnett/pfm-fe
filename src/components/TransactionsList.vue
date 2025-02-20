<script setup lang="ts">
import type { TransactionType } from '../types/types'
interface TransactionsListProps {
  data: TransactionType
}

// @ts-ignore
defineProps<TransactionsListProps>()
// @ts-ignore
defineEmits<{
  (e: 'deleteTransaction', type: string, id: number): Promise<void>

  (e: 'editTransaction', id: number, type: string): void
}>()
</script>
<template>
  <ul class="list-none">
    <div v-if="Object.keys(data).length">
      <li v-for="transactionDateKey in Object.keys(data)" :key="transactionDateKey">
        <div class="flex gap-10 justify-between mb-4 mt-4 px-2 py-2 bg-[#1e293b]">
          <h4 class="text-[#efd364] text-sm">{{ transactionDateKey }}</h4>
          <div class="flex gap-4">
            <h4
              v-if="
                data[transactionDateKey].filter((transaction) => transaction.type === 'expense')[0]
              "
              class="text-[#eb4c4c] text-sm"
            >
              Expense :{{
                data[transactionDateKey].filter((transaction) => transaction.type === 'expense')[0]
                  .total
              }}
            </h4>
            <h4
              v-if="
                data[transactionDateKey].filter((transaction) => transaction.type === 'income')[0]
              "
              class="text-[#75bb6c] text-sm"
            >
              Income :
              {{
                data[transactionDateKey].filter((transaction) => transaction.type === 'income')[0]
                  .total
              }}
            </h4>
          </div>
        </div>
        <div
          v-for="transaction in data[transactionDateKey]"
          :key="transaction.id"
          class="flex gap-10 justify-between px-2 py-2 bg-slate-200 [&_*]:text-gray-700"
        >
          <div class="flex gap-2">
            <div class="text-[#fff]">icon</div>
            <h3 class="text-[#fff]">{{ transaction.note }}</h3>
          </div>
          <div class="flex gap-4">
            <h3 class="text-[#fff]">
              {{ transaction.type === 'expense' ? `- ${transaction.amount}` : transaction.amount }}
            </h3>
            <div class="flex gap-2">
              <button
                @click="$emit('editTransaction', transaction.id, transaction.type)"
                class="cursor-pointer text-[#fff]"
              >
                Edit
              </button>
              <button
                @click="$emit('deleteTransaction', transaction.type, transaction.id)"
                class="cursor-pointer text-[#fff]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  </ul>
</template>
