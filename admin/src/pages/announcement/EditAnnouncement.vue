<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="140px"
      style="margin-top: 20px;"
    >

      <el-form-item
        label="公告标题："
        prop="anncTitle"
      >
        <el-input
          v-model="form.anncTitle"
          class="custom-select-260"
          placeholder="请输入内容"
          maxlength="20"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="公告类型："
        prop="anncType"
      >
        <el-radio-group v-model="form.anncType">
          <el-radio :label="1">普通公告</el-radio>
          <el-radio :label="2">紧急公告</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="是否弹窗："
        prop="isPopup"
      >
        <el-radio-group v-model="form.isPopup">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="公告摘要："
        prop="anncSummary"
      >
        <el-input
          v-model="form.anncSummary"
          type="textarea"
          class="custom-select-600"
          placeholder="请输入内容"
          maxlength="20"
          :rows="4"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="公告内容："
        prop="anncContent"
      >
        <div style="width: 1000px;">
          <UE
            v-model="form.anncContent"
            :height="300"
          />
        </div>
      </el-form-item>

      <el-form-item
        label="公告状态："
        prop="anncStatus"
      >
        <el-radio-group v-model="form.anncStatus">
          <el-radio :label="1">已发布</el-radio>
          <el-radio :label="2">未发布</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="handleSure"
          :loading="loading"
        >
          保存并发布
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { replaceUEImgUrl, recoverUEImgUrl } from "@/utils/formatUeContent";
export default {
  data() {
    return {
      loading: false,
      form: {
        anncId: "",
        anncTitle: "",
        anncType: 1,
        anncSummary: "",
        anncContent: "",
        anncStatus: 2,
        isPopup:0
      },
      rules: {
        anncTitle: [
          {
            required: true,
            message: "请输入公告标题",
            trigger: "change"
          }
        ],
        anncSummary: [
          {
            required: true,
            message: "请输入公告摘要",
            trigger: "change"
          }
        ],
        anncContent: [
          {
            required: true,
            message: "请输入公告内容",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          console.log(params,'params');
          // params.anncContent = replaceUEImgUrl(params.anncContent);
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
    async selectAnnouncementById(params) {
      let res = await this.$http({
        url: "/admin/selectAnnouncementById",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200 && data) {
        this.form.anncId = data.anncId;
        this.form.anncTitle = data.anncTitle;
        this.form.anncType = data.anncType;
        this.form.anncSummary = data.anncSummary;
        this.form.anncContent = data.anncContent;
        this.form.anncStatus = data.anncStatus;
        this.form.isPopup = data.isPopup;
      }
    },
    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/admin/updateAnnouncement",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
          this.$router.push("/announcement/list");
        }
      } catch (error) {
        this.loading = false;
      }
    }
  },
  created() {
    this.selectAnnouncementById({
      anncId: this.$route.query.id
    });
  }
};
</script>

<style lang="less" scoped>
</style>
