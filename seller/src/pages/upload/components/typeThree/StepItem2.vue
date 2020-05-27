<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 2 ? 'active' : ''}`,
               `${operateStep === 2 ? 'nowStep' : ''}`, 
               `${operateStep > 2 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 2"
        >2</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 2"
        ></i>
      </div>
      <h6 class="stepTitle">选择地址来源及生成单号类型</h6>
    </div>

    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>

      <div class="slotBox">
        <div class="step2">
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
      type: ""
    };
  },
  methods: {
    changeType(type){
      this.$emit("change-type", type);
    }
  }
};
</script>

