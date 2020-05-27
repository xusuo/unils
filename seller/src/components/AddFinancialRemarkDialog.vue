<template>
  <div>
    <el-dialog
      title="新增财务备注"
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
        label-width="100px"
      >
        <el-form-item
          label="备注内容："
          prop="note"
        >
          <el-input
            v-model="form.note"
            maxlength="200"
            type="textarea"
            :rows="4"
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

    <SendSmsTest ref="sendSmsTest" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        note: ""
      },
      rules: {
        note: [
          {
            whitespace: true,
            required: true,
            message: "请输入财务备注内容",
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
        note: ""
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
          url: "/admin/insertFinanceNote",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("新增财务成功");
          this.visible = false;
        }
        // 调用钩子，刷新主界面的数据
        this.$emit("success", this.form.note);
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>