<template>
  <div class="topDetailR">
    <div class="top">
      <p class="productName">{{giftDetail.gift_name}}</p>
      <div
        class="productSummer"
        v-html="giftDetail.introduce"
      ></div>
      <div class="priceWeight topRows">
        <div class="price rows">
          <span style="color: #ff4d70;">价格：</span>
          <em>
            ￥
            <b>{{giftDetail.price}}</b>
          </em>
        </div>
      </div>
      <div class="socketNum topRows">
        <div class="weight rows">
          <span>重量：</span>
          <strong>{{giftDetail.weight}}kg/{{giftDetail.unit}}</strong>
        </div>
        <div class="socket rows">
          <span>库存：</span>
          <strong>{{giftDetail.stock}}件</strong>
        </div>
        <div class="num rows">
          <span>数量：</span>
          <strong class="flex">
            <el-input-number
              :min="1"
              :max="giftDetail.stock"
              controls-position="right"
              v-model="num"
            ></el-input-number>
            <span class="single">件</span>
          </strong>
        </div>
      </div>
    </div>
    <div class="bottom">
      <!-- <el-popover
        content="当您对某商品有大量需求时，为避免您要用的时候被其他客户下单，您可以提前购买，保障足够的库存。同时所购商品还可能获得折扣。"
        placement="top-start"
        title="预购是指："
        trigger="hover"
        width="200"
      >
        <span
          class="whatBuy"
          slot="reference"
        >
          <i class="el-icon-bell"></i>
          <strong>什么是预购</strong>
        </span>
      </el-popover> -->
      <div class="buttonB">
        <!-- <button
          class="adviceBuy button"
          @click="$router.push('/mall/paySelfStore')"
        >预购</button> -->
        <button
          @click="addCart($event)"
          class="joinCar button"
        >加入购物车</button>
      </div>
      {{giftNum}}
    </div>

    <add-cart-animate
      v-model="options.visible"
      :top="options.top"
      :left="options.left"
      :src="options.src"
    />
  </div>
</template>

<script>
// import { giftMixin } from "@/utils/mixin";
import AddCartAnimate from "./AddCartAnimate";
export default {
  // mixins: [giftMixin],
  props: ["giftDetail"],
  components: { AddCartAnimate },
  data() {
    return {
      num: 1,
      options: {
        top: 0,
        left: 0,
        src: "",
        visible: false
      }
    };
  },
  methods: {
    addCart(e) {
      // console.log(e);
      // console.log(e.x, e.y);

      // 设置加购物车动画相关参数
      this.options.top = e.y + window.scrollY;
      this.options.left = e.x;
      this.options.src =
        this.$baseImageUrl + JSON.parse(this.giftDetail.pic_list)[0];
      this.options.visible = true;

      // 加购物车
      let k = 0;
      let gift = {
        id: this.giftDetail.goods_id,
        gift: this.giftDetail,
        num: this.num
      };
      let gifts = localStorage.getItem("gifts")
        ? JSON.parse(localStorage.getItem("gifts"))
        : [];
      for (let i = 0; i < gifts.length; i++) {
        let item = gifts[i];
        if (item.id === gift.id) {
          item.num += gift.num;
        } else {
          k = k + 1;
        }
      }
      if (k === gifts.length) {
        gifts.push(gift);
      }
      // console.log(gifts);

      localStorage.setItem("gifts", JSON.stringify(gifts));
    }
  },
  created() {}
};
</script>
<style lang='less'>
.topDetailR {
  flex: 1;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  font-weight: lighter;

  .top {
    .productName {
      font-size: 26px;
      line-height: 22px;
      color: #000;
      margin-bottom: 2px;
    }
    .productSummer {
      font-size: 14px;
      line-height: 20px;
      color: #999;
      font-weight: 400;
      margin-bottom: 15px;
    }
    .topRows {
      .rows {
        height: 32px;
        display: flex;
        align-items: center;
        .el-input-number {
          line-height: 22px;
          width: 100px;
        }
        .el-input__inner {
          text-align: left;
          height: 25px;
        }
        .el-input-number__decrease,
        .el-input-number__increase {
          width: 30px;
          height: 11px;
          line-height: 11px;
        }
        & > span {
          font-size: 14px;
          line-height: 18px;
          color: #666;
          width: 50px;
        }
        strong {
          font-size: 14px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.45);
          font-weight: 400;
        }
        em {
          font-size: 16px;
          line-height: 28px;
          color: #ff4d70;

          b {
            font-size: 28px;
            font-weight: lighter;
            color: #ff4d70;
          }
        }
      }
    }
    .priceWeight {
      // background: url(http://baoyitech.oss-cn-hangzhou.aliyuncs.com/9c13855…)
      //   no-repeat;
      // background: #f8f8f8;
      margin-bottom: 16px;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 158px;

    .whatBuy {
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #ff4d70;
      strong {
        font-size: 12px;
        line-height: 18px;
        color: #ff4d70;
        font-weight: 400;
      }
    }
    .buttonB {
      display: flex;
      align-items: center;
      .adviceBuy {
        font-size: 14px;
        line-height: 20px;
        color: #ff4d70;
        font-weight: 400;
        background: #fff1f1;
        border: 1px solid #ff4d70;
        margin-right: 20px;
      }
      .joinCar {
        font-size: 14px;
        line-height: 20px;
        color: #fff;
        font-weight: 400;
        background: #ff4d70;
        border: 1px solid #ff4d70;
      }
      .button {
        width: 180px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
      }
    }
  }
}
</style>