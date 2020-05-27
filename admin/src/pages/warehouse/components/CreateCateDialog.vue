<template>
  <div>
    <el-dialog
      title="添加分类"
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
          label="分类名称："
          prop="name"
        >
          <el-input
            v-model="form.name"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="15"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="分类编码："
          prop="categoryCode"
        >
          <el-input
            v-model="form.categoryCode"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="8"
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
        categoryCode: "",
        name: "",
        parentId: 0
      },
      rules: {
        name: [
          {
            whitespace: true,
            required: true,
            message: "请输入分类名称",
            trigger: "change"
          }
        ],
        categoryCode: [
          {
            whitespace: true,
            required: true,
            message: "请输入分类编码",
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
        categoryCode: "",
        name: "",
        parentId: 0
      };

      // 添加子分类的时候带一个主分类的ID过来
      if (item) {
        this.form.parentId = item.id;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
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
          url: "/point/saveGiftCategory",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("添加分类成功");
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