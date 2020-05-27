<template>
  <div>
    <div
      class="yt-common-ctn"
      style="margin-top: 0;"
    >
      <div class="name">
        <!-- 可提现金额 <span class="color-danger">{{balance}}</span> 元 -->
        可提现金额 <span class="color-danger">{{balance}}</span> 元
      </div>
      <div class="withdraw-apply-form">
        <div class="tit">申请提现</div>
        <div>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item
              label="银行："
              prop="bankName"
            >
              <el-select
                class="custom-select-300"
                v-model="form.bankName"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, i) in bankList"
                  :label="item.label"
                  :value="item.label"
                  :key="i"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="开户支行："
              prop="bankDot"
            >
              <el-input
                class="custom-select-300"
                placeholder="请填写支行"
                maxlength="50"
                v-model="form.bankDot"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="开户地："
              prop="tempPca"
            >
              <PCA
                v-model="form.tempPca"  :citylist.sync="form.tempPca"
              />
            </el-form-item>

            <el-form-item
              label="银行卡号："
              prop="bankCode"
            >
              <el-input
                class="custom-select-300"
                placeholder="请输入银行卡号"
                maxlength="50"
                v-model="form.bankCode"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="姓名："
              prop="openName"
            >
              <el-input
                class="custom-select-300"
                placeholder="请输入姓名"
                maxlength="20"
                v-model="form.openName"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="申请金额："
              prop="applyPrice"
            >
              <el-input-number
                controls-position="right"
                v-model="form.applyPrice"
                :min="0"
                :max="99999999"
              ></el-input-number>
            </el-form-item>

            <el-form-item>
              <el-button
                :loading="applyLoading"
                type="primary"
                @click="handleSure"
              >发起申请</el-button>
            </el-form-item>
          </el-form>

          <div
            class="color-666"
            style="font-size: 12px;text-align: center;margin-top: 15px;"
          >
            备注: 提取金额为上一个自然月内金额, 时间每月的10号且仅限一次
          </div>
        </div>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">
        申请记录
      </div>
      <div>
        <div class="custom-container-wrap">
          <el-table
            :data="tableData"
            stripe
            border
            v-loading="loading"
          >
            <el-table-column
              label="申请编号"
              prop="txNo"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column
              label="申请类型"
              prop="customerName"
            >
            </el-table-column> -->
            <el-table-column
              label="金额"
              prop="applyPrice"
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column
              label="申请前金额"
              prop="oldBalance"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="申请后金额"
              prop="newBalance"
              align="center"
            >
            </el-table-column> -->
            <el-table-column
              label="银行名称"
              prop="bankName"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="支行名称"
              prop="bankDot"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="开户地"
              prop="bankProvince"
              align="center"
              width="200"
            >
              <template slot-scope="scope">
                {{scope.row.bankProvince}}{{scope.row.bankCity}}{{scope.row.bankArea}}
              </template>
            </el-table-column>
            <el-table-column
              label="收款账号"
              prop="bankCode"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="申请时间"
              prop="applyTime"
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column
              label="确认时间"
              prop="customerName"
            >
            </el-table-column> -->
            <!-- <el-table-column
              label="申请备注"
              prop="customerName"
            >
            </el-table-column> -->
            <el-table-column
              prop="wishNums"
              label="申请状态"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                <!-- 提现审核 1:待审核 2:已通过 3:驳回 -->
                <span v-if="scope.row.txHandle == 1">待审核</span>
                <span
                  class="color-success"
                  v-if="scope.row.txHandle == 2"
                >已通过</span>
                <span
                  class="color-danger"
                  v-if="scope.row.txHandle == 3"
                >已驳回</span>
                <el-tooltip
                  v-if="scope.row.txHandle == 3"
                  class="item"
                  effect="dark"
                  :content="scope.row.txMsgs"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="custom-pagination-wrap">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageNum"
            :page-sizes="pagination.sizeList"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { intReg } from "@/utils/regular";
