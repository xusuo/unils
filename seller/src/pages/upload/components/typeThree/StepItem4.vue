<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 4 ? 'active' : ''}`,
               `${operateStep === 4 ? 'nowStep' : ''}`, 
               `${operateStep > 4 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 4"
        >4</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 4"
        ></i>
      </div>
      <h6 class="stepTitle">填写财务备注</h6>
    </div>

    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>

      <div class="slotBox">
        <div class="step4">
          <SelectFinancial @select="changeRemark" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectFinancial from "../SelectFinancial";
export default {
  props: ["operateStep"],
  components: { SelectFinancial },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    changeRemark(remark) {
      this.$emit("change-remark", remark);
    }
  }
};
</script>

