<template>
  <div class="joinUs">
    <div class="custom-bread-wrap">
      我想为平台供货
      <!-- <span>（{{pagination.total}}）</span> -->
    </div>

    <div class="cusForm">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
      >
        <el-form-item
          label="商品名称："
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
          label="供货量及价格："
          prop="goodsPrice"
        >
          <el-input
            v-model="form.goodsPrice"
            class="custom-select-260"
            maxlength="16"
            placeholder="如：50件内0.3元/件 50-500件0.28元/件"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="单个商品重量："
          prop="goodsWeight"
        >
          <el-input
            v-model="form.goodsWeight"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品大小："
          prop="goodsSize"
        >
          <el-input
            v-model="form.goodsSize"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系人姓名："
          prop="sellerName"
        >
          <el-input
            v-model="form.sellerName"
            class="custom-select-260"
            maxlength="16"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系人电话："
          prop="sellerMobile"
        >
          <el-input
            v-model="form.sellerMobile"
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
        goodsPrice: "",
        goodsWeight: "",
        goodsSize: "",
        sellerName: "",
        sellerMobile: ""
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
        goodsPrice: [
          {
            whitespace: true,
            required: true,
            message: "请输入供货量及价格",
            trigger: "change"
          }
        ],
        goodsWeight: [
          {
            whitespace: true,
            required: true,
            message: "请输入单个商品重量",
            trigger: "change"
          }
        ],
        goodsSize: [
          {
            whitespace: true,
            required: true,
            message: "请输入商品大小",
            trigger: "change"
          }
        ],
        sellerName: [
          {
            whitespace: true,
            required: true,
            message: "请输入联系人姓名",
            trigger: "change"
          }
        ],
        sellerMobile: [
          {
            whitespace: true,
            required: true,
            message: "请输入联系人电话",
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
        url: "/admin/insertSupplyApply",
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
.joinUs {
  padding: 20px;

  // .tips {
  //   padding: 10px 15px;
  //   font-size: 15px;
  //   line-height: 22px;
  //   color: rgba(0, 0, 0, 0.85);
  //   font-weight: 400;
  //   border: 1px solid #ff97ab;
  //   border-radius: 2px;
  //   background: #fff9f9;
  //   margin: 0 auto 40px;
  // }

  .cusForm {
    margin-left: 240px;
  }
}
</style>