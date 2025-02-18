<template>
  <div>
    <div class="mb-3">
      <LineChart
        :data="expenseData.map((expense) => ({ name: expense.date, value: expense.amount }))"
        :legend="expenseData.map((expense) => expense.date)"
        :formatLabel="fvalue"
        chartLabel="Monthly spend by category"
      />
    </div>
    <ul role="list" class="divide-y divide-gray-100">
      <li
        v-for="record in expenseData"
        :key="record.expenseId"
        class="cursor-pointer"
        @click="handleOpenEditTransaction(Number(record.expenseId))"
      >
        <div class="flex justify-between">
          <div class="flex gap-4 mb-1 text-base font-medium text-gray-700 capitalize">
            <span>{{ record.note || record.categoryName }}</span>
            <span>{{ record.percentage }}%</span>
          </div>
          <div>{{ record.amount }}</div>
        </div>

        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-[#dad122] h-2.5 rounded-full"
            style="width: 45%"
            :style="{ width: record.percentage + '%' }"
          ></div>
        </div>
        <div class="mb-4">{{ record.date }}</div>
      </li>
    </ul>

    <EditTransaction
      v-if="openEditModal"
      :open="openEditModal"
      :id="transactionId"
      :transactionType="'expense'"
      @closeEditModal="handleCloseEditModal"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EditTransaction from '../components/EditTransaction.vue'
import LineChart from '../components/Charts/LineChart.vue'
import { getMonthlyExpenseAnalyticsByCategory } from '../api/chart'
import { useRoute } from 'vue-router'

const route = useRoute()
const openEditModal = ref(false)
const transactionId = ref<number | null>(null)
const expenseData = ref<
  {
    expenseId: number
    note: string
    categoryName: string
    date: string
    amount: number
    percentage: string
  }[]
>([])

function handleOpenEditTransaction(expenseId: number) {
  openEditModal.value = true
  transactionId.value = expenseId
}

function handleCloseEditModal() {
  openEditModal.value = false
}

onMounted(async () => {
  expenseData.value = await getMonthlyExpenseAnalyticsByCategory(
    Number(route.query.catId),
    Number(route.query.month),
    Number(route.query.year),
  )
})

const fvalue = (name: string) => {
  const item = expenseData.value.find((item) => item.date === name)
  return `${item?.categoryName}           ${item?.amount}`
}
</script>
