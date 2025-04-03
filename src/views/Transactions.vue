<template>
  <div>
    <AddTransaction v-if="openAddModal" :open="openAddModal" @closeAddModal="handleCloseAddModal" />
    <div>
      <div class="flex gap-12">
        <div
          class="grid justify-items-center content-center gap-2 grid-cols-4 py-4 rounded-lg bg-slate-200 text-gray-700 mb-12"
        >
          <div class="self-center">
            {{
              /* @ts-ignore */
              date.year || date.getFullYear()
            }}
          </div>
          <div class="self-center">Expenses</div>
          <div class="self-center">Income</div>
          <div class="self-center">Balance</div>
          <div class="self-center px-4">
            <VueDatePicker v-model="date" month-picker :format="format" :clearable="false" />
          </div>
          <div class="self-center">{{ totalExpense.total }}</div>
          <div class="self-center">{{ totalIncome.total }}</div>
          <div class="self-center">
            {{ Number(totalIncome.total) - Number(totalExpense.total) || '' }}
          </div>
        </div>
        <button
          @click="handleOpenAddModal"
          type="button"
          class="h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add
        </button>
      </div>

      <div class="h-[50vh] flex items-center justify-center" v-if="loading">
        <div class="flex space-x-2 justify-center items-center mt-4">
          <span class="sr-only">Loading...</span>
          <div
            class="h-6 w-6 bg-slate-700 rounded-full animate-bounce [animation-delay:-0.3s]"
          ></div>
          <div
            class="h-6 w-6 bg-slate-700 rounded-full animate-bounce [animation-delay:-0.15s]"
          ></div>
          <div class="h-6 w-6 bg-slate-700 rounded-full animate-bounce"></div>
        </div>
      </div>

      <div v-if="!loading && !Object.keys(data).length">No transaction record</div>

      <!-- <DataTable :value="data" tableStyle="min-width: 50rem">
        <Column v-for="col of columns" :key="col" :field="col" :header="col"></Column>
      </DataTable> -->

      <!-- <TransactionsList
        :data="data"
        @deleteTransaction="handleDeleteTransaction"
        @editTransaction="handleOpenEditModal"
      /> -->

      <DataTable
        :value="data"
        tableStyle="min-width: 50rem"
        rowGroupMode="subheader"
        groupRowsBy="transactionDate"
        sortMode="single"
        :sortOrder="1"
        scrollable
        scroll-height="700px"
      >
        <Column v-for="col of columns" :key="col" :field="col" :header="col"></Column>
        <!-- sortField="transactionDate" -->
        <template #groupheader="slotProps">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-lg text-black">{{
              slotProps.data.transactionDate
            }}</span>
            <div class="flex items-center gap-4">
              <span class="font-medium text-base text-red-500">
                {{
                  // @ts-ignore
                  (data.length &&
                    data.find(
                      (info) =>
                        info.transactionDate === slotProps.data.transactionDate &&
                        info.type === 'expense',
                    ) &&
                    `Expense : ${
                      // @ts-ignore
                      data.find(
                        (info) =>
                          info.transactionDate === slotProps.data.transactionDate &&
                          info.type === 'expense',
                      ).total
                    }`) ||
                  ''
                }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-base text-green-500">
                {{
                  (data.length &&
                    // @ts-ignore
                    data.find(
                      (info) =>
                        info.transactionDate === slotProps.data.transactionDate &&
                        info.type === 'income',
                    ) &&
                    `Income : ${
                      // @ts-ignore
                      data.find(
                        (info) =>
                          info.transactionDate === slotProps.data.transactionDate &&
                          info.type === 'income',
                      ).total
                    }`) ||
                  ''
                }}
              </span>
            </div>
          </div>
        </template>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <Button
              @click="editRow(data)"
              severity="secondary"
              rounded
              icon="pi pi-pencil"
              aria-label="Edit"
            ></Button>
          </template>
        </Column>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <Button
              @click="deleteRow(data)"
              severity="secondary"
              rounded
              icon="pi pi-trash"
              aria-label="Delete"
            ></Button>
          </template>
        </Column>
      </DataTable>

      <EditTransaction
        v-if="openEditModal"
        :open="openEditModal"
        :id="transactionId"
        :transactionType="transactionType"
        @closeEditModal="handleCloseEditModal"
      />
      <Toast />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import { useToast } from 'primevue/usetoast'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Transaction, TransactionType } from '../types/types'
