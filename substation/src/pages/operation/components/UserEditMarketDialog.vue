<template>
  <div>
    <el-dialog
      title="修改运营"
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
          label="运营："
          prop="name"
        >
          <el-select
            v-model="form.operateId"
            class="custom-select-200"
            placeholder="请选择"
          >
            <!-- <el-option
              label="全部"
              :value="''"
            ></el-option> -->
            <el-option
              v-for="(item, i) in operateList"
              :label="item.operateName"
              :value="item.operateId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="激活时长："
          prop="activationTime"
        >
          <el-date-picker
            v-model="form.serviceDeadline"
            class="custom-select-200"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="奖金时长："
          prop="bonusTime"
        >
          <el-date-picker
            v-model="form.bonusTime"
            class="custom-select-200"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
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
  props: ["operateList"],
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        operateId: "",
        sellerId: "",
        bonusTime: "",
        serviceDeadline: ""
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
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 24 * 60 * 60 * 1000 < Date.now();
        }
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
        operateId: "",
        sellerId: item.sellerId,
        bonusTime: item.operateBonusTime,
        serviceDeadline: item.serviceDeadline
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
          this.updateSellerOperate(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateSellerOperate(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-operate/updateSellerOperate",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
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