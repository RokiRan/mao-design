import type { ThemeConfig } from './types'

// 默认主题
export const defaultPreset: ThemeConfig = {
  primaryColor: '#3b82f6',
  successColor: '#10b981',
  warningColor: '#f59e0b',
  errorColor: '#ef4444',
  infoColor: '#6b7280',
  
  textColor: '#111827',
  textColorSecondary: '#4b5563',
  textColorDisabled: '#9ca3af',
  
  bgColor: '#ffffff',
  bgColorSecondary: '#f3f4f6',
  bgColorDisabled: '#e5e7eb',
  
  borderColor: '#e5e7eb',
  borderColorHover: '#d1d5db',
  
  darkPrimaryColor: '#60a5fa',
  darkSuccessColor: '#34d399',
  darkWarningColor: '#fbbf24',
  darkErrorColor: '#f87171',
  darkInfoColor: '#9ca3af',
  
  darkTextColor: '#f9fafb',
  darkTextColorSecondary: '#e5e7eb',
  darkTextColorDisabled: '#6b7280',
  
  darkBgColor: '#111827',
  darkBgColorSecondary: '#1f2937',
  darkBgColorDisabled: '#374151',
  
  darkBorderColor: '#374151',
  darkBorderColorHover: '#4b5563',
}

// 暖色主题
export const warmPreset: ThemeConfig = {
  ...defaultPreset,
  primaryColor: '#f97316',
  successColor: '#84cc16',
  warningColor: '#eab308',
  errorColor: '#ef4444',
  infoColor: '#8b5cf6',
  
  darkPrimaryColor: '#fb923c',
  darkSuccessColor: '#a3e635',
  darkWarningColor: '#facc15',
  darkErrorColor: '#f87171',
  darkInfoColor: '#a78bfa',
}

// 冷色主题
export const coolPreset: ThemeConfig = {
  ...defaultPreset,
  primaryColor: '#06b6d4',
  successColor: '#10b981',
  warningColor: '#0ea5e9',
  errorColor: '#6366f1',
  infoColor: '#8b5cf6',
  
  darkPrimaryColor: '#22d3ee',
  darkSuccessColor: '#34d399',
  darkWarningColor: '#38bdf8',
  darkErrorColor: '#818cf8',
  darkInfoColor: '#a78bfa',
}

// 柔和主题
export const softPreset: ThemeConfig = {
  ...defaultPreset,
  primaryColor: '#ec4899',
  successColor: '#14b8a6',
  warningColor: '#f59e0b',
  errorColor: '#dc2626',
  infoColor: '#6366f1',
  
  darkPrimaryColor: '#f472b6',
  darkSuccessColor: '#2dd4bf',
  darkWarningColor: '#fbbf24',
  darkErrorColor: '#ef4444',
  darkInfoColor: '#818cf8',
}

export const presets = {
  default: defaultPreset,
  warm: warmPreset,
  cool: coolPreset,
  soft: softPreset,
}
