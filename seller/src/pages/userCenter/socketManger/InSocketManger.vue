<template>
  <div class="inSocketManger">
    <div class="custom-bread-wrap">
      联系我们帮您代发
      <!-- <span>（{{pagination.total}}）</span> -->
    </div>

    <div class="tips">
      如果平台当前现有礼品不能满足您的使用需求，可以将您自己的产品入我们的仓库，由我们来为您发货。
    </div>

    <div class="cusForm">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
      >
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
          label="联系人："
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
          label="商品规格："
          prop="goodsLong"
        >
          <el-input
            v-model="form.goodsLong"
            class="custom-select-100"
            maxlength="8"
            placeholder="长"
          ></el-input>
          <el-input
            v-model="form.goodsWidth"
            class="custom-select-100"
            maxlength="8"
            placeholder="宽"
          ></el-input>
          <el-input
            v-model="form.goodsHigh"
            class="custom-select-100"
            maxlength="8"
            placeholder="高"
          ></el-input>
          <span class="color-gray">(厘米/单位) </span>
        </el-form-item>
        <el-form-item prop="goodsWeight">
          <el-input
            v-model="form.goodsWeight"
            class="custom-select-100"
            maxlength="8"
            placeholder="重量"
          ></el-input>
          <span class="color-gray">(单位/千克)</span>
        </el-form-item>

        <el-form-item
          label="预计发货量："
          prop="goodsNums"
        >
          <el-input
            v-model="form.goodsNums"
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
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入商品长宽高"));
      } else {
        if (
          this.form.goodsLong === "" ||
          this.form.goodsWidth === "" ||
          this.form.goodsHigh === ""
        ) {
          callback(new Error("请输入商品长宽高"));
        } else {
          callback();
        }
      }
    };

    return {
      form: {
        isServiceFee: "",
        sellerName: "",
        sellerMobile: "",
        goodsName: "",
        goodsLong: "",
        goodsWidth: "",
        goodsHigh: "",
        goodsWeight: "",
        goodsNums: ""
      },
      rules: {
        isServiceFee: [
          {
            required: true,
            message: "请选择是否接受支付服务费",
            trigger: "change"
          }
        ],
        sellerName: [
          {
            whitespace: true,
            required: true,
            message: "请输入联系人",
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
        ],
        goodsName: [
          {
            whitespace: true,
            required: true,
            message: "请输入代采商品名称",
            trigger: "change"
          }
        ],
        goodsLong: [
          {
            whitespace: true,
            required: true,
            message: "请输入商品长宽高",
            trigger: "change"
          },
          { required: true, validator: validatePass, trigger: "change" }
        ],
        // goodsWidth: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入商品宽",
        //     trigger: "change"
        //   }
        // ],
        // goodsHigh: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入商品高",
        //     trigger: "change"
        //   }
        // ],
        goodsWeight: [
          {
            whitespace: true,
            required: true,
            message: "请输入商品重量",
            trigger: "change"
          }
        ],
        goodsNums: [
          {
            whitespace: true,
            required: true,
            message: "请输入商品预计发货量",
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
        url: "/admin/insertReplaceShipApply",
        method: "post",
        data: params
      });

      const { code, data } = res;
      if (code == 200 && data) {
        this.$message.success(
          "提交成功，已经提交给相关业务人员了，请耐心等待。"
        );

        this.form = {
          isServiceFee: "",
          sellerName: "",
          sellerMobile: "",
          goodsName: "",
          goodsLong: "",
          goodsWidth: "",
          goodsHigh: "",
          goodsWeight: "",
          goodsNums: ""
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.inSocketManger {
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
    margin-left: 200px;
  }
}
</style>