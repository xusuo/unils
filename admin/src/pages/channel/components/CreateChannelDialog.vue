<template>
  <div>
    <el-dialog
      title="添加渠道"
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
          label="渠道名称："
          prop="name"
        >
          <el-input
            v-model="form.name"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="负责人："
          prop="nickName"
        >
          <el-input
            v-model="form.nickName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="登录账号："
          prop="loginAccount"
        >
          <el-input
            v-model="form.loginAccount"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="所在地区："
          prop="tempPca"
        >
          <PCA
            class="custom-select-260"
            v-model="form.tempPca"  :citylist.sync="form.tempPca"
          />
        </el-form-item>

        <el-form-item
          label="状态："
          prop="status"
        >
          <el-select
            class="custom-select-260"
            v-model="form.status"
          >
            <el-option
              label="待审核"
              :value="0"
            ></el-option>
            <el-option
              label="正常"
              :value="1"
            ></el-option>
            <el-option
              label="禁用"
              :value="2"
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
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    let validatePca = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error("请选择所在地区"));
      } else {
        callback();
      }
    };

    return {
      visible: false,
      loading: false,
      form: {
        name: "",
        nickName: "",
        loginAccount: "",
        tempPca: [],
        provice: "",
        city: "",
        status: 0
      },
      rules: {
        name: [
          {
            whitespace: true,
            required: true,
            message: "请输入渠道名称",
            trigger: "change"
          }
        ],
        nickName: [
          {
            whitespace: true,
            required: true,
            message: "请输入负责人名称",
            trigger: "change"
          }
        ],
        loginAccount: [
          {
            // pattern: mobileReg,
            required: true,
            // message: "联系电话格式错误，必须是手机号码",
            message: "请输入登录账号",
            trigger: "change"
          },
          {
            min: 6,
            max: 16,
            message: "登录账号最少6位，最多16位",
            trigger: "change"
          }
        ],
        tempPca: [{ validator: validatePca, required: true, trigger: "change" }]
      }
    };
  },
  watch: {
    "form.tempPca"(value) {
      // console.log(value);
      this.form.provice = value[0];
      this.form.city = value[1];
      this.form.area = value[2];
    }
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.form = {
        name: "",
        nickName: "",
        loginAccount: "",
        tempPca: [],
        provice: "",
        city: "",
        status: 0
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
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/channel/addChannel",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("添加渠道成功");
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