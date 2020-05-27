<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>包裹列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="150px"
      >
        <el-form-item label="支付时间">
          <el-date-picker
            v-model="searchForm.timeValues"
            class="custom-select-220"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleSearch"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户帐号">
          <el-input
            v-model="searchForm.userAccount"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="平台任务号">
          <el-input
            v-model="searchForm.taskOrderNo"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="礼品发货状态">
          <el-select
            v-model="searchForm.packageStatus"
            class="custom-select-220"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="待支付"
              :value="1"
            ></el-option>
            <el-option
              label="已支付待发货"
              :value="2"
            ></el-option>
            <el-option
              label="已发货"
              :value="3"
            ></el-option>
            <el-option
              label="已完成"
              :value="4"
            ></el-option>
            <!-- <el-option
              label="待退款"
              :value="1"
            ></el-option>
            <el-option
              label="已退款"
              :value="1"
            ></el-option>
            <el-option
              label="驳回退款"
              :value="1"
            ></el-option>
            <el-option
              label="交易成功"
              :value="1"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="收件人手机号">
          <el-input
            v-model="searchForm.receviverPhone"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input
            v-model="searchForm.expressNo"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="第三方订单号">
          <el-input
            v-model="searchForm.orderNo"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="obtns">
        <!-- <span style="margin-right: 15px;">总计 42 人</span> -->
        <el-button
          icon="el-icon-refresh"
          @click="handleReset"
        >重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >查询</el-button>
        <el-button type="danger">导出</el-button>
      </div>
    </div>

    <div
      class="custom-container-wrap"
      style="margin-top: 10px;"
    >
      <el-table
        :data="tableData"
        stripe
        border
        v-loading="loading"
      >
        <el-table-column
          label="礼品"
          prop="imgUrl"
          header-align="center"
          align="center"
          width="90"
        >
          <template slot-scope="scope">
            <img
              v-if="scope.row.imgUrl"
              :src="$baseImageUrl + scope.row.imgUrl"
              alt=""
              style="width: 70px;height: 70px;"
            >
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="包裹号"
          prop="packageNo"
          header-align="center"
          align="center"
        >
        </el-table-column> -->
        <el-table-column
          label="用户账号"
          prop="userAccount"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column
          label="账号备注"
          prop="accountRemark"
          header-align="center"
          align="center"
        >
        </el-table-column> -->
        <el-table-column
          label="金额"
          prop="taskPrice"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="第三方订单号"
          prop="orderNo"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="礼品发货状态"
          prop="packageStatus"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span
              class="color-danger"
              v-if="scope.row.packageStatus == 1"
            >待支付</span>
            <span
              class="color-warning"
              v-if="scope.row.packageStatus == 2"
            >已支付待发货</span>
            <span
              class="color-gray"
              v-if="scope.row.packageStatus == 3"
            >已发货</span>
            <span
              class="color-success"
              v-if="scope.row.packageStatus == 4"
            >已完成</span>
          </template>
        </el-table-column>
         <el-table-column
          label="打印状态"
          header-align="center"
          align="center"
        >
        <template slot-scope="scope">
          {{scope.row.isPrint | printstatus}}
        </template>
        </el-table-column>
         <el-table-column
          label="打印时间" prop="printTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="快递单号"
          prop="expressNo"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="$refs.packageDetailDialog.show(scope.row)"
            >包裹详情</el-button>
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

    <PackageDetailDialog @success="getTableData()" ref="packageDetailDialog" />
  </div>
</template>

<script>
import PackageDetailDialog from "./components/PackageDetailDialog";
import { printstatus, fromadate } from '@/utils/filters'

export default {
  components: { PackageDetailDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        orderNo: "",
        expressNo: "",
        taskOrderNo: "",
        userAccount: "",
        receviverPhone: "",
        packageStatus: "",
        timeValues: [],
        startTime: "",
        endTime: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    printstatus,
    fromadate,
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.orderNo !== "") {
        params.orderNo = this.searchForm.orderNo;
      }

      if (this.searchForm.expressNo !== "") {
        params.expressNo = this.searchForm.expressNo;
      }

      if (this.searchForm.taskOrderNo !== "") {
        params.taskOrderNo = this.searchForm.taskOrderNo;
      }

      if (this.searchForm.userAccount !== "") {
        params.userAccount = this.searchForm.userAccount;
      }

      if (this.searchForm.receviverPhone !== "") {
        params.receviverPhone = this.searchForm.receviverPhone;
      }

      if (this.searchForm.packageStatus !== "") {
        params.packageStatus = this.searchForm.packageStatus;
      }

      // 按时间搜索条件
      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length === 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryPackageList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        let arr = [];
        data.records.forEach(m => {
          if (m.goodsImgUrl) {
            m.imgUrl = JSON.parse(m.goodsImgUrl)[0];
          }
          arr.push(m);
        });
        this.tableData = arr;
        this.pagination.total = data.total;
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
    let userAccount = this.$route.query.userName;
    if (userAccount) {
      this.searchForm.userAccount = userAccount;
    }
    this.handleSearch();
  }
};
</script>