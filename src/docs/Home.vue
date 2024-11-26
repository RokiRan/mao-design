<template>
  <div class="m-home">
    <div class="m-home__content">
      <!-- Hero Section -->
      <div class="m-home__hero">
        <h1 class="m-home__title">
          Welcome to Mao Design
        </h1>
        <p class="m-home__description">
          A Vue 3 component library designed for modern web applications.
        </p>
      </div>

      <!-- Feature Grid -->
      <div class="m-home__grid">
        <!-- Form Components -->
        <div class="m-home__card">
          <h2 class="m-home__card-title">
            Form Components
          </h2>
          <ul class="m-home__list">
            <li>
              <router-link 
                to="/components/button"
                class="m-home__link"
              >
                Button Component
              </router-link>
            </li>
            <li>
              <router-link 
                to="/components/input"
                class="m-home__link"
              >
                Input Component
              </router-link>
            </li>
            <li>
              <router-link 
                to="/components/select"
                class="m-home__link"
              >
                Select Component
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Coming Soon -->
        <div class="m-home__card">
          <h2 class="m-home__card-title">
            Coming Soon
          </h2>
          <ul class="m-home__list">
            <li class="m-home__list-item">
              Data Components
            </li>
            <li class="m-home__list-item">
              Navigation Components
            </li>
            <li class="m-home__list-item">
              Feedback Components
            </li>
          </ul>
        </div>
      </div>

      <!-- Getting Started Section -->
      <div class="m-home__section">
        <h2 class="m-home__section-title">
          Getting Started
        </h2>
        <div class="m-home__install">
          <div class="m-home__install-content">
            <div class="m-home__code-block">
              <code class="m-home__code">
                npm install mao-design
              </code>
              <button 
                class="m-home__copy-button"
                title="Copy to clipboard"
                @click="copyToClipboard"
              >
                <svg class="m-home__copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
            <p class="m-home__install-tip">
              After installation, you can import and use components as needed in your Vue 3 application.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const copyToClipboard = () => {
  navigator.clipboard.writeText('npm install mao-design')
    .then(() => {
      // TODO: 添加复制成功的提示组件
      console.log('Copied to clipboard')
    })
    .catch(err => {
      console.error('Failed to copy:', err)
    })
}
</script>

<style lang="less">
:root {
  --text-color: #333;
  --text-color-secondary: #666;
  --text-color-disabled: #999;
  --primary-color: #3498db;
  --primary-color-10: rgba(52, 152, 219, 0.1);
  --bg-color: #f9f9f9;
  --bg-color-secondary: #f2f2f2;
  --border-color: #ddd;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #fff;
    --text-color-secondary: #ccc;
    --text-color-disabled: #666;
    --primary-color: #2ecc71;
    --primary-color-10: rgba(46, 204, 113, 0.1);
    --bg-color: #333;
    --bg-color-secondary: #444;
    --border-color: #555;
    --shadow-color: rgba(0, 0, 0, 0.5);
  }
}

.m-home {
  &__content {
    max-width: 64rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__hero {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--text-color);
    
    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  &__description {
    font-size: 1.125rem;
    color: var(--text-color-secondary);
    
    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    padding: 1.5rem;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 var(--shadow-color);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 6px -1px var(--shadow-color);
    }
  }

  &__card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__link {
    display: block;
    padding: 0.5rem;
    color: var(--primary-color);
    border-radius: 0.375rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--primary-color-10);
    }
  }

  &__list-item {
    padding: 0.5rem;
    color: var(--text-color-disabled);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color);
  }

  &__install {
    background-color: var(--bg-color-secondary);
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  &__install-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__code-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--bg-color);
    padding: 1rem;
    border-radius: 0.375rem;
  }

  &__code {
    font-family: ui-monospace, monospace;
    font-size: 0.875rem;
    color: var(--text-color);
  }

  &__copy-button {
    color: var(--text-color-secondary);
    transition: color 0.2s ease;

    &:hover {
      color: var(--text-color);
    }
  }

  &__copy-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &__install-tip {
    font-size: 0.875rem;
    color: var(--text-color-secondary);
  }
}
</style>