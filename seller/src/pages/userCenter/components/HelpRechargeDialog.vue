<template>
  <div>
    <el-dialog
      title="充值异常处理"
      width="500px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="130px"
      >
        <el-form-item
          label="交易编号："
          prop="payNo"
        >
          <el-input
            v-model="form.payNo"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        payNo: ""
      },
      rules: {
        payNo: [
          {
            whitespace: true,
            required: true,
            message: "请输入交易编号",
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
        payNo: ""
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          console.log(params);
          this.editRequest(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/seller/manualRecharge",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        this.visible = false;

        if (code === 200 && data) {
          this.$message.success("提交成功");
          // 调用钩子，刷新主界面的数据
          this.$emit("success");
        } else {
          this.$message.error("操作失败");
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>