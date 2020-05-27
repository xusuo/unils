<template>
  <div>
    <el-dialog
      title="修改商家类别"
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
          label="商家类别："
          prop="sellerType"
        >
          <el-select
            v-model="form.sellerType"
            class="custom-select-200"
          >
            <el-option
              label="0类 未联系上"
              :value="0"
            ></el-option>
            <el-option
              label="1类 已联系"
              :value="1"
            ></el-option>
            <el-option
              label="2类 初步沟通"
              :value="2"
            ></el-option>
            <el-option
              label="3类 深入沟通有意向"
              :value="3"
            ></el-option>
            <el-option
              label="4类 确定合作"
              :value="4"
            ></el-option>
            <el-option
              label="5类 已合作"
              :value="5"
            ></el-option>
            <el-option
              label="6类 悔单"
              :value="6"
            ></el-option>
            <el-option
              label="7类 无意向、放弃"
              :value="7"
            ></el-option>
            <el-option
              label="8类 信息错误"
              :value="8"
            ></el-option>
            <el-option
              label="9类 未联系"
              :value="9"
            ></el-option>
            <el-option
              label="10类 坚决不要"
              :value="10"
            ></el-option>
          </el-select>
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
        sellerId: 0,
        sellerType: ""
      },
      rules: {
        // shopName: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入店铺名",
        //     trigger: "blur"
        //   }
        // ]
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
        sellerId: item.sellerId,
        sellerType: item.sellerType
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          // console.log(params);
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
          url: "/t-station/updateSellerInfo",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success", {
            type: 3,
            sellerType: params.sellerType
          });
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>