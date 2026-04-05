import request from '@/utils/request'
export const getUser = () => {
  return request.get('/user/info')
}
