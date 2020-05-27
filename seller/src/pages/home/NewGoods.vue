<template>
  <div class="newGoods banxin">
    <div class="newGoods__title">
      <img
        alt
        src="./images/new.png"
      >
      <span>我们上新啦</span>
    </div>
    <div class="newGoods__body">
      <router-link
        :key="index"
        :to="'/mall/detail/'+item.goods_id"
        class="newGoods__item"
        v-for="(item, index) in newGoods"
      >
        <div class="tagIcon">新品</div>
        <img
          :alt="item.gift_name"
          :src="$baseImageUrl+JSON.parse(item.pic_list)[0]"
          class="newPic"
        >
        <p>{{item.gift_name}}</p>
        <div class="newGoods__item__numBox">
          <strong>￥{{item.price}}</strong>
          <span>重量：{{item.weight}}kg/{{item.unit}}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
export default {
  mixins: [giftMixin],
  data() {
    return {};
  },
  methods: {
    async getListData() {
      if (this.newGoods.length) {
        return false;
      }
      try {
        let res = await this.$http({
          url: this.$loginURL + "/getGiftListPageByNewGoods",
          method: "post",
          data: {}
        });
        const { code, data, message = "获取失败" } = res;
        if (code === 200) {
          this.setNewGoods(data.slice(0, 5));
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
.newGoods {
  // padding: 8px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .newGoods__title {
    height: 40px;
    // margin: 10px 0 10px 0;
    padding: 0 0 8px 0;
    display: flex;
    align-items: center;
    img {
      // height: 24px;
      margin-right: 12px;
    }
    span {
      font-size: 12px;
      line-height: 17px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
    }
  }
  .newGoods__body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;

    .newGoods__item {
      position: relative;
      margin-right: 14px;
      width: 240px;
      height: 308px;
      padding: 5px;
      transition: all 0.2s;
      box-sizing: border-box;
      background: #fff;
      font-weight: lighter;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 0.2s;
      }

      &:hover {
        &::after {
          border: 1px solid #f64f6f;
        }
      }

      &:last-child {
        margin-right: 0px;
      }

      .tagIcon {
        position: absolute;
        top: 0;
        left: 88px;
        width: 64px;
        height: 20px;
        font-size: 12px;
        color: #fff;
        background: #83c44e;
        text-align: center;
      }

      img {
        width: 230px;
        height: 230px;
        margin-bottom: 2px;
      }

      p {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.55);
        font-weight: 400;
        letter-spacing: 0.7px;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        height: 40px;
        -webkit-box-orient: vertical;
      }
      .newGoods__item__numBox {
        display: flex;
        justify-content: space-between;
        align-items: center;

        strong {
          font-size: 18px;
          line-height: 22px;
          color: #eb000c;
          font-weight: 400;
          font-family: Helvetica Neue;
        }
        span {
          font-size: 14px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.45);
          font-weight: 400;
          font-family: 苹方;
        }
      }
    }
  }
}
</style>