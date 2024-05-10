//  登录相关的请求
import request from '@/utils/request'

//  获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
