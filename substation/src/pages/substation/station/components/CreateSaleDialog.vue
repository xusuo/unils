<template>
  <div>
    <el-dialog
      title="新增销售帐号"
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
          label="登录帐号："
          prop="saleAccount"
        >
          <el-input
            v-model="form.saleAccount"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          prop="password"
        >
          <el-input
            v-model="form.password"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名："
          prop="saleName"
        >
          <el-input
            v-model="form.saleName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式："
          prop="saleMobile"
        >
          <el-input
            v-model="form.saleMobile"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item
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
        >确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        saleAccount: "",
        password: "",
        saleName: "",
        saleMobile: "",
      },
      rules: {
        saleAccount: [
          {
            pattern: mobileReg,
            required: true,
            message: "登录帐号格式错误，必须是手机号码",
            trigger: "change"
          }
        ],
        saleMobile: [
          {
            pattern: mobileReg,
            required: true,
            message: "联系方式格式错误，必须是手机号码",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ],
        saleName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 24 * 60 * 60 * 1000 < Date.now();
        }
      }
    };
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.form = {
        saleAccount: "",
        password: "",
        saleName: "",
        saleMobile: "",
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
    async insertShop(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/insertSaleInfo",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("新增销售成功");
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