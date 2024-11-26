<template>
  <button class="m-dark-mode-switcher" @click="toggleDarkMode">
    <span class="m-dark-mode-switcher__icon">
      {{ isDark ? '🌙' : '☀️' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { ThemeContext } from './types'

const theme = inject<ThemeContext>('theme')
if (!theme) {
  throw new Error('MDarkModeSwitcher must be used within MConfig')
}

const { isDark, toggleDarkMode } = theme
</script>

<style lang="less">
.m-dark-mode-switcher {
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border: none;
  border-radius: 0.375rem;
  background: none;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-color-disabled);
  }

  &__icon {
    font-size: 1.25rem;
  }
}
</style>
