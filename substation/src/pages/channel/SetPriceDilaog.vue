<template>
  <div>
    <el-dialog
      title="分站价格设置"
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
        label-width="150px"
      >
        <el-form-item
          label="成本方式："
          prop="type"
        >
          <el-select v-model="form.type">
            <el-option
              label="差价"
              :value="1"
            ></el-option>
            <el-option
              label="固定金额"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="0.5kg内(普通地区)："
          prop="first"
          v-if="form.type === 1"
        >
          <el-input
            v-model="form.first"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="0.5-1kg(普通地区)："
          prop="firstKg"
          v-if="form.type === 1"
        >
          <el-input
            v-model="form.firstKg"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="续重(普通地区)："
          prop="additional"
          v-if="form.type === 1"
        >
          <el-input
            v-model="form.additional"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="0.5kg内(偏远地区)："
          prop="farFirst"
          v-if="form.type === 1"
        >
          <el-input
            v-model="form.farFirst"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="0.5-1kg(偏远地区)："
          prop="farFirstKg"
          v-if="form.type === 1"
        >
          <el-input
            v-model="form.farFirstKg"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="续重(偏远地区)："
          prop="farAdditional"
          v-if="form.type === 1"
        >
          <el-input
            v-model="form.farAdditional"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="每单提成："
          prop="onePrice"
          v-if="form.type === 2"
        >
          <el-input
            v-model="form.onePrice"
            class="custom-select-260"
            placeholder="请输入内容"
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
  props: ["expressId", "pointId"],
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        type: 1,
        channelId: "",
        stationId: "",
        expressId: "",
        pointId: "",
        setId: 0,
        first: "",
        firstKg: "",
        additional: "",
        farFirst: "",
        farFirstKg: "",
        farAdditional: "",
        isOnePrice: "",
        onePrice: ""
      },
      rules: {
        // shopName: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入店铺名",
        //     trigger: "blur"
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
      console.log(item);
      this.form = {
        type: item.isOnePrice ? 2 : 1,
        channelId: this.$route.query.channelId,
        stationId: this.$route.query.id,
        expressId: this.expressId,
        pointId: this.pointId,
        setId: item.setId,
        first: item.first,
        firstKg: item.firstKg,
        additional: item.additional,
        farFirst: item.farFirst,
        farFirstKg: item.farFirstKg,
        farAdditional: item.farAdditional,
        isOnePrice: item.isOnePrice,
        onePrice: item.onePrice
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          if (params.type === 1) {
            // 差价方式
            delete params.isOnePrice;
            delete params.onePrice;
          } else if (params.type === 2) {
            // 固定提成方式
            params.isOnePrice = 1;
            delete params.first;
            delete params.firstKg;
            delete params.additional;
            delete params.farFirst;
            delete params.farFirstKg;
            delete params.farAdditional;
          }
          // console.log(params);
          delete params.type;
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
          url: "/channel/editStationPriceSetByStationId",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
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