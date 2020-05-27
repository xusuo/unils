<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 4 ? 'active' : ''}`,
               `${operateStep === 4 ? 'nowStep' : ''}`, 
               `${operateStep > 4 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 4"
        >4</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 4"
        ></i>
      </div>
      <h6 class="stepTitle">支付</h6>
    </div>

    <div class="cont">
      <div class="line">
      </div>

      <div class="slotBox">
        <div class="step4">
          <button
            class="sureSubmit"
            :disabled="cantSubmit"
            @click="sureToSubmit"
          >确认提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["operateStep", "gift", "type", "orderList", "remark"],
  data() {
    return {};
  },
  computed: {
    cantSubmit() {
      return (
        this.gift === null ||
        this.type === "" ||
        this.orderList.length === 0
      );
    }
  },
  methods: {
    async sureToSubmit() {
      console.log(this.gift);
      console.log(this.type);
      console.log(this.orderList);
      console.log(this.remark);

      let gift = this.gift;
      let orderList = this.orderList;

      // 所选礼品库存校验
      if (gift.cartId && gift.quantity < this.orderList.length) {
        this.$message.error(`礼品还剩${gift.quantity}件，库存不足，请重新选择`);
        return false;
      }

      let plat = {
        tb: 1,
        tm: 2,
        jd: 3,
        pdd: 4,
        qt: 1
      };

      let params = {
        orderType: 1,
        goodsId: gift.goods_id,
        weight: gift.weight,
        stationId: JSON.parse(localStorage.getItem("stationInfo")).stationId,
        // plat_type | 1-淘宝；2-天猫；3-京东；4-拼多多
        platType: plat[this.type],
        packageVos: []
      };

      if (gift.cartId) {
        params.cartId = gift.cartId;
      }

      orderList.forEach(m => {
        params.packageVos.push({
          orderNo: m.orderNoCursor,
          receiverName: m.receiverNameCursor,
          receiverPhone: m.receiverPhoneCursor,
          receiverState: m.receiverStateCursor,
          receiverCity: m.receiverCityCursor,
          receiverDistrict: m.receiverAreaCursor,
          receiverAddress: m.receiverAddressCursor,
          goodsNum: m.goodsNum,
        });
      });

      let res = await this.$http({
        // url: "/admin/addTask",
        url: this.$loginURL + "/importOrderList",
        method: "post",
        data: params
      });

      const { code, data } = res;

      // console.log(res);
      if (code == 200) {
        // 导入订单，并且关联礼品包成功，到下一页
        this.$message.success("创建订单成功，请及时支付。");
        // 这里建议搞一个订单详细页，直接可以支付，不用到列表页一个一个的去支付。体验不好。
        this.$router.push("/order/orderManger");
      }
    }
  }
};
</script>

