import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import merchant from './merchant'
// import money from './money'
// import fans from './fans'
import upload from './upload'
import mall from './mall'
import order from './order'
import personal from './userCenter'

/* 登录和主页 */
const login = resolve => require(['@/pages/login/login'], resolve) //登录
const applyText = resolve => require(['@/pages/login/applyText'], resolve) //登录
const reg = resolve => require(['@/pages/login/Reg'], resolve) //注册
const home = resolve => require(['@/pages/Home'], resolve) //home


/**
 * meta 参数注释
 * 1 requireAuth 是否需要登录
 * 2 parentPath 父级菜单path
 * 3 menu 用来选中左侧菜单栏
 */

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/reg',
    name: 'reg',
    component: reg
  },
  {
    path: '/applyText',
    name: 'applyText',
    component: applyText
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [{
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/home/Index'], resolve)
    },
    ...upload,
    ...mall,
    ...personal,
    ...order
    ]
  },
  {
    path: '*',
    name: 'notFound',
    meta: {
      requireAuth: true
    },
    component: resolve => require(['@/pages/common/notFound'], resolve)
  }
  ]
})
