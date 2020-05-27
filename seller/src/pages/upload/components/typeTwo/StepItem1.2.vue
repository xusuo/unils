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
      <h6 class="stepTitle">上传表格</h6>
    </div>

    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>

      <div class="slotBox">
        <div class="step2">
          <upload-orders-two
            ref="uploadOrders"
            @success="uploadSuccess"
            @submit-success="uploadSubmitSuccess"
            @submit-error="uploadSubmitError"
            @submit-upload="submitUploaded"
            :orderType="type"
          />
          <div>
            <a
              href="http://img.91falipin.com/template%28all%29.zip"
              target="_blank"
              style="color: #ff4d70;text-decoration: underline;"
            >点击下载模板</a>
          </div>
          <div
            class="uploadSuccessBox"
            v-if="fileName != ''"
          >
            <i class="el-icon-success"></i>
            <span class="fileName">{{fileName}}</span>
            <strong class="sucText">上传成功</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
export default {
  mixins: [giftMixin],
  props: ["operateStep", "type"],
  data() {
    return {
      fileName: ""
    };
  },
  methods: {
    uploadSuccess(file) {
      console.log(file);
      this.fileName = file.fileName;
      this.$emit("change-file-name", file.fileName);
    },
    uploadSubmitSuccess(o) {
      this.$emit("change-loading", false);
      // if(!o.right || !o.left){
      //   this.$message.error("导入出错！");
      //   return false;
      // }

      // 处理上传之后的数据
      let arr = [];

      //加入成功的数据
      o.right.forEach((m, i) => {
        arr.push({
          ...m,
          index: i,
          checkResult: m.status == 0 ? false : true,
          // 商品数量，默认为 1
          goodsNum: 1
        });
      });

      //加入失败的数据
      o.error.forEach((m, j) => {
        arr.push({
          ...m,
          index: o.right.length + j,
          checkResult: m.status == 0 ? false : true,
          // 商品数量，默认为 1
          goodsNum: 1
        });
      });

      // if (o.right.length <= 0) {
      //   this.$message.error("导入失败,无有效订单.");
      // } else {
      //   // 写到vuex
      //   this.setUploadTypeTwo({
      //     uploadStep: 2,
      //     errorNum: o.error.length,
      //     rightNum: o.right.length,
      //     orderList: arr,
      //     importId: o.importId
      //   });
      // }

      // 写到vuex
      this.setUploadTypeTwo({
        uploadStep: 2,
        errorNum: o.error.length,
        rightNum: o.right.length,
        orderList: arr,
        importId: o.importId
      });
    },
    // 导入文件之后，重置为空触发的方法
    submitUploaded() {
      this.fileName = "";
    },
    uploadSubmitError() {
      this.$emit("change-loading", false);
    },
    submit() {
      this.$refs.uploadOrders.submit();
    }
  }
};
</script>

<style lang="less" scoped>
.uploadSuccessBox {
  display: flex;
  align-items: center;
  margin-top: 15px;

  i {
    font-size: 16px;
    line-height: 1;
    color: #52c41a;
    font-weight: 400;
    margin-right: 10px;
  }

  .fileName {
    font-size: 16px;
    line-height: 1;
    color: #333;
    font-weight: 400;
    margin-right: 20px;
  }

  .sucText {
    font-size: 18px;
    line-height: 1;
    color: #52c41a;
    font-weight: 700;
  }
}
</style>
