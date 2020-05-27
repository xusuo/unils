<template>
  <el-dialog
    title="新增店铺"
    width="800px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="130px"
    >
      <el-form-item
        label="店铺类型："
        prop="shopType"
      >
        <el-radio-group v-model="form.shopType">
          <el-radio :label="0">淘宝</el-radio>
          <el-radio :label="1">天猫</el-radio>
          <!-- <el-radio :label="2">京东</el-radio>
          <el-radio :label="3">拼多多</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="店铺主账号："
        prop="shopNick"
      >
        <el-input
          class="custom-select-260"
          maxlength="32"
          placeholder="请输入店铺主账号"
          v-model="form.shopNick"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="店铺名："
        prop="shopName"
      >
        <el-input
          class="custom-select-260"
          v-model="form.shopName"
          maxlength="32"
          placeholder="请输入店铺名"
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
        verify
        alias="发货人"
      >
        <el-input
          class="custom-select-260"
          v-model="form.shopDeliver"
          maxlength="32"
          placeholder="请输入发货人"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="发货人手机号："
        prop="shopMobile"
        verify
        alias="发货人手机号"
      >
        <el-input
          class="custom-select-260"
          v-model="form.shopMobile"
          maxlength="32"
          placeholder="请输入发货人手机号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="发货省市区："
        prop="shopArea"
        verify
        alias="发货省市区"
      >
        <PCA v-model="form.tempPca" />
      </el-form-item>
      <el-form-item
        label="发货详细地址："
        prop="shopAddress"
        verify
        alias="发货详细地址"
      >
        <el-input
          class="custom-select-260"
          v-model="form.shopAddress"
          maxlength="128"
          placeholder="请输入发货详细地址"
        ></el-input>
      </el-form-item> -->

      <!-- <el-form-item>
        温馨提示： 发货人信息会显示在快递单上，所以请如实填写。
      </el-form-item> -->
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
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        shopName: "",
        sellerId: "",
        shopType: 0,
        shopNature: 0,
        // 先固定，因为还没有图片上传的
        shopImg: "",
        shopNick: "",
        shopProvince: "",
        shopCity: "",
        shopArea: "",
        tempPca: [],
        shopDeliver: "",
        shopMobile: "",
        shopAddress: ""
      },
      rules: {
        shopName: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺名",
            trigger: "blur"
          }
        ],
        shopNick: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺主账号",
            trigger: "blur"
          }
        ],
        shopImg: [
          {
            required: true,
            message: "请上传截图",
            trigger: "blur"
          }
        ]
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
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.form = {
        shopName: "",
        // 先固定，后面登录了存在本地
        sellerId: "",
        shopType: 0,
        shopNature: 0,
        // 先固定，因为还没有图片上传的
        shopImg: "",
        shopNick: "",
        shopProvince: "",
        shopCity: "",
        shopArea: "",
        tempPca: [],
        shopDeliver: "",
        shopMobile: "",
        shopAddress: ""
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
          delete params.tempPca;
          this.insertShop(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    uploadSuccess(item) {
      this.form.shopImg = item.saveUrl;
    },
    async insertShop(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/seller/addSellerShop",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("新增店铺成功");
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