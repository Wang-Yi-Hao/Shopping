// 键名
const INFO_KEY = 'shopping_info'

// 获取个人信息
export const getInfo = () => {
  // 没有取到设置为空
  const defaultObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 移出个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
