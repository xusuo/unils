<template>
  <div>
    <el-dialog
      title="重设上级销售"
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
          label="上级销售："
          prop="saleId"
        >
          <el-select v-model="form.saleId">
            <el-option
              v-for="(item, i) in saleList"
              :label="item.saleName"
              :value="item.saleId"
              :key="i"
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
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["saleList"],
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        relationId: 0,
        saleId: 0,
        agentId: 0
      },
      rules: {
        saleId: [
          {
            required: true,
            message: "请选择上级销售",
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
        relationId: item.relationId,
        saleId: item.saleId,
        agentId: item.agentId
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
          this.updateInfo(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateInfo(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/updateSaleAgentById",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改上级销售成功");
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