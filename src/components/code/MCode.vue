<template>
  <pre :class="['language-' + language]"><code ref="codeRef" :class="['language-' + language]"><slot></slot></code></pre>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'

const props = defineProps<{
  language: string
}>()

const codeRef = ref<HTMLElement | null>(null)

const highlight = () => {
  if (codeRef.value) {
    Prism.highlightElement(codeRef.value)
  }
}

onMounted(() => {
  highlight()
})

watch(() => props.language, () => {
  highlight()
})
</script>

<style>
pre[class*="language-"] {
  @apply bg-gray-900 dark:bg-gray-950 rounded-lg p-4 my-4 overflow-x-auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  @apply bg-gray-900 dark:bg-gray-950;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  @apply text-gray-500 dark:text-gray-400;
}

.token.punctuation {
  @apply text-gray-400 dark:text-gray-500;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  @apply text-red-400 dark:text-red-300;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  @apply text-green-400 dark:text-green-300;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  @apply text-yellow-400 dark:text-yellow-300;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  @apply text-blue-400 dark:text-blue-300;
}

.token.function,
.token.class-name {
  @apply text-purple-400 dark:text-purple-300;
}

.token.regex,
.token.important,
.token.variable {
  @apply text-orange-400 dark:text-orange-300;
}
</style>
