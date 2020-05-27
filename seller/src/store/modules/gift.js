const yutang = {
  state: {
    hotGoods: [], // 热销单品
    newGoods: [], // 新品
    classify: [], // 商品分类
    giftNum: [] //商品详情
  },
  mutations: {
    HOT_GOODS(state, hotGoods) {
      state.hotGoods = hotGoods
    },
    NEW_GOODS(state, newGoods) {
      state.newGoods = newGoods
    },
    CLASSIFY(state, classify) {
      state.classify = classify
    },
    GIFT_NUM(state, giftNum) {
      state.giftNum = giftNum
    },
  }
};

export default yutang;
