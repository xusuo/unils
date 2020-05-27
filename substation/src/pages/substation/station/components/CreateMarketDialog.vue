<template>
  <div>
    <el-dialog
      title="新增运营帐号"
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
          prop="operateAccount"
        >
          <el-input
            v-model="form.operateAccount"
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
          prop="operateName"
        >
          <el-input
            v-model="form.operateName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <strong>如下内容会展示在用户首页，方便客户与运营沟通</strong>
        </el-form-item>
        <el-form-item
          label="对外姓名："
          prop="nickName"
        >
          <el-input
            v-model="form.nickName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式："
          prop="operateMobile"
        >
          <el-input
            v-model="form.operateMobile"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系QQ："
          prop="operateQq"
        >
          <el-input
            v-model="form.operateQq"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="QQ二维码："
          prop="qqCode"
        >
          <upload-single-image
            tip="（3M以内）"
            @success="uploadSuccessQQcode"
            :size="3072"
          />
          <!-- 显示上传了的图片 -->
          <div
            class="f-ib"
            v-if="form.qqCode"
            style="vertical-align: top;margin-left: 10px;"
          >
            <img
              :src="$baseImageUrl + form.qqCode + '?imageView2/2/w/100/h/70'"
              alt=""
              style="width: 100px;height: 70px;"
            >
          </div>
        </el-form-item>
        <el-form-item
          label="联系微信："
          prop="operateWx"
        >
          <el-input
            v-model="form.operateWx"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="微信二维码："
          prop="wxCode"
        >
          <upload-single-image
            tip="（3M以内）"
            @success="uploadSuccessWXcode"
            :size="3072"
          />

          <!-- 显示上传了的图片 -->
          <div
            class="f-ib"
            v-if="form.wxCode"
            style="vertical-align: top;margin-left: 10px;"
          >
            <img
              :src="$baseImageUrl + form.wxCode + '?imageView2/2/w/100/h/70'"
              alt=""
              style="width: 100px;height: 70px;"
            >
          </div>
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
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        nickName: "",
        operateAccount: "",
        operateMobile: "",
        operateName: "",
        operateQq: "",
        operateWx: "",
        password: "",
        qqCode: "",
        wxCode: ""
      },
      rules: {
        operateAccount: [
          {
            pattern: mobileReg,
            required: true,
            message: "登录帐号格式错误，必须是手机号码",
            trigger: "change"
          }
        ],
        operateMobile: [
          {
            pattern: mobileReg,
            required: true,
            message: "联系方式格式错误，必须是手机号码",
            trigger: "change"
          }
        ],
        operateName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
        operateQq: [
          {
            required: true,
            message: "请输入联系QQ",
            trigger: "change"
          }
        ],
        operateWx: [
          {
            required: true,
            message: "请输入联系微信",
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
        nickName: [
          {
            required: true,
            message: "请输入对外姓名",
            trigger: "change"
          }
        ],
        qqCode: [
          {
            required: true,
            message: "请上传QQ二维码",
            trigger: "change"
          }
        ],
        wxCode: [
          {
            required: true,
            message: "请上传微信二维码",
            trigger: "change"
          }
        ]
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
        nickName: "",
        operateAccount: "",
        operateMobile: "",
        operateName: "",
        operateQq: "",
        operateWx: "",
        password: "",
        qqCode: "",
        wxCode: ""
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
          url: "/t-station/insertOperateInfo",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("添加成功");
          this.visible = false;
        }
        // 调用钩子，刷新主界面的数据
        this.$emit("success");
      } catch (error) {
        this.loading = false;
      }
    },
    uploadSuccessQQcode(file) {
      // console.log(file);
      this.form.qqCode = file.saveUrl;
    },
    uploadSuccessWXcode(file) {
      // console.log(file);
      this.form.wxCode = file.saveUrl;
    }
  }
};
</script>