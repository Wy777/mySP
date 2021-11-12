import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/tReactive",
    name: "tReactive",
    component: () => import("../components/tryReactive.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
