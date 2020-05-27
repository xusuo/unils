<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>手动充值</el-breadcrumb-item>
        <el-breadcrumb-item>扣费</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-alert
      title="扣费是直接从对应商家减钱，请谨慎操作！"
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
        label="商家ID："
        prop="sellerId"
      >
        <el-input
          v-model="form.sellerId"
          class="custom-select-260"
          placeholder="请输入内容"
          maxlength="100"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="扣费金额："
        prop="money"
      >
        <el-input
          v-model="form.money"
          class="custom-select-260"
          placeholder="请输入内容"
          maxlength="100"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="备注："
        prop="desc"
      >
        <el-input
          v-model="form.desc"
          class="custom-select-600"
          placeholder="请输入内容"
          maxlength="300"
          type="textarea"
          :rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleSure"
        >
          确定并开始扣费
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    return {
      loading: false,
      form: {
        sellerId: "",
        money: "",
        desc: ""
      },
      rules: {
        sellerId: [
          {
            required: true,
            message: "请输入商家ID",
            trigger: "change"
          }
        ],
        money: [
          {
            required: true,
            message: "请输入扣费金额",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入备注",
            trigger: "change"
          }
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
            "确定要扣除该商户的钱吗？扣费操作不可逆，请确认商家ID和金额后谨慎操作。",
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
          url: "/seller/updateSellerRecharge",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("扣费成功");

          this.form.sellerId = "";
          this.form.money = "";
          this.form.desc = "";
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

