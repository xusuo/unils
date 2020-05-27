<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 3 ? 'active' : ''}`,
    `${operateStep === 3 ? 'nowStep' : ''}`, 
    `${operateStep > 3 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 3"
        >3</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 3"
        ></i>
      </div>
      <h6 class="stepTitle">填写需导入的订单号，多个请换行,单次上限<span style="color: red;">500</span>单。</h6>
    </div>

    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>

      <div class="slotBox">
        <div class="step3">
          <el-input
            v-model="inputOrders"
            type="textarea"
            style="width: 600px;"
            :rows="4"
            placeholder="订单编号
订单编号
订单编号
订单编号"
            @change="changeOrders"
          ></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["operateStep"],
  data() {
    return {
      inputOrders: ""
    };
  },
  methods: {
    changeOrders() {
      let inputOrders = this.inputOrders.split(/[(\r\n)\r\n]+/);
      // console.log(ordetText);
      let orders = [];
      inputOrders.forEach(m => {
        let s = m.split("，");

        if (m !== "") {
          orders.push(m);
        }
      });

      this.$emit("change-order-list", orders);
    }
  }
};
</script>

<style lang="less" scoped>
.modelBox {
  display: flex;
  width: 180px;
  height: 40px;
  box-sizing: border-box;
  // border: 1px solid #dedede;
  margin-bottom: 10px;

  .modelItem {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    border: 1px solid #dedede;
    margin-left: -1px;

    span {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.25);
      font-weight: 400;
    }

    &.modelActive {
      border-color: #f64f6f;
      z-index: 1;

      span {
        color: #f64f6f;
      }
    }
  }
}

.addressBox {
  display: flex;
  flex-direction: column;

  em {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 400;
    margin-bottom: 10px;
  }

  .sureAddFinel {
    width: 180px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: #f64f6f;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    font-weight: 400;
    margin-top: 15px;
    cursor: pointer;
    transition: all 0.2s;
    box-sizing: border-box;
    border: none;
  }
}

.addressListBox {
  .addressItem {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;

    em {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
      margin-bottom: 10px;
    }

    .inputsBox {
      display: flex;
      align-items: center;

      .inpu {
        margin-right: 6px;
      }
    }

    .delete {
      width: 120px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      background: #f64f6f;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      font-weight: 400;
      margin-right: 6px;
      border: none;
    }
  }
}
</style>
