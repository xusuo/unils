<template>
  <div>
    <el-dialog
      title="修改登录密码"
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
          label="输入原密码："
          prop="oldPassword"
        >
          <el-input
            v-model="form.oldPassword"
            class="custom-select-260"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="输入新密码："
          prop="newPassword"
        >
          <el-input
            v-model="form.newPassword"
            class="custom-select-260"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="重新输入密码："
          prop="reNewPassword"
        >
          <el-input
            v-model="form.reNewPassword"
            class="custom-select-260"
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
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请重新输入新密码"));
      } else {
        if (this.form.newPassword !== value) {
          callback(new Error("第二次输入密码和第一次输入不一致,请重新输入"));
        } else {
          callback();
        }
      }
    };

    return {
      visible: false,
      loading: false,
      form: {
        oldPassword: "",
        newPassword: "",
        reNewPassword: ""
      },
      rules: {
        oldPassword: [
          {
            whitespace: true,
            required: true,
            message: "请输入旧密码",
            trigger: "change"
          }
        ],
        newPassword: [
          {
            whitespace: true,
            required: true,
            message: "请输入新密码",
            trigger: "change"
          }
        ],
        reNewPassword: [
          { required: true, validator: validatePass, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.form = {
        oldPassword: "",
        newPassword: "",
        reNewPassword: ""
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
          url: "/auth/user/updateUserPasswordBySelf",
          method: "post",
          params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改密码成功");
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