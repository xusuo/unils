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
      <h6 class="stepTitle">确认提交</h6>
    </div>

    <div class="cont">
      <div class="line">
      </div>

      <div class="slotBox">
        <div class="step3">
          <button
            class="sureSubmit"
            :disabled="cantSubmit"
            @click="sureToSubmit"
          >
            <i
              v-if="loading"
              class="el-icon-loading"
            ></i>
            确认提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["operateStep", "loading", "cantSubmit"],
  methods: {
    sureToSubmit() {
      this.$message.success("正在开始导入，请稍后...");
      this.$emit("change-loading", true);
      
      // 提交表格给后台
      this.$emit("submit-upload");
    }
  }
};
</script>