<template>
  <div>
    <el-dialog
      title="修改用户登录密码"
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
          label="新密码："
          prop="newPassword"
        >
          <el-input
            v-model="form.newPassword"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="16"
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
        sellerId: 0,
        newPassword: "",
        userId: 0
      },
      rules: {
        shopName: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺名",
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
        sellerId: item.sellerId,
        newPassword: "",
        userId: item.sellerId
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
          url: "/auth/user/resetSellerPassword",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success");
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>