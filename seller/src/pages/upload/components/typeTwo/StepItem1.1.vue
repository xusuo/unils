<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 1 ? 'active' : ''}`,
    `${operateStep === 1 ? 'nowStep' : ''}`, 
    `${operateStep > 1 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 1"
        >1</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 1"
        ></i>
      </div>
      <h6 class="stepTitle">请选择您收件人信息的数据来源</h6>
    </div>
    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>
      <div class="slotBox">
        <div class="step1">
          <SelectPlatform
            v-model="type"
            @change-type="changeType"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectPlatform from "../SelectPlatform";
export default {
  props: ["operateStep"],
  components: { SelectPlatform },
  data() {
    return {
      // tb, tm, jd, pdd, qt
      type: ""
    };
  },
  methods: {
    changeType(t) {
      this.$emit("change-type", t);
    }
  }
};
</script>
