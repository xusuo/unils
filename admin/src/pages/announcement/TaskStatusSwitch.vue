<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item>系统开关</el-breadcrumb-item>
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
        label="商家发布任务开关："
        prop="conf_value"
      >
        <el-radio-group v-model="form.conf_value">
          <el-radio label="0">开</el-radio>
          <el-radio label="1">关</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="提示语："
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
          class="custom-select-600"
          placeholder="请输入内容"
          maxlength="20"
          :rows="4"
        ></el-input>
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
        remark:"",
        conf_value:'0'
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
        url: "/admin/checkTaskSwitch",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200 && data) {
        this.form.conf_value = data.conf_value;
        this.form.remark = data.remark;
      }
    },
    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/admin/updateSysConfig",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
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
