<template>
  <div class="relative" @click.stop="toggleDropdown" v-click-outside="closeDropdown">
    <!-- Select Input -->
    <div
      class="w-full px-3 py-2 border rounded-md cursor-pointer select-none transition-colors"
      :class="[
        disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-800 hover:border-blue-500',
        isOpen ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600',
      ]"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1 truncate">
          <template v-if="multiple && selectedLabels.length">
            <span v-for="(label, index) in selectedLabels" :key="index" class="inline-flex items-center m-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
              {{ label }}
              <button @click.stop="removeValue(selectedValues[index])" class="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100">×</button>
            </span>
          </template>
          <template v-else-if="!multiple && selectedLabels.length">
            <span class="text-gray-900 dark:text-white">{{ selectedLabels[0] }}</span>
          </template>
          <span v-else class="text-gray-400 dark:text-gray-500">{{ placeholder }}</span>
        </div>
        <span class="ml-2 text-gray-400 dark:text-gray-500">
          <svg
            class="w-4 h-4 transition-transform"
            :class="{ 'transform rotate-180': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <!-- Search Input -->
      <input
        v-if="searchable && isOpen"
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        class="w-full mt-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
        placeholder="Search..."
        @click.stop
      >
    </div>

    <!-- Dropdown -->
    <div
      v-show="isOpen"
      class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <template v-if="loading">
        <div class="px-4 py-2 text-gray-500 dark:text-gray-400">Loading...</div>
      </template>
      <template v-else>
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          :class="{ 'bg-blue-50 dark:bg-blue-900/50': isSelected(option.value) }"
          @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-500 dark:text-gray-400">
          No options found
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { SelectProps, SelectOption } from '../../types/components'

export default defineComponent({
  name: 'MSelect',
  props: {
    modelValue: {
      type: [String, Number, Array],
      required: true
    },
    options: {
      type: Array as () => SelectOption[],
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Select option'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  } as const,
  emits: ['update:modelValue', 'search', 'change'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const searchQuery = ref('')
    const searchInput = ref<HTMLInputElement | null>(null)

    // Computed Properties
    const selectedValues = computed(() => {
      return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
    })

    const selectedLabels = computed(() => {
      return selectedValues.value.map(value => {
        const option = props.options.find(opt => opt.value === value)
        return option ? option.label : ''
      })
    })

    const filteredOptions = computed(() => {
      if (!searchQuery.value || props.remote) return props.options
      
      return props.options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    // Methods
    const toggleDropdown = () => {
      if (props.disabled) return
      isOpen.value = !isOpen.value
      if (isOpen.value && props.searchable) {
        nextTick(() => {
          searchInput.value?.focus()
        })
      }
    }

    const closeDropdown = () => {
      isOpen.value = false
      searchQuery.value = ''
    }

    const isSelected = (value: string | number) => {
      return selectedValues.value.includes(value)
    }

    const selectOption = (option: SelectOption) => {
      if (props.disabled) return

      let newValue
      if (props.multiple) {
        const values = [...selectedValues.value]
        const index = values.indexOf(option.value)
        if (index === -1) {
          values.push(option.value)
        } else {
          values.splice(index, 1)
        }
        newValue = values
      } else {
        newValue = option.value
        closeDropdown()
      }

      emit('update:modelValue', newValue)
      emit('change', newValue)
    }

    const removeValue = (value: string | number) => {
      if (props.disabled) return

      if (props.multiple) {
        const values = selectedValues.value.filter(v => v !== value)
        emit('update:modelValue', values)
        emit('change', values)
      }
    }

    // Watch
    watch(searchQuery, (newQuery) => {
      if (props.remote) {
        emit('search', newQuery)
      }
    })

    // Click Outside Directive
    const clickOutside = {
      mounted(el: HTMLElement, binding: any) {
        el._clickOutside = (event: Event) => {
          if (!(el === event.target || el.contains(event.target as Node))) {
            binding.value(event)
          }
        }
        document.addEventListener('click', el._clickOutside)
      },
      unmounted(el: HTMLElement) {
        document.removeEventListener('click', el._clickOutside)
      }
    }

    return {
      isOpen,
      searchQuery,
      searchInput,
      selectedValues,
      selectedLabels,
      filteredOptions,
      toggleDropdown,
      closeDropdown,
      isSelected,
      selectOption,
      removeValue
    }
  },
  directives: {
    'click-outside': {
      mounted(el: HTMLElement, binding: any) {
        el._clickOutside = (event: Event) => {
          if (!(el === event.target || el.contains(event.target as Node))) {
            binding.value(event)
          }
        }
        document.addEventListener('click', el._clickOutside)
      },
      unmounted(el: HTMLElement) {
        document.removeEventListener('click', el._clickOutside)
      }
    }
  }
})
</script>

<style scoped>
.select-none {
  user-select: none;
}
</style>
