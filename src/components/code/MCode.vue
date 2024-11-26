<template>
  <pre :class="['language-' + language, 'mcode']"><code ref="codeRef" v-html="highlightedCode"></code></pre>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, useSlots, nextTick } from 'vue'
import Prism from 'prismjs'
// 导入 Prism 的主题样式（使用更鲜明的主题）
import 'prismjs/themes/prism-tomorrow.css'
// 导入所有需要的语言支持
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-nginx'
// TODO: 语法高亮问题
interface Props {
  language: string
  code?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'plaintext',
  code: ''
})

const slots = useSlots()
const codeRef = ref<HTMLElement | null>(null)

// 获取代码内容
const codeContent = computed(() => {
  // 优先使用 props.code
  if (props.code) return props.code
  // 其次使用 slot 内容
  if (slots.default) {
    const slotContent = slots.default()
    if (slotContent[0]) {
      if (typeof slotContent[0].children === 'string') {
        return slotContent[0].children.trim()
      }
      return String(slotContent[0].children).trim()
    }
  }
  return ''
})

// 使用计算属性处理高亮
const highlightedCode = computed(() => {
  const rawCode = codeContent.value
  if (!rawCode) return ''
  
  try {
    // 确保语言存在
    const lang = Prism.languages[props.language] ? props.language : 'plaintext'
    // 手动触发 Prism 高亮
    const highlighted = Prism.highlight(
      rawCode,
      Prism.languages[lang],
      lang
    )
    return highlighted
  } catch (e) {
    console.warn('Prism highlight error:', e)
    return rawCode
  }
})

// 监听代码内容变化，重新应用高亮
watch([() => props.code, () => props.language], () => {
  nextTick(() => {
    if (codeRef.value) {
      Prism.highlightElement(codeRef.value)
    }
  })
})

// 组件挂载后应用高亮
onMounted(() => {
  nextTick(() => {
    if (codeRef.value) {
      Prism.highlightElement(codeRef.value)
    }
  })
})
</script>

<style lang="less">
.mcode {
  position: relative;
  margin: 0;
  padding: 1em;
  overflow: auto;
  background-color: #2d2d2d !important;
  border-radius: 6px;
  
  code {
    display: block;
    padding: 0;
    overflow-x: auto;
    background: none;
    color: #ccc;
    font-size: 0.875em;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  }

  :deep(.token.comment),
  :deep(.token.prolog),
  :deep(.token.doctype),
  :deep(.token.cdata) {
    color: #999;
    font-style: italic;
  }

  :deep(.token.function) {
    color: #6196cc;
  }

  :deep(.token.operator),
  :deep(.token.punctuation) {
    color: #ccc;
  }

  :deep(.token.boolean),
  :deep(.token.number) {
    color: #f08d49;
  }

  :deep(.token.property),
  :deep(.token.class-name),
  :deep(.token.constant),
  :deep(.token.symbol) {
    color: #f8c555;
  }

  :deep(.token.selector),
  :deep(.token.important),
  :deep(.token.atrule),
  :deep(.token.keyword),
  :deep(.token.builtin) {
    color: #cc99cd;
  }

  :deep(.token.string),
  :deep(.token.char),
  :deep(.token.attr-value),
  :deep(.token.regex),
  :deep(.token.variable) {
    color: #7ec699;
  }

  :deep(.token.operator),
  :deep(.token.entity),
  :deep(.token.url) {
    color: #67cdcc;
  }

  :deep(.token.important),
  :deep(.token.bold) {
    font-weight: bold;
  }

  :deep(.token.italic) {
    font-style: italic;
  }

  :deep(.token.entity) {
    cursor: help;
  }

  :deep(.token.deleted) {
    color: red;
  }

  :deep(.token.inserted) {
    color: green;
  }
}
</style>
