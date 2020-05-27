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
      <h6 class="stepTitle">订单来源：淘宝（目前只支持淘宝店铺）</h6>
    </div>
    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>
      <div class="slotBox">
        <div class="step1">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["operateStep"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
