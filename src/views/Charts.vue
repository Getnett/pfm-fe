<script setup lang="ts">
import { ref, provide, watchEffect } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/vue-splide'
// Default theme
import '@splidejs/vue-splide/css'

// or only core styles
import '@splidejs/vue-splide/css/core'

import {
  getExpensesYearlyAnalytics,
  getYearlyMonthlySpend,
  getExpensesMonthlyAnalytics,
  getMonthlyDailySpend,
  getIncomesYearlyAnalytics,
  getIncomesMonthlyAnalytics,
  getYearlyMontlyIncomeSources,
  getMonthlyDailySourceIncomes,
} from '../api/chart'
import { useRouter } from 'vue-router'

interface MonthlyDateType {
  month: number
  year: number
}

const transactionType = ref('expense')
const period = ref<'monthly' | 'yearly'>('monthly')
const defaultDate = new Date()
const date = ref<any>({
  month: defaultDate.getMonth(),
  year: defaultDate.getFullYear(),
})

const router = useRouter()

// expense related data  - could change the name here
const yearlyExpense = ref<
  {
    total: string
    categoryName: string
    catId: number
    percentage: string
    year: string
  }[]
>([])

const monthlyExpense = ref<
  {
    total: string
    categoryName: string
    catId: number
    percentage: string
  }[]
>([])

// income related data

const yearlyIncomeSourceListing = ref<
  {
    total: string
    incomeSource: string
    icsId: number
    percentage: string
    year: string
  }[]
>([])

const monthlyIncomeSourceListing = ref<
  {
    total: string
    incomeSource: string
    icsId: number
    percentage: string
  }[]
>([])

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

provide(THEME_KEY, 'light')

