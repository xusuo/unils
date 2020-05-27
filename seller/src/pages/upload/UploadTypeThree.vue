<template>
  <div class="upload">
    <Search />
    <div class="upload-box banxin">

      <TopAlert />

      <div class="contentBox">
        <div class="stepThree">
          <div class="slotStepBox">
            <StepItem1
              :operateStep="operateStep"
              :orderList="orderList"
              @change-gift="handleChangeGift"
              @change-order-list="handleChangeOrderList"
            />

            <StepItem2
              :operateStep="operateStep"
              @change-type="handleChangeType"
            />

            <StepItem3
              :operateStep="operateStep"
              @change-order-list="handleChangeOrderList"
            />
            
            <StepItem5
              :operateStep="operateStep"
              :gift="gift"
              :type="type"
              :orderList="orderList"
              :remark="remark"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../common/Search"; // 搜索
import TopAlert from "./components/typeThree/TopAlert";
import StepItem1 from "./components/typeThree/StepItem1";
import StepItem2 from "./components/typeThree/StepItem2";
import StepItem3 from "./components/typeThree/StepItem3";
import StepItem5 from "./components/typeThree/StepItem5";

export default {
  components: {
    Search,
    TopAlert,
    StepItem1,
    StepItem2,
    StepItem3,
    StepItem5
  },
  data() {
    return {
      gift: null,
      type: "",
      orderList: [],
      remark: "",
      operateStep: 1
    };
  },
  computed: {
    cantSubmit() {
      return this.type === "" || this.fileName === "";
    }
  },
  methods: {
    handleChangeGift(t) {
      console.log(t);
      this.gift = t;
    },
    handleChangeType(t) {
      console.log(t);
      this.type = t;
    },
    handleChangeOrderList(t) {
      console.log(t);
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
  // created() {
  //   let id = this.$route.query.id;
  //   console.log(id);
  // },
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
        border-color: #ff4d70;

        .nums {
          color: #ff4d70;
        }

        .checked {
          color: #ff4d70;
        }
      }
    }
  }

  /deep/.nowStep {
    .title {
      .cicle {
        background: #ff4d70;

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
    background: #ff4d70;
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
