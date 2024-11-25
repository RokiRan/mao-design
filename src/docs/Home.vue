<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Welcome to Mao Design</h1>
    
    <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
      A Vue 3 component library designed for modern web applications.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Form Components -->
      <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Form Components</h2>
        <ul class="space-y-2">
          <li>
            <router-link 
              to="/components/input"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Input Component
            </router-link>
          </li>
          <li>
            <router-link 
              to="/components/select"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Select Component
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Coming Soon -->
      <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Coming Soon</h2>
        <ul class="space-y-2 text-gray-500 dark:text-gray-400">
          <li>Data Components</li>
          <li>Navigation Components</li>
          <li>Feedback Components</li>
        </ul>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Getting Started</h2>
      <div class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
        <code class="text-sm text-gray-800 dark:text-gray-200">npm install mao-design</code>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
