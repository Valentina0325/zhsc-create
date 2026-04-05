const INDEX_KEY = 'hm-shopping'
const HISTORY_KEY = 'hm_history'
export const getInfo = () => {
  const res = localStorage.getItem(INDEX_KEY)
  // console.log(res)

  return res
    ? JSON.parse(res)
    : {
        token: '',
        userId: ''
      }
}
export const setInfo = (info) => {
  localStorage.setItem(INDEX_KEY, JSON.stringify(info))
}
export const removeInfo = () => {
  localStorage.removeItem(INDEX_KEY)
}

export const getHistory = () => {
  const res = localStorage.getItem(HISTORY_KEY)
  return res ? JSON.parse(res) : []
}
export const setHistory = (list) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}
