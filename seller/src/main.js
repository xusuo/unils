// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import App from './App'
import store from "./store/index";
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'
import * as filters from './utils/filters'
import { baseURL, loginURL, baseImageUrl, baseBuyerImageUrl } from './utils/config'
// import '@/assets/styles/admin.css';
import '@/assets/styles/reset_element_style/index.less'
import '@/assets/styles/custom.less'
import request from './utils/request'

import PopupSelect from '@/components/PopupSelect'
import PCA from '@/components/Pca'
import UploadSingleImage from '@/components/UploadSingleImage'
import UploadFiles from '@/components/UploadFiles'
import UploadSingleVideo from '@/components/UploadSingleVideo'
import UploadOrders from '@/components/UploadOrders'
import UploadOrdersTwo from '@/components/UploadOrdersTwo'

// 打开调试工具
// Before you create app
// Vue.config.devtools = process.env.NODE_ENV === 'development'
// After you create app
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
// then had to add in ./store.js as well.
// Vue.config.devtools = process.env.NODE_ENV === 'development'

Vue.config.productionTip = false

Vue.use(ElementUI)

// 自定义左侧操作弹窗
Vue.component('PopupSelect', PopupSelect)
Vue.component('PCA', PCA)
Vue.component('UploadSingleImage', UploadSingleImage)
Vue.component('UploadFiles', UploadFiles)
Vue.component('UploadSingleVideo', UploadSingleVideo)
Vue.component('UploadOrders', UploadOrders)
Vue.component('UploadOrdersTwo', UploadOrdersTwo)
Vue.component(CollapseTransition.name, CollapseTransition)

axios.defaults.baseURL = baseURL

// 异步获取分站信息
request({
  url: loginURL + "/getStationIdByDomain",
  method: "get",
  params: {
    stationDomain: location.origin
  } 
}).then(res => {
  console.log(res);
  const { code, data } = res;
  if (code == 200 && data) {
    let stationInfo = {
      stationId: data.station_id,
      logoUrl: data.logo_url,
      channelId: data.channel_id,
      record_code: data.record_code,
      stationName: data.name
    }
    localStorage.setItem('stationInfo', JSON.stringify(stationInfo))
  } else {
    ElementUI.Message.error("请先在管理后台设置分站，分站域名设置为当前站点。")
  }
})

const TOKEN = () => {
  return Cookies.get("TOKEN")
}

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  // 避免相同路由重复跳转
  // if (to.path == from.path) return
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
        next({
          path: '/index'
        })
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
Vue.prototype.$baseURL = baseURL
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
