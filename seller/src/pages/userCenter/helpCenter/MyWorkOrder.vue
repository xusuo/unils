<template>
  <div class="myWorkOrder">
    <div class="formFilter">
      <el-form
        :inline="true"
        :model="searchForm"
      >
        <!-- <el-form-item>
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
        </el-form-item>-->
        <el-form-item>
          <el-select
            @change="handleSearch"
            class="filterInput"
            placeholder="按工单状态"
            v-model="searchForm.status"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="0"
              label="待处理"
            ></el-option>
            <el-option
              :value="1"
              label="正在处理"
            ></el-option>
            <el-option
              :value="2"
              label="处理完成"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-input
            v-model="searchForm.order_status"
            class="filterInput"
            placeholder="财务备注"
          ></el-input>
        </el-form-item>-->
        <!-- <el-form-item>
          <el-input
            class="filterInput"
            v-model="searchForm.order_o"
            placeholder="订单编号"
          ></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button
            @click="handleSearch"
            class="filterButton"
            type="primary"
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
          label="工单类型"
          prop="orderStatus"
          width="75"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.questionType === 1">资金财务</span>
            <span v-if="scope.row.questionType === 2">下单指南</span>
            <span v-if="scope.row.questionType === 3">包裹物流</span>
            <span v-if="scope.row.questionType === 4">其他问题</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="问题描述"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="70"
        >
          <template slot-scope="scope">
            <span
              class="color-gray"
              v-if="scope.row.status === 0"
            >待处理</span>
            <span
              class="color-danger"
              v-if="scope.row.status === 1"
            >正在处理</span>
            <span
              class="color-success"
              v-if="scope.row.status === 2"
            >处理完成</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最近回复"
          prop="payTime"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          width="130"
        >
        </el-table-column>
      </el-table>
    </div>

    <div class="pages">
      <el-pagination
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="pagination.sizeList"
        :total="pagination.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        timeValues: [],
        orderStatus: "",
        order_no: ""
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

      if (this.searchForm.status !== "") {
        params.status = this.searchForm.status;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/admin/selectUserQuestionList",
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
  }
};
</script>

<style lang="less" scoped>
.myWorkOrder {
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