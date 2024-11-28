<!-- 
  MSelect 组件：一个可定制的选择器组件
  功能特点：
  1. 支持单选和多选模式
  2. 支持搜索功能
  3. 支持远程搜索
  4. 支持禁用状态
  5. 支持错误提示
  6. 支持不同尺寸
-->
<template>
  <!-- 主容器：包含点击事件处理和点击外部关闭功能 -->
  <div class="m-select" @click.stop="toggleDropdown" v-click-outside="closeDropdown">
    <!-- 选择器输入区域：显示已选项和触发下拉框 -->
    <div
      class="m-select__input"
      :class="[
        disabled ? 'is-disabled' : '',
        isOpen ? 'is-open' : '',
        size,
        error ? 'is-error' : ''
      ]"
    >
      <div class="m-select__input-content">
        <!-- 选中值显示区域 -->
        <div class="m-select__value">
          <!-- 多选模式：显示多个标签 -->
          <template v-if="multiple && selectedLabels.length">
            <span v-for="(label, index) in selectedLabels" :key="index" class="m-select__tag">
              {{ label }}
              <button @click.stop="removeValue(selectedValues[index])" class="m-select__tag-remove">×</button>
            </span>
          </template>
          <!-- 单选模式：显示单个值 -->
          <template v-else-if="!multiple && selectedLabels.length">
            <span>{{ selectedLabels[0] }}</span>
          </template>
          <!-- 未选择时显示占位符 -->
          <span v-else class="m-select__placeholder">{{ placeholder }}</span>
        </div>
        <!-- 下拉箭头图标 -->
        <span class="m-select__arrow">
          <svg
            class="m-select__arrow-icon"
            :class="{ 'is-open': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      <!-- 搜索输入框：仅在可搜索且下拉框打开时显示 -->
      <input
        v-if="searchable && isOpen"
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        class="m-select__search"
        :placeholder="searchPlaceholder"
        @click.stop
      >
    </div>

    <!-- 下拉菜单 -->
    <div
      v-show="isOpen"
      class="m-select__dropdown"
    >
      <!-- 加载状态显示 -->
      <template v-if="loading">
        <div class="m-select__loading">{{ loadingText }}</div>
      </template>
      <template v-else>
        <!-- 选项列表 -->
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="m-select__option"
          :class="{ 'is-selected': isSelected(option.value) }"
          @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <!-- 无选项时的提示 -->
        <div v-if="filteredOptions.length === 0" class="m-select__empty">
          {{ noOptionsText }}
        </div>
      </template>
    </div>
    <!-- 错误提示 -->
    <p v-if="error" class="m-select__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

// 选项接口定义
export interface SelectOption {
  label: string
  value: string | number
}

// 组件属性接口定义
interface Props {
  modelValue: string | number | (string | number)[] // 选中值，支持单选和多选
  options: SelectOption[]                           // 选项列表
  multiple?: boolean                                // 是否多选
  searchable?: boolean                             // 是否可搜索
  remote?: boolean                                 // 是否远程搜索
  loading?: boolean                                // 是否显示加载状态
  placeholder?: string                             // 占位符文本
  searchPlaceholder?: string                       // 搜索框占位符
  loadingText?: string                             // 加载提示文本
  noOptionsText?: string                           // 无选项提示文本
  disabled?: boolean                               // 是否禁用
  error?: string                                   // 错误信息
  size?: 'small' | 'medium' | 'large'              // 组件尺寸
}

// 设置属性默认值
const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  searchable: false,
  remote: false,
  loading: false,
  placeholder: 'Select option',
  searchPlaceholder: 'Search...',
  loadingText: 'Loading...',
  noOptionsText: 'No options found',
  disabled: false,
  error: '',
  size: 'medium'
})

// 定义组件事件
const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[]]  // 更新选中值
  'search': [query: string]                                           // 搜索事件
  'change': [value: string | number | (string | number)[]]            // 值变更事件
}>()

// 组件状态
const isOpen = ref(false)           // 下拉框是否打开
const searchQuery = ref('')         // 搜索关键词
const searchInput = ref<HTMLInputElement | null>(null)  // 搜索输入框引用

// 计算属性：当前选中的值
const selectedValues = computed(() => {
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
})

// 计算属性：当前选中项的标签
const selectedLabels = computed(() => {
  return selectedValues.value.map(value => {
    const option = props.options.find(opt => opt.value === value)
    return option ? option.label : ''
  })
})

