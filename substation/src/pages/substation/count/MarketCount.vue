<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>业绩统计</el-breadcrumb-item>
        <el-breadcrumb-item>销售业绩</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="50px"
      >
        <el-form-item label="销售">
          <el-select
            v-model="searchForm.saleId"
            class="custom-select-200"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              v-for="(item, i) in saleList"
              :label="item.saleName"
              :value="item.saleId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
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
        <!-- <el-form-item>
          <el-button type="danger">导出报表</el-button>
        </el-form-item> -->
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
          label="销售名称"
          prop="saleName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="销售手机号"
          prop="saleMobile"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="日期"  prop="statisticsTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总任务数"
          prop="totalTaskNum"
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
          label="代理数"
          prop="agentNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="新增注册数"
          prop="newRegisterNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="下单用户数"
          prop="placeOrderUserNum"
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
          label="销售奖金"
          prop="saleBonus"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="销售累计奖金"
          prop="saleTotalBonus"
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
        saleId: "",
        timeValues: []
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      // 销售列表
      saleList: []
    };
  },
  methods: {
    // /t-station/querySaleList
    async querySaleList() {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/querySaleList",
        method: "get",
        params: {}
      });
      const { data } = res;
      if (data) {
        this.saleList = data;
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      // 文本搜索条件
      if (this.searchForm.saleId !== "") {
        params.saleId = this.searchForm.saleId;
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
        url: "/t-station/querySaleAchievementList",
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
  async created() {
    await this.querySaleList();
    this.handleSearch();
  }
};
</script>