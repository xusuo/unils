<template>
  <div>
    <el-dialog
      title="修改分站"
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
          label="分站名称："
          prop="stationName"
        >
          <el-input
            v-model="form.stationName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站LOGO："
          prop="logoUrl"
        >
          <upload-single-image
            tip="（3M以内）"
            @success="uploadSuccessLogocode"
            :size="3072"
          />
          <!-- 显示上传了的图片 -->
          <div
            class="f-ib"
            v-if="form.logoUrl"
            style="vertical-align: top;margin-left: 10px;"
          >
            <img
              :src="$baseImageUrl + form.logoUrl + '?imageView2/2/w/100/h/70'"
              alt=""
              style="width: 100px;height: 70px;"
            >
            </div>
        </el-form-item>

        <el-form-item
          label="分站客服："
          prop="customerServiceUrl"
        >
          <upload-single-image
            tip="（3M以内）"
            @success="uploadSuccessSer"
            :size="3072"
          />
          <!-- 显示上传了的图片 -->
          <div
            class="f-ib"
            v-if="form.customerServiceUrl"
            style="vertical-align: top;margin-left: 10px;"
          >
            <img
              :src="$baseImageUrl + form.customerServiceUrl + '?imageView2/2/w/100/h/70'"
              alt=""
              style="width: 100px;height: 70px;"
            >
          </div>
        </el-form-item>

        <el-form-item
          label="管理员姓名："
          prop="manage"
        >
          <el-input
            v-model="form.manage"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="管理员手机："
          prop="managePhone"
        >
          <el-input
            v-model="form.managePhone"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站联系人姓名："
          prop="contacts"
        >
          <el-input
            v-model="form.contacts"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站联系人电话："
          prop="contactsPhone"
        >
          <el-input
            v-model="form.contactsPhone"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站联系人QQ："
          prop="contactsQq"
        >
          <el-input
            v-model="form.contactsQq"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分站联系人微信："
          prop="contactsWx"
        >
          <el-input
            v-model="form.contactsWx"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
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
        stationId: 0,
        stationName: "",
        logoUrl: "",
        customerServiceUrl: "",
        manage: "",
        managePhone: "",
        contacts: "",
        contactsPhone: "",
        contactsQq: "",
        contactsWx: ""
      },
      rules: {
        stationName: [
          {
            whitespace: true,
            required: true,
            message: "请输入分站名称",
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
        stationId: this.$route.query.id,
        stationName: item.stationName,
        logoUrl: item.logoUrl,
        customerServiceUrl: item.customerServiceUrl,
        manage: item.manage,
        managePhone: item.managePhone,
        contacts: item.contacts,
        contactsPhone: item.contactsPhone,
        contactsQq: item.contactsQq,
        contactsWx: item.contactsWx
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
    uploadSuccessLogocode(file) {
      this.form.logoUrl = file.saveUrl;
    },
    uploadSuccessSer(file) {
      this.form.customerServiceUrl = file.saveUrl;
    },
    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/channel/updateStationByChannel",
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
    }
  }
};
</script>