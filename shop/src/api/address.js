import request from '@/utils/request'

// 收货地址
export const GetAddresslist = () => {
  return request.get('/address/list')
}
