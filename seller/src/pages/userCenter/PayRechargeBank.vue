<template>
  <div class="payRechargeBank">
    <div class="topStepBox">
      <div class="slotStepBox">
        <div class="stepItem active passed">
          <div class="title">
            <div class="cicle">
              <i class="el-icon-check checked"></i>
            </div>
            <h6 class="stepTitle">转账到官方指定收款账号</h6>
          </div>

          <div class="cont">
            <div class="line">
              <span class="lineBg"></span>
            </div>
            <div class="slotBox">
              <div class="step0">
                <em class="cantPay">特别注意：不支持通过支付宝、微信转账至银行卡（无法核对打款人姓名）</em>
                <div class="accountInfo">
                  <strong>转账途径</strong>
                  <span>网银、手机银行</span>
                </div>
                <div class="accountInfo">
                  <strong>收款户名</strong>
                  <span>刘灿</span>
                </div>
                <div class="accountInfo">
                  <strong>收款帐号</strong>
                  <span>6214 8359 0807 4717</span>
                </div>
                <div class="accountInfo">
                  <strong>收款银行</strong>
                  <span>招商银行-杭州分行保俶支行</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="stepItem active nowStep">
          <div class="title">
            <div class="cicle">
              <span class="nums">2</span>
            </div>
            <h6 class="stepTitle">提交转账信息</h6>
          </div>

          <div class="cont">
            <div class="line">
              <span class="lineBg"></span>
            </div>
            <div class="slotBox">
              <div class="step1">
                <h6 class="step2tips">转账至平台指定账号后，点击下方按钮提交转账信息</h6>
                <button class="button-n addChargeInfo">提交转账信息</button>
              </div>
            </div>
          </div>
        </div>
        <div class="stepItem">
          <div class="title">
            <div class="cicle">
              <span class="nums">3</span>
            </div>
            <h6 class="stepTitle">人工审核</h6>
          </div>

          <div class="cont">
            <div class="line"></div>
            <div class="slotBox">
              <div class="step2">
                <em class="workTime">审核时间：9:00 - 18:00</em>
                <br>
                <em class="workTime">充值咨询客服微信：lipinchongzhi</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="visible"
      center
      title="提示"
      width="40%"
    >
      <div class="rechargeTipsBox">
        <h4 class="title">
          银行卡转账审核到账
          <em class="slow">极慢</em>
        </h4>
        <div class="tipText">
          <span class="tips">建议预充值用户、</span>
          <span class="tips">大额充值用户（单笔转账1000以上）使用</span>
        </div>
        <h5 class="espText">特别注意：</h5>
        <h6 class="warningText">不支持通过支付宝、微信转账至银行卡（无法核对打款人姓名）</h6>
      </div>
      <span
        class="dialog-footer"
        slot="footer"
      >
        <button
          @click="close"
          class="sureBtn buttonItem"
        >关闭</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    };
  },
  methods: {
    close() {
      this.visible = !this.visible;
    }
  }
};
</script>
<style lang='less'>
.rechargeTipsBox {
  text-align: center;
  .title {
    font-size: 16px;
    line-height: 22px;
    color: #000;
    font-weight: 700;
    margin-bottom: 20px;
    .slow {
      font-size: 24px;
      line-height: 1;
      color: #ff4d70;
      font-weight: 700;
    }
  }
  .tips {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
  }
  .espText {
    font-size: 16px;
    line-height: 22px;
    color: #000;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .warningText {
    font-size: 14px;
    line-height: 1;
    color: #f64f6f;
    font-weight: 400;
    margin-bottom: 40px;
  }
}
.slotStepBox {
  .stepItem {
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      align-items: center;
      .cicle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.15);
        margin-right: 15px;
        border-color: #f64f6f;
      }
      .stepTitle {
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        font-weight: 400;
      }
    }
    .cont {
      display: flex;
      .line {
        width: 32px;
        margin-right: 15px;
        display: flex;
        justify-content: center;
        .lineBg {
          width: 1px;
          background: #f64f6f;
        }
      }
      .slotBox {
        padding: 10px 0;
        flex: 1;
      }
    }
  }
}

.sureBtn {
  margin: 0 auto;
  background: #f64f6f;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  font-weight: 400;
  min-width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  box-sizing: border-box;
}
</style>