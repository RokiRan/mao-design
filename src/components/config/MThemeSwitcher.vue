<template>
  <div class="m-theme-switcher">
    <!-- 主显示区域 -->
    <div 
      class="m-theme-switcher__display" 
      @mouseenter="showMenu"
    >
      <div class="m-theme-switcher__current">
        <div class="m-theme-switcher__preset-colors">
          <div
            v-for="color in presetColors"
            :key="color"
            class="m-theme-switcher__preset-color"
            :style="{ backgroundColor: presets[currentPreset][color] }"
          ></div>
        </div>
        <span class="m-theme-switcher__preset-name">{{ currentPreset }}</span>
      </div>
    </div>

    <!-- 悬浮菜单 -->
    <div 
      v-show="isMenuVisible" 
      class="m-theme-switcher__menu"
      @mouseleave="hideMenuDelayed"
      @mouseenter="cancelHideMenu"
    >
      <div class="m-theme-switcher__presets">
        <div
          v-for="(preset, name) in presets"
          :key="name"
          class="m-theme-switcher__preset"
          :class="{ 'is-active': name === currentPreset }"
          @click="selectPreset(name)"
        >
          <div class="m-theme-switcher__preset-colors">
            <div
              v-for="color in presetColors"
              :key="color"
              class="m-theme-switcher__preset-color"
              :style="{ backgroundColor: preset[color] }"
            ></div>
          </div>
          <span class="m-theme-switcher__preset-name">{{ name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { presets } from './presets'
import type { ThemeConfig, ThemeContext } from './types'

const theme = inject<ThemeContext>('theme')
if (!theme) {
  throw new Error('MThemeSwitcher must be used within MConfig')
}

const { isDark, toggleDarkMode, changePreset, currentPreset } = theme
const isMenuVisible = ref(false)
let hideMenuTimeout: NodeJS.Timeout | null = null

// 预设主题展示的颜色
const presetColors = ['primaryColor', 'successColor', 'warningColor', 'errorColor', 'infoColor']

// 显示菜单
const showMenu = () => {
  if (hideMenuTimeout) {
    clearTimeout(hideMenuTimeout)
    hideMenuTimeout = null
  }
  isMenuVisible.value = true
}

// 延迟隐藏菜单
const hideMenuDelayed = () => {
  hideMenuTimeout = setTimeout(() => {
    isMenuVisible.value = false
  }, 200)
}

// 取消隐藏菜单
const cancelHideMenu = () => {
  if (hideMenuTimeout) {
    clearTimeout(hideMenuTimeout)
    hideMenuTimeout = null
  }
}

// 选择主题并隐藏菜单
const selectPreset = (name: string) => {
  changePreset(name)
  isMenuVisible.value = false
}
</script>

<style lang="less">
.m-theme-switcher {
  position: relative;
  display: inline-block;

  &__display {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--bg-color-secondary);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--bg-color-disabled);
    }
  }

  &__current {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    width: max-content;
    padding: 1rem;
    background-color: var(--bg-color);
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    z-index: 50;
  }

  &__presets {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    min-width: 240px;
  }

  &__preset {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--bg-color-secondary);
    }

    &.is-active {
      background-color: var(--bg-color-secondary);
      outline: 2px solid var(--primary-color);
    }
  }

  &__preset-colors {
    display: flex;
    gap: 0.25rem;
  }

  &__preset-color {
    width: 1rem;
    height: 1rem;
    border-radius: 0.25rem;
  }

  &__preset-name {
    font-size: 0.875rem;
    color: var(--text-color);
    text-transform: capitalize;
  }
}
</style>
