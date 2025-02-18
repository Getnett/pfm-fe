<template>
  <div>
    <VChart
      class="h-52 bg-gray-100 rounded-md shadow-md"
      :option="expenseDailyMonthlyDataLineChart"
      autoresize
    />
  </div>
</template>

<script lang="ts">
interface LineChartData {
  name: string
  value: number | string
}
interface LineChartProps {
  data: LineChartData[]
  legend: string[]
  formatLabel: (name: string) => string
  chartLabel: string
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

// @ts-ignore
const props = defineProps<LineChartProps>()

use([CanvasRenderer, LineChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent])

const expenseDailyMonthlyDataLineChart = ref({
  title: {
    text: props.chartLabel,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
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

watch(
  props,
  () => {
    const { data, legend, formatLabel } = props
    expenseDailyMonthlyDataLineChart.value.series[0]['data'] = data as any
    expenseDailyMonthlyDataLineChart.value.legend.formatter = formatLabel
    expenseDailyMonthlyDataLineChart.value.xAxis.data = legend as any
    expenseDailyMonthlyDataLineChart.value.legend.data = legend as any
  },
  { immediate: true },
)
</script>
