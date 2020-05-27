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
          <upload-orders
            ref="uploadOrders"
            @success="uploadSuccess"
            @submit-success="uploadSubmitSuccess"
            @submit-error="uploadSubmitError"
            @submit-upload="submitUploaded"
            :filterText="filterText"
            :orderType="type"
          />
          <div
            class="uploadSuccessBox"
            v-if="fileName != ''"
          >
            <i class="el-icon-success"></i>
            <span class="fileName">{{fileName}}</span>
            <strong class="sucText">上传成功</strong>
          </div>

          <div style="margin-top: 20px;">
            <div
              class="filter-box"
              style="margin-bottom: 10px;"
            >
              <span>请输入需要筛选的订单号或买家账号,多个请换行（买家账号订单号系统会自动识别）</span>
              <!-- <a href="javascript:;">切换至订单编号</a> -->
            </div>
            <el-input
              v-model="filterText"
              type="textarea"
              :rows="6"
              placeholder="订单编号
买家账号
订单编号
订单编号
买家账号
订单编号"
              style="width: 752px;"
            ></el-input>
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
      fileName: "",
      filterText: ""
    };
  },
  methods: {
    uploadSuccess(file) {
      // console.log(file);
      this.fileName = file.fileName;
      this.$emit("change-file-name", file.fileName);
    },
    uploadSubmitSuccess(o) {
      this.$emit("change-loading", false);
      console.log(o);

      // 处理上传之后的数据
      let arr = [];

      // 加入成功的数据
      o.right.forEach((m, i) => {
        arr.push({
          ...m,
          index: i,
          checkResult: m.status == 0 ? false : true,
          // 商品数量，默认为 1
          goodsNum: 1
        });
      });

      // 加入失败的数据
      o.error.forEach((m, j) => {
        arr.push({
          ...m,
          index: o.right.length + j,
          checkResult: m.status == 0 ? false : true,
          // 商品数量，默认为 1
          goodsNum: 1
        });
      });

      // 关键词去掉了
      // 根据关键词筛选订单
      // let fils = [];
      // let filterText = this.filterText.split(/[(\r\n)\r\n]+/).join(",");
      // arr.filter(m => {
      //   // console.log(m.orderNoCursor);
      //   let orderId = m.orderNoCursor.toString();
      //   // console.log(this.filterText.indexOf(orderId) <= -1);
      //   if (this.filterText.indexOf(orderId) > -1) {
      //     fils.push(m);
      //   }
      // });

      // 不用判断，错误的也显示出来
      // if (o.right.length <= 0) {
      //   this.$message.error("导入失败,无有效订单.");
      // } else {
      //   // 写到vuex
      //   this.setUploadTypeOne({
      //     uploadStep: 2,
      //     errorNum: o.error.length,
      //     rightNum: o.right.length,
      //     orderList: arr,
      //     importId: o.importId
      //   });
      // }

      // 写到vuex
      this.setUploadTypeOne({
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

.filter-box {
  display: flex;

  > span {
    flex: 1;
  }
}
</style>
