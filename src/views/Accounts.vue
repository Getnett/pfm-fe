<template>
  <div>
    <Button label="Add account" @click="handleOpenAddAccount" />
    <Teleport v-if="openAddAccount" to="body">
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
                          <h3>Add Account</h3>
                        </div>
                        <form class="space-y-6" action="#" method="POST">
                          <div>
                            <label for="amount" class="block text-sm/6 font-medium text-gray-900"
                              >Name</label
                            >
                            <div class="mt-2">
                              <input
                                v-model="accountName"
                                name="accountName"
                                id="account-name"
                                autocomplete="accountName"
                                required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              for="categories"
                              class="block text-sm/6 font-medium text-gray-900"
                              >Account Type</label
                            >
                            <div class="mt-2 grid grid-cols-1">
                              <Autocomplete
                                :options="
                                  accountTypes.map((account) => ({
                                    id: Number(account.id),
                                    name: account.accountType,
                                  }))
                                "
                                @callBack="addNewAccountType"
                                @onchange="handleAccountType"
                              />
                            </div>
                          </div>
                          <div>
                            <label for="amount" class="block text-sm/6 font-medium text-gray-900"
                              >Balance</label
                            >
                            <div class="mt-2">
                              <input
                                type="number"
                                v-model="balance"
                                name="balance"
                                id="account-balance"
                                autocomplete="balance"
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
                  @click="handleAddAccount"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                >
                  Add
                </button>
                <button
                  @click="handleCloseOpenAddAccount"
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

    <div class="card mt-8">
      <DataTable
        v-model:selection="selectedAccount"
        :value="accounts"
        selectionMode="single"
        dataKey="id"
        @rowSelect="onRowSelect"
        :metaKeySelection="false"
        tableStyle="min-width: 50rem"
      >
        <Column field="id" header="ID"></Column>
        <Column field="accountName" header="Account"></Column>
        <Column field="balance" header="Balance"></Column>
        <Column field="note" header="Note"></Column>
      </DataTable>
      <Toast />
    </div>
  </div>
</template>

<script lang="ts">
// "id": 1,
//         "accountName": "default",
//         "balance": 576085,
//         "accountIcon": null

interface AccountType {
  id: number
  accountType: string
}

interface Account {
  id: number
  accountName: string
  balance: string
  note: string
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Autocomplete from '../components/UI/Autocomplete.vue'
import { createAccount, createAccountType, getAccountTypes, getAccounts } from '../api/account'

const openAddAccount = ref(false)
const accountName = ref('')
const accountType = ref('')
const balance = ref('')
const note = ref('')
const accountTypes = ref<AccountType[]>([])
const accounts = ref<Account[]>([])
const selectedAccount = ref()
const toast = useToast()
const router = useRouter()

function handleOpenAddAccount() {
  openAddAccount.value = true
}

function handleCloseOpenAddAccount() {
  openAddAccount.value = false
}
async function addNewAccountType(accType: string) {
  const resData = await createAccountType(accType)

  accountType.value = resData.id
}

function handleAccountType(value: number) {
  accountType.value = value.toString()
}

async function handleAddAccount() {
  await createAccount({
    accountName: accountName.value,
    balance: Number(balance.value),
    note: note.value,
    accountType: Number(accountType.value),
  })
  handleCloseOpenAddAccount()
}

onMounted(async () => {
  accountTypes.value = await getAccountTypes()
})

// Table

onMounted(async () => {
  accounts.value = await getAccounts()
})

const onRowSelect = (event) => {
  console.log('event', event.data.id)
  router.push(`/accounts/transactions?accountId=${event.data.id}`)
  toast.add({
    severity: 'info',
    summary: 'Account Selected',
    detail: 'Name: ' + event.data.accountName,
    life: 3000,
  })
}
// const onRowUnselect = (event) => {
//   toast.add({
//     severity: 'warn',
//     summary: 'Account Unselected',
//     detail: 'Name: ' + event.data.accountName,
//     life: 3000,
//   })
// }
</script>
