<template>
  <div>
    <el-dialog
      title="提现申请"
      width="500px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <div class="color-danger" style="margin-left: 20px;">
        备注：平台会在48小时内根据您提供的收款二维码进行转账操作，勿催。
      </div>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="130px"
      >
        <el-form-item
          label="当前可提现金额："
          prop="name"
        >
          <strong class="color-danger">0</strong>
        </el-form-item>
        <el-form-item
          label="申请提现金额："
          prop="name"
        >
          <el-input
            v-model="form.name"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="提现原因："
          prop="name"
        >
          <el-input
            v-model="form.name"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收款支付宝二维码："
          prop="name"
        >
          上传图片组件
        </el-form-item>
        <el-form-item
          label="收款人姓名："
          prop="name"
        >
          <el-input
            v-model="form.name"
            class="custom-select-260"
            placeholder="请输入内容"
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
        mobile: ""
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
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.form = {
        mobile: ""
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
          // this.insertShop(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async insertShop(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-sms-template/insert",
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