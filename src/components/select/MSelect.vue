<template>
  <div class="m-select" @click.stop="toggleDropdown" v-click-outside="closeDropdown">
    <!-- Select Input -->
    <div
      class="m-select__input"
      :class="[
        disabled ? 'is-disabled' : '',
        isOpen ? 'is-open' : '',
        size,
        error ? 'is-error' : ''
      ]"
    >
      <div class="m-select__input-content">
        <div class="m-select__value">
          <template v-if="multiple && selectedLabels.length">
            <span v-for="(label, index) in selectedLabels" :key="index" class="m-select__tag">
              {{ label }}
              <button @click.stop="removeValue(selectedValues[index])" class="m-select__tag-remove">×</button>
            </span>
          </template>
          <template v-else-if="!multiple && selectedLabels.length">
            <span>{{ selectedLabels[0] }}</span>
          </template>
          <span v-else class="m-select__placeholder">{{ placeholder }}</span>
        </div>
        <span class="m-select__arrow">
          <svg
            class="m-select__arrow-icon"
            :class="{ 'is-open': isOpen }"
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
        class="m-select__search"
        :placeholder="searchPlaceholder"
        @click.stop
      >
    </div>

    <!-- Dropdown -->
    <div
      v-show="isOpen"
      class="m-select__dropdown"
    >
      <template v-if="loading">
        <div class="m-select__loading">{{ loadingText }}</div>
      </template>
      <template v-else>
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="m-select__option"
          :class="{ 'is-selected': isSelected(option.value) }"
          @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="filteredOptions.length === 0" class="m-select__empty">
          {{ noOptionsText }}
        </div>
      </template>
    </div>
    <p v-if="error" class="m-select__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue: string | number | (string | number)[]
  options: SelectOption[]
  multiple?: boolean
  searchable?: boolean
  remote?: boolean
  loading?: boolean
  placeholder?: string
  searchPlaceholder?: string
  loadingText?: string
  noOptionsText?: string
  disabled?: boolean
  error?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  searchable: false,
  remote: false,
  loading: false,
  placeholder: 'Select option',
  searchPlaceholder: 'Search...',
  loadingText: 'Loading...',
  noOptionsText: 'No options found',
  disabled: false,
  error: '',
  size: 'medium'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[]]
  'search': [query: string]
  'change': [value: string | number | (string | number)[]]
}>()

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
const vClickOutside = {
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
</script>

<style lang="less">
.m-select {
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    background-color: var(--bg-color);
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;

    &:hover:not(.is-disabled) {
      border-color: var(--border-color-hover);
    }

    &.is-open {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px var(--primary-color-20);
    }

    &.is-disabled {
      background-color: var(--bg-color-disabled);
      cursor: not-allowed;

      .m-select__value,
      .m-select__placeholder,
      .m-select__arrow {
        color: var(--text-color-disabled);
      }
    }

    &.is-error {
      border-color: var(--error-color);

      &.is-open {
        box-shadow: 0 0 0 2px var(--error-color-20);
      }
    }

    // 尺寸变体
    &.small {
      .m-select__input-content {
        padding: 0.25rem 0.5rem;
      }
      font-size: 0.875rem;
    }

    &.medium {
      .m-select__input-content {
        padding: 0.5rem 0.75rem;
      }
      font-size: 1rem;
    }

    &.large {
      .m-select__input-content {
        padding: 0.75rem 1rem;
      }
      font-size: 1.125rem;
    }
  }

  &__input-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }

  &__placeholder {
    color: var(--text-color-disabled);
  }

  &__arrow {
    margin-left: 0.5rem;
    color: var(--text-color-disabled);
  }

  &__arrow-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    margin: 0.125rem;
    padding: 0.125rem 0.375rem;
    background-color: var(--primary-color-10);
    color: var(--primary-color);
    border-radius: 0.25rem;
    font-size: 0.875rem;

    &-remove {
      margin-left: 0.25rem;
      color: var(--primary-color);
      opacity: 0.8;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__search {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    background-color: var(--bg-color);
    color: var(--text-color);
    outline: none;

    &:focus {
      border-color: var(--primary-color);
    }

    &::placeholder {
      color: var(--text-color-disabled);
    }
  }

  &__dropdown {
    position: absolute;
    z-index: 50;
    width: 100%;
    margin-top: 0.25rem;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px var(--shadow-color);
    max-height: 15rem;
    overflow: auto;
  }

  &__loading,
  &__empty {
    padding: 0.5rem 0.75rem;
    color: var(--text-color-disabled);
  }

  &__option {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    color: var(--text-color);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--primary-color-10);
      color: var(--primary-color);
      transform: translateX(4px);
    }

    &.is-selected {
      background-color: var(--primary-color-10);
      color: var(--primary-color);
      font-weight: 500;
    }
  }

  &__error {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--error-color);
  }
}
</style>
