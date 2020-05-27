<template>
  <div>
    <el-dialog
      title="修改代理人信息"
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
          label="帐号权限："
          prop="status"
        >
          <el-radio-group v-model="form.status">
            <el-radio :label="0">开通</el-radio>
            <el-radio :label="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="用户名："
          prop="loginAccount"
        >
          <el-input
            v-model="form.loginAccount"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号："
          prop="mobile"
        >
          <el-input
            v-model="form.mobile"
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
        >确认修改</el-button>
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
        id: 0,
        loginAccount: "",
        mobile: "",
        // 用户状态(0:正常; 1:禁用)
        status: ""
      },
      rules: {
        // shopName: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入店铺名",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  methods: {
    show(item) {
      console.log(item);
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.form = {
        id: item.userId,
        userId: item.userId,
        loginAccount: item.agentAccount,
        mobile: item.agentMobile,
        // 用户状态(0:正常; 1:禁用)
        status: 0
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          // console.log(params);
          this.updateInfo(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateInfo(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/updateUser",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("新增短信模板成功");
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