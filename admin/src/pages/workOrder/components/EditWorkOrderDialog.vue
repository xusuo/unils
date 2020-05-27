<template>
  <div>
    <el-dialog
      title="处理工单"
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
          label="工单状态："
          prop="status"
        >
          <el-select
            placeholder="请选择工单状态"
            v-model="form.status"
          >
            <el-option
              :value="1"
              label="设为正在处理工单"
            ></el-option>
            <el-option
              :value="2"
              label="设为处理完成"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="form.status == 1"
          label="回复内容："
          prop="replayContent"
        >
          <el-input
            v-model="form.replayContent"
            class="custom-select-300"
            placeholder="请输入内容"
            maxlength="20"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        questionId: "",
        status: "",
        replayContent: ""
      },
      rules: {
        status: [
          {
            required: true,
            message: "请选择工单状态",
            trigger: "change"
          }
        ],
        replayContent: [
          {
            whitespace: true,
            required: true,
            message: "请输入答复内容",
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
        questionId: item.questionId,
        status: "",
        replayContent: item.replyContent
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
    async editRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/seller/updateUserQuestionById",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("操作成功");
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