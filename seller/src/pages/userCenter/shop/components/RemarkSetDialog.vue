<template>
  <el-dialog
    title="备注设置"
    width="600px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        label="是否标记："
        prop="tbIsFlag"
      >
        <el-radio-group v-model="form.tbIsFlag">
          <el-radio :label="1">标记</el-radio>
          <el-radio :label="0">不标记</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="标记："
        prop="tbFlag"
        v-if="form.tbIsFlag == 1"
      >
        <el-radio-group v-model="form.tbFlag">
          <el-radio :label="0">
            <i class="fa fa-flag" style="color: #cfcfcf;"></i>
          </el-radio>
          <el-radio :label="1">
            <i class="fa fa-flag" style="color: #f00;"></i>
          </el-radio>
          <el-radio :label="2">
            <i class="fa fa-flag" style="color: #ffed00;"></i>
          </el-radio>
          <el-radio :label="3">
            <i class="fa fa-flag" style="color: #1bb701;"></i>
          </el-radio>
          <el-radio :label="4">
            <i class="fa fa-flag" style="color: #0105b7;"></i>
          </el-radio>
          <el-radio :label="5">
            <i class="fa fa-flag" style="color: #ff34b3;"></i>
          </el-radio>
          <!-- <el-radio :label="0">
            <i class="fa fa-flag" style="color: #f00;"></i>
          </el-radio>
          <el-radio :label="1">
            <i class="fa fa-flag" style="color: #ffed00;"></i>
          </el-radio>
          <el-radio :label="2">
            <i class="fa fa-flag" style="color: #1bb701;"></i>
          </el-radio>
          <el-radio :label="3">
            <i class="fa fa-flag" style="color: #0105b7;"></i>
          </el-radio>
          <el-radio :label="4">
            <i class="fa fa-flag" style="color: #9e0098;"></i>
          </el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="标记信息："
        prop="tbFlagRemark"
        v-if="form.tbIsFlag == 1"
      >
        <el-input
          type="textarea"
          v-model="form.tbFlagRemark"
          maxlength="32"
          :rows="4"
          placeholder="请输入标记信息"
        ></el-input>
      </el-form-item>

      <div style="margin-bottom: 15px;">
        <span class="color-danger">温馨提示：</span>
        标记信息只允许输入中文、数字和英文字母。设置标记后，当买手完成下单，淘宝/京东店铺后台的订单会同步标记该内容，
        便于区别真实购买和补单购买。
      </div>
      <div>
        <span class="color-danger">温馨提示：</span>
        智能助手系统的性能跟淘宝接口和服务器相关，因此不能保证100%能够标记成功，对于标记失败的订单，
        会在下面进行记录和提醒，请各位用户在仓库发货之前登录乐客联盟核对是否有订单标记失败。
      </div>
    </el-form>

    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="small"
        @click="visible = false"
      >取消</el-button>
      <el-button
        type="primary"
        size="small"
        :loading="loading"
        @click="handleSure"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        shopId: "",
        tbIsFlag: 0,
        tbFlag: "",
        tbFlagRemark: ""
      },
      rules: {
        tbFlag: [
          {
            required: true,
            message: "请选择标记",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.form = {
        shopId: item.shopId,
        tbIsFlag: item.tbIsFlag,
        tbFlag: item.tbFlag,
        tbFlagRemark: item.tbFlagRemark
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          this.setUpRemark(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async setUpRemark(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/seller/updateSellerShop",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("操作成功");
          this.visible = false;
        }
        // 调用钩子，刷新主界面的数据
        this.$emit("success");
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>