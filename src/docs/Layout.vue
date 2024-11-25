<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="text-2xl font-bold text-gray-900 dark:text-white">
            Mao Design
          </router-link>
          <nav class="flex space-x-4">
            <a href="https://github.com/rokiran/mao-design" target="_blank" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8">
        <!-- Sidebar -->
        <aside class="w-64 flex-shrink-0">
          <nav class="space-y-6">
            <!-- Form Components -->
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Form Components</h3>
              <ul class="space-y-1">
                <li>
                  <router-link 
                    to="/components/input"
                    class="block px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    :class="{ 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white': $route.name === 'input' }"
                  >
                    Input
                  </router-link>
                </li>
                <li>
                  <router-link 
                    to="/components/select"
                    class="block px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    :class="{ 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white': $route.name === 'select' }"
                  >
                    Select
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- Data Components (预留) -->
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Data Components</h3>
              <ul class="space-y-1">
                <li class="text-gray-400 dark:text-gray-500 px-2 py-1">Coming Soon</li>
              </ul>
            </div>

            <!-- Navigation Components (预留) -->
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white mb-2">Navigation Components</h3>
              <ul class="space-y-1">
                <li class="text-gray-400 dark:text-gray-500 px-2 py-1">Coming Soon</li>
              </ul>
            </div>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
          <div class="container mx-auto px-6 py-8">
            <router-view v-slot="{ Component }">
              <transition
                name="fade"
                mode="out-in"
                @before-leave="beforeLeave"
                @enter="enter"
                @after-enter="afterEnter"
              >
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// 过渡动画钩子
const beforeLeave = (el: Element) => {
  el.classList.add('transition-all', 'duration-300')
  el.classList.add('opacity-0', 'transform', 'translate-y-4')
}

const enter = (el: Element) => {
  el.classList.add('transition-all', 'duration-300')
  el.classList.add('opacity-0', 'transform', 'translate-y-4')
  // 强制重绘
  void el.offsetHeight
}

const afterEnter = (el: Element) => {
  el.classList.remove('opacity-0', 'transform', 'translate-y-4')
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

/* 侧边栏过渡 */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 768px) {
  .sidebar-overlay-enter-active,
  .sidebar-overlay-leave-active {
    transition: opacity 0.3s ease;
  }

  .sidebar-overlay-enter-from,
  .sidebar-overlay-leave-to {
    opacity: 0;
  }
}
</style>
