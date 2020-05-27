<template>
  <div>
    <el-dialog
      title="修改库存"
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
        label-width="140px"
      >

        <el-form-item
          label="库存："
          prop="stock"
        >
          <el-input
            v-model="form.stock"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="15"
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
        goodsId: "",
        pointId: "",
        categoryId: "",
        giftName: "",
        unit: "",
        taobaoPrice: "",
        price: "",
        weight: "",
        stock: "",
        picList: "",
        detail: ""
      },
      rules: {
        stock: [
          {
            required: true,
            message: "请输入库存",
            trigger: "change"
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
        goodsId: item.goodsId,
        pointId: item.pointId,
        categoryId: item.categoryId,
        giftName: item.giftName,
        unit: item.unit,
        taobaoPrice: item.taobaoPrice,
        price: item.price,
        weight: item.weight,
        stock: item.stock,
        picList: JSON.stringify(item.picList),
        detail: item.detail
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          this.updateRequest(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/point/updateGift",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改库存成功");
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