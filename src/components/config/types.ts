// 主题配置接口
export interface ThemeConfig {
  // 主题色
  primaryColor: string
  successColor: string
  warningColor: string
  errorColor: string
  infoColor: string

  // 文字颜色
  textColor: string
  textColorSecondary: string
  textColorDisabled: string

  // 背景颜色
  bgColor: string
  bgColorSecondary: string
  bgColorDisabled: string

  // 边框颜色
  borderColor: string
  borderColorHover: string

  // 暗色主题色
  darkPrimaryColor: string
  darkSuccessColor: string
  darkWarningColor: string
  darkErrorColor: string
  darkInfoColor: string

  // 暗色文字颜色
  darkTextColor: string
  darkTextColorSecondary: string
  darkTextColorDisabled: string

  // 暗色背景颜色
  darkBgColor: string
  darkBgColorSecondary: string
  darkBgColorDisabled: string

  // 暗色边框颜色
  darkBorderColor: string
  darkBorderColorHover: string
}

// 主题配置上下文
export interface ThemeContext extends ThemeConfig {
  // 主题相关的方法
  updateTheme?: (config: Partial<ThemeConfig>) => void
  toggleDarkMode?: () => void
}
