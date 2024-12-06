import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Records.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'record',
      component: HomeView,
    },
    {
      path: '/charts',
      name: 'chart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Charts.vue'),
    },
  ],
})

export default router
