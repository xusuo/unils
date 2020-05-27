<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible"
    title="编辑店铺资料"
    width="600px"
  >
    <el-form
      :model="form"
      :rules="rules"
      label-width="130px"
      ref="form"
    >
      <el-form-item
        label="店铺名："
        prop="shopName"
      >
        <el-input
          class="custom-select-260"
          disabled
          maxlength="32"
          placeholder="请输入店铺名"
          v-model="form.shopName"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="店铺性质："
        prop="shopNature"
      >
        <el-radio-group v-model="form.shopNature">
          <el-radio :label="0">企业</el-radio>
          <el-radio :label="1">个人</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item
        label="发货人："
        prop="shopDeliver"
      >
        <el-input
          class="custom-select-260"
          maxlength="32"
          placeholder="请输入发货人"
          v-model="form.shopDeliver"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="发货人手机号："
        prop="shopMobile"
      >
        <el-input
          class="custom-select-260"
          maxlength="32"
          placeholder="请输入发货人手机号"
          v-model="form.shopMobile"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="发货省市区："
        prop="shopArea"
      >
        <PCA v-model="form.tempPca"/>
      </el-form-item>
      <el-form-item
        label="发货详细地址："
        prop="shopAddress"
      >
        <el-input
          class="custom-select-260"
          maxlength="128"
          placeholder="请输入发货详细地址"
          v-model="form.shopAddress"
        ></el-input>
      </el-form-item> -->
    </el-form>

    <div
      class="dialog-footer"
      slot="footer"
    >
      <el-button
        @click="visible = false"
        size="small"
      >取消</el-button>
      <el-button
        :loading="loading"
        @click="handleSure"
        size="small"
        type="primary"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        shopName: "",
        shopId: "",
        shopProvince: "",
        shopCity: "",
        shopArea: "",
        tempPca: [],
        shopDeliver: "",
        shopMobile: "",
        shopAddress: "",
        shopNature: ""
      },
      rules: {
        // menuName: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入目录名称",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  watch: {
    "form.tempPca"(value) {
      // console.log(value);
      if (value) {
        this.form.shopProvince = value[0] || "";
        this.form.shopCity = value[1] || "";
        this.form.shopArea = value[2] || "";
      }
    }
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      // console.log(item);
      this.form = {
        shopName: item.shopName,
        shopId: item.shopId,
        shopProvince: item.shopProvince,
        shopCity: item.shopCity,
        shopArea: item.shopArea,
        tempPca: [
          parseInt(item.shopProvince) || "",
          parseInt(item.shopCity) || "",
          parseInt(item.shopArea) || ""
        ],
        shopDeliver: item.shopDeliver,
        shopMobile: item.shopMobile,
        shopAddress: item.shopAddress,
        shopNature: item.shopNature,
      };
      // console.log(this.form.tempPca)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          // console.log(params);
          delete params.shopName;
          delete params.tempPca;
          this.updateShop(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateShop(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/seller/updateSellerShop",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改店铺成功");
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