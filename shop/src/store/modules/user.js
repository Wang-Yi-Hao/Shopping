import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 用户登录权证
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {},
  getters: {}
}
