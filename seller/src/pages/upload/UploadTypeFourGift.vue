<template>
  <div class="upload">
    <div class="upload-inner">
      <StepItem2
        v-if="uploadStep === 2 && isLoadOrders"
        :orderList="orderList"
        :errorNum="errorNum"
        :rightNum="rightNum"
        @change-change-orders="handleChangeValidedOrders"
        @change-upload-step="handleChangeUploadStep"
      />
      <StepItem3
        v-if="uploadStep === 3"
        :orderList="orderList"
        :validedOrders="validedOrders"
        @change-change-orderslist="handleChangeOrderslist"
        @change-change-orders="handleChangeValidedOrders"
      />
    </div>
  </div>
</template>

<script>
import StepItem2 from "./components/typeFourGift/StepItem2";
import StepItem3 from "./components/typeFourGift/StepItem3";

export default {
  components: {
    StepItem2,
    StepItem3
  },
  data() {
    return {
      uploadStep: 2,
      orderList: [],
      errorNum: 0,
      rightNum: 0,
      isLoadOrders: false,
      validedOrders: []
    };
  },
  computed: {
    cantSubmit() {
      return this.type === "" || this.fileName === "";
    }
  },
  methods: {
    async getTaskCursorOrders() {
      let res = await this.$http({
        url: "/seller/getTaskCursorOrders",
        method: "get",
        params: {
          _index: 1,
          _size: 100,
          importId: this.$route.query.id
        }
      });

      const { code, data } = res;

      if (code == 200) {
        let orderList = data.records;
        let errorNum = 0;
        let rightNum = 0;
        orderList.forEach((m, i) => {
          m.index = i;
          m.goodsNum = 1;

          if (m.status == 0) {
            m.checkResult = false;
            errorNum++;
          }
          if (m.status == 1 || m.status == 2) {
            m.checkResult = true;
            rightNum++;
          }
        });
        // console.log(orderList);
        this.orderList = orderList;
        this.errorNum = errorNum;
        this.rightNum = rightNum;
        this.isLoadOrders = true;
      }
    },
    handleChangeOperateStep(t) {
      // console.log(t);
      this.operateStep = t;
    },
    handleChangeUploadStep(t) {
      // console.log(t);
      this.uploadStep = t;
    },
    handleChangeOrderslist(t) {
      // console.log(t);
      this.orderList = t;
    },
    handleChangeValidedOrders(t) {
      // console.log(t);
      this.validedOrders = t;
    }
  },
  created() {
    this.getTaskCursorOrders();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.upload {
  min-height: 600px;
  background: #fff;

  .upload-inner {
    width: 1260px;
    margin: 0 auto;
    padding: 30px 0;
  }

  .upload-box {
    padding: 30px 0;
  }
}

.show-tip-four {
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: bold;
}

.slotStepBox {
  /deep/.stepItem {
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

        .nums {
          font-size: 14px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.25);
          font-weight: 400;
        }

        .checked {
          font-size: 14px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.25);
          font-weight: 400;
        }
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
          background: rgba(0, 0, 0, 0.15);
        }
      }

      .slotBox {
        padding: 10px 0;
        flex: 1;
      }
    }
  }

  /deep/.active {
    .title {
      .cicle {
        border-color: #f64f6f;

        .nums {
          color: #f64f6f;
        }

        .checked {
          color: #f64f6f;
        }
      }
    }
  }

  /deep/.nowStep {
    .title {
      .cicle {
        background: #f64f6f;

        .nums {
          color: #fff;
        }
      }

      .stepTitle {
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: 700;
      }
    }
  }

  /deep/.sureSubmit {
    outline: none;
    border: none;
    -webkit-appearance: none;
    cursor: pointer;
    width: 180px;
    height: 40px;
    flex-direction: row;
    background: #f64f6f;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    font-weight: 400;
    transition: 0.2s;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      background-color: #d9d9d9 !important;
      border-color: #d9d9d9 !important;
      cursor: not-allowed;
    }
  }
}
</style>
