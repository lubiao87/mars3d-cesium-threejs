// 引入axios
import promise from 'es6-promise'
import axios from 'axios'
import Cookie from 'js-cookie'
import router from '../router'

promise.polyfill()
const service = axios.create({
  timeout: 20000 // 请求超时 20s
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 是否为当前的请求加上请求头 token
  if (Cookie.get('token')) {
    config.headers['x-auth-token'] = Cookie.get('token')
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if(response.data.respHeader.resultCode==1001){//token过期
       router.push('/login')
    }
    // 截取响应头的信息token 存入缓存
    if (response.headers['x-auth-token']) {
      Cookie.set('token', response.headers['x-auth-token'])
    }
    return response
  },
  error => {
    // 失败响应
    if (error && error.response) {
      let res = error.response.data
      if (Number(res.errCode) === 1002) {
        // 跳转登录路由.
        router.push('/')
        Cookie.remove('token')
      } else {
        return Promise.reject(error.response)
      }
    }
  }
)
export default service
