<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>商家提现</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="状态">
          <el-select
            v-model="searchForm.applyStatus"
            class="custom-select-220"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="未处理"
              :value="1"
            ></el-option>
            <el-option
              label="已返款"
              :value="2"
            ></el-option>
            <el-option
              label="驳回返款"
              :value="3"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
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
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-refresh"
            @click="handleReset"
          >重置</el-button>
        </el-form-item>
      </el-form>
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
          label="用户账号"
          prop="userAccount"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="申请原因"
          prop="applyReason"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="申请时间"
          prop="applyTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="处理时间"
          prop="handleTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="申请状态"
          prop="applyStatus"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.applyStatus == 1">未处理</template>
            <template v-if="scope.row.applyStatus == 2">已返款</template>
            <template v-if="scope.row.applyStatus == 3">驳回返款</template>
          </template>
        </el-table-column>
        <el-table-column
          label="收款人姓名"
          prop="sellerName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="申请金额"
          prop="applyMoney"
          header-align="center"
          align="center"
        >
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
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        applyStatus: "",
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
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.applyStatus !== "") {
        params.applyStatus = this.searchForm.applyStatus;
      }

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
        url: "/t-station/querySellerWithdrawList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data.records;
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
    this.handleSearch();
  }
};
</script>