<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import EditTransaction from '../components/EditTransaction.vue'
import { getYearlyExpenseAnalyticsByCategory } from '../api/chart'
import { ref } from 'vue'

const route = useRoute()
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
const openEditModal = ref(false)
const transactionId = ref<number | null>(null)

onMounted(async () => {
  try {
    const resData = await getYearlyExpenseAnalyticsByCategory(
      Number(route.query.catId),
      Number(route.query.year),
    )
    expenseData.value = resData
  } catch (error: any) {
    throw new Error(error)
  }
})

const handleOpenEditTransaction = (expenseId: number) => {
  openEditModal.value = true
  transactionId.value = expenseId
}

const handleCloseEditModal = () => {
  openEditModal.value = false
}
</script>
<template>
  <div>
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
