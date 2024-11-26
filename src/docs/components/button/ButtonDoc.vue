<template>
  <div class="button-doc">
    <h1 class="button-doc__title">按钮 Button</h1>
    <p class="button-doc__desc">常用的操作按钮，支持多种状态和样式。</p>

    <h2 class="button-doc__subtitle">基础用法</h2>
    <div class="example-card">
      <div class="example-card__preview">
        <div class="button-doc__group">
          <m-button>默认按钮</m-button>
          <m-button type="primary">主要按钮</m-button>
          <m-button type="success">成功按钮</m-button>
          <m-button type="warning">警告按钮</m-button>
          <m-button type="error">错误按钮</m-button>
          <m-button type="info">信息按钮</m-button>
        </div>
      </div>
      <m-code language="vue" :code="basicCode" />
    </div>

    <h2 class="button-doc__subtitle">加载状态</h2>
    <div class="example-card">
      <div class="example-card__preview">
        <div class="button-doc__group">
          <m-button loading>加载中</m-button>
          <m-button type="primary" loading>加载中</m-button>
          <m-button type="primary" @click="handleAsyncClick">点击加载</m-button>
        </div>
      </div>
      <m-code language="vue" :code="loadingCode" />
    </div>

    <h2 class="button-doc__subtitle">按钮尺寸</h2>
    <div class="example-card">
      <div class="example-card__preview">
        <div class="button-doc__group">
          <m-button size="small">小型按钮</m-button>
          <m-button>默认按钮</m-button>
          <m-button size="large">大型按钮</m-button>
        </div>
      </div>
      <m-code language="vue" :code="sizeCode" />
    </div>

    <h2 class="button-doc__subtitle">朴素按钮</h2>
    <div class="example-card">
      <div class="example-card__preview">
        <div class="button-doc__group">
          <m-button plain>朴素按钮</m-button>
          <m-button type="primary" plain>主要按钮</m-button>
          <m-button type="success" plain>成功按钮</m-button>
        </div>
      </div>
      <m-code language="vue" :code="plainCode" />
    </div>

    <h2 class="button-doc__subtitle">文字按钮</h2>
    <div class="example-card">
      <div class="example-card__preview">
        <div class="button-doc__group">
          <m-button text>文字按钮</m-button>
          <m-button type="primary" text>主要按钮</m-button>
          <m-button type="success" text>成功按钮</m-button>
        </div>
      </div>
      <m-code language="vue" :code="textCode" />
    </div>

    <h2 class="button-doc__subtitle">圆角按钮</h2>
    <div class="example-card">
      <div class="example-card__preview">
        <div class="button-doc__group">
          <m-button round>圆角按钮</m-button>
          <m-button type="primary" round>主要按钮</m-button>
          <m-button type="success" round>成功按钮</m-button>
        </div>
      </div>
      <m-code language="vue" :code="roundCode" />
    </div>

    <h2 class="button-doc__subtitle">API</h2>
    <h3 class="button-doc__subtitle-sub">Props</h3>
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
          <td>type</td>
          <td>按钮类型</td>
          <td>'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'</td>
          <td>'default'</td>
        </tr>
        <tr>
          <td>size</td>
          <td>按钮尺寸</td>
          <td>'small' | 'medium' | 'large'</td>
          <td>'medium'</td>
        </tr>
        <tr>
          <td>loading</td>
          <td>是否加载中状态</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用状态</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>round</td>
          <td>是否圆角按钮</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>plain</td>
          <td>是否朴素按钮</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>text</td>
          <td>是否文字按钮</td>
          <td>boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>debounce</td>
          <td>点击防抖延迟（毫秒）</td>
          <td>number</td>
          <td>300</td>
        </tr>
      </tbody>
    </table>

    <h3 class="button-doc__subtitle-sub">Events</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>事件名</th>
          <th>说明</th>
          <th>参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>click</td>
          <td>点击按钮时触发</td>
          <td>(event: MouseEvent)</td>
        </tr>
      </tbody>
    </table>

    <h3 class="button-doc__subtitle-sub">Slots</h3>
    <table class="api-table">
      <thead>
        <tr>
          <th>插槽名</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>default</td>
          <td>按钮内容</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>按钮图标</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MButton } from '@/components/button'
import { MCode } from '@/components/code'

// 异步点击示例
const loading = ref(false)
const handleAsyncClick = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
}

// 示例代码
const basicCode = `<template>
  <m-button>默认按钮</m-button>
  <m-button type="primary">主要按钮</m-button>
  <m-button type="success">成功按钮</m-button>
  <m-button type="warning">警告按钮</m-button>
  <m-button type="error">错误按钮</m-button>
  <m-button type="info">信息按钮</m-button>
</template>`

const loadingCode = `<template>
  <m-button loading>加载中</m-button>
  <m-button type="primary" loading>加载中</m-button>
  <m-button type="primary" @click="handleAsyncClick">点击加载</m-button>
</template>

<script setup>
const loading = ref(false)
const handleAsyncClick = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  loading.value = false
}
<\/script>`

const sizeCode = `<template>
  <m-button size="small">小型按钮</m-button>
  <m-button>默认按钮</m-button>
  <m-button size="large">大型按钮</m-button>
</template>`

const plainCode = `<template>
  <m-button plain>朴素按钮</m-button>
  <m-button type="primary" plain>主要按钮</m-button>
  <m-button type="success" plain>成功按钮</m-button>
</template>`

const textCode = `<template>
  <m-button text>文字按钮</m-button>
  <m-button type="primary" text>主要按钮</m-button>
  <m-button type="success" text>成功按钮</m-button>
</template>`

const roundCode = `<template>
  <m-button round>圆角按钮</m-button>
  <m-button type="primary" round>主要按钮</m-button>
  <m-button type="success" round>成功按钮</m-button>
</template>`
</script>

<style lang="less">
:root {
  // 浅色模式变量
  --doc-text-color: #333;
  --doc-text-color-secondary: #666;
  --doc-bg-color: #fff;
  --doc-bg-color-secondary: #f5f7fa;
  --doc-border-color: #e4e7ed;
}

.dark {
  // 深色模式变量
  --doc-text-color: #fff;
  --doc-text-color-secondary: #ccc;
  --doc-bg-color: #1a1a1a;
  --doc-bg-color-secondary: #242424;
  --doc-border-color: #434343;
}

.button-doc {
  color: var(--doc-text-color);

  &__title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--doc-text-color);
  }

  &__desc {
    font-size: 1rem;
    color: var(--doc-text-color-secondary);
    margin-bottom: 2rem;
  }

  &__subtitle {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 2rem 0 1rem;
    color: var(--doc-text-color);

    &-sub {
      font-size: 1.25rem;
      font-weight: 500;
      margin: 1.5rem 0 1rem;
      color: var(--doc-text-color);
    }
  }

  &__group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }
}

.example-card {
  border: 1px solid var(--doc-border-color);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  background-color: var(--doc-bg-color);

  &__preview {
    padding: 1.5rem;
    border-bottom: 1px solid var(--doc-border-color);
  }
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 2rem;
  color: var(--doc-text-color);

  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid var(--doc-border-color);
  }

  th {
    background-color: var(--doc-bg-color-secondary);
    font-weight: 500;
  }

  td {
    color: var(--doc-text-color-secondary);
  }
}
</style>
