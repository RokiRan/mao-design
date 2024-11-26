<template>
  <m-config v-model:preset="currentPreset" :theme="customTheme">
    <div class="m-layout">
      <!-- Header -->
      <header class="m-layout__header">
        <div class="m-layout__container">
          <div class="m-layout__header-content">
            <router-link to="/" class="m-layout__logo">
              Mao Design
            </router-link>
            <nav class="m-layout__nav">
              <m-theme-switcher />
              <m-dark-mode-switcher />
              <a 
                href="https://github.com/rokiran/mao-design" 
                target="_blank" 
                class="m-layout__github-link"
              >
                <span>GitHub</span>
                <svg class="m-layout__github-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div class="m-layout__container">
        <div class="m-layout__content">
          <!-- Sidebar -->
          <aside class="m-layout__sidebar">
            <nav class="m-layout__sidebar-nav">
              <!-- Form Components -->
              <div class="m-layout__nav-section">
                <h3 class="m-layout__nav-title">Form Components</h3>
                <ul class="m-layout__nav-list">
                  <li>
                    <router-link 
                      to="/components/button"
                      class="m-layout__nav-link"
                      :class="{ 'is-active': $route.name === 'button' }"
                    >
                      Button
                    </router-link>
                  </li>
                  <li>
                    <router-link 
                      to="/components/input"
                      class="m-layout__nav-link"
                      :class="{ 'is-active': $route.name === 'input' }"
                    >
                      Input
                    </router-link>
                  </li>
                  <li>
                    <router-link 
                      to="/components/select"
                      class="m-layout__nav-link"
                      :class="{ 'is-active': $route.name === 'select' }"
                    >
                      Select
                    </router-link>
                  </li>
                </ul>
              </div>

              <!-- Configuration -->
              <div class="m-layout__nav-section">
                <h3 class="m-layout__nav-title">Configuration</h3>
                <ul class="m-layout__nav-list">
                  <li>
                    <router-link 
                      to="/components/config"
                      class="m-layout__nav-link"
                      :class="{ 'is-active': $route.name === 'config' }"
                    >
                      Theme
                    </router-link>
                  </li>
                </ul>
              </div>

              <!-- Data Components -->
              <div class="m-layout__nav-section">
                <h3 class="m-layout__nav-title">Data Components</h3>
                <ul class="m-layout__nav-list">
                  <li class="m-layout__nav-item--disabled">Coming Soon</li>
                </ul>
              </div>

              <!-- Navigation Components -->
              <div class="m-layout__nav-section">
                <h3 class="m-layout__nav-title">Navigation Components</h3>
                <ul class="m-layout__nav-list">
                  <li class="m-layout__nav-item--disabled">Coming Soon</li>
                </ul>
              </div>
            </nav>
          </aside>

          <!-- Main Content -->
          <main class="m-layout__main">
            <div class="m-layout__main-content">
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
  </m-config>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MConfig, MThemeSwitcher, MDarkModeSwitcher } from '@/components/config'
import type { ThemeConfig } from '@/components/config'

const router = useRouter()
const currentPreset = ref('default')
const customTheme = ref<Partial<ThemeConfig>>({})

onMounted(() => {
  const theme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
})

// 过渡动画钩子
const beforeLeave = (el: Element) => {
  el.classList.add('transition-all', 'duration-300')
  el.classList.add('opacity-0', 'transform', 'translate-y-4')
}

const enter = (el: Element) => {
  el.classList.add('transition-all', 'duration-300')
  el.classList.add('opacity-0', 'transform', 'translate-y-4')
  void el.offsetHeight
}

const afterEnter = (el: Element) => {
  el.classList.remove('opacity-0', 'transform', 'translate-y-4')
}
</script>

<style lang="less">
:root {
  --bg-color: #f9fafb;
  --bg-color-secondary: #fff;
  --text-color: #333;
  --text-color-secondary: #666;
  --primary-color: var(--mao-primary-color, #3498db);
  --primary-color-10: var(--mao-primary-color-10, rgba(52, 152, 219, 0.1));
  --hover-color: #f2f4f6;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --text-color-disabled: #999;
  --nav-bg: #fff;
  --nav-hover: var(--mao-primary-color-10, rgba(52, 152, 219, 0.05));
}

.dark-mode {
  --bg-color: #2f2f2f;
  --bg-color-secondary: #1a1a1a;
  --text-color: #e5e7eb;
  --text-color-secondary: #9ca3af;
  --primary-color: var(--mao-primary-color, #66d9ef);
  --primary-color-10: var(--mao-primary-color-10, rgba(102, 217, 239, 0.1));
  --hover-color: #3a3a3a;
  --shadow-color: rgba(0, 0, 0, 0.5);
  --text-color-disabled: #6b7280;
  --nav-bg: #2a2a2a;
  --nav-hover: rgba(255, 255, 255, 0.05);
}

.m-layout {
  min-height: 100vh;
  background-color: var(--bg-color-secondary);

  &__header {
    background-color: var(--bg-color);
    box-shadow: 0 1px 2px 0 var(--shadow-color);
  }

  &__container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  &__header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color);
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__github-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--text-color-secondary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--text-color);
    }
  }

  &__github-icon {
    width: 1rem;
    height: 1rem;
  }

  &__content {
    display: flex;
    gap: 2rem;
    padding: 2rem 0;
  }

  &__sidebar {
    width: 16rem;
    flex-shrink: 0;
  }

  &__sidebar-nav {
    position: sticky;
    top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__nav-section {
    // 手动处理
    // background-color: var(--nav-bg);
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 1px 2px 0 var(--shadow-color);
    border: 1px solid var(--bg-color);
  }

  &__nav-title {
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-color);
    margin-bottom: 0.75rem;
  }

  &__nav-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__nav-link {
    display: block;
    padding: 0.5rem 0.75rem;
    color: var(--text-color-secondary);
    text-decoration: none;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
      color: var(--primary-color);
      background-color: var(--nav-hover);
      transform: translateX(4px);
    }

    &.is-active {
      color: var(--primary-color);
      background-color: var(--primary-color-10);
      font-weight: 500;
    }
  }

  &__nav-item--disabled {
    padding: 0.5rem 0.75rem;
    color: var(--text-color-disabled);
    font-size: 0.875rem;
    opacity: 0.7;
    cursor: not-allowed;
  }

  &__main {
    flex: 1;
    min-width: 0;
  }

  &__main-content {
    background-color: var(--bg-color);
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 1px 2px 0 var(--shadow-color);
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

// 响应式布局
@media (max-width: 768px) {
  .m-layout {
    &__content {
      flex-direction: column;
    }

    &__sidebar {
      width: 100%;
    }

    &__sidebar-nav {
      position: static;
    }
  }
}
</style>
