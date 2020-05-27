<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="visible"
      title="导出快递单号"
      width="500px"
    >
      <div class="exportOrderDialog">
        <div class="smallTitle">
          <h6 class="stepTitleSmall">点击下载已生成的快递单号</h6>
        </div>
        <div class="cont">
          <div class="slotBox">
            <div class="exportStep0">
              <strong class="exporTips">选择您要下载的表格数据模板</strong>
              <div class="chenkBox">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox
                    disabled
                    label="第三方订单号"
                  ></el-checkbox>
                  <el-checkbox
                    disabled
                    label="快递公司"
                  ></el-checkbox>
                  <el-checkbox
                    disabled
                    label="快递单号"
                  ></el-checkbox>
                  <el-checkbox
                    disabled
                    label="收件人信息(姓名+手机号+收货地址)"
                  ></el-checkbox>
                  <el-checkbox
                    disabled
                    label="卖家备注"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="sellerCommentBox">
                <!-- <div class="radioType">
                  <el-radio
                    label="1"
                    v-model="radio"
                  >卖家备注-包裹清单</el-radio>
                  <el-radio
                    label="2"
                    v-model="radio"
                  >卖家备注-自定义</el-radio>
                </div>-->
                <el-checkbox-group v-model="canCheckList">
                  <el-checkbox label="tbTime">发货时间</el-checkbox>
                  <el-checkbox label="goodsTitle">礼品数量*名称</el-checkbox>
                </el-checkbox-group>
              </div>
              <a
                :href="taskOrderUrl"
                class="downCel button-n"
                target="_blank"
              >下载表格</a>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      radio: "1",
      checkList: [
        "第三方订单号",
        "快递公司",
        "快递单号",
        "收件人信息(姓名+手机号+收货地址)",
        "卖家备注"
      ],
      canCheckList: ["tbTime", "goodsTitle"],
      taskOrderId: ""
    };
  },
  computed: {
    taskOrderUrl() {
      let taskUrl = this.$loginURL + `/exportTasks?taskOrderId=${this.taskOrderId}`;
      if (
        this.canCheckList.includes("tbTime") &&
        !this.canCheckList.includes("goodsTitle")
      ) {
        return `${taskUrl}&fields=tbTime`;
      } else if (
        !this.canCheckList.includes("tbTime") &&
        this.canCheckList.includes("goodsTitle")
      ) {
        return `${taskUrl}&fields=goodsTitle`;
      } else if (
        !this.canCheckList.includes("tbTime") &&
        !this.canCheckList.includes("goodsTitle")
      ) {
        return `${taskUrl}`;
      } else {
        return `${taskUrl}&fields=tbTime,goodsTitle`;
      }
    }
  },
  methods: {
    show(taskOrderIds) {
      console.log(taskOrderIds);
      this.taskOrderId = taskOrderIds;
      this.visible = true;
    },

    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/seller/updateTaskOrderRemark",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success", {
            type: 1,
            sellerName: params.sellerName
          });
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.exportOrderDialog {
  padding: 0 50px;
  .stepTitleSmall {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 400;
  }
  .cont {
    display: flex;
    .slotBox {
      padding: 10px 0;
      flex: 1;
      .exporTips {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.35);
        font-weight: 400;
        margin-bottom: 10px;
      }
      .radioType {
        margin: 20px 0;
      }
      .sellerCommentBox {
        margin-bottom: 20px;
      }
    }
    .downCel {
      width: 80px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      font-size: 16px;
      line-height: 20px;
      color: #fff;
      font-weight: 400;
      margin-bottom: 20px;
      background: #f64f6f;
      padding: 0 32px;
      border: 1px solid #f64f6f;
      transition: all 0.3s;
      border-radius: 2px;
      white-space: nowrap;
    }
  }
}
</style>
