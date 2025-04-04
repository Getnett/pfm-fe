import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'record',
      component: () => import('../views/Transactions.vue'),
    },
    {
      path: '/charts',
      name: 'chart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Charts.vue'),
    },
    {
      path: '/expenses/monthly-category-data',
      name: 'monthly-category-data',
      component: () => import('../views/MonthlyExpenseCategoryData.vue'),
    },
    {
      path: '/expenses/yearly-category-data',
      name: 'yearly-category-data',
      component: () => import('../views/YearlyExpenseCategoryData.vue'),
    },
    {
      path: '/incomes/monthly-income-source-data',
      name: 'monthly-income-source-data',
      component: () => import('../views/MonthlyIncomeSourceData.vue'),
    },
    {
      path: '/incomes/yearly-income-source-data',
      name: 'yearly-income-source-data',
      component: () => import('../views/YearlyIncomeSourceData.vue'),
    },
    {
      path: '/analytics',
      name: 'analytics',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Analytics.vue'),
    },
    {
      path: '/accounts',
      name: 'accounts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Accounts.vue'),
    },
    {
      path: '/accounts/transactions',
      name: 'account-transaction',
      component: () => import('../views/AccountTransactions.vue'),
    },
  ],
})

export default router
