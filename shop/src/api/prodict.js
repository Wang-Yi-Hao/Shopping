// 搜索相关
import request from '@/utils/request'

//  获取搜索商品列表
export const getProList = (obj) => {
  const { categoryId, goodsName, page, sortType } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      categoryId,
      goodsName,
      page
    }
  }
  )
}
