<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class=
        "demo-form-inline" style="margin-bottom:20px;"
      >
        <el-form-item label="商家账号：">
            <el-input
              v-model="searchForm.sellerMobile"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
        </el-form-item>
        <el-form-item label="分站名称：">
            <el-input
              v-model="searchForm.stationName"
              class="custom-select-160"
              placeholder="请输入内容"
            ></el-input>
        </el-form-item>
        <el-form-item label="交易日期：">
          <el-date-picker
            v-model="searchForm.timeValues"
            class="custom-select-220"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="交易日期"
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

      <div>
        <div
          class="custom-container-wrap"
          style="margin-top: 0;"
        >
          <el-table
            :data="tableData"
            stripe
            border
            v-loading="loading"
          >
            <el-table-column
              label="商家账号"
              prop="sellerMobile"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="分账名称"
              prop="stationName"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="充值金额"
              prop="consumeDeposit"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="原金额"
              prop="primaryDeposit"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="剩余金额"
              prop="surplusDeposit"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="交易备注"
              prop="logContent"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="时间"
              prop="createTime" :formatter="fromadate"
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
    </div>
  </div>
</template>

<script>
import { fromadate } from '@/utils/filters'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        sellerMobile: "",
        stationName: '',
        timeValues: []
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      balance: 0
    };
  },
  methods: {
    fromadate,
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      // 文本搜索条件
      if (this.searchForm.sellerMobile !== "") {
        params.sellerMobile = this.searchForm.sellerMobile;
      }
      // 文本搜索条件
      if (this.searchForm.stationName !== "") {
        params.stationName = this.searchForm.stationName;
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
        url: "/seller/getSellerLogList",
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
