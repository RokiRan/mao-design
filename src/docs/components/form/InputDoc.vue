<template>
  <div class="text-gray-900 dark:text-white">
    <h1 class="text-3xl font-bold mb-8">Input Component</h1>

    <!-- 基本用法 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
        <div class="max-w-md">
          <MInput
            v-model="basicInput"
            placeholder="Basic input example"
          />
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Value: {{ basicInput }}
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

      <!-- Error State -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Error State</h2>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
          <div class="max-w-md">
            <MInput
              v-model="errorInput"
              :error="errorMessage"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div class="mt-4">
          <MCode language="vue">{{ errorCode }}</MCode>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">Disabled State</h2>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
          <div class="max-w-md">
            <MInput
              v-model="disabledInput"
              placeholder="Disabled input"
              disabled
            />
          </div>
        </div>
        <div class="mt-4">
          <MCode language="vue">{{ disabledCode }}</MCode>
        </div>
      </section>

      <!-- Different Types -->
      <div>
        <h3 class="text-lg font-medium mb-2">Input Types</h3>
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
          <div class="max-w-md space-y-4">
            <MInput
              v-model="passwordInput"
              type="password"
              placeholder="Password input"
            />
            <MInput
              v-model="numberInput"
              type="number"
              placeholder="Number input"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MInput from '../../../components/input/MInput.vue'
import MCode from '../../../components/code/MCode.vue'

// Example data
const basicInput = ref('')
const errorInput = ref('')
const disabledInput = ref('Disabled value')
const passwordInput = ref('')
const numberInput = ref('')
const errorMessage = ref('Please enter a valid email address')

// Code examples
const basicUsageCode = `<template>
  <MInput
    v-model="value"
    placeholder="Basic input example"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'mao-design'

const value = ref('')
<\/script>`

const disabledCode = `<template>
  <MInput
    v-model="value"
    placeholder="Disabled input"
    disabled
  />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'mao-design'

const value = ref('Disabled value')
<\/script>`

const errorCode = `<template>
  <MInput
    v-model="value"
    placeholder="Error input"
    :error="error"
  />
</template>

<script setup>
import { ref } from 'vue'
import { MInput } from 'mao-design'

const value = ref('')
const error = ref('Please enter a valid email address')
<\/script>`

// API documentation
const props = [
  {
    name: 'modelValue',
    type: 'String | Number',
    default: '""',
    description: 'The value of the input (v-model)'
  },
  {
    name: 'type',
    type: 'String',
    default: '"text"',
    description: 'Type of the input (text, password, number, etc.)'
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
    description: 'Whether the input is disabled'
  },
  {
    name: 'error',
    type: 'String',
    default: '""',
    description: 'Error message to display'
  }
]

const events = [
  {
    name: 'update:modelValue',
    parameters: '(value: string | number)',
    description: 'Emitted when the input value changes'
  },
  {
    name: 'input',
    parameters: '(event: Event)',
    description: 'Native input event'
  }
]
</script>
