import {
  mapGetters,
  mapActions
} from "vuex";

export const giftMixin = {
  computed: {
    ...mapGetters([
      "hotGoods",
      "newGoods",
      "classify",
      "uploadTypeTwo",
      "uploadTypeOne",
      "giftNum"
    ])
  },
  methods: {
    ...mapActions([
      "setHotGoods",
      "setNewGoods",
      "setClassify",
      "setUploadTypeTwo",
      "setUploadTypeOne",
      "setGiftNum"
    ])
  }
};
