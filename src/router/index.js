/*
 * @Author: yingzi
 * @Date: 2024-07-30 23:28:53
 * @LastEditors: yingzi
 * @LastEditTime: 2024-08-19 20:57:36
 * @Description: 请填写简介
 */
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
import { localGet, pathMap } from '@/utils'
//导入组件

const router = new VueRouter({
  //history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    // {
    //   path: '/introduce',
    //   name: 'introduce',
    //   component: () => import(/* webpackChunkName: "introduce" */ '../views/Introduce.vue')
    // },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/add',
      name: 'add',
      component: () => import(/* webpackChunkName: "add" */ '../views/AddGood.vue')
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import(/* webpackChunkName: "add" */ '../views/GoodsDetail.vue')
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: () => import(/* webpackChunkName: "swiper" */ '../views/Swiper.vue')
    },
    // {
    //   path: '/hot',
    //   name: 'hot',
    //   component: () => import(/* webpackChunkName: "hot" */ '../views/IndexConfig.vue')
    // },
    // {
    //   path: '/new',
    //   name: 'new',
    //   component: () => import(/* webpackChunkName: "new" */ '../views/IndexConfig.vue')
    // },
    // {
    //   path: '/recommend',
    //   name: 'recommend',
    //   component: () => import(/* webpackChunkName: "recommend" */ '../views/IndexConfig.vue')
    // },
    // {
    //   path: '/category',
    //   name: 'category',
    //   component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
    //   children: [
    //     {
    //       path: '/category/level2',
    //       name: 'level2',
    //       component: () => import(/* webpackChunkName: "level2" */ '../views/Category.vue'),
    //     },
    //     {
    //       path: '/category/level3',
    //       name: 'level3',
    //       component: () => import(/* webpackChunkName: "level3" */ '../views/Category.vue'),
    //     }
    //   ]
    // },
    {
      path: '/good',
      name: 'good',
      component: () => import(/* webpackChunkName: "new" */ '../views/Good.vue')
    },
    // {
    //   path: '/guest',
    //   name: 'guest',
    //   component: () => import(/* webpackChunkName: "guest" */ '../views/Guest.vue')
    // },
    // {
    //   path: '/order',
    //   name: 'order',
    //   component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue')
    // },
    // {
    //   path: '/order_detail',
    //   name: 'order_detail',
    //   component: () => import(/* webpackChunkName: "order_detail" */ '../views/OrderDetail.vue')
    // },
    // {
    //   path: '/account',
    //   name: 'account',
    //   component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
    // }
  ]
})



// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 token
    if (!localGet('adminObj')) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
  }

 
})

export default router