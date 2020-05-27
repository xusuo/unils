<template>
  <div>
    <el-dialog
      title="提交工单"
      width="500px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <el-steps
        :active="active"
        :align-center="true"
        finish-status="success"
        class="work-order-step"
      >
        <el-step title="提交工单"></el-step>
        <el-step title="平台介入处理"></el-step>
        <el-step title="提供问题以及解决办法"></el-step>
        <el-step title="确认解决方案"></el-step>
      </el-steps>

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item
          label="问题类型："
          prop="questionType"
        >
          <el-select v-model="form.questionType">
            <el-option
              label="资金财务"
              :value="1"
            ></el-option>
            <el-option
              label="下单指南"
              :value="2"
            ></el-option>
            <el-option
              label="包裹物流"
              :value="3"
            ></el-option>
            <el-option
              label="其他问题"
              :value="4"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="问题描述："
          prop="content"
        >
          <el-input
            v-model="form.content"
            placeholder="请输入内容"
            maxlength="300"
            type="textarea"
            :rows="4"
            style="width: 350px;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式："
          prop="contactWay"
        >
          <el-input
            v-model="form.contactWay"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="上传图片："
          prop="picUrl"
        >
          <span
            class="f-ib"
            v-if="picUrlList.length > 0"
            v-for="(item, i) in picUrlList"
            style="vertical-align: top;margin-right: 5px;"
          >
            <img
              :src="$baseImageUrl + item + '?imageView2/2/w/100/h/70'"
              alt=""
              style="width: 100px;height: 70px;"
            >
          </span>
          <upload-single-image
            tip="（支持jpg、png）"
            @success="uploadPicSuccess"
            :size="3072"
            v-if="picUrlList.length < 3"
          />
        </el-form-item>
        <el-form-item
          label="添加附件："
          prop="annexUrl"
        >
          <upload-files
            @success="uploadFileSuccess"
            :size="10240"
          />
          <span v-if="fileName">
            {{fileName}}
          </span>
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
        >确定并提交工单</el-button>
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
      active: 0,
      form: {
        questionType: "",
        content: "",
        contactWay: "",
        picUrl: "",
        annexUrl: ""
      },
      rules: {
        questionType: [
          {
            required: true,
            message: "请选择工单类型",
            trigger: "change"
          }
        ],
        content: [
          {
            whitespace: true,
            required: true,
            message: "请输入问题描述",
            trigger: "change"
          }
        ],
        contactWay: [
          {
            whitespace: true,
            required: true,
            message: "请输入联系方式",
            trigger: "change"
          },
          {
            pattern: mobileReg,
            required: true,
            message: "联系方式格式错误，必须是手机号码",
            trigger: "change"
          }
        ],
        // picUrl: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请上传图片",
        //     trigger: "change"
        //   }
        // ]
      },
      // 附件文件名称
      fileName: ""
    };
  },
  computed: {
    picUrlList() {
      if (this.form.picUrl) {
        console.log(this.form.picUrl.split(","));
        return this.form.picUrl.split(",");
      }

      return [];
    }
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.form = {
        questionType: "",
        content: "",
        contactWay: localStorage.getItem("___u___"),
        picUrl: "",
        annexUrl: ""
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
    uploadPicSuccess(file) {
      if (this.form.picUrl) {
        this.form.picUrl = this.form.picUrl + "," + file.saveUrl;
      } else {
        this.form.picUrl = file.saveUrl;
      }
    },
    uploadFileSuccess(file) {
      console.log(file);
      this.form.annexUrl = file.saveUrl;
      this.fileName = file.name;
    },
    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/admin/insertUserQuestion",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("提交工单成功");
          this.visible = false;
          this.$router.push("/userCenter/helpCenter/myWorkOrder");
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

<style lang="less" scoped>
.work-order-step {
  margin-bottom: 20px;
  font-size: 14px;

  /deep/.el-step__title {
    font-size: 12px;
    font-weight: normal;
  }
}
</style>
