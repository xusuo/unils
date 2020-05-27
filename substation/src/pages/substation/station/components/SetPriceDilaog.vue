<template>
  <div>
    <el-dialog
      title="价格设置"
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
        <el-form-item>
          <strong>{{levelName}}-{{type == '1' ? '申通快递' : '申通快递'}}</strong>
        </el-form-item>

        <el-form-item
          v-if="expressType != 1"
          label="0.5kg内(普通地区)："
          prop="first"
        >
          <el-input
            v-model="form.first"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="expressType != 1"
          label="0.5-1kg(普通地区)："
          prop="firstKg"
        >
          <el-input
            v-model="form.firstKg"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="expressType != 1"
          label="续重(普通地区)："
          prop="additional"
        >
          <el-input
            v-model="form.additional"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="expressType != 1"
          label="0.5kg内(偏远地区)："
          prop="farFirst"
        >
          <el-input
            v-model="form.farFirst"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="expressType != 1"
          label="0.5-1kg(偏远地区)："
          prop="farFirstKg"
        >
          <el-input
            v-model="form.farFirstKg"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="expressType != 1"
          label="续重(偏远地区)："
          prop="farAdditional"
        >
          <el-input
            v-model="form.farAdditional"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item
          v-if="expressType == 1"
          label="一口价："
          prop="onePrice"
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
  props: {
    costTableList: {
      type: Array,
      default: true
    }
  },
  data() {
    var valifirst = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.costTableList[0].first) {
          callback(new Error('不能小于成本价格'+this.costTableList[0].first+"元"));
        }
        callback();
      }
    };
    var valifirstKg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.costTableList[0].firstKg) {
          callback(new Error('不能小于成本价格'+this.costTableList[0].firstKg+"元"));
        }
        callback();
      }
    };
    var valiadditional = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.costTableList[0].additional) {
          callback(new Error('不能小于成本价格'+this.costTableList[0].additional+"元"));
        }
        callback();
      }
    };
    var valifarFirst = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.costTableList[0].farFirst) {
          callback(new Error('不能小于成本价格'+this.costTableList[0].farFirst+"元"));
        }
        callback();
      }
    };
    var valifarFirstKg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.costTableList[0].farFirstKg) {
          callback(new Error('不能小于成本价格'+this.costTableList[0].farFirstKg+"元"));
        }
        callback();
      }
    };
    var valifarAdditional = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.costTableList[0].farAdditional) {
          callback(new Error('不能小于成本价格'+this.costTableList[0].farAdditional+"元"));
        }
        callback();
      }
    };
    var valionePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.costTableList[1].onePrice) {
          callback(new Error('不能小于成本价格'+this.costTableList[1].onePrice+"元"));
        }
        callback();
      }
    };
    return {
      visible: false,
      loading: false,
      costTableList: [],
      form: {
        setId: 0,
        first: "",
        firstKg: "",
        additional: "",
        farFirst: "",
        farFirstKg: "",
        farAdditional: "",
        expressId: "1",
        onePrice: "",
        isOnePrice: ""
      },
      rules: {
        first: [
          { required: true, validator: valifirst, trigger: 'blur' }
        ],
        firstKg: [
          { required: true, validator: valifirstKg, trigger: 'blur' }
        ],
        additional: [
          { required: true, validator: valiadditional, trigger: 'blur' }
        ],
        farFirst: [
          { required: true, validator: valifarFirst, trigger: 'blur' }
        ],
        farFirstKg: [
          { required: true, validator: valifarFirstKg, trigger: 'blur' }
        ],
        farAdditional: [
          { required: true, validator: valifarAdditional, trigger: 'blur' }
        ],
        onePrice: [
          { required: true, validator: valionePrice, trigger: 'blur' }
        ],
        shopName: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺名",
            trigger: "blur"
          }
        ]
      },
      levelName: "",
      type: "1",
      expressType: ""
    };
  },
  methods: {
    show(item, type, expressType) {
      this.reset(item, type, expressType);
      this.visible = true;
    },
    reset(item, type, expressType) {
      this.levelName = item.levelName;
      this.type = type;
      this.expressType = expressType;
      this.form = {
        setId: item.setId,
        first: item.first,
        firstKg: item.firstKg,
        additional: item.additional,
        farFirst: item.farFirst,
        farFirstKg: item.farFirstKg,
        farAdditional: item.farAdditional,
        expressId: type,
        onePrice: item.onePrice,
        levelId: item.levelId
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

          // 设置信封件
          if (this.expressType == 1) {
            delete params.first;
            delete params.firstKg;
            delete params.additional;
            delete params.farFirst;
            delete params.farFirstKg;
            delete params.farAdditional;

            params.isOnePrice = 1;
          } else {
            delete params.onePrice;
            delete params.isOnePrice;
          }

          this.setUpSellerPrice(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async setUpSellerPrice(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/setUpSellerPrice",
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