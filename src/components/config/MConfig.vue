<template>
  <div class="m-config">
    <slot name="prefix"></slot>
    <div class="m-config__content">
      <slot></slot>
    </div>
    <slot name="suffix"></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, watch, onMounted, ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import type { ThemeConfig } from './types'
import { presets, defaultPreset } from './presets'
import { useThemeStorage } from './useThemeStorage'

const props = withDefaults(defineProps<{
  theme?: Partial<ThemeConfig>
  preset?: keyof typeof presets
  persist?: boolean
}>(), {
  theme: () => ({}),
  preset: 'default',
  persist: true
})

const emits = defineEmits<{
  (e: 'update:preset', value: keyof typeof presets): void
  (e: 'theme-change', theme: ThemeConfig): void
}>()

// 获取主题存储工具
const { saveTheme, loadTheme, saveDarkMode, loadDarkMode } = useThemeStorage()

// 初始化主题配置
const currentPreset = ref<keyof typeof presets>(props.preset)
const theme = reactive<ThemeConfig>({
  ...defaultPreset,
  ...presets[currentPreset.value],
  ...props.theme
})

// 监听系统主题变化
const isDark = useMediaQuery('(prefers-color-scheme: dark)')
const forceDark = ref<boolean | null>(props.persist ? loadDarkMode() : null)

// 更新主题变量
const updateThemeVariables = () => {
  const root = document.documentElement
  const isDarkMode = forceDark.value ?? isDark.value

  // 更新 CSS 变量
  root.style.setProperty('--primary-color', isDarkMode ? theme.darkPrimaryColor : theme.primaryColor)
  root.style.setProperty('--success-color', isDarkMode ? theme.darkSuccessColor : theme.successColor)
  root.style.setProperty('--warning-color', isDarkMode ? theme.darkWarningColor : theme.warningColor)
  root.style.setProperty('--error-color', isDarkMode ? theme.darkErrorColor : theme.errorColor)
  root.style.setProperty('--info-color', isDarkMode ? theme.darkInfoColor : theme.infoColor)

  root.style.setProperty('--text-color', isDarkMode ? theme.darkTextColor : theme.textColor)
  root.style.setProperty('--text-color-secondary', isDarkMode ? theme.darkTextColorSecondary : theme.textColorSecondary)
  root.style.setProperty('--text-color-disabled', isDarkMode ? theme.darkTextColorDisabled : theme.textColorDisabled)

  root.style.setProperty('--bg-color', isDarkMode ? theme.darkBgColor : theme.bgColor)
  root.style.setProperty('--bg-color-secondary', isDarkMode ? theme.darkBgColorSecondary : theme.bgColorSecondary)
  root.style.setProperty('--bg-color-disabled', isDarkMode ? theme.darkBgColorDisabled : theme.bgColorDisabled)

  root.style.setProperty('--border-color', isDarkMode ? theme.darkBorderColor : theme.borderColor)
  root.style.setProperty('--border-color-hover', isDarkMode ? theme.darkBorderColorHover : theme.borderColorHover)

  // 更新 body class
  document.body.classList.toggle('dark', isDarkMode)

  // 保存主题配置
  if (props.persist) {
    saveTheme(theme)
    saveDarkMode(isDarkMode)
  }

  // 触发主题变更事件
  emits('theme-change', theme)
}

// 切换暗色模式
const toggleDarkMode = () => {
  forceDark.value = forceDark.value === null ? isDark.value : !forceDark.value
  updateThemeVariables()
}

// 切换预设主题
const changePreset = (preset: keyof typeof presets) => {
  currentPreset.value = preset
  Object.assign(theme, defaultPreset, presets[preset], props.theme)
  emits('update:preset', preset)
  updateThemeVariables()
}

// 监听主题配置变化
watch(() => props.theme, (newTheme) => {
  Object.assign(theme, defaultPreset, presets[currentPreset.value], newTheme)
  updateThemeVariables()
}, { deep: true })

// 监听预设主题变化
watch(() => props.preset, (newPreset) => {
  if (newPreset !== currentPreset.value) {
    changePreset(newPreset)
  }
})

// 监听系统主题变化
watch(isDark, () => {
  if (forceDark.value === null) {
    updateThemeVariables()
  }
})

// 组件挂载时初始化主题
onMounted(() => {
  // 加载保存的主题
  if (props.persist) {
    const savedTheme = loadTheme()
    if (savedTheme) {
      Object.assign(theme, savedTheme)
    }
  }
  updateThemeVariables()
})

// 提供主题上下文给子组件
provide('theme', {
  ...theme,
  isDark: computed(() => forceDark.value ?? isDark.value),
  toggleDarkMode,
  changePreset,
  currentPreset: computed(() => currentPreset.value)
})
</script>

<style lang="less">
.m-config {
  display: contents;
}
</style>
