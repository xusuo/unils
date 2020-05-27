<template>
  <div class="zhifuPay">
    <div class="custom-bread-wrap">
      充值
      <em>（请打开支付宝，扫下方二维码进行充值）</em>
    </div>

    <!-- <div class="tipsBox">
      <i class="el-icon-warning icons"></i>
      <span class="tipsText">注意：请打开支付宝，扫下方二维码进行充值。</span>
    </div> -->
    <div style="text-align: center;margin-top: 20px;color:#ff4d70;font-size: 16px;">
      忘记填写备注？充值未到账？
      <a
        href="javascript:;"
        @click="$refs.helpRechargeDialog.show()"
      >请点击这里></a>
    </div>

    <el-popover
      placement="bottom"
      width="300"
      trigger="hover"
    >
      <div>
        <img
          :src="require('@/assets/images/recharge-tip.jpg')"
          alt=""
          style="width: 300px;"
        >
      </div>
      <div
        slot="reference"
        style="text-align: center;margin-top: 20px;color:#999;"
      >注意：扫描下方二维码充值时，
        在备注信息里面填写您的验证码
        <!-- <strong
          class="color-danger"
          style="cursor: pointer;"
          v-if="!isShowCode"
          @click="changeShowCode"
        >点击查看验证码</strong> -->
        <strong
          class="color-danger"
          style="font-size: 16px;"
        >（验证码为：{{sellerInfo.sellerId}}）</strong>
        ，充值会自动到账。鼠标移到此处可以查看备注详细。</div>
    </el-popover>

    <div class="zhifuBox">
      <img
        src="@/assets/images/pos.png"
        alt=""
        style="width: 300px;height: 450px;"
      >
      
      <!-- <div class="payItem">
        <div class="title">
          <span class="titleText">支付宝方式充值</span>
        </div>
        <img
          alt
          class="typeIcon"
          src="./images/alipay.png"
        >
        <span class="descript">包含0.6%手续费，支付宝官方收取</span>
        <a
          class="toRechargePay chargeBtn button-n"
          href="http://qiulipin.com/zhifuCharge?sellerAccountId=GN201901186718281999"
          target="_blank"
        >去充值</a>
      </div>
      <div class="payItem">
        <div class="title">
          <span class="titleText">银行卡方式充值</span>
          <div class="forFree">免手续费</div>
        </div>
        <i
          class="iconfont typeIcon el-icon-bank-card"
          style="color: rgb(160, 230, 88);"
        ></i>
        <span class="descript">免手续费，无需支付额外费用</span>
        <button
          @click="rechage"
          class="toRechargeBank chargeBtn button-n"
        >去充值</button>
      </div> -->
    </div>

    <HelpRechargeDialog ref="helpRechargeDialog" />
  </div>
</template>

<script>
import HelpRechargeDialog from "./components/HelpRechargeDialog";
export default {
  components: { HelpRechargeDialog },
  data() {
    return {
      payUrl: "",
      sellerInfo: {},
      isShowCode: false
    };
  },
  methods: {
    rechage() {
      this.$router.push("/userCenter/payRechargeBank");
    },
    async getSellerInfo() {
      let res = await this.$http({
        url: "/admin/getSellerInfo",
        method: "post",
        params: {}
      });

      const { code, data } = res;
      if (code == 200) {
        this.sellerInfo = data ? data : {};
      }
    },
    async getPosQrcode() {
      let res = await this.$http({
        url: "/seller/getPosQrcode",
        method: "get",
        params: {}
      });

      let { code, data } = res;
      if (code == 200) {
        this.payUrl = data;
      }
    },
    changeShowCode() {
      this.isShowCode = true;
    }
  },
  async created() {
    await this.getSellerInfo();
    // this.getPosQrcode();
  }
};
</script>
<style lang='less'>
.zhifuPay {
  padding: 20px;

  .tipsBox {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: #f64f6f;
    .icons {
      font-size: 16px;
      line-height: 1;
      color: #fff;
      font-weight: 400;
      margin-right: 15px;
    }
    .tipsText {
      font-size: 16px;
      line-height: 1;
      color: #fff;
      font-weight: 700;
    }
  }
  .zhifuBox {
    padding: 40px 0 60px 0;
    display: flex;
    justify-content: center;
    .payItem {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 0 140px;
      border-right: 1px solid rgba(0, 0, 0, 0.04);
      .title {
        margin-bottom: 30px;
        position: relative;
        .titleText {
          font-size: 16px;
          line-height: 22px;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 700;
          font-family: 苹方;
        }
        .forFree {
          position: absolute;
          right: -80px;
          top: 0;
          bottom: 0;
          margin: auto 0;
          width: 70px;
          height: 22px;
          box-sizing: border-box;
          border: 1px solid #f5a623;
          border-radius: 11px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          font-size: 12px;
          line-height: 17px;
          color: #f5a623;
          font-weight: 400;
        }
      }
      .typeIcon {
        width: 50px;
        font-size: 50px;
        margin-bottom: 20px;
      }
      .descript {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: 400;
        font-family: 苹方;
        margin-bottom: 9px;
      }

      .chargeBtn {
        transition: all 0.3s;
        border-radius: 2px;
        white-space: nowrap;
        padding: 0;
        width: 74px;
        height: 32px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        font-size: 14px;
        line-height: 1;
        color: hsla(0, 0%, 100%, 0.95);
        font-weight: 400;
        background: #ff4d70;
        border: 1px solid #ff4d70;
      }
      .toRechargeBank {
        color: #ff4d70;
        background: transparent;
      }
    }
  }
}
</style>