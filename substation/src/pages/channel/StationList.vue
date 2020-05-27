<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分站管理</el-breadcrumb-item>
        <el-breadcrumb-item>分站报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
      >
        <el-form-item label="日期查询">
          <el-date-picker
            v-model="searchForm.timeValues"
            class="custom-select-200"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleSearch"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="站点名称">
          <el-input
            v-model="searchForm.stationName"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
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
          label="日期"
          header-align="center" prop="statisticsTime"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分站名"
          prop="stationName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总订单数"
          prop="totalOrderNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总包裹数"
          prop="totalPackageNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="新增注册"
          prop="newRegisterNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="下单用户"
          prop="placeOrderNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总用户数"
          prop="totalUserNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分站奖金"
          prop="stationCost"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分站累计奖金"
          prop="stationTotalReward"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="贡献渠道奖金"
          prop="devoteChannelCost"
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
        stationName: "",
        timeValues: []
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
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

      // 文本搜索条件
      if (this.searchForm.stationName !== "") {
        params.stationName = this.searchForm.stationName;
      }

      // 按时间搜索条件
      if (
        this.searchForm.timeStatus !== "" &&
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length === 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/channel/queryStationReportList",
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
      this.searchForm = {
        stationName: "",
        timeValues: []
      };
      this.handleSearch();
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>