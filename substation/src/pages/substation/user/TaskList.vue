<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="110px"
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
        <el-form-item label="代理人名称">
          <el-input
            v-model="searchForm.agentName"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="平台订单号">
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
          label="平台订单号"
          prop="orderNo"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="平台"
          prop="platType"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.platType == 1">淘宝</template>
            <template v-if="scope.row.platType == 2">天猫</template>
            <template v-if="scope.row.platType == 3">京东</template>
            <template v-if="scope.row.platType == 4">拼多多</template>
          </template>
        </el-table-column>
        <el-table-column
          label="方式"
          prop="orderType"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.orderType == 1">手工导入</template>
            <template v-if="scope.row.orderType == 2">智能文件导入</template>
            <template v-if="scope.row.orderType == 3">普通文件导入</template>
          </template>
        </el-table-column>
        <el-table-column
          label="用户账号"
          prop="userAccount"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="代理人"
          prop="agentName"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="订单金额"
          prop="orderAmount"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="包裹数"
          prop="taskNum"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="支付时间"
          prop="payTime"
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
        agentName: "",
        userAccount: "",
        orderNo: "",
        timeValues: [],
        startTime: "",
        endTime: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30, 50],
        pageSize: 50,
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

      // 时间
      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length >= 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      if (this.searchForm.agentName !== "") {
        params.agentName = this.searchForm.agentName;
      }

      if (this.searchForm.userAccount !== "") {
        params.userAccount = this.searchForm.userAccount;
      }

      if (this.searchForm.orderNo !== "") {
        params.orderNo = this.searchForm.orderNo;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryTaskList",
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
    //  userAccount: "",
    let userAccount = this.$route.query.userName;
    if (userAccount) {
      this.searchForm.userAccount = userAccount;
    }
    
    this.handleSearch();
  }
};
</script>