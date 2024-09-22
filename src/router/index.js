import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { firstMenu } from '@/utils/RouteMenus'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'name',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/notFound/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值 返回值决定导航的路径(不返回或者返回undefined,默认跳转)
router.beforeEach((to) => {
  //如果没有token,且访问的是非登录页,拦截到登录,其他情况正常放行
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
  // 如果进入到首页，默认进入到第一个菜单列表
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
