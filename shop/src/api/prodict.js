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

// 商品详情
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  }
  )
}

// 获取评价
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  }
  )
}
