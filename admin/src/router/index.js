import Vue from 'vue'
import Router from 'vue-router'

// import others from './others'
import others from './others'
import channel from './channel'
import station from './station'
import warehouse from './warehouse'
import recharge from './recharge'
import packages from './package'
import merchant from './merchant'
import announcement from './announcement'
import workOrder from './workOrder'
import takePlace from './takePlace'

// console.log(operations)

/* 登录和主页 */
const login = resolve => require(['@/pages/login'], resolve) //登录
const home = resolve => require(['@/pages/home'], resolve) //home页

// 首页
const index = resolve => require(['@/pages/index/Index'], resolve)

Vue.use(Router)

/**
 * meta 参数注释
 * 1 requireAuth 是否需要登录
 * 2 parentPath 父级菜单path
 * 3 menu 用来选中左侧菜单栏
 */

export default new Router({
  linkActiveClass: 'active',
  // linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/index',
          name: 'Index',
          meta: {
            requireAuth: true,
            parentPath: '/channel/list'
          },
          component: index
        },

        ...channel,
        ...station,
        ...warehouse,
        ...recharge,
        ...packages,
        ...merchant,
        ...announcement,
        ...workOrder,
        ...takePlace
      ]
    },
    ...others,
    {
      path: '*',
      name: 'notFound',
      meta: {
        requireAuth: true
      },
      component: resolve => require(['@/pages/notFound'], resolve)
    }
  ]
})