// 计算属性：过滤后的选项列表
const filteredOptions = computed(() => {
  if (!searchQuery.value || props.remote) return props.options
  
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// 切换下拉框状态
const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value && props.searchable) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

// 关闭下拉框
const closeDropdown = () => {
  isOpen.value = false
  searchQuery.value = ''
}

// 检查选项是否被选中
const isSelected = (value: string | number) => {
  return selectedValues.value.includes(value)
}

// 选择选项
const selectOption = (option: SelectOption) => {
  if (props.disabled) return

  let newValue
  if (props.multiple) {
    // 多选模式：切换选中状态
    const values = [...selectedValues.value]
    const index = values.indexOf(option.value)
    if (index === -1) {
      values.push(option.value)
    } else {
      values.splice(index, 1)
    }
    newValue = values
  } else {
    // 单选模式：直接设置值并关闭下拉框
    newValue = option.value
    closeDropdown()
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 移除选中值（多选模式）
const removeValue = (value: string | number) => {
  if (props.disabled) return

  if (props.multiple) {
    const values = selectedValues.value.filter(v => v !== value)
    emit('update:modelValue', values)
    emit('change', values)
  }
}

// 监听搜索输入
watch(searchQuery, (newQuery) => {
  if (props.remote) {
    emit('search', newQuery)
  }
})

// 自定义指令：v-click-outside
// 用途：检测点击事件是否发生在指定元素外部，常用于下拉菜单、弹出框等需要点击外部关闭的场景
// 
// 工作原理：
// 1. 在元素挂载时，给 document 添加点击事件监听器
// 2. 当点击事件发生时，判断点击的目标是否在指定元素内部
// 3. 如果点击发生在元素外部，则触发用户传入的回调函数
// 4. 在元素卸载时，移除事件监听器以防内存泄漏
const vClickOutside = {
  // mounted 钩子：在指令绑定到元素后调用
  // el: 指令绑定的元素
  // binding: 指令的参数，包含用户传入的值（value）等信息
  mounted(el: HTMLElement & { _clickOutside: (event: Event) => void }, binding: any) {
    // 定义点击事件处理函数，并存储在元素上以便后续移除
    el._clickOutside = (event: Event) => {
      // 判断点击是否在元素外部：
      // 1. el !== event.target：点击的不是当前元素
      // 2. !el.contains(event.target)：点击的不是当前元素的子元素
      if (!(el === event.target || el.contains(event.target as Node))) {
        // 如果点击在元素外部，调用用户传入的回调函数
        binding.value(event)
      }
    }
    // 在 document 上添加点击事件监听器
    document.addEventListener('click', el._clickOutside)
    // console.log('增加了点击外部指令',el, binding)
  },

  // unmounted 钩子：在指令与元素解绑时调用
  // 用于清理工作，防止内存泄漏
  unmounted(el: HTMLElement & { _clickOutside: (event: Event) => void }) {
    // 移除之前添加的事件监听器
    document.removeEventListener('click', el._clickOutside)
    // console.log('移除了点击外部指令',el)
  }
}
</script>

<style lang="less">
.m-select {
  position: relative;
  width: 100%;

  &__input {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    background-color: var(--bg-color);
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;

    &:hover:not(.is-disabled) {
      border-color: var(--border-color-hover);
    }

    &.is-open {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px var(--primary-color-20);
    }

    &.is-disabled {
      background-color: var(--bg-color-disabled);
      cursor: not-allowed;

      .m-select__value,
      .m-select__placeholder,
      .m-select__arrow {
        color: var(--text-color-disabled);
      }
    }

    &.is-error {
      border-color: var(--error-color);

      &.is-open {
        box-shadow: 0 0 0 2px var(--error-color-20);
      }
    }

    // 尺寸变体
    &.small {
      .m-select__input-content {
        padding: 0.25rem 0.5rem;
      }
      font-size: 0.875rem;
    }

    &.medium {
      .m-select__input-content {
        padding: 0.5rem 0.75rem;
      }
      font-size: 1rem;
    }

    &.large {
      .m-select__input-content {
        padding: 0.75rem 1rem;
      }
      font-size: 1.125rem;
    }
  }

  &__input-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-color);
  }

  &__placeholder {
    color: var(--text-color-disabled);
  }

  &__arrow {
    margin-left: 0.5rem;
    color: var(--text-color-disabled);
  }

  &__arrow-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    margin: 0.125rem;
    padding: 0.125rem 0.375rem;
    background-color: var(--primary-color-10);
    color: var(--primary-color);
    border-radius: 0.25rem;
    font-size: 0.875rem;

    &-remove {
      margin-left: 0.25rem;
      color: var(--primary-color);
      opacity: 0.8;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__search {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 0.25rem;
    background-color: var(--bg-color);
    color: var(--text-color);
    outline: none;

    &:focus {
      border-color: var(--primary-color);
    }

    &::placeholder {
      color: var(--text-color-disabled);
    }
  }

  &__dropdown {
    position: absolute;
    z-index: 50;
    width: 100%;
    margin-top: 0.25rem;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px var(--shadow-color);
    max-height: 15rem;
    overflow: auto;
  }

  &__loading,
  &__empty {
    padding: 0.5rem 0.75rem;
    color: var(--text-color-disabled);
  }

  &__option {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    color: var(--text-color);
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--primary-color-10);
      color: var(--primary-color);
      transform: translateX(4px);
    }

    &.is-selected {
      background-color: var(--primary-color-10);
      color: var(--primary-color);
      font-weight: 500;
    }
  }

  &__error {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--error-color);
  }
}
</style>
