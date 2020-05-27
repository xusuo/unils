<template>
  <UploadOrderEdit
    :orderList="uploadTypeOne.orderList"
    :errorNum="uploadTypeOne.errorNum"
    :rightNum="uploadTypeOne.rightNum"
    @next="switchUploadStep"
    @change-orders="changeOrders"
  />
</template>

<script>
import { giftMixin } from "@/utils/mixin";
import UploadOrderEdit from "../UploadOrderEdit";
export default {
  mixins: [giftMixin],
  components: { UploadOrderEdit },
  methods: {
    // 切换上传步骤
    switchUploadStep(step) {
      // 写到vuex
      this.setUploadTypeOne({
        uploadStep: step
      });
    },
    changeOrders(o) {
      // 写到vuex
      this.setUploadTypeOne({
        orderList: o.orders,
        validedOrders: JSON.parse(JSON.stringify(o.validOrders))
      });
    }
  }
};
</script>

