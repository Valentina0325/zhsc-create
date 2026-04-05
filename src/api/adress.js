import request from '@/utils/request'
export const getAdress = () => {
  return request.get('/address/list')
}
