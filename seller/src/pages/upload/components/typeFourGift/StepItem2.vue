<template>
  <UploadOrderEdit
    :orderList="orderList"
    :errorNum="errorNum"
    :rightNum="rightNum"
    @next="switchUploadStep"
    @change-orders="changeOrders"
  />
</template>

<script>
import UploadOrderEdit from "../UploadOrderEditFour";
export default {
  props: ["orderList", "errorNum", "rightNum"],
  components: { UploadOrderEdit },
  methods: {
    // 切换上传步骤
    switchUploadStep(step) {
      if (step === 1) {
        this.$router.push("/upload/typeFour");
      }
    },
    changeOrders(o) {
      this.$emit(
        "change-change-orders",
        JSON.parse(JSON.stringify(o.validOrders))
      );
      this.$emit("change-upload-step", 3);
      // console.log("------2");
    }
  }
};
</script>

