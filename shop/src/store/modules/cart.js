import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllChecked (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 返回数据中不包含选中状态，需要手动添加
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先提交，成功后本地修改
      await changeCount(goodsId, goodsNum, goodsSkuId).then(() => {
        context.commit('changeCount', { goodsId, goodsNum })
      })
    },
    // 删除购物车数据
    async delSelect (context) {
      const selCaretList = context.getters.selCaretList
      const cartIds = selCaretList.map(item => item.id)
      await delSelect(cartIds)
      context.dispatch('getCartAction')
      Toast('删除成功')
    }
  },
  getters: {
    // 所有的商品累加总数
    cartTotol (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selCaretList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCaretList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中商品总价
    selPrice (state, getters) {
      return getters.selCaretList.reduce((sum, item) => sum + item.goods.goods_price_min * item.goods_num, 0).toFixed(2)
    },
    // 判断小选是否全部选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
