<template>
  <div
    class="stepTwo"
    
  >
    <div class="slotStepBox">

      <StepItem11
        :operateStep="operateStep"
        @change-type="handleChangeType"
      />

      <StepItem12
        ref="stepItem12"
        :operateStep="operateStep"
        @change-loading="handleChangeLoading"
        @change-file-name="handleChangeFileName"
        :type="type"
      />

      <StepItem13
        :operateStep="operateStep"
        :loading="loading"
        :cantSubmit="cantSubmit"
        @change-loading="handleChangeLoading"
        @submit-upload="submitToUploadAdmin"
      />

    </div>
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
import StepItem11 from "./StepItem1.1";
import StepItem12 from "./StepItem1.2";
import StepItem13 from "./StepItem1.3";
export default {
  mixins: [giftMixin],
  components: { StepItem11, StepItem12, StepItem13 },
  data() {
    return {
      operateStep: 1,
      // tb, tm, jd, pdd, qt
      type: "",
      fileName: "",
      loading: false
    };
  },
  computed: {
    cantSubmit() {
      return this.type === "" || this.fileName === "";
    }
  },
  methods: {
    // 修改type
    handleChangeType(t) {
      // console.log(t);
      this.type = t;
      let upType = "";
      // jd pdd tm（淘宝/天猫/其他）
      if (t === "jd" || t === "pdd") {
        upType = t;
      } else {
        upType = "tm";
      }
      // 写到vuex
      this.setUploadTypeTwo({
        type: upType
      });
    },
    // 修改loading
    handleChangeFileName(t) {
      this.fileName = t;
    },
    // 修改loading
    handleChangeLoading(t) {
      this.loading = t;
    },
    submitToUploadAdmin() {
      this.$refs.stepItem12.submit();
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
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
