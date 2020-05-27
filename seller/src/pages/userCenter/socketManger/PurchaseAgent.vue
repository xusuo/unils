<template>
  <div class="purchaseAgent">
    <div class="custom-bread-wrap">
      联系我们帮您代采
      <!-- <span>（{{pagination.total}}）</span> -->
    </div>

    <div class="tips">
      如果您有平台现有产品以外的较大量礼品需求，可以将您的需求提给我们，由我们的采购去寻找更低价的合适供应商，满足您的赠礼需求。
    </div>

    <div class="cusForm">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
      >
        <el-form-item
          label="代采商品名称："
          prop="goodsName"
        >
          <el-input
            v-model="form.goodsName"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="在线销售链接："
          prop="goodsUrl"
        >
          <el-input
            v-model="form.goodsUrl"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否正在使用："
          prop="isUse"
        >
          <el-radio-group v-model="form.isUse">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="是否接受支付服务费："
          prop="isServiceFee"
        >
          <el-radio-group v-model="form.isServiceFee">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.isUse == 0"
          label="预计日出货量："
          prop="onedaySaleNum"
        >
          <el-input
            v-model="form.onedaySaleNum"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="平均日出货量："
          prop="onedayAvgsaleNum"
        >
          <el-input
            v-model="form.onedayAvgsaleNum"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="当前采购成本："
          prop="nowCost"
        >
          <el-input
            v-model="form.nowCost"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="您期望的采购量："
          prop="wishNum"
        >
          <el-input
            v-model="form.wishNum"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="推荐供应商的电话："
          prop="supplierMobile"
        >
          <el-input
            v-model="form.supplierMobile"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="handleSure"
          >确认并提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        goodsName: "",
        goodsUrl: "",
        isUse: "",
        isServiceFee: "",
        onedaySaleNum: "",
        onedayAvgsaleNum: "",
        nowCost: "",
        wishNum: "",
        supplierMobile: ""
      },
      rules: {
        goodsName: [
          {
            whitespace: true,
            required: true,
            message: "请输入代采商品名称",
            trigger: "change"
          }
        ],
        goodsUrl: [
          {
            whitespace: true,
            required: true,
            message: "请输入在线销售链接",
            trigger: "change"
          }
        ],
        isUse: [
          {
            required: true,
            message: "请选择是否正在使用",
            trigger: "change"
          }
        ],
        isServiceFee: [
          {
            required: true,
            message: "请选择是否接受支付服务费",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          console.log(params);
          this.insertRequest(params);
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
      let res = await this.$http({
        url: "/admin/insertReplaceBuy",
        method: "post",
        data: params
      });

      const { code, data } = res;
      if (code == 200 && data) {
        this.$message.success(
          "提交成功，已经提交给相关业务人员了，请耐心等待。"
        );

        this.form = {
          goodsName: "",
          goodsUrl: "",
          isUse: "",
          isServiceFee: "",
          onedaySaleNum: "",
          onedayAvgsaleNum: "",
          nowCost: "",
          wishNum: "",
          supplierMobile: ""
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.purchaseAgent {
  padding: 20px;

  .tips {
    padding: 10px 15px;
    font-size: 15px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    border: 1px solid #ff97ab;
    border-radius: 2px;
    background: #fff9f9;
    margin: 0 auto 40px;
  }

  .cusForm {
    margin-left: 240px;
  }
}
</style>