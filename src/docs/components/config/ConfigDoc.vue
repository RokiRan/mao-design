<template>
  <div class="config-doc">
    <h1>主题配置 Theme</h1>
    <p>Mao Design 提供了一套完整的主题配置系统，支持自定义主题、预设主题切换和暗色模式。</p>

    <h2>基础用法</h2>
    <div class="example-card">
      <div class="example-card__preview">
        <m-config v-model:preset="currentPreset" :theme="customTheme">
          <div class="theme-demo">
            <div class="theme-demo__colors">
              <div class="theme-demo__color" style="background-color: var(--primary-color)">Primary</div>
              <div class="theme-demo__color" style="background-color: var(--success-color)">Success</div>
              <div class="theme-demo__color" style="background-color: var(--warning-color)">Warning</div>
              <div class="theme-demo__color" style="background-color: var(--error-color)">Error</div>
              <div class="theme-demo__color" style="background-color: var(--info-color)">Info</div>
            </div>
            <div class="theme-demo__text">
              <p style="color: var(--text-color)">默认文本 Default Text</p>
              <p style="color: var(--text-color-secondary)">次要文本 Secondary Text</p>
              <p style="color: var(--text-color-disabled)">禁用文本 Disabled Text</p>
            </div>
            <div class="theme-demo__buttons">
              <button class="theme-demo__button theme-demo__button--primary">Primary Button</button>
              <button class="theme-demo__button theme-demo__button--default">Default Button</button>
            </div>
          </div>
        </m-config>
      </div>
      <m-code language="vue" :code="basicCode" />
    </div>

    <h2>API</h2>
    <h3>MConfig Props</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>参数</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>theme</td>
          <td>自定义主题配置</td>
          <td>ThemeConfig</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>preset</td>
          <td>预设主题名称</td>
          <td>'default' | 'warm' | 'cool' | 'soft'</td>
          <td>'default'</td>
        </tr>
        <tr>
          <td>persist</td>
          <td>是否持久化主题配置</td>
          <td>boolean</td>
          <td>true</td>
        </tr>
      </tbody>
    </table>

    <h3>ThemeConfig</h3>
    <m-code language="typescript" :code="themeConfigCode" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MConfig } from '@/components/config'
import { MCode } from '@/components/code'
import type { ThemeConfig } from '@/components/config'

const currentPreset = ref('default')
const customTheme = ref<Partial<ThemeConfig>>({
  // 可以在这里覆盖预设主题的配置
})

const basicCode = `<template>
  <m-config v-model:preset="currentPreset" :theme="customTheme">
    <!-- 你的应用内容 -->
  </m-config>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MConfig } from '@/components/config'
import type { ThemeConfig } from '@/components/config'

const currentPreset = ref('default')
const customTheme = ref<Partial<ThemeConfig>>({
  // 自定义主题配置
})
<\/script>`

const themeConfigCode = `interface ThemeConfig {
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
}`
</script>

<style lang="less" scoped>
.config-doc {
  padding: 2rem;

  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 600;
  }

  h2 {
    margin: 2rem 0 1rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  h3 {
    margin: 1.5rem 0 1rem;
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
}

.example-card {
  margin: 1rem 0;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;

  &__preview {
    padding: 2rem;
    background-color: var(--bg-color);
    border-bottom: 1px solid var(--border-color);
  }
}

.theme-demo {
  margin-top: 2rem;

  &__colors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__color {
    padding: 1rem;
    color: white;
    text-align: center;
    border-radius: 0.5rem;
    font-size: 0.875rem;
  }

  &__text {
    margin-bottom: 2rem;

    p {
      margin: 0.5rem 0;
    }
  }

  &__buttons {
    display: flex;
    gap: 1rem;
  }

  &__button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &--primary {
      background-color: var(--primary-color);
      color: white;

      &:hover {
        opacity: 0.9;
      }
    }

    &--default {
      background-color: var(--bg-color-secondary);
      color: var(--text-color);
      border: 1px solid var(--border-color);

      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
  }
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    font-weight: 500;
    background-color: var(--bg-color-secondary);
  }

  td {
    color: var(--text-color-secondary);
  }
}
</style>
