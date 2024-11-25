<template>
  <div class="relative">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full px-3 py-2 border rounded-md outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
      :class="[
        error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500',
        disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' : 'bg-white dark:bg-gray-800'
      ]"
      @input="handleInput"
    >
    <p v-if="error" class="mt-1 text-sm text-red-500 dark:text-red-400">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { InputProps, InputEvents } from '../../types/components'

export default defineComponent({
  name: 'MInput',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  } as const,
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
      emit('input', event)
    }

    return {
      handleInput
    }
  }
})
</script>
