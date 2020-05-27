// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import VCharts from 'v-charts'
import * as filters from './utils/filters'
import { baseURL, loginURL, baseImageUrl, baseBuyerImageUrl } from './utils/config'
// import '@/assets/styles/admin.css';
import '@/assets/styles/reset_element_style/index.less'
import '@/assets/styles/custom.less'
import request from './utils/request'

import PopupSelect from '@/components/PopupSelect'
import PCA from '@/components/Pca'
import UploadSingleImage from '@/components/UploadSingleImage'
import UploadSingleVideo from '@/components/UploadSingleVideo'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

// 自定义左侧操作弹窗
Vue.component('PopupSelect', PopupSelect)
Vue.component('PCA', PCA)
Vue.component('UploadSingleImage', UploadSingleImage)
Vue.component('UploadSingleVideo', UploadSingleVideo)
Vue.component(CollapseTransition.name, CollapseTransition)

axios.defaults.baseURL = baseURL

const TOKEN = () => {
  return localStorage.getItem('TOKEN_SITE')
}

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  // 避免相同路由重复跳转
  if (to.path == from.path) return
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    let Authorization = TOKEN()
    if (Authorization) {
      next()
    } else {
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (to.path === '/login') {
      let Authorization = TOKEN()
      if (Authorization) {
        // next({
        //   path: '/index'
        // })
        // 加入了权限，不能直接跳转到首页了
        let userInfo = localStorage.getItem('userInfo')
        userInfo = userInfo ? JSON.parse(userInfo) : { stationType: 2 }
        if (userInfo.stationType === 2) {
          next({
            path: '/channe/index'
          })
        } else if (userInfo.stationType === 3) {
          next({
            path: '/substation/index'
          })
        } else if (userInfo.stationType === 4) {
          next({
            path: '/agency/index'
          })
        } else if (userInfo.stationType === 5) {
          next({
            path: '/operation/index'
          })
        } else if (userInfo.stationType === 6) {
          next({
            path: '/market/index'
          })
        }

      } else {
        next()
      }
    } else {
      next()
    }
  }
})

Vue.prototype.$http = request

Vue.prototype.$baseImageUrl = baseImageUrl
Vue.prototype.$baseBuyerImageUrl = baseBuyerImageUrl
Vue.prototype.$loginURL = loginURL

// 注册全局通用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
