<template>
  <div class="financialRemarks">
    <div class="custom-bread-wrap">
      充值中心
    </div>

    <el-form :inline="true" :model="form" class="demo-form-inline">
  <el-form-item label="充值金额：">
    <el-input v-model="form.amount" placeholder="请输入金额"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getAliRechargePayUrl">充值</el-button>
  </el-form-item>
</el-form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    async getAliRechargePayUrl() {
      try {
        if(!this.form.amount) {
          this.$message.error('请输入金额');
          return false;
        }

        let amount = parseFloat(this.form.amount).toFixed(2);

        let res = await this.$http({
          url: "/seller/getAliRechargePayUrl"+"?amount="+amount,
          method: "post",
          data: {
            amount: amount
          }
        });
        const { code, data } = res;
        if (code === 200) {

          let routerData = this.$router.resolve({path:'/applyText',query:{htmls:data}});
		    window.open(routerData.href,'_blank');

          // let myWindow = this.$refs.iframe.contentWindow.document.body
          // myWindow.innerHTML = data

          // this.$nextTick(() => {
          //   let form = myWindow.childNodes[0]
          //   form.submit()
          // });
         
          // myWindow=window.open('','')
          // myWindow.document.write(data)
          // myWindow.focus()
        }
      } catch (error) {
        console.log(error);
      }
    },
    
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
.financialRemarks {
  padding: 20px;

  .pages {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
