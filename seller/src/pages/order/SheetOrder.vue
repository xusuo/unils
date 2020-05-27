<template>
  <div class="sheetOrderList">
    <div class="custom-bread-wrap">
      包裹管理
      <span>（{{pagination.total}}）</span>
    </div>
    <div class="formFilter">
      <el-form
        :inline="true"
        :model="searchForm"
      >
        <el-form-item>
          <el-input
            class="filterInput"
            placeholder="平台订单号"
            v-model="searchForm.orderId"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input
            class="filterInput"
            placeholder="收件人手机"
          ></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-input
            class="filterInput"
            placeholder="第三方订单号"
            v-model="searchForm.orderNo"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="filterInput"
            placeholder="快递单号"
            v-model="searchForm.waybillNo"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-select
            class="filterInput"
            v-model="searchForm.region"
            placeholder="快递公司"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="圆通快递"
              :value="1"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <!-- <el-form-item>
          <el-input
            class="filterInput"
            placeholder="快递单号"
          ></el-input>
        </el-form-item>-->
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
        <el-form-item label="礼品发货状态：">
          <el-select
            @change="handleSearch"
            class="filterInput"
            placeholder="按礼品发货状态"
            v-model="searchForm.taskStatus"
          >
            <!-- <el-option
              label="全部"
              :value="''"
            ></el-option>-->
            <el-option
              :value="0"
              label="待匹配包裹"
            ></el-option>
            <el-option
              :value="1"
              label="待付款"
            ></el-option>
            <el-option
              :value="2"
              label="待发货"
            ></el-option>
            <el-option
              :value="3"
              label="已发货"
            ></el-option>
            <el-option
              :value="4"
              label="已完成"
            ></el-option>
          </el-select>
        </el-form-item>
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
        style="width: 1020px;"
      >
        <el-table-column
          align="center"
          header-align="center"
          label="序号"
          prop="date"
          width="50"
        >
          <template slot-scope="scope">{{scope.$index+(pagination.pageNum - 1) * pagination.pageSize + 1}}</template>
        </el-table-column>
        <el-table-column
          label="导入方式"
          prop="platType"
          width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.platType === 1">手工导入</span>
            <span v-if="scope.row.platType === 2">智能文件导入</span>
            <span v-if="scope.row.platType === 3">普通文件导入</span>
          </template>
        </el-table-column>
        <el-table-column
          label="平台订单号"
          prop="taskOrderId"
          width="130"
        ></el-table-column>
        <!-- <el-table-column
          label="平台包裹号"
          prop="packageNo"
        ></el-table-column> -->
        <el-table-column
          label="第三方订单号"
          prop="orderNo"
          width="170"
        ></el-table-column>
        <el-table-column
          label="收件人姓名"
          prop="receiverName"
          width="85"
        ></el-table-column>
        <el-table-column
          label="收件人手机"
          prop="receiverPhone"
          width="95"
        ></el-table-column>
        <el-table-column
          label="包裹金额"
          prop="taskPrice"
          width="75"
        ></el-table-column>
        <el-table-column
          label="快递费"
          prop="expressFee"
          width="60"
        ></el-table-column>
        <!-- <el-table-column
          prop="address"
          label="预计出库时间"
        >
        </el-table-column>-->
        <el-table-column
          label="礼品发货状态"
          prop="taskPrice"
          width="100"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.isPrint == 1 && scope.row.waybillNo">
              <span class="color-gray">已发货</span>
            </template>
            <template v-else>
              <span v-if="scope.row.taskStatus == 0">待匹配包裹</span>
              <span
                class="color-danger"
                v-if="scope.row.taskStatus == 1"
              >待付款</span>
              <span
                class="color-warning"
                v-if="scope.row.taskStatus == 2"
              >待发货</span>
              <span
                class="color-gray"
                v-if="scope.row.taskStatus == 3"
              >已发货</span>
              <span
                class="color-success"
                v-if="scope.row.taskStatus == 4"
              >已完成</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="快递单号"
          prop="waybillNo"
          width="140"
        ></el-table-column>
        <el-table-column
          label="快递"
          prop="taskExpress"
          width="75"
        >
          <template slot-scope="scope">
            <!-- 先写死圆通快递 后续根据 taskExpress 这个值就能判断 -->
            <template v-if="scope.row.waybillNo">
              圆通快递
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="面单打印时间"
          prop="printTime"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="第三方发货时间"
          prop="tbTime"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="第三方发货状态"
          prop="tbTime"
          width="110"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.tbStatus == 1">待发货</span>
            <span
              class="color-success"
              v-if="scope.row.tbStatus == 2"
            >发货成功</span>
            <span
              class="color-danger"
              v-if="scope.row.tbStatus == 3"
            >发货失败</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注状态"
          prop="remarkStatus"
          width="75"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.remarkStatus == 1">待备注</template>
            <template v-if="scope.row.remarkStatus == 2">备注成功</template>
            <template v-if="scope.row.remarkStatus == 3">备注失败</template>
          </template>
        </el-table-column>
        <el-table-column
          label="备注时间"
          prop="remarkTime"
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
        orderId: "",
        orderNo: "",
        taskStatus: 2,
        timeValues: []
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

      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length >= 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      if (this.searchForm.orderId !== "") {
        params.orderId = this.searchForm.orderId;
      }

      if (this.searchForm.orderNo !== "") {
        params.orderNo = this.searchForm.orderNo;
      }

      if (this.searchForm.taskStatus !== "") {
        params.taskStatus = this.searchForm.taskStatus;
      }
      
    if (this.searchForm.waybillNo !== "") {
        params.waybillNo = this.searchForm.waybillNo;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/getTasks",
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
    this.searchForm.orderId = this.$route.query.orderId; // 订单管理点击查看详情，取orderId
    this.handleSearch();
  }
};
</script>
<style lang="less">
.sheetOrderList {
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