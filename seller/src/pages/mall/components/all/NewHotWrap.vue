<template>
  <div class="newHotWrap">
    <div class="newHot">
      <div class="newBox newHotRight">
        <div class="title">
          <strong>新品上架</strong>
        </div>
        <ul class="newList list">
          <router-link
            :key="index"
            :to="'/mall/detail/'+item.goods_id"
            class="newItem listItem"
            v-for="(item, index) in newGoods"
            v-if="index < 2"
          >
            <div class="tagIcon">新品</div>
            <div class="topImg">
              <img
                :alt="item.gift_name"
                :src="$baseImageUrl + JSON.parse(item.pic_list)[0]"
                class="mainPic"
              >
            </div>
            <p class="productName">{{item.gift_name}}</p>
            <p class="priceText">
              <strong>￥{{item.price}}</strong>
              <span class="largeText">重量：{{item.weight}}kg/{{item.unit}}</span>
            </p>
          </router-link>
        </ul>
      </div>
      <div class="hotBox newHotRight">
        <div class="title">
          <strong>热门销量推荐</strong>
        </div>
        <ul class="newList list">
          <router-link
            :key="index"
            :to="'/mall/detail/'+item.goods_id"
            class="newItem listItem"
            v-for="(item, index) in hotGoods"
            v-if="index < 2"
          >
            <div class="topImg">
              <img
                :alt="item.gift_name"
                :src="$baseImageUrl + JSON.parse(item.pic_list)[0]"
                class="mainPic"
              >
            </div>
            <p class="productName">{{item.gift_name}}</p>
            <p class="priceText">
              <strong>￥{{item.price}}</strong>
              <span class="largeText">重量：{{item.weight}}kg/{{item.unit}}</span>
            </p>
          </router-link>
        </ul>
      </div>
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
    async getHotGoodsData() {
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
          this.setHotGoods(data.slice(0, 8));
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getNewGoodsData() {
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
    this.getNewGoodsData();
    this.getHotGoodsData();
  }
};
</script>
<style lang='less'>
.newHotWrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .newHot {
    width: 240px;
    padding: 0 0 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .newBox {
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .title {
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 22px;
      color: #333;

      strong {
        font-weight: lighter;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;

      .listItem {
        position: relative;
        width: 240px;
        margin-bottom: 30px;
        padding: 5px;
        border: 1px solid #ddd;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          border-color: #f64f6f;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }

        .topImg {
          position: relative;
          width: 230px;
          height: 230px;
          align-self: center;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .productName {
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

        .priceText {
          display: flex;
          justify-content: space-between;
          align-items: center;

          strong {
            font-size: 14px;
            line-height: 25px;
            color: #ff6700;
            font-weight: lighter;
          }
          .largeText {
            font-size: 12px;
            line-height: 20px;
            color: #b0b0b0;
            font-weight: 400;
          }
        }

        .tagIcon {
          position: absolute;
          top: 0;
          left: 88px;
          width: 64px;
          height: 20px;
          text-align: center;
          font-size: 12px;
          color: #fff;
          background: #83c44e;
          z-index: 1;
        }
      }
    }
  }
}
</style>