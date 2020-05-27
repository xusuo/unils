<template>
  <div>
    <el-dialog
      title="修改运营帐号"
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
          {{form.operateAccount}}
        </el-form-item>
        <el-form-item
          label="姓名："
          prop="operateName"
        >
          <el-input
            v-model="form.operateName"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="对外姓名："
          prop="nickName"
        >
          <el-input
            v-model="form.nickName"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式："
          prop="mobile"
        >
          <el-input
            v-model="form.mobile"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系QQ："
          prop="operateQQ"
        >
          <el-input
            v-model="form.operateQQ"
            class="custom-select-260"
            placeholder="请输入内容"
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
        >确认修改</el-button>
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
        userId: 0,
        mobile: "",
        nickName: "",
        operateAccount: "",
        operateId: 0,
        operateName: "",
        operateQQ: "",
        operateWx: "",
        qqCode: "",
        wxCode: ""
      },
      rules: {
        mobile: [
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
        operateQQ: [
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
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.form = {
        userId: item.userId,
        mobile: item.mobile,
        nickName: item.nickName,
        operateAccount: item.operateAccount,
        operateId: item.operateId,
        operateName: item.operateName,
        operateQQ: item.operateQQ,
        operateWx: item.operateWx,
        // 现在没有上传文件，先用下面的代替
        qqCode: item.qqCode,
        wxCode: item.wxCode
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
          this.updateOperateInfo(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateOperateInfo(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/updateOperateInfo",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
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