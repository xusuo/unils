<template>
  <div>
    <div style="font-size: 20px;font-weight: 700;margin-bottom: 10px;">
      账户余额：
      <span class="color-danger">{{balance}}</span>
      元
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-select
            class="custom-select-130"
            v-model="searchForm.logType"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="佣金"
              :value="1"
            ></el-option>
            <el-option
              label="提现"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
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
    </div>

    <div class="yt-common-ctn">
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
              label="时间"
              prop="logTime"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="交易金额"
              prop="customerName"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="交易类型"
              prop="logType"
              align="center"
            >
              <template slot-scope="scope">
                <!-- 1：佣金，2：提现  -->
                <template v-if="scope.row.logType == 1">佣金</template>
                <template v-if="scope.row.logType == 2">提现</template>
              </template>
            </el-table-column>
            <el-table-column
              label="账号"
              prop="customerName"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="交易前金额"
              prop="oldBalance"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="交易后金额"
              prop="newBalance"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="交易备注"
              prop="customerName"
              align="center"
            >
              <template slot-scope="scope">
                订单编号ID：{{scope.row.txNo}}
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
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        logType: "",
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
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    async queryStationBalanceById(params) {
      // /t-operate/queryStationBalanceById
      let res = await this.$http({
        url: "/t-operate/queryOperateBalanceById",
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
        _size: this.pagination.pageSize,
        stationId: this.userInfo.stationId
      };

      // 文本搜索条件
      if (this.searchForm.logType !== "") {
        params.logType = this.searchForm.logType;
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
        url: "/t-operate/queryCapitalList",
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
    this.queryStationBalanceById({
      stationId: this.userInfo.stationId
    });
    this.handleSearch();
  }
};
</script>
