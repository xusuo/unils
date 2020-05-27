import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { baseURL, isProduction } from './config'
import Cookies from 'js-cookie'
import router from '../router'
const service = axios.create({
  baseURL: baseURL
  // request timeout
  // timeout: 500000
})

let requestLoading;
// 全局请求处理
service.interceptors.request.use(
  config => {
    let url = config.url
    let token = Cookies.get("TOKEN")

    if (/\/login/.test(url) || /\/register/.test(url) ||
      /\/getStationIdByDomain/.test(url)) {
      // config.headers['Authorization'] = ''
    } else {
      config.headers['Authorization'] = token ? token : ''
    }

    requestLoading = Loading.service({
      lock: true,
      text: '正在加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 全局返回处理
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log(res)
    requestLoading.close();
    if (res.code === 700) {
      // 处理退出登录
      // 回到登录页
    }
    if (res.code != 200 && res.code != 1) {
      Message.error(res.message)
    }
    return res
  },
  error => {
    requestLoading.close();
    if (error.response) {
      // 后台错误
      const { data } = error.response
      console.log(data)
      // Message.error('请求失败，服务器错误')
      if (!data.success) {
        // 后台返回错误
        Message.error(data.message)
        if (data.code === 700) {
          // 处理退出登录
          Cookies.remove("TOKEN")
          localStorage.removeItem('userInfo')

          // 回到登录页
          setTimeout(function () {
            router.replace({
              path: '/login'
            })
          }, 200)
        }
        return Promise.resolve(error.response.data)
      } else {
        return Promise.reject(error.response.data)
      }
      // return Promise.resolve(error.response.data)
      // return Promise.reject(error.response.data)
    } else {
      // 未知错误提示,可能是网络错误,也可能是其他

      if (error.response.status == 401) {
        // 处理退出登录
        Cookies.remove("TOKEN")
        localStorage.removeItem('userInfo')
        // 回到登录页
        setTimeout(function () {
          router.replace({
            path: '/login'
          })
        }, 200)
        return false;
      }

      Message.error('网络错误！请确认服务器是否已启动。')
      // return new Promise(() => {});
      return Promise.resolve({
        code: 211985,
        success: true,
        // data 不返回
        // data: {},
        message: '服务器连接出错，请检查服务器是否启动'
      })
    }

    // 返回接口返回的错误信息
    // return Promise.reject(error.response.data)
  }
)

export default service
