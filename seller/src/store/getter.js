const getters = {
  hotGoods: state => state.gift.hotGoods,
  newGoods: state => state.gift.newGoods,
  classify: state => state.gift.classify,
  uploadTypeTwo: state => state.upload.uploadTypeTwo,
  uploadTypeOne: state => state.upload.uploadTypeOne,
  giftNum: state => state.upload.giftNum
};

export default getters;
