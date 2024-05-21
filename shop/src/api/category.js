import request from '@/utils/request'

// 获取分类列表
export const getCategoryData = () => {
  return request.get('/category/list')
}
