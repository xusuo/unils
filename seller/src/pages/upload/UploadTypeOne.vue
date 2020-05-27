<template>
  <div class="upload">
    <Search />
    <div class="upload-box banxin">
      <UploadTopStep :step="uploadTypeOne.uploadStep" />

      <div class="contentBox">
        <StepItem1 v-if="uploadTypeOne.uploadStep === 1" />
        <StepItem2 v-if="uploadTypeOne.uploadStep === 2" />
        <StepItem3 v-if="uploadTypeOne.uploadStep === 3" />
      </div>
    </div>
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
import Search from "../common/Search"; // 搜索
import UploadTopStep from "./components/UploadTopStep";
import StepItem1 from "./components/typeOne/StepItem1";
import StepItem2 from "./components/typeOne/StepItem2";
import StepItem3 from "./components/typeOne/StepItem3";

export default {
  mixins: [giftMixin],
  components: {
    Search,
    UploadTopStep,
    StepItem1,
    StepItem2,
    StepItem3
  },
  data() {
    return {
      // 下面五个参数都放到vuex里面了.
      // uploadStep: 1,
      // orderList: [],
      // 已经验证过的订单,可以直接用来下单,关联礼品
      // validedOrders: [],
      // 导入订单错误的个数
      // errorNum: 0,
      // 导入订单成功的个数
      // rightNum: 0,
    };
  },

  methods: {},
  mounted() {
    // 重置第一种方法
    this.setUploadTypeOne({
      uploadStep: 1,
      orderList: [],
      validedOrders: [],
      filterText: "",
      errorNum: 0,
      rightNum: 0,
      importId: ""
    });

    console.log(this.uploadTypeOne);
  }
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
</style>