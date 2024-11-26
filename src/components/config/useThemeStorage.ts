import type { ThemeConfig } from './types'

const THEME_STORAGE_KEY = 'mao-theme'
const DARK_MODE_KEY = 'mao-dark-mode'

export function useThemeStorage() {
  // 保存主题配置
  const saveTheme = (theme: Partial<ThemeConfig>) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme))
    } catch (error) {
      console.error('Failed to save theme:', error)
    }
  }

  // 获取保存的主题配置
  const loadTheme = (): Partial<ThemeConfig> | null => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Failed to load theme:', error)
      return null
    }
  }

  // 保存暗色模式状态
  const saveDarkMode = (isDark: boolean) => {
    try {
      localStorage.setItem(DARK_MODE_KEY, String(isDark))
    } catch (error) {
      console.error('Failed to save dark mode:', error)
    }
  }

  // 获取保存的暗色模式状态
  const loadDarkMode = (): boolean | null => {
    try {
      const saved = localStorage.getItem(DARK_MODE_KEY)
      return saved ? saved === 'true' : null
    } catch (error) {
      console.error('Failed to load dark mode:', error)
      return null
    }
  }

  // 清除保存的主题配置
  const clearTheme = () => {
    try {
      localStorage.removeItem(THEME_STORAGE_KEY)
      localStorage.removeItem(DARK_MODE_KEY)
    } catch (error) {
      console.error('Failed to clear theme:', error)
    }
  }

  return {
    saveTheme,
    loadTheme,
    saveDarkMode,
    loadDarkMode,
    clearTheme
  }
}
