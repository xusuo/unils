<template>
  <div>
    <el-dialog
      title="修改代理人"
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
          label="代理人："
          prop="agentId"
        >
          <el-select
            class="custom-select-100"
            v-model="form.saleId"
            placeholder="请选择"
            @change="switchSales"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              v-for="(item, i) in saleList"
              :label="item.saleName"
              :value="item.saleId"
              :key="i"
            ></el-option>
          </el-select>
          <el-select
            class="custom-select-100"
            v-model="form.agentId"
            placeholder="请选择"
          >
            <!-- <el-option
              label="全部"
              :value="''"
            ></el-option> -->
            <el-option
              v-for="(item, i) in agentList"
              :label="item.agentName"
              :value="item.agentId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="奖金到期日："
          prop="bonusTime"
        >
          <el-date-picker
            v-model="form.bonusTime"
            class="custom-select-200"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
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
  props: ["saleList"],
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        sellerId: "",
        agentId: "",
        bonusTime: ""
      },
      rules: {
        shopName: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺名",
            trigger: "blur"
          }
        ]
      },
      agentList: []
    };
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
    },
    reset(item) {
      this.form = {
        sellerId: item.sellerId,
        agentId: "",
        bonusTime: ""
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
          this.updateRequest(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/updateAgentInfo",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("更换代理人成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success");
        }
      } catch (error) {
        this.loading = false;
      }
    },
    async queryAgentListBySale(params) {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryAgentListBySale",
        method: "get",
        params
      });
      const { data } = res;
      if (data) {
        this.agentList = data;
      }
    },
    switchSales(value) {
      if (value) {
        this.queryAgentListBySale({
          saleId: value
        });
      } else {
        this.agentList = [];
      }
    }
  }
};
</script>