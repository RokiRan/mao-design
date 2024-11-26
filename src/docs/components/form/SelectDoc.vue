<template>
  <div class="select-doc">
    <h1 class="doc__title">Select Component</h1>

    <!-- 基本用法 -->
    <section class="doc__section">
      <h2 class="doc__subtitle">Basic Usage</h2>
      <div class="doc__example">
        <div class="doc__example-preview">
          <div class="max-w-md">
            <MSelect
              v-model="basicValue"
              :options="basicOptions"
              placeholder="Choose an option"
            />
            <p class="doc__desc">
              Selected value: {{ basicValue }}
            </p>
          </div>
        </div>
        <div class="doc__example-code">
          <MCode language="vue">{{ basicUsageCode }}</MCode>
        </div>
      </div>
    </section>

    <!-- API -->
    <section class="doc__section">
      <h2 class="doc__subtitle">API</h2>
      
      <h3 class="doc__subtitle-sub">Props</h3>
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <table class="doc__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in props" :key="prop.name">
                <td>{{ prop.name }}</td>
                <td><code>{{ prop.type }}</code></td>
                <td><code>{{ prop.default }}</code></td>
                <td>{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 class="doc__subtitle-sub">Events</h3>
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <table class="doc__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Parameters</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events" :key="event.name">
                <td>{{ event.name }}</td>
                <td><code>{{ event.parameters }}</code></td>
                <td>{{ event.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Examples -->
    <section class="doc__section">
      <h2 class="doc__subtitle">Examples</h2>

      <!-- Multiple Selection -->
      <section class="doc__section">
        <h2 class="doc__subtitle">Multiple Selection</h2>
        <div class="doc__example">
          <div class="doc__example-preview">
            <div class="max-w-md">
              <MSelect
                v-model="multiValue"
                :options="basicOptions"
                multiple
                placeholder="Choose multiple options"
              />
              <p class="doc__desc">
                Selected values: {{ multiValue }}
              </p>
            </div>
          </div>
          <div class="doc__example-code">
            <MCode language="vue">{{ multipleCode }}</MCode>
          </div>
        </div>
      </section>

      <!-- Searchable -->
      <section class="doc__section">
        <h2 class="doc__subtitle">Searchable</h2>
        <div class="doc__example">
          <div class="doc__example-preview">
            <div class="max-w-md">
              <MSelect
                v-model="searchValue"
                :options="searchOptions"
                searchable
                placeholder="Search and select"
              />
              <p class="doc__desc">
                Selected value: {{ searchValue }}
              </p>
            </div>
          </div>
          <div class="doc__example-code">
            <MCode language="vue">{{ searchableCode }}</MCode>
          </div>
        </div>
      </section>

      <!-- Remote Search -->
      <section class="doc__section">
        <h2 class="doc__subtitle">Remote Search</h2>
        <div class="doc__example">
          <div class="doc__example-preview">
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
          <div class="doc__example-code">
            <MCode language="vue">{{ remoteSearchCode }}</MCode>
          </div>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="doc__section">
        <h2 class="doc__subtitle">Disabled State</h2>
        <div class="doc__example">
          <div class="doc__example-preview">
            <div class="max-w-md">
              <MSelect
                v-model="disabledValue"
                :options="basicOptions"
                disabled
                placeholder="Disabled select"
              />
            </div>
          </div>
          <div class="doc__example-code">
            <MCode language="vue">{{ disabledCode }}</MCode>
          </div>
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

<style lang="less">
@import '../../../docs/styles/doc.less';

.select-doc {
  .doc;
}
</style>
