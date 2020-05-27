<template>
  <div class="topStepBase">
    <div class="UploadStepTips">
      <div class="baseStepBox">
        <div class="baseStep">
          <div class="stepItem firstItem">
            <div
              class="circle"
              :class="[`${step >= 1 ? 'status2' : 'status1'}`]"
            >
              <span>1</span>
            </div>
            <span
              class="titleName "
              :class="[`${step >= 1 ? 'nowTitle' : ''}`]"
            >选择平台并上传</span>
          </div>
          <div class="stepItem">
            <div class="line"></div>
            <div
              class="circle"
              :class="[`${step >= 2 ? 'status2' : 'status1'}`]"
            >
              <span>2</span>
            </div>
            <span
              class="titleName"
              :class="[`${step >= 2 ? 'nowTitle' : ''}`]"
            >输入筛选条件挑选发货</span>
          </div>
          <div class="stepItem">
            <div class="line"></div>
            <div
              class="circle"
              :class="[`${step >= 3 ? 'status2' : 'status1'}`]"
            >
              <span>3</span>
            </div>
            <span
              class="titleName"
              :class="[`${step >= 3 ? 'nowTitle' : ''}`]"
            >根据表格原商品名设置礼品</span>
          </div>
          <div class="stepItem">
            <div class="line"></div>
            <div
              class="status1 circle"
              :class="[`${step >= 4 ? 'status2' : 'status1'}`]"
            >
              <span>4</span>
            </div>
            <span
              class="titleName"
              :class="[`${step >= 4 ? 'nowTitle' : ''}`]"
            >支付</span>
          </div>
        </div>
      </div>

      <div class="tipsConent">
        <div class="warningBox">
          <h6 class="warningTitle">上传订单注意事项：</h6>
          <p class="warningText">
            1.请正确选择您的收件人信息的数据来源，否则我们无法正确识别。
          </p>
          <p class="warningText">
            2.表格请从店铺后台直接导出csv格式文件，无需修改任何数据。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["step"]
};
</script>

<style lang="less" scoped>
.topStepBase {
  padding: 10px 0 12px;
}
.UploadStepTips {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 14px 80px;
  background: #fafafa;

  .baseStepBox {
    margin-bottom: 12px;

    .baseStep {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .tipsConent {
    display: flex;

    .warningBox {
      display: flex;
      flex-direction: column;

      .warningTitle {
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: 400;
        margin-bottom: 10px;
      }

      .warningText {
        font-size: 14px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.45);
        font-weight: 400;
      }
    }
  }
}

.baseStep {
  .stepItem {
    display: flex;
    align-items: center;
    flex-grow: 1;

    .circle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      margin-right: 6px;
      background: #fff;
    }

    .status1 {
      border: 1px solid #ddd;

      span {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.45);
        font-weight: 400;
      }
    }

    .status2 {
      border: 1px solid #ff4d70;
      background: #ff4d70;

      span {
        font-size: 14px;
        line-height: 20px;
        color: #fff;
        font-weight: 400;
      }
    }

    .titleName {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
    }

    .nowTitle {
      color: rgba(0, 0, 0, 0.65);
      font-weight: 700;
    }

    .line {
      height: 1px;
      flex-grow: 1;
      background: #ddd;
      margin: 0 10px 0 6px;
    }
  }

  .firstItem {
    flex-grow: 0;
  }
}
</style>
