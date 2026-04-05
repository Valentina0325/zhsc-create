import request from '@/utils/request'

export const getProlist = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      sortType: 'all',
      sortPrice: 0,
      categoryId,
      goodsName,
      page
    }
  })
}

export const getProdetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getProcom = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
