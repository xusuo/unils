/*
 * @Author: 陈晨 
 * @Date: 2019-05-25 17:49:14 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-27 16:54:54
 */
<template>
  <div class="hotGoods banxin">
    <div class="hotGoods__title">
      <img
        alt
        src="./images/hot.png"
      >
      <span>多种商品满足你的需求</span>
    </div>
    <div class="hotGoods__body">
      <div class="hotGoods__img">
        <img
          alt
          src="./images/everydayUpdate.png"
        >
      </div>
      <GoodsItem :goodList="hotGoods" />
    </div>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
import { giftMixin } from "@/utils/mixin";
export default {
  mixins: [giftMixin],
  components: {
    GoodsItem
  },
  data() {
    return {
      goodList: []
    };
  },
  methods: {
    async getListData() {
      if (this.hotGoods.length) {
        return false;
      }
      try {
        let res = await this.$http({
          url: this.$loginURL + "/getGiftListPageByChoiceGoods",
          method: "post",
          data: {}
        });
        const { code, data, message = "获取失败" } = res;
        if (code === 200) {
          // this.goodList = data.slice(0, 8);
          this.setHotGoods(data.slice(0, 8));
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getListData();
  }
};
</script>
<style lang='less' scoped>
.hotGoods {
  margin-top: 20px;
  & > .hotGoods__title {
    display: flex;
    align-items: center;
    img {
      // height: 24px;
      margin-right: 12px;
    }
    span {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
    }
  }
  & > .hotGoods__body {
    margin: 15px 0 0 0;
    display: flex;
    & > .hotGoods__img {
      height: 735px;
      overflow: hidden;
      
      > img {
        width: 240px;
        height: 756px;
      }
    }
  }
}
</style>