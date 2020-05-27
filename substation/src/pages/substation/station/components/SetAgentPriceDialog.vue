<template>
  <div>
    <el-dialog
      title="代理人价格设置"
      width="700px"
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
          <strong>申通快递</strong>
        </el-form-item>

        <div class="form-clear">
          <span class="form-label">平台成本价：{{low.first}}</span>
          <el-form-item
            label="0.5kg内(普通地区)："
            prop="first" 
          >
            <el-input
              v-model="form.first"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
            <span class="form-content">商家最低价：{{sale.first}}</span>
        </div>
        
        <div class="form-clear">
          <span class="form-label">平台成本价：{{low.firstKg}}</span>
          <el-form-item
            label="0.5-1kg(普通地区)："
            prop="firstKg"
          >
            <el-input
              v-model="form.firstKg"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <span class="form-content">商家最低价：{{sale.firstKg}}</span>
        </div>

        <div class="form-clear">
          <span class="form-label">平台成本价：{{low.additional}}</span>
          <el-form-item
            label="续重(普通地区)："
            prop="additional"
          >
            <el-input
              v-model="form.additional"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <span class="form-content">商家最低价：{{sale.additional}}</span>
        </div>

        <div class="form-clear">
            <span class="form-label">平台成本价：{{low.farFirst}}</span>
          <el-form-item
            label="0.5kg内(偏远地区)："
            prop="farFirst"
          >
            <el-input
              v-model="form.farFirst"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
            <span class="form-content">商家最低价：{{sale.farFirst}}</span>
        </div>

        <div class="form-clear">
            <span class="form-label">平台成本价：{{low.farFirstKg}}</span>
          <el-form-item
            label="0.5-1kg(偏远地区)："
            prop="farFirstKg"
          >
            <el-input
              v-model="form.farFirstKg"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
            <span class="form-content">商家最低价：{{sale.farFirstKg}}</span>
        </div>

        <div class="form-clear">
          <span class="form-label">平台成本价：{{low.farAdditional}}</span>
          <el-form-item
            label="续重(偏远地区)："
            prop="farAdditional"
          >
            <el-input
              v-model="form.farAdditional"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <span class="form-content">商家最低价：{{sale.farAdditional}}</span>
        </div>
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
  prod: ["sellerCost",'sellerPrice'],
  data() {
    var valifirst = (rule, value, callback) => {
      console.log(this.sale)
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.low.first ) {
          callback(new Error('不能低于平台成本价格'+this.low.first+"元"));
        }
        if (value > this.sale.first ) {
          callback(new Error('不能高于商家最低价'+this.sale.first+"元"));
        }
        callback();
      }
    };
    var valifirstKg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.low.firstKg) {
          callback(new Error('不能低于平台成本价格'+this.low.firstKg+"元"));
        }
        if (value > this.sale.firstKg) {
          callback(new Error('不能高于商家最低价'+this.sale.firstKg+"元"));
        }
        callback();
      }
    };
    var valiadditional = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else { 
        if (value < this.low.additional) {
          callback(new Error('不能低于平台成本价格'+this.low.additional+"元"));
        }
        if (value > this.sale.additional) {
          callback(new Error('不能高于商家最低价'+this.sale.additional+"元"));
        }
        callback();
      }
    };
    var valifarFirst = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.low.farFirst) {
          callback(new Error('不能低于平台成本价格'+this.low.farFirst+"元"));
        }
        if (value > this.sale.farFirst) {
          callback(new Error('不能高于商家最低价'+this.sale.farFirst+"元"));
        }
        callback();
      }
    };
    var valifarFirstKg = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.low.farFirstKg) {
          callback(new Error('不能低于平台成本价格'+this.low.farFirstKg+"元"));
        }
        if (value > this.sale.farFirstKg) {
          callback(new Error('不能高于商家最低价'+this.sale.farFirstKg+"元"));
        }
        callback();
      }
    };
    var valifarAdditional = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        if (value < this.low.farAdditional) {
          callback(new Error('不能低于平台成本价格'+this.low.farAdditional+"元"));
        }
        if (value > this.sale.farAdditional) {
          callback(new Error('不能高于商家最低价'+this.sale.farAdditional+"元"));
        }
        callback();
      }
    };
    return {
      visible: false,
      loading: false,
      form: {
        setId: 0,
        agentId: 0,
        first: "",
        firstKg: "",
        additional: "",
        farFirst: "",
        farFirstKg: "",
        farAdditional: "",
        isOnePrice: 0,
        onePrice: ""
      },
      sale: {
        first: 0,
        firstKg: 0,
        additional: 0,
        farFirst: 0,
        farFirstKg: 0,
        farAdditional: 0
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
        shopName: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺名",
            trigger: "blur"
          }
        ]
      },
      low: {
        first: 0,
        firstKg: 0,
        additional: 0,
        farFirst: 0,
        farFirstKg: 0,
        farAdditional: 0
      }
    };
  },
  methods: {
    show(item, agentCost, sellerCost, sellerPrice, expressId) {
      this.reset(item, agentCost, sellerCost, sellerPrice, expressId);
      this.visible = true;
    },
    reset(item, agentCost, sellerCost, sellerPrice, expressId) {
      // console.log(item, agentCost);
      this.form = {
        setId: agentCost.setId ? agentCost.setId : 0,
        agentId: item.agentId,
        first: agentCost.first,
        firstKg: agentCost.firstKg,
        additional: agentCost.additional,
        farFirst: agentCost.farFirst,
        farFirstKg: agentCost.farFirstKg,
        farAdditional: agentCost.farAdditional,
        isOnePrice: 0,
        onePrice: "",
        // 4 是申通-礼品。
        expressId: expressId
      };
      // sellerCost 是分站的成本,设置代理人成本的时候,用分站成本做对比
      // 代理人成本不能比分站成本低.
      let lowFirst = 0;
      let lowFirstKg = 0;
      let lowAdditional = 0;
      let lowFarFirst = 0;
      let lowFarFirstKg = 0;
      let lowFarAdditional = 0;
      // console.log(sellerCost);
      console.log(sellerPrice)
      sellerCost.forEach(m => {
        if (lowFirst == 0) {
          lowFirst = m.first;
        } else {
          if (lowFirst < m.first) {
            lowFirst = m.first;
          }
        }

        if (lowFirstKg == 0) {
          lowFirstKg = m.firstKg;
        } else {
          if (lowFirstKg < m.firstKg) {
            lowFirstKg = m.firstKg;
          }
        }

        if (lowAdditional == 0) {
          lowAdditional = m.additional;
        } else {
          if (lowAdditional < m.additional) {
            lowAdditional = m.additional;
          }
        }

        if (lowFarFirst == 0) {
          lowFarFirst = m.farFirst;
        } else {
          if (lowFarFirst < m.farFirst) {
            lowFarFirst = m.farFirst;
          }
        }

        if (lowFarFirstKg == 0) {
          lowFarFirstKg = m.farFirstKg;
        } else {
          if (lowFarFirstKg < m.farFirstKg) {
            lowFarFirstKg = m.farFirstKg;
          }
        }

        if (lowFarAdditional == 0) {
          lowFarAdditional = m.farAdditional;
        } else {
          if (lowFarAdditional < m.farAdditional) {
            lowFarAdditional = m.farAdditional;
          }
        }
      });

      this.low = {
        first: lowFirst,
        firstKg: lowFirstKg,
        additional: lowAdditional,
        farFirst: lowFarFirst,
        farFirstKg: lowFarFirstKg,
        farAdditional: lowFarAdditional
      };
      this.sale = {
        first: sellerPrice.first,
        firstKg: sellerPrice.firstKg,
        additional: sellerPrice.additional,
        farFirst: sellerPrice.farFirst,
        farFirstKg: sellerPrice.farFirstKg,
        farAdditional: sellerPrice.farAdditional
      };

      // this.selectLowestPrice();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));

          // 说是不需要平台成本价的限制，所以注释了
          if (
            params.first < this.low.first ||
            params.firstKg < this.low.firstKg ||
            params.additional < this.low.additional ||
            params.farFirst < this.low.farFirst ||
            params.farFirstKg < this.low.farFirstKg ||
            params.farAdditional < this.low.farAdditional
          ) {
            this.$message.error("价格设置有误");
            return false;
          }
          // console.log(params);
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
    // 获取平台成本价 设置的时候做参考
    // async selectLowestPrice() {
    //   let res = await this.$http({
    //     url: "/t-station/selectLowestPrice",
    //     method: "get",
    //     params: {}
    //   });
    //   const { code, data } = res;
    //   this.loading = false;
    //   if (code === 200) {
    //     this.low.first = data.first;
    //     this.low.firstKg = data.firstKg;
    //     this.low.additional = data.additional;
    //     this.low.farFirst = data.farFirst;
    //     this.low.farFirstKg = data.farFirstKg;
    //     this.low.farAdditional = data.farAdditional;
    //   }
    // },
    async setUpSellerPrice(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/updateAgentPriceSet",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("设置成功");
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
<style lang="less" scoped>
.form-clear{
  clear: both;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  .el-form-item{
    float: left;
  }
  .form-label{
    float: left;
    line-height: 40px;
    margin: 0 10px;
  }
  .form-content{
    margin-left: 20px;
    float: left;
    line-height: 40px;
  }
}
</style>
