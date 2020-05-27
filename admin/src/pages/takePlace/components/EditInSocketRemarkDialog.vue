<template>
  <div>
    <el-dialog
      title="修改备注"
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
          label="是否到货："
          prop="daohuoStatus"
        >
          <el-select v-model="form.daohuoStatus">
            <el-option
              label="未到货"
              :value="0"
            ></el-option>
            <el-option
              label="已到货"
              :value="1"
            ></el-option>
          </el-select>
          <!-- <el-input
            v-model="form.daohuoStatus"
            placeholder="请输入内容"
            maxlength="300"
            type="textarea"
            :rows="4"
            style="width: 360px;"
          ></el-input> -->
        </el-form-item>
        <el-form-item
          label="物流单号："
          prop="waybillNo"
        >
          <el-input
            v-model="form.waybillNo"
            placeholder="请输入内容"
            maxlength="300"
            style="width: 360px;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注："
          prop="remark"
        >
          <el-input
            v-model="form.remark"
            placeholder="请输入内容"
            maxlength="300"
            type="textarea"
            :rows="4"
            style="width: 360px;"
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
        supplyApplyId: "",
        remark: "",
        daohuoStatus: "",
        waybillNo: ""
      },
      rules: {
        // remark: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入备注",
        //     trigger: "change"
        //   }
        // ]
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
        replaceShipId: item.replaceShipId,
        remark: item.remark,
        daohuoStatus: item.daohuoStatus,
        waybillNo: item.waybillNo
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
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
          url: "/seller/updateReplaceShipApply",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("备注成功");
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