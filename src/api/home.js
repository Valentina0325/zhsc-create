import request from '@/utils/request'
export const getHomedata = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0

    }
  })
}
