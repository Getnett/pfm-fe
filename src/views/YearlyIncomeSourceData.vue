<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EditTransaction from '../components/EditTransaction.vue'
import LineChart from '../components/Charts/LineChart.vue'
import { getYearlyIncomeAnalyticsByIncomeSource } from '../api/chart'
import { ref } from 'vue'

const route = useRoute()
const incomeData = ref<
  {
    incomeId: number
    note: string
    incomeSource: string
    date: string
    amount: number
    percentage: string
  }[]
>([])
const openEditModal = ref(false)
const transactionId = ref<number | null>(null)

onMounted(async () => {
  // new api by income source
  try {
    const resData = await getYearlyIncomeAnalyticsByIncomeSource(
      Number(route.query.icsId),
      Number(route.query.year),
    )
    incomeData.value = resData
  } catch (error: any) {
    throw new Error(error)
  }
})

const handleOpenEditTransaction = (incomeId: number) => {
  openEditModal.value = true
  transactionId.value = incomeId
}

const handleCloseEditModal = () => {
  openEditModal.value = false
}

const fvalue = (name: string) => {
  const item = incomeData.value.find((item) => item.date === name)
  return `${item?.date}           ${item?.amount}`
}
</script>
<template>
  <div>
    <LineChart
      :data="incomeData.map((income) => ({ name: income.date, value: income.amount }))"
      :legend="incomeData.map((income) => income.date)"
      :formatLabel="fvalue"
      chartLabel="Yearly income by income source"
    />
    <ul role="list" class="divide-y divide-gray-100">
      <li
        v-for="record in incomeData"
        :key="record.incomeId"
        class="cursor-pointer"
        @click="handleOpenEditTransaction(Number(record.incomeId))"
      >
        <div class="flex justify-between">
          <div class="flex gap-4 mb-1 text-base font-medium text-gray-700 capitalize">
            <span>{{ record.note || record.incomeSource }}</span>
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
      :transactionType="'income'"
      @closeEditModal="handleCloseEditModal"
    />
  </div>
</template>
