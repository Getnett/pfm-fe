<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getExpenseTransaction,
  getIncomeTransaction,
  updateExpenseTransaction,
  updateIncomeTransaction,
  getAllCategories,
  getAllIncomeSources,
} from '../api/transactions'

interface EditTransactionsProps {
  open: boolean
  id: number | null
  transactionType: string
}
// @ts-ignore
const { id, transactionType } = defineProps<EditTransactionsProps>()

// @ts-ignore

const emit = defineEmits<{
  (e: 'closeEditModal'): void
}>()

const transactionData = ref<any | null>(null)
const categories = ref<{ id: number; categoryName: string }[]>([])
const incomeSources = ref<{ id: number; incomeSource: string }[]>([])
const isEditMode = ref(false)

async function handleEditForm() {
  if (!isEditMode.value) {
    isEditMode.value = true
  } else {
    if (transactionType === 'expense') {
      await updateExpenseTransaction(id as number, {
        amount: Number(transactionData.value.amount),
        note: transactionData.value.note,
        categoryId: transactionData.value.categoryId,
        date: transactionData.value.date,
        accountId: transactionData.value.accountId,
      })
    } else if (transactionType === 'income') {
      await updateIncomeTransaction(id as number, {
        amount: Number(transactionData.value.amount),
        note: transactionData.value.note,
        incomeSourcesId: transactionData.value.incomeSourcesId,
        date: transactionData.value.date,
        accountId: transactionData.value.accountId,
      })
    }
    isEditMode.value = false
    emit('closeEditModal')
  }
}

onMounted(async () => {
  if (transactionType === 'expense') {
    categories.value = await getAllCategories()
  } else if (transactionType === 'income') {
    incomeSources.value = await getAllIncomeSources()
  }
  if (transactionType === 'expense') {
    transactionData.value = await getExpenseTransaction(id as number)
    transactionData.value.date = new Date(transactionData.value.date).toISOString().slice(0, 16)
  } else {
    transactionData.value = await getIncomeTransaction(id as number)
    transactionData.value.date = new Date(transactionData.value.date).toISOString().slice(0, 16)
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
                      <!-- summary -->
                      <div class="mb-3 flex justify-center">
                        <h3>Details</h3>
                      </div>

                      <div v-if="!isEditMode" class="flex flex-col gap-4 mt-3">
                        <h3 class="text-stone-600 capitalize">
                          {{
                            transactionType === 'expense'
                              ? transactionData?.categoryName
                              : transactionData?.incomeSource
                          }}
                        </h3>
                        <div class="flex gap-8">
                          <h3 class="text-stone-600">Type</h3>
                          <span class="text-stone-500">{{
                            transactionType === 'expense' ? 'Expense' : 'Income'
                          }}</span>
                        </div>
                        <div class="flex gap-8">
                          <h4 class="text-stone-600">Amount</h4>

                          <span class="text-stone-500">{{ transactionData?.amount }}</span>
                        </div>
                        <div class="flex gap-8">
                          <h4 class="text-stone-600">Date</h4>
                          <span class="text-stone-500">{{
                            new Date(transactionData?.date).toLocaleDateString('en-US', {
                              day: '2-digit',
                              month: 'short',
                              weekday: 'short',
                            })
                          }}</span>
                        </div>
                        <div class="flex gap-8">
                          <h4 class="text-stone-600">Note</h4>
                          <span class="text-stone-500">{{ transactionData?.note }}</span>
                        </div>
                      </div>

                      <!-- edit form -->
                      <form v-if="isEditMode" class="space-y-6" action="#" method="POST">
                        <div>
                          <label for="amount" class="block text-sm/6 font-medium text-gray-900"
                            >Amount</label
                          >
                          <div class="mt-2">
                            <input
                              type="number"
                              v-model="transactionData.amount"
                              name="amount"
                              id="amount"
                              autocomplete="amount"
                              required
                              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
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
                              v-model="transactionData.note"
                              autocomplete="note"
                              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>
                        <div v-if="transactionType === 'expense'">
                          <label
                            for="categories"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Categories
                          </label>
                          <select
                            v-model="transactionData.categoryId"
                            id="categories"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option
                              v-for="category in categories"
                              :key="category.id"
                              :value="category.id"
                            >
                              {{ category.categoryName }}
                            </option>
                          </select>
                        </div>

                        <div v-if="transactionType === 'income'">
                          <label
                            for="categories"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Income source
                          </label>
                          <select
                            v-model="transactionData.incomeSourcesId"
                            id="categories"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option
                              v-for="incomeSource in incomeSources"
                              :key="incomeSource.id"
                              :value="incomeSource.id"
                            >
                              {{ incomeSource.incomeSource }}
                            </option>
                          </select>
                        </div>

                        <div>
                          <div class="flex items-center justify-between">
                            <label for="date" class="block text-sm/6 font-medium text-gray-900"
                              >Date</label
                            >
                          </div>
                          <div class="mt-2">
                            <input
                              type="datetime-local"
                              v-model="transactionData.date"
                              name="date"
                              id="date"
                              autocomplete="date"
                              required
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
                @click="handleEditForm"
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
              >
                {{ isEditMode ? 'Update' : 'Edit' }}
              </button>

              <button
                @click="$emit('closeEditModal')"
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

<style scoped></style>
