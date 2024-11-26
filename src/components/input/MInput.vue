<template>
  <div class="relative">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      class="m-input"
      :class="[
        error ? 'is-error' : '',
        disabled ? 'is-disabled' : '',
        size
      ]"
      @input="handleInput"
    >
    <p v-if="error" class="m-input__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: '',
  size: 'medium'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'input': [event: Event]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}
</script>

<style lang="less">
.m-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  outline: none;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--text-color-disabled);
  }

  &:hover:not(:disabled) {
    border-color: var(--border-color-hover);
  }

  &:focus:not(:disabled) {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color-20);
  }

  &.is-error {
    border-color: var(--error-color);

    &:focus {
      border-color: var(--error-color);
      box-shadow: 0 0 0 2px var(--error-color-20);
    }
  }

  &.is-disabled {
    background-color: var(--bg-color-disabled);
    color: var(--text-color-disabled);
    cursor: not-allowed;

    &::placeholder {
      color: var(--text-color-disabled);
    }
  }

  // 尺寸变体
  &.small {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }

  &.medium {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
  }

  &.large {
    padding: 0.75rem 1rem;
    font-size: 1.125rem;
  }
}

.m-input__error {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--error-color);
}
</style>
