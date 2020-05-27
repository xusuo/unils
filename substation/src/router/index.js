import Vue from 'vue'
import Router from 'vue-router'

import others from './others'

// 渠道后台的路由
import channels from './channel/channel'

// 分站后台的路由
import substationOverview from './substation/overview'
import substationUser from './substation/user'
import substationStation from './substation/station'
import substationCount from './substation/count'
import substationCoupon from './substation/coupon'

// 代理人后台的路由
import agencys from './agency/agency'

// 运营端后台的路由
import operations from './operation/operation'

// 销售端后台的路由
import markets from './market/market'

// console.log(operations)

/* 登录和主页 */
const login = resolve => require(['@/pages/login'], resolve) //登录
const home = resolve => require(['@/pages/home'], resolve) //home页

// 渠道后台首页
const channelIndex = resolve => require(['@/pages/channel/index/Index'], resolve)
// 分站后台首页
const substationIndex = resolve => require(['@/pages/substation/index/Index'], resolve)
// 代理人后台首页
const agencyIndex = resolve => require(['@/pages/agency/index/Index'], resolve)
// 运营端后台首页
const operationIndex = resolve => require(['@/pages/operation/index/Index'], resolve)
// 销售端后台首页
const marketIndex = resolve => require(['@/pages/market/index/Index'], resolve)

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
        // 奖金趋势
        {
          path: '/channel/Bill',
          name: 'channelBill',
          meta: {
            requireAuth: true,
            parentPath: '/channel/Bill'
          },
          component: resolve => require(['@/pages/channel/Bill'], resolve)
        },
        {
          path: '/channe/index',
          name: 'channeIndex',
          meta: {
            requireAuth: true
          },
          component: channelIndex
        },
        {
          path: '/substation/index',
          name: 'substationIndex',
          meta: {
            requireAuth: true
          },
          component: substationIndex
        },
        {
          path: '/agency/index',
          name: 'agencyIndex',
          meta: {
            requireAuth: true
          },
          component: agencyIndex
        },
        {
          path: '/operation/index',
          name: 'operationIndex',
          meta: {
            requireAuth: true
          },
          component: operationIndex
        },
        {
          path: '/market/index',
          name: 'marketIndex',
          meta: {
            requireAuth: true
          },
          component: marketIndex
        },

        ...channels,

        ...substationOverview,
        ...substationUser,
        ...substationCount,
        ...substationStation,
        ...substationCoupon,

        ...agencys,

        ...operations,

        ...markets,
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
