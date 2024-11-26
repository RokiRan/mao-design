<template>
  <div class="input-doc">
    <h1 class="doc__title">Input Component</h1>

    <!-- 基本用法 -->
    <section class="doc__section">
      <h2 class="doc__subtitle">Basic Usage</h2>
      <div class="doc__example">
        <div class="doc__example-preview">
          <div class="max-w-md">
            <MInput
              v-model="basicInput"
              placeholder="Basic input example"
            />
            <p class="doc__desc">
              Value: {{ basicInput }}
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

      <!-- Error State -->
      <section class="doc__section">
        <h2 class="doc__subtitle">Error State</h2>
        <div class="doc__example">
          <div class="doc__example-preview">
            <div class="max-w-md">
              <MInput
                v-model="errorInput"
                :error="errorMessage"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div class="doc__example-code">
            <MCode language="vue">{{ errorCode }}</MCode>
          </div>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="doc__section">
        <h2 class="doc__subtitle">Disabled State</h2>
        <div class="doc__example">
          <div class="doc__example-preview">
            <div class="max-w-md">
              <MInput
                v-model="disabledInput"
                placeholder="Disabled input"
                disabled
              />
            </div>
          </div>
          <div class="doc__example-code">
            <MCode language="vue">{{ disabledCode }}</MCode>
          </div>
        </div>
      </section>

      <!-- Different Types -->
      <div>
        <h3 class="doc__subtitle-sub">Input Types</h3>
        <div class="doc__example">
          <div class="doc__example-preview">
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

<style lang="less">
@import '../../../docs/styles/doc.less';

.input-doc {
  .doc;
}
</style>
