import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import About from '../views/public/About.vue'
import MainLayout from '../views/public/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/home/Index.vue')
      },
      {
        path: 'explore',
        name: 'Explore',
        component: () => import('../views/explore/Index.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/profile/Index.vue')
      }
    ]
  },
  {
    path: '/book-detail',
    name: 'BookDetail',
    component: () => import('../views/public/BookDetail.vue')
  },
  {
    path: '/chapter-detail',
    name: 'ChapterDetail',
    component: () => import('../views/public/ChapterDetail.vue')
  },
  {
    path: '/book-search',
    name: 'BookSearch',
    component: () => import('../views/public/BookSearch.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/public/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/public/Register.vue')
  },
  {
    path: '/about',
    component: About
  }
]

// https://vitejs.dev/guide/env-and-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
