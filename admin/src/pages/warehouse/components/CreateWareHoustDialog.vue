<template>
  <div>
    <el-dialog
      title="添加分仓"
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
          label="分仓名称："
          prop="pointName"
        >
          <el-input
            v-model="form.pointName"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所在地区："
          prop="tempPca"
        >
          <PCA
            class="custom-select-260"
            v-model="form.tempPca" :citylist.sync="form.tempPca"
          />
        </el-form-item>
        <el-form-item
          label="快递信息："
         >
          <el-select
            v-model="form.expressId"
            class="custom-select-260"
          >
            <el-option
              label="全部"
              value="9"
            ></el-option>
            <el-option
              label="圆通快递-信封"
              value="1"
            ></el-option>
            <el-option
              label="申通快递-礼品"
              value="4"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="仓库类型："
         >
          <el-select
            v-model="form.giftType"
            class="custom-select-260"
          >
            <el-option
              label="全部"
              value="9"
            ></el-option>
            <el-option
              label="礼品"
              value="0"
            ></el-option>
            <el-option
              label="信封"
              value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="详细地址："
          prop="address"
        >
          <el-input
            v-model="form.address"
            type="textarea"
            :rows="4"
            class="custom-select-260"
            placeholder="请输入内容"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="状态："
          prop="status"
        >
          <el-select
            class="custom-select-260"
            v-model="form.status"
          >
            <el-option
              label="待审核"
              :value="0"
            ></el-option>
            <el-option
              label="正常"
              :value="1"
            ></el-option>
            <el-option
              label="禁用"
              :value="2"
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
        pointName: "",
        tempPca: [],
        provice: "",
        city: "",
        address: "",
        status: 0
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
  watch: {
    "form.tempPca"(value) {
      this.form.provice = value[0];
      this.form.city = value[1];
      this.form.area = value[2];
    }
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.form = {
        pointName: "",
        tempPca: [],
        provice: "",
        city: "",
        address: "",
        status: 0
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
          delete params.tempPca;
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
          url: "/point/savePoint",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("添加分仓成功");
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