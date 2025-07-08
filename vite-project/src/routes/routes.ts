import { createMemoryHistory, createRouter } from 'vue-router'

import Tasks from '@/pages/Tasks.vue'

import Info from '@/pages/Info.vue'


const routes = [
  { path: '/', component: Tasks },
  { path: '/info', component: Info }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;