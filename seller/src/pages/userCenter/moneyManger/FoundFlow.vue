<template>
  <div class="foundFlow">
    <div class="custom-bread-wrap">
      流水/对账
      <span>（{{pagination.total}}）</span>
    </div>

    <div class="formFilter">
      <el-form
        :inline="true"
        :model="searchForm"
      >
        <el-form-item>
          <el-date-picker
            class="filterTime"
            v-model="searchForm.timeValues"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            class="filterInput"
            v-model="searchForm.payUse"
            placeholder="按流水类型"
            @change="handleSearch"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="支出"
              :value="1"
            ></el-option>
            <el-option
              label="收入"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch"
            class="filterButton"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tables">
      <el-table
        :data="tableData"
        border
        stripe
      >
        <el-table-column
          prop="createTime"
          label="交易时间"
          header-align="center"
          align="center"
          width="130"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="orderStatus"
          label="交易金额"
        >
        </el-table-column> -->
        <el-table-column
          prop="payUse"
          label="流水类型"
          header-align="center"
          align="center"
          width="70"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.payUse === 1">支出</template>
            <template v-if="scope.row.payUse === 2">收入</template>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="交易类型"
        >
        </el-table-column> -->
        <el-table-column
          prop="logRemark"
          label="流水备注"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="logContent"
          label="流水内容"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="taskNums"
          label="财务备注"
        >
        </el-table-column> -->
        <el-table-column
          prop="primaryDeposit"
          label="交易前金额"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="surplusDeposit"
          header-align="center"
          align="center"
          label="交易后金额"
          width="100"
        >
        </el-table-column>
      </el-table>
    </div>

    <div class="pages">
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
      searchForm: {
        timeValues: [],
        payUse: "",
        logType: ""
      },
      tableData: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 20, 30, 50, 100],
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

      if (this.searchForm.logType) {
        params.logType = this.searchForm.logType;
      }

      if (this.searchForm.payUse) {
        params.payUse = this.searchForm.payUse;
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
        url: "/admin/getTSellerLogListPage",
        method: "post",
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
    this.getTableData();
  }
};
</script>
<style lang="less">
.foundFlow {
  padding: 20px;

  .formFilter {
    .filterTime {
      width: 220px;
    }

    .filterInput {
      width: 160px;
    }

    .filterButton {
      padding: 11px 20px;
    }
  }

  .tables {
  }

  .pages {
    margin-top: 20px;
    text-align: right;
  }
}
</style>