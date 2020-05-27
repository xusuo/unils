<template>
  <div>
    <el-dialog
      title="添加红包"
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
          label="红包名称："
          prop="couponName"
        >
          <el-input
            v-model="form.couponName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="红包面额："
          prop="amount"
        >
          <el-input
            v-model="form.amount"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="8"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发放数量："
          prop="nums"
        >
          <el-input
            v-model="form.nums"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="8"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="过期时间："
          prop="deadlineTime"
        >
          <el-date-picker
            v-model="form.deadlineTime"
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
        >确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { priceReg, intReg } from "@/utils/regular";
export default {
  data() {
    let validateMaxNum = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入红包面额"));
      } else {
        if (parseInt(value) > 100) {
          callback(new Error("红包面额最大值为100"));
        } else {
          callback();
        }
      }
    };

    return {
      visible: false,
      loading: false,
      form: {
        couponName: "",
        amount: "",
        nums: "",
        deadlineTime: ""
      },
      rules: {
        couponName: [
          {
            required: true,
            message: "请输入红包名称",
            trigger: "change"
          }
        ],
        amount: [
          {
            required: true,
            message: "请输入红包面额",
            trigger: "change"
          },
          {
            pattern: intReg,
            required: true,
            message: "红包面额必须是整数数值",
            trigger: "change"
          },
          { required: true, validator: validateMaxNum, trigger: "change" }
        ],
        nums: [
          {
            required: true,
            message: "请输入发放数量",
            trigger: "change"
          },
          {
            pattern: intReg,
            required: true,
            message: "发放数量必须是整数数值",
            trigger: "change"
          }
        ],
        deadlineTime: [
          {
            required: true,
            message: "请选择过期时间",
            trigger: "change"
          }
        ]
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
        couponName: "",
        amount: "",
        nums: "",
        deadlineTime: ""
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
          url: "/t-station/insertCouponByStation",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("添加红包成功");
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