// expenses chart
const expenseYearlyData = ref({
  title: {
    text: 'Yearly data by category',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    // left: 'right',
    data: [],
  },
  series: [
    {
      name: 'Expense yearly data by category',
      type: 'pie',
      radius: ['40%', '70%'],
      // radius: '55%',
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

const expenseYearlyDataByMonth = ref({
  title: {
    text: 'Yearly data by each month',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  series: [
    {
      name: 'Expense yearly monthly data',
      type: 'pie',
      radius: ['40%', '70%'],
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
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: 'Custom Text',
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#333', // Text color
        },
      },
    ],
  },
})

const expenseMonthlyData = ref({
  title: {
    text: 'Monthly data by category',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    // left: 'right',
    data: [],
  },
  series: [
    {
      name: 'Expense monthly data by category',
      type: 'pie',
      radius: ['40%', '70%'],
      // radius: '55%',
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

const expenseMonthlyDailyData = ref({
  title: {
    text: 'Monthly data by day',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  series: [
    {
      name: 'Expense  monthly daily data',
      type: 'pie',
      radius: ['40%', '70%'],
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
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: 'Custom Text',
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#333', // Text color
        },
      },
    ],
  },
})

const expenseYearlyDataByMonthLineChart = ref({
  title: {
    text: 'Yearly data by each month',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  lengend: {},
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
    },
  ],
})

const expenseDailyMonthlyDataLineChart = ref({
  title: {
    text: 'Daily monthly data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  lengend: {},
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
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

// income chart

const yearlyIncomeData = ref({
  title: {
    text: 'Yearly data by income source',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    // left: 'right',
    data: [],
  },
  series: [
    {
      name: 'Income yearly data by income source',
      type: 'pie',
      radius: ['40%', '70%'],
      // radius: '55%',
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

const incomeYearlyDataByMonth = ref({
  title: {
    text: 'Yearly data by each month',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  series: [
    {
      name: 'Income yearly monthly data',
      type: 'pie',
      radius: ['40%', '70%'],
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
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: 'Custom Text',
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#333', // Text color
        },
      },
    ],
  },
})

const incomeYearlyDataByMonthLineChart = ref({
  title: {
    text: 'Yearly data by each month',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  lengend: {},
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
    },
  ],
})

const monthlyIncomeData = ref({
  title: {
    text: 'Monthly data by income source',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    // left: 'right',
    data: [],
  },
  series: [
    {
      name: 'Income monthly data by income source',
      type: 'pie',
      radius: ['40%', '70%'],
      // radius: '55%',
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

const incomeMonthlyDailyData = ref({
  title: {
    text: 'Monthly data by day',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  series: [
    {
      name: 'Income  monthly daily data',
      type: 'pie',
      radius: ['40%', '70%'],
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
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: 'Custom Text',
          fontSize: 18,
          fontWeight: 'bold',
          fill: '#333', // Text color
        },
      },
    ],
  },
})
const incomeDailyMonthlyDataLineChart = ref({
  title: {
    text: 'Daily monthly data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    // formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    align: 'left',
    formatter: (name: string) => {
      return `${name}`
    },
    data: [],
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  lengend: {},
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
    },
  ],
})

const openExpenseYearlyCategoryDetail = (catId: number, year: number) => {
  router.push(`/expenses/yearly-category-data?catId=${catId}&year=${year}`)
}

const openExpenseMonthlyCategoryDetail = (catId: number, month: number, year: number) => {
  router.push(`/expenses/monthly-category-data?catId=${catId}&month=${month}&year=${year}`)
}

const openIncomeSourceYearlyDetail = (icsId: number, year: number) => {
  router.push(`/incomes/yearly-income-source-data?icsId=${icsId}&year=${year}`)
}

const openIncomeMonthlyIncomeSourceDetail = (icsId: number, month: number, year: number) => {
  router.push(`/incomes/monthly-income-source-data?icsId=${icsId}&month=${month}&year=${year}`)
}
watchEffect(async () => {
  if (transactionType.value === 'income' && period.value === 'yearly') {
    monthlyExpense.value = []
    yearlyExpense.value = []
    monthlyIncomeSourceListing.value = []

    // yearlyIncomeSourceListing
    const resData = await getIncomesYearlyAnalytics(date.value as number)
    yearlyIncomeSourceListing.value = resData

    // chart assignment statment
    yearlyIncomeData.value.series[0]['data'] = resData.map((item: any) => ({
      name: item.incomeSource,
      value: item.total,
    }))

    const fperc = (name: string) => {
      // Find the corresponding data item
      const item = resData.find((item: any) => item.incomeSource === name)
      return `${item.incomeSource}           ${item.percentage}%`
    }

    yearlyIncomeData.value.legend.formatter = fperc
    yearlyIncomeData.value.legend.data = resData.map((item: any) => item.incomeSource)

    // <-- chart by grouped by income source -->

    const resDataByMon = await getYearlyMontlyIncomeSources(date.value as number)

    incomeYearlyDataByMonth.value.series[0]['data'] = resDataByMon.map((item: any) => ({
      name: item.month,
      value: item.total,
    }))

    const fvalue = (name: string) => {
      // Find the corresponding data item
      const item = resDataByMon.find((item: any) => item.month === name)

      return `${item.month}           ${item.total}`
    }

    incomeYearlyDataByMonth.value.legend.formatter = fvalue

    incomeYearlyDataByMonth.value.legend.data = resDataByMon.map((item: any) => item.month)

    // line chart
    incomeYearlyDataByMonthLineChart.value.series[0]['data'] = resDataByMon.map((item: any) => ({
      name: item.month,
      value: item.total,
    }))
    incomeYearlyDataByMonthLineChart.value.legend.formatter = fvalue
    incomeYearlyDataByMonthLineChart.value.xAxis.data = resDataByMon.map((item: any) => item.month)
    incomeYearlyDataByMonthLineChart.value.legend.data = resDataByMon.map((item: any) => item.month)
  } else if (transactionType.value === 'income' && period.value === 'monthly') {
    monthlyExpense.value = []
    yearlyExpense.value = []
    yearlyIncomeSourceListing.value = []

    // monthlyIncomeSourceListing
    const month = Number(date.value?.month) + 1
    const year = Number(date.value?.year)
    const resData = await getIncomesMonthlyAnalytics(month, year)
    monthlyIncomeSourceListing.value = resData

    // monthlyIncomeData

    const fperc = (name: string) => {
      // Find the corresponding data item
      const item = resData.find((item: any) => item.incomeSource === name)

      return `${item.incomeSource}           ${item.percentage}%`
    }

    monthlyIncomeData.value.legend.formatter = fperc

    monthlyIncomeData.value.legend.data = resData.map((item: any) => item.incomeSource)

    monthlyIncomeData.value.series[0]['data'] = resData.map((item: any) => ({
      name: item.incomeSource,
      value: item.total,
    }))

    // getMonthlyDailySourceIncomes

    const resDataDaily = await getMonthlyDailySourceIncomes(month, year)

    const fvalue = (name: string) => {
      // Find the corresponding data item
      const item = resDataDaily.find((item: any) => item.date === name)

      return `${item.date}           ${item.amount}`
    }
    incomeMonthlyDailyData.value.series[0]['data'] = resDataDaily.map((item: any) => ({
      name: item.date,
      value: item.amount,
    }))
    incomeMonthlyDailyData.value.legend.formatter = fvalue
    incomeMonthlyDailyData.value.legend.data = resDataDaily.map((item: any) => item.date)

    // incomeDailyMonthlyDataLineChart
    incomeDailyMonthlyDataLineChart.value.series[0]['data'] = resDataDaily.map((item: any) => ({
      name: item.date,
      value: item.amount,
    }))
    incomeDailyMonthlyDataLineChart.value.legend.formatter = fvalue
    incomeDailyMonthlyDataLineChart.value.xAxis.data = resDataDaily.map((item: any) => item.date)
    incomeDailyMonthlyDataLineChart.value.legend.data = resDataDaily.map((item: any) => item.date)
  }

  if (transactionType.value === 'expense' && period.value === 'yearly') {
    monthlyExpense.value = []
    monthlyIncomeSourceListing.value = []
    yearlyIncomeSourceListing.value = []

    const resData = await getExpensesYearlyAnalytics(date.value as number)
    expenseYearlyData.value.series[0]['data'] = resData.map((item: any) => ({
      name: item.categoryName,
      value: item.total,
    }))

    // organize later
    yearlyExpense.value = resData

    const fperc = (name: string) => {
      // Find the corresponding data item
      const item = resData.find((item: any) => item.categoryName === name)

      return `${item.categoryName}           ${item.percentage}%`
    }

    expenseYearlyData.value.legend.formatter = fperc

    expenseYearlyData.value.legend.data = resData.map((item: any) => item.categoryName)

    // monthly
    const resDataByMon = await getYearlyMonthlySpend(date.value as number)

    expenseYearlyDataByMonth.value.series[0]['data'] = resDataByMon.map((item: any) => ({
      name: item.month,
      value: item.total,
    }))

    // for the line chart
    expenseYearlyDataByMonthLineChart.value.series[0]['data'] = resDataByMon.map((item: any) => ({
      name: item.month,
      value: item.total,
    }))

    const fvalue = (name: string) => {
      // Find the corresponding data item
      const item = resDataByMon.find((item: any) => item.month === name)

      return `${item.month}           ${item.total}`
    }

    expenseYearlyDataByMonth.value.legend.formatter = fvalue

    expenseYearlyDataByMonth.value.legend.data = resDataByMon.map((item: any) => item.month)

    // for the line chart
    expenseYearlyDataByMonthLineChart.value.legend.formatter = fvalue
    expenseYearlyDataByMonthLineChart.value.xAxis.data = resDataByMon.map((item: any) => item.month)
    expenseYearlyDataByMonthLineChart.value.legend.data = resDataByMon.map(
      (item: any) => item.month,
    )
  } else if (transactionType.value === 'expense' && period.value === 'monthly') {
    yearlyExpense.value = []
    monthlyIncomeSourceListing.value = []
    yearlyIncomeSourceListing.value = []

    const month = Number(date.value?.month) + 1
    const year = Number(date.value?.year)

    const resData = await getExpensesMonthlyAnalytics(month, year)
    monthlyExpense.value = resData

    const fperc = (name: string) => {
      // Find the corresponding data item
      const item = resData.find((item: any) => item.categoryName === name)

      return `${item.categoryName}           ${item.percentage}%`
    }

    expenseMonthlyData.value.legend.formatter = fperc

    expenseMonthlyData.value.legend.data = resData.map((item: any) => item.categoryName)

    expenseMonthlyData.value.series[0]['data'] = resData.map((item: any) => ({
      name: item.categoryName,
      value: item.total,
    }))

    // daily
    const resDataDaily = await getMonthlyDailySpend(month, year)

    const fvalue = (name: string) => {
      // Find the corresponding data item
      const item = resDataDaily.find((item: any) => item.date === name)

      return `${item.date}           ${item.amount}`
    }
    expenseMonthlyDailyData.value.series[0]['data'] = resDataDaily.map((item: any) => ({
      name: item.date,
      value: item.amount,
    }))

    expenseMonthlyDailyData.value.legend.formatter = fvalue
    //  expenseYearlyDataByMonth.value.legend.data = resDataByMon.map((item: any) => item.month)
    expenseMonthlyDailyData.value.legend.data = Array.from(
      new Set(resDataDaily.map((item: any) => item.date)),
    )

    // expenseDailyMonthlyDataLineChart
    expenseDailyMonthlyDataLineChart.value.series[0]['data'] = resDataDaily.map((item: any) => ({
      name: item.date,
      value: item.amount,
    }))
    expenseDailyMonthlyDataLineChart.value.legend.formatter = fvalue
    expenseDailyMonthlyDataLineChart.value.xAxis.data = resDataDaily.map((item: any) => item.date)
    expenseDailyMonthlyDataLineChart.value.legend.data = resDataDaily.map((item: any) => item.date)
  }
})
</script>

<template>
  <div class="h-full">
    <div class="flex gap-12 justify-center w-full">
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
    <div class="max-w-5xl max-h-full flex flex-col gap-8 mt-8 justify-center m-auto">
      <div v-if="transactionType === 'expense'">
        <Splide
          v-if="date !== null && yearlyExpense.length"
          :options="{ rewind: true, heightRation: 0.7, fixedHeight: '15rem' }"
          aria-label="Yearly Analytics"
        >
          <SplideSlide>
            <!-- <div class="w-sm h-80 bg-green-500 flex items-center justify-center">Image1</div> -->
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="expenseYearlyData"
                autoresize
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <!-- <div class="w-sm h-80 bg-yellow-300 flex items-center justify-center">Image 2</div> -->
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="expenseYearlyDataByMonth"
                autoresize
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <!-- <div class="w-sm h-80 bg-yellow-300 flex items-center justify-center">Image 2</div> -->

            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="expenseYearlyDataByMonthLineChart"
                autoresize
              />
            </div>
          </SplideSlide>
        </Splide>
        <Splide
          v-if="date !== null && monthlyExpense.length"
          :options="{ rewind: true, heightRation: 0.7, fixedHeight: '15rem' }"
          aria-label="Yearly Analytics"
        >
          <SplideSlide>
            <!-- <div class="w-sm h-80 bg-green-500 flex items-center justify-center">Image1</div> -->
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="expenseMonthlyData"
                autoresize
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <!-- <div class="w-sm h-80 bg-yellow-300 flex items-center justify-center">Image 2</div> -->
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="expenseMonthlyDailyData"
                autoresize
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <!-- <div class="w-sm h-80 bg-yellow-300 flex items-center justify-center">Image 2</div> -->
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="expenseDailyMonthlyDataLineChart"
                autoresize
              />
            </div>
          </SplideSlide>
        </Splide>
      </div>
      <div v-if="transactionType === 'income'">
        <Splide
          v-if="date !== null && yearlyIncomeSourceListing.length"
          :options="{ rewind: true, heightRation: 0.7, fixedHeight: '15rem' }"
          aria-label="Yearly Analytics"
        >
          <SplideSlide>
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="yearlyIncomeData"
                autoresize
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <!-- <div class="w-sm h-80 bg-yellow-300 flex items-center justify-center">Image 2</div> -->
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="incomeYearlyDataByMonth"
                autoresize
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="incomeYearlyDataByMonthLineChart"
                autoresize
              />
            </div>
          </SplideSlide>
        </Splide>

        <Splide
          v-if="date !== null && monthlyIncomeSourceListing.length"
          :options="{ rewind: true, heightRation: 0.7, fixedHeight: '15rem' }"
          aria-label="Yearly Analytics"
        >
          <SplideSlide>
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="monthlyIncomeData"
                autoresize
              />
            </div>
          </SplideSlide>
          <!-- incomeDailyMonthlyDataLineChart -->
          <SplideSlide>
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="incomeMonthlyDailyData"
                autoresize
              />
            </div>
          </SplideSlide>
          <SplideSlide>
            <div class="h-80" v-if="date !== null">
              <VChart
                class="h-52 bg-gray-100 rounded-md shadow-md"
                :option="incomeDailyMonthlyDataLineChart"
                autoresize
              />
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>

    <div v-if="date !== null && yearlyExpense.length">
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="record in yearlyExpense"
          :key="record.catId"
          class="cursor-pointer"
          @click="openExpenseYearlyCategoryDetail(Number(record.catId), Number(record.year))"
        >
          <div class="flex justify-between">
            <div class="flex gap-4 mb-1 text-base font-medium text-gray-700 capitalize">
              <span>{{ record.categoryName }}</span>
              <span>{{ record.percentage }}%</span>
            </div>
            <div>{{ record.total }}</div>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              class="bg-[#dad122] h-2.5 rounded-full"
              style="width: 45%"
              :style="{ width: record.percentage + '%' }"
            ></div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="flex justify-center items-center mt-12"
      v-if="
        date !== null &&
        period === 'yearly' &&
        transactionType === 'expense' &&
        !yearlyExpense.length
      "
    >
      <h3 class="text-4xl">No transaction record</h3>
    </div>
    <!-- monthly data -->

    <div v-if="date !== null && date.month && monthlyExpense.length">
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="record in monthlyExpense"
          :key="record.catId"
          @click="
            openExpenseMonthlyCategoryDetail(
              Number(record.catId),
              Number(date.month + 1),
              Number(date.year),
            )
          "
          class="cursor-pointer"
        >
          <div class="flex justify-between">
            <div class="flex gap-4 mb-1 text-base font-medium text-gray-700 capitalize">
              <span>{{ record.categoryName }}</span>
              <span>{{ record.percentage }}%</span>
            </div>
            <div>{{ record.total }}</div>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              class="bg-[#dad122] h-2.5 rounded-full"
              style="width: 45%"
              :style="{ width: record.percentage + '%' }"
            ></div>
          </div>
        </li>
      </ul>
    </div>

    <div
      class="flex justify-center items-center mt-12"
      v-if="
        date !== null &&
        period === 'monthly' &&
        transactionType === 'expense' &&
        !monthlyExpense.length
      "
    >
      <h3 class="text-4xl">No transaction record</h3>
    </div>

    <!-- income related info -->

    <div v-if="date !== null && yearlyIncomeSourceListing.length">
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="record in yearlyIncomeSourceListing"
          :key="record.icsId"
          @click="openIncomeSourceYearlyDetail(record.icsId, Number(record.year))"
          class="cursor-pointer"
        >
          <div class="flex justify-between">
            <div class="flex gap-4 mb-1 text-base font-medium text-gray-700 capitalize">
              <span>{{ record.incomeSource }}</span>
              <span>{{ record.percentage }}%</span>
            </div>
            <div>{{ record.total }}</div>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              class="bg-[#dad122] h-2.5 rounded-full"
              style="width: 45%"
              :style="{ width: record.percentage + '%' }"
            ></div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="flex justify-center items-center mt-12"
      v-if="
        date !== null &&
        period === 'yearly' &&
        transactionType === 'income' &&
        !yearlyIncomeSourceListing.length
      "
    >
      <h3 class="text-4xl">No transaction record</h3>
    </div>

    <!-- monthlyIncomeSourceListing -->
    <div v-if="date !== null && monthlyIncomeSourceListing.length">
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="record in monthlyIncomeSourceListing"
          :key="record.icsId"
          @click="
            openIncomeMonthlyIncomeSourceDetail(
              Number(record.icsId),
              Number(date.month + 1),
              Number(date.year),
            )
          "
          class="cursor-pointer"
        >
          <div class="flex justify-between">
            <div class="flex gap-4 mb-1 text-base font-medium text-gray-700 capitalize">
              <span>{{ record.incomeSource }}</span>
              <span>{{ record.percentage }}%</span>
            </div>
            <div>{{ record.total }}</div>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              class="bg-[#dad122] h-2.5 rounded-full"
              style="width: 45%"
              :style="{ width: record.percentage + '%' }"
            ></div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="flex justify-center items-center mt-12"
      v-if="
        date !== null &&
        period === 'monthly' &&
        transactionType === 'income' &&
        !monthlyIncomeSourceListing.length
      "
    >
      <h3 class="text-4xl">No transaction record</h3>
    </div>
  </div>
</template>

<style></style>
