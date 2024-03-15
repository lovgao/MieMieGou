import { createRouter, createWebHistory } from 'vue-router'
import AppMain from '@/views/AppMain/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      // 路由元信息
      meta: {
        // 隐藏底部tabbar
        hideFooter: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/AppLogin/index.vue'),
      // 路由元信息
      meta: {
        // 隐藏底部tabbar
        hideFooter: true
      }
    },
    // 注册三步走
    {
      path: '/register-step1',
      name: 'RegisterStep1',
      component: () => import('@/views/AppRegister/step1.vue'),
      // 路由元信息
      meta: {
        // 隐藏底部tabbar
        hideFooter: true
      }
    },
    {
      path: '/register-step2',
      name: 'RegisterStep2',
      component: () => import('@/views/AppRegister/step2.vue'),
      // 路由元信息
      meta: {
        // 隐藏底部tabbar
        hideFooter: true
      }
    },
    {
      path: '/register-step3',
      name: 'RegisterStep3',
      component: () => import('@/views/AppRegister/step3.vue'),
      // 路由元信息
      meta: {
        // 隐藏底部tabbar
        hideFooter: true
      }
    },
    // 主页面
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      name: 'Main',
      component: AppMain
    },
    {
      path: '/sort',
      name: 'Sort',
      component: () => import('@/views/AppSort/index.vue')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/AppCart/index.vue')
    },
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('@/views/AppMine/index.vue')
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('@/views/AppList/index.vue'),
      meta: {
        // 隐藏底部tabbar
        hideFooter: true
      }
    },
    {
      // 动态路由传参：param传参
      path: '/detail/:proid',
      name: 'Detail',
      component: () => import('@/views/AppDetail/index.vue'),
      meta: {
        // 隐藏底部tabbar
        hideFooter: true
      }
    },
  ]
})

export default router
