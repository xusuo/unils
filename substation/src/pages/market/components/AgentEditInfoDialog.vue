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
          label="登录帐号："
          prop="agentAccount"
        >
          <el-input
            v-model="form.agentAccount"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="11"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名："
          prop="agentName"
        >
          <el-input
            v-model="form.agentName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式："
          prop="agentMobile"
        >
          <el-input
            v-model="form.agentMobile"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="11"
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
        userId: "",
        agentId: "",
        agentAccount: "",
        agentName: "",
        agentMobile: ""
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
        userId: item.userId,
        agentId: item.agentId,
        agentAccount: item.agentAccount,
        agentName: item.agentName,
        agentMobile: item.agentMobile
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
          url: "/t-sale/updateAgentInfo",
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