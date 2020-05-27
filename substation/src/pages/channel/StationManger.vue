<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分站管理</el-breadcrumb-item>
        <el-breadcrumb-item>分站列表</el-breadcrumb-item>
      </el-breadcrumb>
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
          label="分站名称"
          prop="stationName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="域名"
          prop="stationDomain"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="代理人数"
          prop="agentNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="商家数"
          prop="sellerNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="账户余额"
          prop="balance"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="累计奖金"
          prop="totalReward"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
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
              type="primary"
              @click="$router.push('/channel/stationDetail?id=' + scope.row.stationId)"
            >查看</el-button>
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
</template>


<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {},
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

      // 文本搜索条件
      if (
        this.searchForm.searchStatus !== "" &&
        this.searchForm.keywords !== ""
      ) {
        params[this.searchForm.searchStatus] = this.searchForm.keywords;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/channel/queryChannelStationList",
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
      this.handleSearch();
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>