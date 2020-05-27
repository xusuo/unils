<template>
  <div>
    <el-dialog
      title="修改用户等级价格"
      width="550px"
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
          label="类型："
          prop="status"
        >
          <el-radio-group v-model="form.status">
            <el-radio :label="0">按等级</el-radio>
            <el-radio :label="1">按价格设置</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="form.status == 0">
          <el-form-item
            label="用户等级："
            prop="sellerLevel"
          >
            <el-select
              v-model="form.sellerLevel"
              class="custom-select-200"
            >
              <el-option
                label="注册用户"
                :value="1"
              ></el-option>
              <el-option
                label="VIP用户"
                :value="2"
              ></el-option>
              <el-option
                label="黄金会员"
                :value="3"
              ></el-option>
              <el-option
                label="钻石会员"
                :value="4"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>

        <template v-if="form.status == 1">
          <el-form-item>
            礼品价格设置
          </el-form-item>
          <el-form-item
            label="0.5kg内(普通地区)："
            prop="first"
          >
            <el-input
              v-model="form.first"
              class="custom-select-260"
              placeholder="请输入内容"
            ></el-input>

            <span style="margin-left: 5px;">
              最低价：{{low.first}}
            </span>
          </el-form-item>

          <el-form-item
            label="0.5-1kg(普通地区)："
            prop="firstKg"
          >
            <el-input
              v-model="form.firstKg"
              class="custom-select-260"
              placeholder="请输入内容"
            ></el-input>

            <span style="margin-left: 5px;">
              最低价：{{low.firstKg}}
            </span>
          </el-form-item>

          <el-form-item
            label="续重(普通地区)："
            prop="additional"
          >
            <el-input
              v-model="form.additional"
              class="custom-select-260"
              placeholder="请输入内容"
            ></el-input>

            <span style="margin-left: 5px;">
              最低价：{{low.additional}}
            </span>
          </el-form-item>

          <el-form-item
            label="0.5kg内(偏远地区)："
            prop="farFirst"
          >
            <el-input
              v-model="form.farFirst"
              class="custom-select-260"
              placeholder="请输入内容"
            ></el-input>

            <span style="margin-left: 5px;">
              最低价：{{low.farFirst}}
            </span>
          </el-form-item>

          <el-form-item
            label="0.5-1kg(偏远地区)："
            prop="farFirstKg"
          >
            <el-input
              v-model="form.farFirstKg"
              class="custom-select-260"
              placeholder="请输入内容"
            ></el-input>

            <span style="margin-left: 5px;">
              最低价：{{low.farFirstKg}}
            </span>
          </el-form-item>

          <el-form-item
            label="续重(偏远地区)："
            prop="farAdditional"
          >
            <el-input
              v-model="form.farAdditional"
              class="custom-select-260"
              placeholder="请输入内容"
            ></el-input>

            <span style="margin-left: 5px;">
              最低价：{{low.farAdditional}}
            </span>
          </el-form-item>

          <el-form-item>
            信封件价格设置
          </el-form-item>

          <el-form-item
            label="信封件价格："
            prop="onePrice"
          >
            <el-input
              v-model="form.onePrice"
              class="custom-select-260"
              placeholder="请输入内容"
            ></el-input>

            <span style="margin-left: 5px;">
              最低价：{{low.xfPrice}}
            </span>
          </el-form-item>

        </template>

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
        status: 0,
        sellerId: 0,
        sellerLevel: "",
        first: "",
        firstKg: "",
        additional: "",
        farFirst: "",
        farFirstKg: "",
        farAdditional: "",
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
      },
      low: {}
    };
  },
  methods: {
    show(item, bigPrice) {
      console.log(item, bigPrice);
      this.reset(item, bigPrice);
      this.visible = true;
    },
    reset(item, bigPrice) {
      this.form = {
        status: 0,
        sellerId: item.sellerId,
        sellerLevel: item.sellerLevel,
        first: item.first,
        firstKg: item.firstKg,
        additional: item.additional,
        farFirst: item.farFirst,
        farFirstKg: item.farFirstKg,
        farAdditional: item.farAdditional,
        onePrice: item.xffirst
      };

      console.log(bigPrice);
      console.log(bigPrice.unIsOnePrice["4"]);

      this.low.first = bigPrice.unIsOnePrice["4"].first;
      this.low.firstKg = bigPrice.unIsOnePrice["4"].firstKg;
      this.low.additional = bigPrice.unIsOnePrice["4"].additional;
      this.low.farFirst = bigPrice.unIsOnePrice["4"].farFirst;
      this.low.farFirstKg = bigPrice.unIsOnePrice["4"].farFirstKg;
      this.low.farAdditional = bigPrice.unIsOnePrice["4"].farAdditional;
      this.low.xfPrice = bigPrice.isOnePrice["1"].isOnePrice;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          // console.log(params);

          // 后台处理了无关的数据。
          if (params.status === 1) {
            if (
              params.first < this.low.first ||
              params.firstKg < this.low.firstKg ||
              params.additional < this.low.additional ||
              params.farFirst < this.low.farFirst ||
              params.farFirstKg < this.low.farFirstKg ||
              params.farAdditional < this.low.farAdditional ||
              params.onePrice < this.low.xfPrice
            ) {
              this.$message.error("价格设置有误");
              return false;
            }
          }

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
          url: "/t-agent/updateSellerInfo",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success", {
            type: 4,
            sellerLevel: params.levelId
          });
        }
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>