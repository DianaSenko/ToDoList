import { createMemoryHistory, createRouter } from 'vue-router'

import Tasks from '@/pages/Tasks.vue'


const routes = [
  { path: '/', component: Tasks }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;