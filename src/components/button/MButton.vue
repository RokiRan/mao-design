<template>
  <button
    :class="[
      'm-button',
      `m-button--${type}`,
      `m-button--${size}`,
      {
        'is-loading': loading,
        'is-disabled': disabled || loading,
        'is-round': round,
        'is-plain': plain,
        'is-text': text,
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Icon -->
    <span v-if="loading" class="m-button__loading">
      <svg class="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    
    <!-- Icon -->
    <span v-if="$slots.icon && !loading" class="m-button__icon">
      <slot name="icon"></slot>
    </span>
    
    <!-- Content -->
    <span class="m-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import type { ThemeContext } from '../config/types'

// Props
const props = withDefaults(defineProps<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  disabled?: boolean
  round?: boolean
  plain?: boolean
  text?: boolean
  debounce?: number
}>(), {
  type: 'default',
  size: 'medium',
  loading: false,
  disabled: false,
  round: false,
  plain: false,
  text: false,
  debounce: 300
})

// Emits
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// Theme context
const theme = inject<ThemeContext>('theme')

// Debounced click handler
const handleClick = useDebounceFn((event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}, props.debounce)
</script>

<style lang="less">
.m-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  outline: none;
  cursor: pointer;
  user-select: none;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transform: translateY(0);
  transition: all 0.15s ease-in-out;
  -webkit-tap-highlight-color: transparent;  /* 移除移动端点击高亮 */

  &:focus {
    outline: none;

    // 手动处理
    // box-shadow: 0 0 0 2px var(--bg-color), 0 0 0 4px var(--primary-color);
  }

  &__loading {
    margin-right: 0.5rem;
    margin-left: -0.25rem;
    width: 1rem;
    height: 1rem;
  }

  &__icon {
    margin-right: 0.5rem;
    margin-left: -0.25rem;
  }

  &__content {
    white-space: nowrap;
  }

  // Types
  &--default {
    background-color: var(--bg-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover:not(.is-disabled) {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    &.is-plain {
      background-color: var(--bg-color-secondary);
    }

    &.is-text {
      border-color: transparent;
      background-color: transparent;

      &:hover:not(.is-disabled) {
        background-color: var(--bg-color-secondary);
      }
    }
  }

  &--primary {
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    color: white;

    &:hover:not(.is-disabled) {
      opacity: 0.9;
    }

    &.is-plain {
      background-color: transparent;
      color: var(--primary-color);

      &:hover:not(.is-disabled) {
        background-color: var(--primary-color);
        color: white;
      }
    }

    &.is-text {
      background-color: transparent;
      border-color: transparent;
      color: var(--primary-color);

      &:hover:not(.is-disabled) {
        background-color: rgba(var(--primary-color-rgb), 0.1);
      }
    }
  }

  &--success {
    background-color: var(--success-color);
    border: 1px solid var(--success-color);
    color: white;

    &:hover:not(.is-disabled) {
      opacity: 0.9;
    }

    &.is-plain {
      background-color: transparent;
      color: var(--success-color);

      &:hover:not(.is-disabled) {
        background-color: var(--success-color);
        color: white;
      }
    }

    &.is-text {
      background-color: transparent;
      border-color: transparent;
      color: var(--success-color);

      &:hover:not(.is-disabled) {
        background-color: rgba(var(--success-color-rgb), 0.1);
      }
    }
  }

  &--warning {
    background-color: var(--warning-color);
    border: 1px solid var(--warning-color);
    color: white;

    &:hover:not(.is-disabled) {
      opacity: 0.9;
    }

    &.is-plain {
      background-color: transparent;
      color: var(--warning-color);

      &:hover:not(.is-disabled) {
        background-color: var(--warning-color);
        color: white;
      }
    }

    &.is-text {
      background-color: transparent;
      border-color: transparent;
      color: var(--warning-color);

      &:hover:not(.is-disabled) {
        background-color: rgba(var(--warning-color-rgb), 0.1);
      }
    }
  }

  &--error {
    background-color: var(--error-color);
    border: 1px solid var(--error-color);
    color: white;

    &:hover:not(.is-disabled) {
      opacity: 0.9;
    }

    &.is-plain {
      background-color: transparent;
      color: var(--error-color);

      &:hover:not(.is-disabled) {
        background-color: var(--error-color);
        color: white;
      }
    }

    &.is-text {
      background-color: transparent;
      border-color: transparent;
      color: var(--error-color);

      &:hover:not(.is-disabled) {
        background-color: rgba(var(--error-color-rgb), 0.1);
      }
    }
  }

  &--info {
    background-color: var(--info-color);
    border: 1px solid var(--info-color);
    color: white;

    &:hover:not(.is-disabled) {
      opacity: 0.9;
    }

    &.is-plain {
      background-color: transparent;
      color: var(--info-color);

      &:hover:not(.is-disabled) {
        background-color: var(--info-color);
        color: white;
      }
    }

    &.is-text {
      background-color: transparent;
      border-color: transparent;
      color: var(--info-color);

      &:hover:not(.is-disabled) {
        background-color: rgba(var(--info-color-rgb), 0.1);
      }
    }
  }

  // Sizes
  &--small {
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  }

  &--medium {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  &--large {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  // States
  &.is-round {
    border-radius: 9999px;
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      opacity: 0.5;
    }
  }

  &.is-loading {
    cursor: wait;

    .m-button__loading {
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Dark mode
.dark {
  .m-button {
    &--default {
      background-color: var(--dark-bg-color);
      color: var(--dark-text-color);
      border-color: var(--dark-border-color);

      &:hover:not(.is-disabled) {
        border-color: var(--dark-primary-color);
        color: var(--dark-primary-color);
      }

      &.is-plain {
        background-color: var(--dark-bg-color-secondary);
      }

      &.is-text {
        &:hover:not(.is-disabled) {
          background-color: var(--dark-bg-color-secondary);
        }
      }
    }
  }
}
</style>
