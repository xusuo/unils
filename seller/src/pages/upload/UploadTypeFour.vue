<template>
  <div class="upload">
    <Search />
    <div class="upload-box banxin">
      <div class="show-tip-four">
        按订单号导入方式，需要绑定店铺并开通店铺助手才能使用。
      </div>
      <div class="contentBox">
        <div class="stepThree">
          <div class="slotStepBox">
            <StepItem1 :operateStep="operateStep" />

            <StepItem2
              :operateStep="operateStep"
              @change-shop-id="handleChangeShopId"
            />

            <StepItem3
              :operateStep="operateStep"
              @change-order-list="handleChangeOrderList"
            />

            <StepItem4
              :operateStep="operateStep"
              :shopId="shopId"
              :type="type"
              :orderList="orderList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../common/Search"; // 搜索
import StepItem1 from "./components/typeFour/StepItem1";
import StepItem2 from "./components/typeFour/StepItem2";
import StepItem3 from "./components/typeFour/StepItem3";
import StepItem4 from "./components/typeFour/StepItem4";

export default {
  components: {
    Search,
    StepItem1,
    StepItem2,
    StepItem3,
    StepItem4
    // StepItem5
  },
  data() {
    return {
      shopId: "",
      type: "tb",
      orderList: [],
      // remark: "",
      operateStep: 1
    };
  },
  computed: {
    cantSubmit() {
      return this.type === "" || this.fileName === "";
    }
  },
  methods: {
    handleChangeShopId(t) {
      // console.log(t);
      this.shopId = t;
    },
    handleChangeType(t) {
      console.log(t);
      this.type = t;
    },
    handleChangeOrderList(t) {
      // console.log(t);
      this.orderList = t;
    },
    handleChangeRemark(t) {
      console.log(t);
      this.remark = t;
    },
    handleChangeOperateStep(t) {
      console.log(t);
      this.operateStep = t;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.upload {
  min-height: 600px;
  background: #fff;

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
