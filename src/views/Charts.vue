<script setup lang="ts">
import { ref, provide, watchEffect } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { onMounted } from 'vue'
import { getExpensesYearlyAnalytics } from '../api/chart'

const transactionType = ref('expense')
const period = ref<'monthly' | 'yearly'>('monthly')
const date = ref<null | number | { month: number; year: number }>(null)

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, 'light')

const option = ref({
  title: {
    text: '',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [],
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})

const format = (date: Date) => {
  const month = date.getMonth()
  const year = date.getFullYear()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return period.value === 'monthly' ? `${months[month]}` : `${year}`
}

watchEffect(async () => {
  if (transactionType.value === 'expense' && period.value === 'yearly') {
    const resData = await getExpensesYearlyAnalytics(date.value as number)
    option.value.series[0]['data'] = resData.map((item: any) => ({
      name: item.categoryName,
      value: item.total,
    }))
    option.value.legend.data = resData.map((item: any) => item.categoryName)
  }
})
</script>

<template>
  <div>
    <div class="flex gap-12 justify-center w-full">
      {{ date }}
      <div>
        <label for="transaction-type" class="block text-sm/6 font-medium text-gray-900"
          >Transaction type</label
        >
        <div class="mt-2 grid grid-cols-1">
          <select
            id="transaction-type"
            v-model="transactionType"
            name="transactionType"
            autocomplete="transaction-types"
            class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option selected>Choose type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <svg
            class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div>
        <div>
          <label for="period" class="block text-sm/6 font-medium text-gray-900">Period</label>
          <div class="mt-2 grid grid-cols-1">
            <select
              id="period"
              v-model="period"
              name="period"
              autocomplete="period"
              class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option selected>Choose period</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
            <svg
              class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fill-rule="evenodd"
                d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <label for="date-charts" class="block text-sm/6 font-medium text-gray-900 mb-2">
          Date
        </label>
        <VueDatePicker
          id="date-charts"
          v-model="date"
          :month-picker="period === 'monthly'"
          :format="format"
          :year-picker="period === 'yearly'"
          :clearable="false"
          :key="period"
        />
      </div>
    </div>

    <div v-if="!!date">
      <VChart class="h-96" :option="option" autoresize />
    </div>
  </div>
</template>

<style></style>
