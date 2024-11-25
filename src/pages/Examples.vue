<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Mao Design Components</h1>
    
    <!-- Input Component Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Input Component</h2>
      
      <!-- Basic Input -->
      <div class="mb-8">
        <h3 class="text-lg font-medium mb-2">Basic Input</h3>
        <div class="max-w-md">
          <MInput
            v-model="basicInput"
            placeholder="Basic input example"
          />
          <p class="mt-2 text-sm text-gray-600">
            Value: {{ basicInput }}
          </p>
        </div>
      </div>

      <!-- Input with Error -->
      <div class="mb-8">
        <h3 class="text-lg font-medium mb-2">Input with Error</h3>
        <div class="max-w-md">
          <MInput
            v-model="errorInput"
            placeholder="Enter your email"
            :error="errorMessage"
          />
        </div>
      </div>

      <!-- Disabled Input -->
      <div class="mb-8">
        <h3 class="text-lg font-medium mb-2">Disabled Input</h3>
        <div class="max-w-md">
          <MInput
            v-model="disabledInput"
            placeholder="This input is disabled"
            disabled
          />
        </div>
      </div>

      <!-- Different Types -->
      <div class="mb-8">
        <h3 class="text-lg font-medium mb-2">Different Input Types</h3>
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
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MInput from '../components/input/MInput.vue'

const basicInput = ref('')
const errorInput = ref('')
const disabledInput = ref('Disabled value')
const passwordInput = ref('')
const numberInput = ref('')
const errorMessage = ref('Please enter a valid email address')
</script>
