import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../docs/Layout.vue'
import Home from '../docs/Home.vue'
import InputDoc from '../docs/components/form/InputDoc.vue'
import SelectDoc from '../docs/components/form/SelectDoc.vue'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'components/input',
        name: 'input',
        component: InputDoc
      },
      {
        path: 'components/select',
        name: 'select',
        component: SelectDoc
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
