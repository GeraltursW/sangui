import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/stats',
    name: 'Stats',
    meta: {
      title: '数据统计',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/site/Stats/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于我们',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/site/AboutUs/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false
    },
    component: () => import('@/pages/login/login.vue')
  },
  {
    path: '/index11',
    name: 'Index11',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true
    },
    component: () => import('@/pages/home/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;