<template>
  <div class="text-gray-900 dark:text-white">
    <h1 class="text-3xl font-bold mb-8">Select Component</h1>

    <!-- 基本用法 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
        <div class="max-w-md">
          <MSelect
            v-model="basicValue"
            :options="basicOptions"
            placeholder="Choose an option"
          />
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected value: {{ basicValue }}
          </p>
        </div>
      </div>
      <div class="mt-4">
        <MCode language="vue">{{ basicUsageCode }}</MCode>
      </div>
    </section>

    <!-- API -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">API</h2>
      
      <h3 class="text-xl font-medium mb-3">Props</h3>
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <table class="w-full mb-8">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Type</th>
                <th class="px-4 py-2 text-left">Default</th>
                <th class="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="prop in props" :key="prop.name" class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2">{{ prop.name }}</td>
                <td class="px-4 py-2"><code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-800 dark:text-gray-200">{{ prop.type }}</code></td>
                <td class="px-4 py-2"><code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-800 dark:text-gray-200">{{ prop.default }}</code></td>
                <td class="px-4 py-2">{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 class="text-xl font-medium mb-3">Events</h3>
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Parameters</th>
                <th class="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="event in events" :key="event.name" class="bg-white dark:bg-gray-900">
                <td class="px-4 py-2">{{ event.name }}</td>
                <td class="px-4 py-2"><code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-800 dark:text-gray-200">{{ event.parameters }}</code></td>
                <td class="px-4 py-2">{{ event.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Examples -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Examples</h2>

      <!-- Multiple Selection -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Multiple Selection</h2>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
          <div class="max-w-md">
            <MSelect
              v-model="multiValue"
              :options="basicOptions"
              multiple
              placeholder="Choose multiple options"
            />
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected values: {{ multiValue }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <MCode language="vue">{{ multipleCode }}</MCode>
        </div>
      </section>

      <!-- Searchable -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Searchable</h2>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
          <div class="max-w-md">
            <MSelect
              v-model="searchValue"
              :options="searchOptions"
              searchable
              placeholder="Search and select"
            />
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected value: {{ searchValue }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <MCode language="vue">{{ searchableCode }}</MCode>
        </div>
      </section>

      <!-- Remote Search -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Remote Search</h2>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
          <div class="max-w-md">
            <MSelect
              v-model="remoteValue"
              :options="remoteOptions"
              searchable
              :loading="loading"
              remote
              @search="handleRemoteSearch"
              placeholder="Type to search remotely"
            />
          </div>
        </div>
        <div class="mt-4">
          <MCode language="vue">{{ remoteSearchCode }}</MCode>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Disabled State</h2>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
          <div class="max-w-md">
            <MSelect
              v-model="disabledValue"
              :options="basicOptions"
              disabled
              placeholder="Disabled select"
            />
          </div>
        </div>
        <div class="mt-4">
          <MCode language="vue">{{ disabledCode }}</MCode>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MSelect from '../../../components/select/MSelect.vue'
import MCode from '../../../components/code/MCode.vue'

// Example data
const basicValue = ref('')
const multiValue = ref([])
const searchValue = ref('')
const remoteValue = ref('')
const disabledValue = ref('')
const loading = ref(false)

const basicOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]

const searchOptions = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Orange' },
  { value: '4', label: 'Grape' },
  { value: '5', label: 'Strawberry' }
]

const remoteOptions = ref([])

// Code examples
const basicUsageCode = `<template>
  <MSelect
    v-model="value"
    :options="options"
    placeholder="Choose an option"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MSelect } from 'mao-design'

const value = ref('')
const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]
<\/script>`

const multipleCode = `<template>
  <MSelect
    v-model="value"
    :options="options"
    multiple
    placeholder="Choose multiple options"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MSelect } from 'mao-design'

const value = ref([])
const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' }
]
<\/script>`

const searchableCode = `<template>
  <MSelect
    v-model="value"
    :options="options"
    searchable
    placeholder="Search and select"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MSelect } from 'mao-design'

const value = ref('')
const options = [
  { value: '1', label: 'Apple' },
  { value: '2', label: 'Banana' },
  { value: '3', label: 'Orange' },
  { value: '4', label: 'Grape' },
  { value: '5', label: 'Strawberry' }
]
<\/script>`

const remoteSearchCode = `<template>
  <MSelect
    v-model="value"
    :options="options"
    searchable
    :loading="loading"
    @search="handleSearch"
    placeholder="Search users"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MSelect } from 'mao-design'

const value = ref('')
const options = ref([])
const loading = ref(false)

const handleSearch = async (query) => {
  if (!query) {
    options.value = []
    return
  }

  loading.value = true
  try {
    // Replace with your API call
    const response = await fetch(\`/api/search?q=\${query}\`)
    const data = await response.json()
    options.value = data.map(item => ({
      label: item.name,
      value: item.id
    }))
  } finally {
    loading.value = false
  }
}
<\/script>`

const disabledCode = `<template>
  <MSelect
    v-model="value"
    :options="options"
    disabled
    placeholder="Disabled select"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MSelect } from 'mao-design'

const value = ref('')
const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]
<\/script>`

// API documentation
const props = [
  {
    name: 'modelValue',
    type: 'String | Number | Array',
    default: '""',
    description: 'The value of the select (v-model)'
  },
  {
    name: 'options',
    type: 'Array',
    default: '[]',
    description: 'Array of options objects with value and label properties'
  },
  {
    name: 'multiple',
    type: 'Boolean',
    default: 'false',
    description: 'Enable multiple selection mode'
  },
  {
    name: 'searchable',
    type: 'Boolean',
    default: 'false',
    description: 'Enable search functionality'
  },
  {
    name: 'remote',
    type: 'Boolean',
    default: 'false',
    description: 'Enable remote search mode'
  },
  {
    name: 'loading',
    type: 'Boolean',
    default: 'false',
    description: 'Show loading state'
  },
  {
    name: 'placeholder',
    type: 'String',
    default: '""',
    description: 'Placeholder text'
  },
  {
    name: 'disabled',
    type: 'Boolean',
    default: 'false',
    description: 'Whether the select is disabled'
  }
]

const events = [
  {
    name: 'update:modelValue',
    parameters: '(value: string | number | array)',
    description: 'Emitted when the selected value changes'
  },
  {
    name: 'search',
    parameters: '(query: string)',
    description: 'Emitted when the search query changes in remote mode'
  },
  {
    name: 'change',
    parameters: '(value: string | number | array)',
    description: 'Emitted when selection changes'
  }
]

// Methods
const handleRemoteSearch = async (query) => {
  if (!query) {
    remoteOptions.value = []
    return
  }

  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  remoteOptions.value = [
    { value: '1', label: `Result 1 for "${query}"` },
    { value: '2', label: `Result 2 for "${query}"` },
    { value: '3', label: `Result 3 for "${query}"` }
  ]
  loading.value = false
}
</script>
