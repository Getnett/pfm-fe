<template>
  <div class="card flex justify-center">
    <AutoComplete
      v-model="selectedOption"
      optionLabel="name"
      dropdown
      :suggestions="filteredOptions"
      @complete="search"
      @change="onChange"
    >
      <template #option="slotProps">
        <div class="flex items-center">
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
      <template #header>
        <div class="font-medium px-3 py-2">Available Options</div>
      </template>
      <template #footer="{ value }">
        <div class="px-3 py-3">
          <Button
            label="Add New"
            fluid
            severity="secondary"
            text
            size="small"
            icon="pi pi-plus"
            :disabled="
              options
                .map((option) => option.name.toLowerCase())
                .includes(value.toString().toLowerCase().trim())
            "
            @click="addNewOption(value.toString())"
          />
        </div>
      </template>
    </AutoComplete>
  </div>
</template>
<script lang="ts">
interface AutoCompleteOption {
  id: number
  name: string
}
interface AutoCompleteOptions {
  options: AutoCompleteOption[]
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'
import type { AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from 'primevue/autocomplete'

// @ts-ignore
const { options } = defineProps<AutoCompleteOptions>()
// @ts-ignore
const emits = defineEmits<{ (e: 'callBack', args: any): void; (e: 'onchange', args: any): void }>()

const selectedOption = ref({ id: -1, name: '' })

const filteredOptions = ref<AutoCompleteOption[]>([])

onMounted(() => {
  filteredOptions.value = options
})
const search = (event: AutoCompleteCompleteEvent) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredOptions.value = [...options]
    } else {
      filteredOptions.value = options.filter((option) => {
        return option.name.toLowerCase().startsWith(event.query.toLowerCase())
      })
    }
  }, 250)
}

const addNewOption = (newOption: string) => {
  if (
    !options.map((option) => option.name.toLowerCase()).includes(newOption.toLowerCase().trim())
  ) {
    emits('callBack', newOption)
  }
}

const onChange = (e: AutoCompleteChangeEvent) => {
  if (e.value.id) {
    emits('onchange', e.value.id)
  } else {
    if (options.map((option) => option.name.toLowerCase()).includes(e.value.toLowerCase().trim())) {
      emits(
        'onchange',
        options.find(
          (option: AutoCompleteOption) => option.name.toLowerCase() === e.value.toLowerCase(),
        )?.id,
      )
    }
  }
}
</script>
