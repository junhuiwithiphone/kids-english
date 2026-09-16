import { createRouter, createWebHashHistory } from 'vue-router'

/* ═══════════════════════════════════════════════════════════
   路由：hash 模式（file:// 直开也能跑）
   家长中心在 ParentView 内部做 PIN/算术题守卫（M4），
   路由级不加守卫，避免儿童误入死胡同页。
   ═══════════════════════════════════════════════════════════ */

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/level/:levelId',
      name: 'level',
      component: () => import('@/views/LevelMapView.vue'),
      props: true,
    },
    {
      path: '/unit/:unitId',
      name: 'unit',
      component: () => import('@/views/UnitDetailView.vue'),
      props: true,
    },
    {
      path: '/lesson/:lessonId',
      name: 'lesson',
      component: () => import('@/views/LessonView.vue'),
      props: true,
    },
    {
      path: '/showcase/:lessonId',
      name: 'showcase',
      component: () => import('@/views/ShowcaseView.vue'),
      props: true,
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: () => import('@/views/RewardsView.vue'),
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('@/views/WordReviewView.vue'),
    },
    {
      path: '/parent',
      name: 'parent',
      component: () => import('@/views/ParentView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
