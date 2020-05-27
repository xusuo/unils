import axios from 'axios'
import { Message } from 'element-ui'
import { baseURL, isProduction } from './config'
import router from '../router'
const service = axios.create({
  baseURL: baseURL
  // request timeout
  // timeout: 500000
})
// 全局请求处理
service.interceptors.request.use(
  config => {
    let url = config.url
    let token = localStorage.getItem('TOKEN_SITE')

    if (/\/login/.test(url) || /\/register/.test(url)) {
      // config.headers['Authorization'] = ''
    } else {
      config.headers['Authorization'] = token ? token : ''
    }
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
    console.log(error)
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
          localStorage.removeItem('TOKEN_SITE')
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
