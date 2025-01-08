<script setup lang="ts">
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import {
  getAllCategories,
  getAllIncomeSources,
  addExpenseTransaction,
  addIncomeTransaction,
} from '../api/transactions'

interface AddTransactionProps {
  open: boolean
}
interface Categories {
  id: number
  categoryName: string
}

interface IncomeSources {
  id: number
  incomeSource: string
}

const transactionType = ref('')
// @ts-ignore
defineProps<AddTransactionProps>()
// @ts-ignore
const emits = defineEmits<{
  (e: 'closeAddModal'): void
}>()

const amount = ref<number | string>('')
const note = ref<string>('')
const date = ref<Date>(new Date())
const category = ref<string>('')
const incomeSource = ref<string>('')

// list
const categories = ref<Categories[]>([])
const incomeSources = ref<IncomeSources[]>([])

async function handleAddTransaction() {
  if (transactionType.value === 'expense') {
    await addExpenseTransaction({
      amount: amount.value,
      note: note.value,
      date: date.value.toISOString(),
      categoryId: category.value,
    })

    emits('closeAddModal')
  } else if (transactionType.value === 'income') {
    await addIncomeTransaction({
      amount: amount.value,
      note: note.value,
      date: date.value.toISOString(),
      incomeSourcesId: incomeSource.value,
    })
    emits('closeAddModal')
  }
}

watch(transactionType, async (newValue, oldValue) => {
  if (newValue === 'expense') {
    categories.value = await getAllCategories()
  } else if (newValue === 'income') {
    incomeSources.value = await getAllIncomeSources()
  }
})
</script>
<template>
  <Teleport v-if="open" to="body">
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div class="bg-white flex justify-center px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="flex sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div class="flex min-h-full flex-col justify-center px-6 py-4 lg:px-8">
                    <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                      <div class="mb-3 flex justify-center">
                        <h3>Add transaction</h3>
                      </div>
                      <form class="space-y-6" action="#" method="POST">
                        <div>
                          <label for="amount" class="block text-sm/6 font-medium text-gray-900"
                            >Amount</label
                          >
                          <div class="mt-2">
                            <input
                              type="number"
                              v-model="amount"
                              name="amount"
                              id="amount"
                              autocomplete="amount"
                              required
                              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div>
                          <label for="date" class="mb-2 block text-sm/6 font-medium text-gray-900"
                            >Date</label
                          >
                          <VueDatePicker id="date" v-model="date" :clearable="false" />
                        </div>

                        <div>
                          <label
                            for="transaction-type"
                            class="block text-sm/6 font-medium text-gray-900"
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
                              <option value="" selected>Choose type</option>
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

                        <div v-if="transactionType === 'expense'">
                          <label for="categories" class="block text-sm/6 font-medium text-gray-900"
                            >Categories</label
                          >
                          <div class="mt-2 grid grid-cols-1">
                            <select
                              id="categories"
                              name="categories"
                              v-model="category"
                              autocomplete="income-sources"
                              class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              <option
                                v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                              >
                                {{ category.categoryName }}
                              </option>
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

                        <div v-if="transactionType === 'income'">
                          <label
                            for="income-sources"
                            class="block text-sm/6 font-medium text-gray-900"
                            >Income source</label
                          >
                          <div class="mt-2 grid grid-cols-1">
                            <select
                              id="income-sources"
                              name="incomeSource"
                              v-model="incomeSource"
                              autocomplete="income-sources"
                              class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                              <option
                                v-for="incomeSource in incomeSources"
                                :key="incomeSource.id"
                                :value="incomeSource.id"
                              >
                                {{ incomeSource.incomeSource }}
                              </option>
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
                          <div class="flex items-center justify-between">
                            <label for="note" class="block text-sm/6 font-medium text-gray-900"
                              >Note</label
                            >
                          </div>
                          <div class="mt-2">
                            <textarea
                              id="note"
                              name="note"
                              v-model="note"
                              autocomplete="note"
                              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                @click="handleAddTransaction"
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
              >
                Add
              </button>
              <button
                @click="$emit('closeAddModal')"
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
