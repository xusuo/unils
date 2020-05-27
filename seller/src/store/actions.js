const actions = {
  setHotGoods({
    commit
  }, hotGoods) {
    return commit('HOT_GOODS', hotGoods)
  },
  setNewGoods({
    commit
  }, newGoods) {
    return commit('NEW_GOODS', newGoods)
  },
  setClassify({
    commit
  }, classify) {
    return commit('CLASSIFY', classify)
  },
  setUploadTypeTwo({
    commit
  }, uploadTypeTwo) {
    return commit('UPLOAD_TYPE_TWO', uploadTypeTwo)
  },
  setUploadTypeOne({
    commit
  }, uploadTypeOne) {
    return commit('UPLOAD_TYPE_ONE', uploadTypeOne)
  },
  setGiftNum({
    commit
  }, giftNum) {
    return commit('GIFT_NUM', giftNum)
  },
};

export default actions;
