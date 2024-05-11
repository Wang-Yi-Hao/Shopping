import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例，将来对创建出来的实例进行配置
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 配置样式
    duration: 0 // 不会自动关闭
  })

  return config
}, function (error) {
// 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 提示
    Toast(res.message)
    // 抛出错误
    return Promise.reject(res.message)
  }
  // 正确情况，清除loading
  Toast.clear()
  return res
}, function (error) {
// 超出 2xx 范围的状态码都会触发该函数。
// 对响应错误做点什么
  return Promise.reject(error)
})

// 导出封装好的axios实例
export default instance
