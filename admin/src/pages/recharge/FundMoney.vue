<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>代理人费用</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-alert
      title="代理人费用处理，是自动结算代理人佣金出错情况下使用的，请谨慎操作！"
      type="warning"
      style="margin-bottom: 20px;"
    >
    </el-alert>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="140px"
    >

      <el-form-item
        label="代理人手机号："
        prop="mobile"
      >
        <el-input
          v-model="form.mobile"
          class="custom-select-260"
          placeholder="请输入内容"
          maxlength="100"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="追加金额："
        prop="money"
      >
        <el-input
          v-model="form.money"
          class="custom-select-260"
          placeholder="请输入内容"
          maxlength="100"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleSure"
        >
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    let checkMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入追加金额"));
      } else {
        value = parseInt(value);
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value <= 0) {
            callback(new Error("追加金额必须大于0"));
          } else {
            callback();
          }
        }
      }
    };

    return {
      loading: false,
      form: {
        mobile: "",
        money: ""
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入代理人手机号",
            trigger: "change"
          }
        ],
        money: [
          {
            required: true,
            message: "请输入追加金额",
            trigger: "change"
          },
          { validator: checkMoney, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          this.$confirm(
            "确定要操作吗？此操作不可逆，请确认代理人手机号和金额再操作。",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.insertRequest(params);
            })
            .catch(() => {});
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async insertRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/seller/updateAuthUserRecharge",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("操作成功");

          this.form.mobile = "";
          this.form.money = "";
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

