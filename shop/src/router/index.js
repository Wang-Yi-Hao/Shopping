import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Myorder from '@/views/myorder'
import Layout from '@/views/layout'
import Pay from '@/views/pay'
import Prodepail from '@/views/prodepail'
import Search from '@/views/search'
import Searchlist from '@/views/search/list'
// 二级路由
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'category',
          component: Category
        },
        {
          path: 'cart',
          component: Cart
        },
        {
          path: 'user',
          component: User
        }
      ]
    },
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    // 动态路由传参，商品id
    { path: '/prodepail/:id', component: Prodepail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: Searchlist }
  ]
})

const authUrl = ['/pay', '/myorder']
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断是否为权限页面
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
