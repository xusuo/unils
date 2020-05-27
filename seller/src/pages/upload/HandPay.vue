<template>
  <div>
    <!-- 步骤： -->
    <!-- 1. 获取订单详细信息 -->
    <!-- 2. 点击支付跳转 有余额，则用余额支付。没有余额，则给提示，让用户用支付宝/银行卡先充值。 -->
    <!-- 2.2 无余额充值完成，再回到当前页点击支付则可以完成支付。 -->
    
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async findOrderInfo() {}
  },
  created() {
    this.findOrderInfo({
      orderId: this.$route.query.id
    });
  }
};
</script>

