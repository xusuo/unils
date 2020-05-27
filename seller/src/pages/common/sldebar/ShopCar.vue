<template>
  <div
    class="shopCar"
    v-show="shopCarShow"
  >
    <div class="listBox">
      <div class="titleHead">
        <span>商品</span>
        <span>数量/重量</span>
        <span>价格</span>
        <span>删除</span>
      </div>
      <ul class="listItemBox">
        <li
          v-if="gifts.length <= 0"
          style="text-align: center;color: #999;margin-top: 20px;"
        >请先选择礼品</li>
        <li
          :key="index"
          class="listItem"
          v-for="(item, index) in gifts"
        >
          <div class="detailBox">
            <span class="productName">{{item.gift.gift_name}}</span>
            <div class="detail">
              <img
                :alt="item.gift.gift_name"
                :src="$baseImageUrl+JSON.parse(item.gift.pic_list)[0]"
                class="mainPic"
              >
              <div class="productNums">
                <div class="numsTop">
                  <div class="numberCountF">
                    <el-input-number
                      :min="1"
                      :max="item.gift.stock"
                      size="mini"
                      v-model="item.num"
                      @change="changeGoogsNum($event, item)"
                    ></el-input-number>
                  </div>
                  <strong>￥{{item.gift.price}}</strong>
                  <i
                    @click="dele(item)"
                    class="el-icon-close dele"
                    title="删除"
                  ></i>
                </div>
                <span class="weight">库存：{{item.gift.stock}}，重量：{{item.gift.weight}}kg</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="countBox">
      <div class="tipsBox">
        <span>下单后</span>
        <strong>每个收件人</strong>
        <span>将收到以上产品</span>
        <div class="arrowBox">
          <i class="arrow"></i>
        </div>
      </div>
      <!-- <p class="countPtext">
        <span>商品价格</span>
        <strong>￥{{goodsPrice}}</strong>
      </p>
      <p class="countPtext">
        <span>
          圆通运费
          <em>({{totalFreight}}kg)</em>
        </span>
        <strong>￥3.20</strong>
      </p>-->
      <p class="countPtext">
        <span>总价</span>
        <strong class="totalCount">￥ {{goodsPrice}}</strong>
      </p>
      <div class="makeOrder">
        <button
          @click="sureToBuy"
          class="orderButton"
        >立即购买</button>
        <span
          @click="clearAll"
          class="clearAll"
        >清空重选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["shopCarShow"],
  data() {
    return {
      num: 1,
      gifts: [],
      params: []
      // totalFreight: "",
      // totalPrice: ""
      // goodsPrice: ""
    };
  },
  computed: {
    goodsPrice() {
      let price = 0;
      this.gifts.map(item => {
        price += item.gift.price * item.num;
      });
      return price.toFixed(2);
    }
    // totalFreight(){
    //   let price = 0;
    //   this.gifts.map(item => {
    //     price += item.gift.weight * item.num;
    //   });
    //   return price;
    // }
  },
  methods: {
    dele(item) {
      this.gifts.splice(this.gifts.indexOf(item), 1);
      localStorage.setItem("gifts", JSON.stringify(this.gifts));
    },
    clearAll() {
      localStorage.removeItem("gifts");
      this.num = [];
      this.gifts = [];
      this.params = [];
      // this.getShopCar();
    },
    getShopCar() {
      this.gifts = localStorage.getItem("gifts")
        ? JSON.parse(localStorage.getItem("gifts"))
        : [];
      this.gifts.forEach((item, index) => {
        this.params[index] = {};
        this.params[index].goodId = item.id;
        this.params[index].num = item.num;
      });
    },
    changeGoogsNum(num, item) {
      // console.log(num, item);
      let giftDetail = item.gift;
      let gift = {
        id: giftDetail.goods_id,
        gift: giftDetail,
        num
      };

      let gifts = localStorage.getItem("gifts")
        ? JSON.parse(localStorage.getItem("gifts"))
        : [];

      for (let i = 0; i < gifts.length; i++) {
        let item = gifts[i];
        if (item.id === gift.id) {
          item.num = gift.num;
        }
      }

      localStorage.setItem("gifts", JSON.stringify(gifts));
    },
    sureToBuy() {
      if (this.params.length <= 0) {
        this.$message.error("请先选择需要预购买的礼品");
        return false;
      }
      this.$confirm(
        "预购买礼品将直接使用您的余额支付,确认继续购买吗?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.buyGoods();
        })
        .catch(() => {});
    },
    async buyGoods() {
      let res = await this.$http({
        url: "/seller/paySellCarts",
        method: "post",
        data: this.params
      });
      const { code, data, message = "获取失败" } = res;
      if (code === 200) {
        this.$message.success("购买成功");
        this.clearAll();
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
<style lang='less'>
@import "./shopCar.less";
</style>