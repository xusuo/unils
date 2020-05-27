<template>
  <div>
    <el-dialog
      title="修改成本"
      width="960px"
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
          label="奖金方式："
          prop="type"
        >
          <el-select
            class="custom-select-200"
            v-model="form.type"
          >
            <!-- <el-option
              label="无"
              :value="1"
            ></el-option> -->
            <el-option
              label="固定金额"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="成本金额："
          prop="onePrice"
        >
          <el-input
            v-model="form.onePrice"
            class="custom-select-260"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <div v-if="form.type === 2" style="margin: 20px 20px 0">
          <p style="color: red;">分站佣金= （代理人价格-分站成本） - 销售提成 - 运营提成</p>
          <p style="color: red;">代理人佣金 = 商家销售价格 - 代理人价格</p>
        </div>
        <el-table  v-if="form.type === 2"
            :data="tableList" border
            style="width: calc(100% - 40px);margin: 5px 20px 20px;">
            <el-table-column
              prop="expressName" align="center"
               width="120">
            </el-table-column>
            <el-table-column align="center"
              label="奖金方式">
              <template slot-scope="scope">
                固定金额
              </template>
            </el-table-column>
            <el-table-column
              prop="stationPrice" align="center"
              label="分站成本">
            </el-table-column>
            <el-table-column
              prop="salePrice" align="center"
              label="销售提成">
            </el-table-column>
            <el-table-column
              prop="operatePrice" align="center"
              label="运营提成">
            </el-table-column>
            <el-table-column
              prop="agentPrice" align="center"
              label="代理人价格">
            </el-table-column>
            <el-table-column
              prop="selectPrice" align="center"
              label="商家价格">
            </el-table-column>
            <el-table-column align="center"  width="130"
              label="分站佣金（预估）">
               <template slot-scope="scope">
                 {{ (scope.row.agentPrice - scope.row.stationPrice) -scope.row.salePrice - scope.row.operatePrice | filterPrice}}
                </template>
            </el-table-column>
            <el-table-column
              prop="address" align="center" width="150"
              label="代理人佣金（预估）"> 
              <template slot-scope="scope">
                 {{ scope.row.selectPrice - scope.row.agentPrice | filterPrice}}
                </template>
            </el-table-column>
          </el-table>
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
    tableList: Array,
  },
  data() {
    return {
      visible: false,
      loading: false,
      form: {
        type: 2,
        setId: 0,
        agentId: 0,
        isOnePrice: 1,
        onePrice: ""
      },
      expressId:"",
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 24 * 60 * 60 * 1000 < Date.now();
        }
      }
    };
  },
  filters: {
    filterPrice (value) {
       if(typeof value== "number"){
           return value.toFixed(2)
       }else{
           return value
       }
    }
  },
  watch: {
    tableList(item) {
      return this.form.onePrice = this.tableList[0].agentPrice
    },
    "form.onePrice": function(item){
      this.tableList.map( item => {
        return item.agentPrice = this.form.onePrice
      })
    }
  },
  methods: {
    show(item, agentCost, sellerCost, sellerPrice, expressId) {
      this.reset(item, agentCost, expressId);
      this.visible = true;
    },
    reset(item, agentCost, expressId) {
      this.form = {
        setId: agentCost.setId ? agentCost.setId : 0,
        agentId: item.agentId,
        isOnePrice: 1,
        onePrice: agentCost.onePrice,
        type: 2,
      };
      this.expressId = expressId;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          console.log(params);
        //   delete params.type;
        //   delete params.expressId;
        //  // console.log(this.expressId)
        //记得改
        console.log(this.expressId)
          params.expressId = this.expressId;
          this.updateOperatePriceSet(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateOperatePriceSet(params) {
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