export default {
  data() {
    let validatePca = (rule, value, callback) => {
      console.log(value);
      if (value.length <= 0) {
        callback(new Error("请选择开户地"));
      } else {
        callback();
      }
    };

    let validateApplyPrice = (rule, value, callback) => {
      // console.log(value);
      if (value < 100) {
        callback(new Error("申请金额必须大于100"));
      } else {
        callback();
      }
    };
    return {
      form: {
        applyPrice: 0,
        bankArea: "",
        bankCity: "",
        bankProvince: "",
        bankCode: "",
        bankDot: "",
        bankName: "",
        openName: "",
        tempPca: []
        // txId: "",
        // txNo: ""
      },
      rules: {
        bankName: [
          {
            required: true,
            message: "请选择银行",
            trigger: "change"
          }
        ],
        bankDot: [
          {
            required: true,
            message: "请输入开户支行",
            trigger: "change"
          }
        ],
        bankCode: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "change"
          }
        ],
        openName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
        applyPrice: [
          {
            required: true,
            message: "请输入申请金额",
            trigger: "change"
          },
          {
            pattern: intReg,
            required: true,
            message: "申请金额只能是大于100的整数",
            trigger: "change"
          },
          {
            validator: validateApplyPrice,
            required: true,
            trigger: "change"
          }
        ],
        tempPca: [{ message: "请选择开户地", required: true, trigger: "change" }]
      },
      applyLoading: false,
      loading: false,
      tableData: [],
      searchForm: {},
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      bankList: [
        { label: "中国工商银行", value: 1 },
        { label: "中国农业银行", value: 2 },
        { label: "中国银行", value: 3 },
        { label: "中国建设银行", value: 4 },
        { label: "交通银行", value: 5 },
        { label: "中信银行", value: 6 },
        { label: "中国光大银行", value: 7 },
        { label: "华夏银行", value: 8 },
        { label: "中国民生银行", value: 9 },
        { label: "广发银行", value: 10 },
        { label: "深圳发展银行", value: 11 },
        { label: "招商银行", value: 12 },
        { label: "兴业银行", value: 13 },
        { label: "上海浦东发展银行", value: 14 },
        { label: "恒丰银行", value: 15 },
        { label: "浙商银行", value: 16 },
        { label: "渤海银行", value: 17 },
        { label: "中国邮政银行", value: 18 }
      ],
      balance: 0
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));

           if(this.form.tempPca != []){
              params.bankProvince = this.form.tempPca[0]
              params.bankCity = this.form.tempPca[1]
              params.bankArea = this.form.tempPca[2]
          }

          delete params.tempPca;
          console.log(params);
          this.form.applyPrice = 0;
          this.form.bankArea = "";
          this.form.bankCity = "";
          this.form.bankProvince = "";
          this.form.bankCode = "";
          this.form.bankDot = "";
          this.form.bankName = "";
          this.form.openName = "";
          this.form.tempPca = [];
          this.applyWithdrawals(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async applyWithdrawals(params) {
      this.applyLoading = true;
      let res = await this.$http({
        url: "/t-station/applyWithdrawals",
        method: "post",
        data: params
      });
      const { code, data } = res;
      this.applyLoading = false;
      if (code === 200) {
        this.$message.success("申请成功");
        this.handleSearch();
        this.$refs.form.resetFields()
      }else{
        this.$message.success(res.message);
      }
    },
    async queryStationBalanceById(params) {
      // /t-station/queryStationBalanceById
      let res = await this.$http({
        url: "/t-station/queryStationBalanceById",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        this.balance = data ? data : 0;
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryWithdrawalsDataList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data.records;
        this.pagination.total = parseInt(data.total);
      } else {
        this.tableData = [];
        this.pagination.total = 0;
      }
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = pageSize;
      this.getTableData();
    },
    handleCurrentChange(p) {
      this.pagination.pageNum = p;
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.selectedItems = val;
    },
    handleSearch() {
      this.pagination.pageNum = 1;
      this.getTableData();
    },
    handleReset() {
      this.searchForm = {};
      this.getTableData();
    }
  },
  created() {
    this.handleSearch();
    this.queryStationBalanceById();
  }
};
</script>

<style lang="less">
.withdraw-apply-form {
  width: 400px;
  margin: 0 auto;

  > .tit {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
  }
}
</style>