import TransactionsList from '@/components/TransactionsList.vue'
import EditTransaction from '@/components/EditTransaction.vue'
import AddTransaction from '../components/AddTransaction.vue'
import {
  fetchTranscationRecords,
  deleteExpenseTransaction,
  deleteIncomeTransaction,
  getTotalSpendingInMonth,
  getTotalIncomeInMonth,
} from '../api/transactions'

interface IMonthYear {
  month: number
  year: number
}

interface TotalAmount {
  total: string | number
}

const data = ref<Transaction[]>([])
const columns = ref<string[]>([])
const totalExpense = ref<TotalAmount>({ total: '' })
const totalIncome = ref<TotalAmount>({ total: '' })
const toast = useToast()

// mainly as props
const transactionId = ref<number | null>(null)
const transactionType = ref('')

const date = ref<Date | IMonthYear>(new Date())

// ui state data
const openAddModal = ref(false)
const openEditModal = ref(false)

const error = ref(null)
const loading = ref(false)

const format = (date: Date) => {
  const month = date.getMonth()
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

  return `${months[month]}`
}

async function getTransactions(month: number, year: number) {
  loading.value = true
  try {
    const resData = await fetchTranscationRecords(month, year)
    console.log('resData', resData)
    //     {
    //     "id": 47,
    //     "amount": 100,
    //     "note": "cost",
    //     "date": "2025-02-18T14:58:33.894Z",
    //     "transactionDate": "Feb 18 Tuesday  ",
    //     "total": "185",
    //     "type": "expense"
    // }
    data.value = resData

    console.log('columns', Object.keys(resData[0]))
    columns.value = Object.keys(resData[0]).filter((key) => key !== 'total')
  } catch (err: any) {
    error.value = err?.message || 'Somthing went wrong!'
  } finally {
    loading.value = false
  }
}

async function getTotalSpending(month: number, year: number) {
  totalExpense.value = await getTotalSpendingInMonth(month, year)
}

async function getTotalIncome(month: number, year: number) {
  totalIncome.value = await getTotalIncomeInMonth(month, year)
}

async function handleDeleteTransaction(type: string, id: number) {
  const month = (date.value as IMonthYear).month + 1
  const year = (date.value as IMonthYear).year

  if (type === 'expense') {
    await deleteExpenseTransaction(id)
    // replace with state management library
    await getTransactions(month, year)
  } else if (type === 'income') {
    await deleteIncomeTransaction(id)
    await getTransactions(month, year)
  }
}

function handleOpenEditModal(id: number, type: string) {
  openEditModal.value = true
  transactionId.value = id
  transactionType.value = type
}

async function handleCloseEditModal() {
  // const month = (date.value as IMonthYear).month + 1
  // const year = (date.value as IMonthYear).year
  console.log('date', date)
  // const month = (date.value as Date).getMonth() + 1
  // const year = (date.value as Date).getFullYear()
  // await getTransactions(month, year)
  openEditModal.value = false
}

async function handleOpenAddModal() {
  openAddModal.value = true
}

async function handleCloseAddModal() {
  openAddModal.value = false
  const month = (date.value as Date).getMonth() + 1
  const year = (date.value as Date).getFullYear()
  if (month && year) {
    await getTransactions(month, year)
    await getTotalSpending(month, year)
    await getTotalIncome(month, year)
  }
}

onMounted(async () => {
  const month = (date.value as Date).getMonth() + 1
  const year = (date.value as Date).getFullYear()
  await getTransactions(month, year)
  await getTotalSpending(month, year)
  await getTotalIncome(month, year)
})

watch(date, async (newVal: Date | IMonthYear, _oldVal: Date | IMonthYear) => {
  const month = (newVal as IMonthYear).month + 1
  const year = (newVal as IMonthYear).year

  await getTransactions(month, year)
  await getTotalSpending(month, year)
  await getTotalIncome(month, year)
})

const editRow = async (data: Transaction) => {
  handleOpenEditModal(data.id, data.type)
}
const deleteRow = async (data: Transaction) => {
  await handleDeleteTransaction(data.type, data.id)
  toast.add({
    severity: 'success',
    summary: 'Delete',
    detail: 'Deleted a transaction',
    life: 3000,
  })
}
// TODO
// 1) Loading state and error handling
// 2) Find optimal way for the code
// 3) If possible fix the https issue
</script>
