<template>
  <div class="orderMangerList">
    <div class="custom-bread-wrap">
      订单管理
      <span>（{{pagination.total}}）</span>
    </div>
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
            placeholder="按订单状态"
            v-model="searchForm.orderStatus"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="0"
              label="待支付"
            ></el-option>
            <el-option
              :value="1"
              label="支付完成"
            ></el-option>
            <el-option
              :value="2"
              label="支付失败"
            ></el-option>
            <el-option
              :value="3"
              label="取消订单"
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
          <el-button
            @click="onBitchExportOrders"
            class="filterButton"
            type="primary"
            icon="el-icon-download"
          >批量导出</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tables">
      <el-table
        :data="tableData"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
          header-align="center"
          :selectable="selectableFn"
        >
        </el-table-column>
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
          label="订单状态"
          prop="orderStatus"
          width="75"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus === 0">待支付</span>
            <span
              class="color-success"
              v-if="scope.row.orderStatus === 1"
            >支付成功</span>
            <span
              class="color-danger"
              v-if="scope.row.orderStatus === 2"
            >支付失败</span>
            <span
              class="color-warning"
              v-if="scope.row.orderStatus === 3"
            >取消订单</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="order_type"
          label="导入方式"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.order_type === 1">淘宝</span>
            <span v-if="scope.row.order_type === 2">天猫</span>
            <span v-if="scope.row.order_type === 3">京东</span>
            <span v-if="scope.row.order_type === 4">拼多多</span>
          </template>
        </el-table-column>-->
        <el-table-column
          label="创建时间"
          prop="createTime"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="支付时间"
          prop="payTime"
          width="130"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="预计出库时间"
        >
        </el-table-column>-->
        <el-table-column
          label="包裹数"
          prop="taskNums"
          width="70"
        ></el-table-column>
        <el-table-column
          label="总费用"
          prop="orderAmount"
          width="70"
        ></el-table-column>
        <!-- <el-table-column
          prop="address"
          label="店铺是否发货"
        >
        </el-table-column>-->
        <el-table-column
          label="财务备注"
          prop="financeRemark"
        ></el-table-column>
        <el-table-column
          label="订单备注"
          prop="orderRemark"
        >
          <template slot-scope="scope">
            {{scope.row.orderRemark}}
            <a
              @click="$refs.editRemarkDialog.show(scope.row)"
              href="javascript:;"
            >
              <i class="el-icon-edit"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="操作"
          prop="address"
          width="100"
        >
          <!-- <span v-if="scope.row.orderStatus === 0">待支付</span>
            <span
              v-if="scope.row.orderStatus === 1"
              class="color-success"
            >支付成功</span>
            <span
              v-if="scope.row.orderStatus === 2"
              class="color-danger"
            >支付失败</span>
            <span
              v-if="scope.row.orderStatus === 3"
              class="color-warning"
          >取消订单</span>-->
          <template slot-scope="scope">
            <!-- 待支付 -->
            <template v-if="scope.row.orderStatus === 0">
              <button
                @click="onAlert(scope.row, '确认支付该订单吗?', 1)"
                class="button-text"
              >确认支付</button>
              <button
                @click="onAlert(scope.row, '确认撤销该订单吗?', 2)"
                class="button-text"
              >撤销</button>
            </template>
            <!-- 支付成功 -->
            <template v-else-if="scope.row.orderStatus === 1">
              <router-link
                :to="'/order/sheetOrder?orderId='+scope.row.taskOrderId"
                class="button-text"
              >查看详情</router-link>
              <!-- <a href="http://192.168.0.132:8081/gift-shopping-mall/api/v1/seller/exportTasks?taskOrderId=9204566442049536">导出订单</a> -->
              <!-- <router-link  class="button-text" to="/seller/exportTasks?taskOrderId=9204566442049536">导出订单</router-link>  -->
              <button
                @click="exportOrder(scope.row.taskOrderId)"
                class="button-text"
              >导出订单</button>
            </template>
            <template v-else>--</template>
            <!-- 支付成功 -->
            <!-- <template v-if="scope.row.orderStatus === 1"> -->
            <!-- -- -->
            <!-- </template> -->
            <!-- 支付失败 -->
            <!-- <template v-if="scope.row.orderStatus === 2"> -->
            <!-- <el-button
                size="small"
                @click="onAlert(scope.row, '确认重新支付该订单吗?', 1)"
            >重新支付</el-button>-->
            <!-- <el-button
                size="small"
                @click="onAlert(scope.row, '确认撤销该订单吗?', 2)"
            >撤销</el-button>-->
            <!-- </template> -->
          </template>
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

    <EditRemarkDialog
      @success="handleSearch"
      ref="editRemarkDialog"
    />
    <ExportOrderDialog ref="exportOrderDialog" />
  </div>
</template>

<script>
import EditRemarkDialog from "./components/EditRemarkDialog";
import ExportOrderDialog from "./components/ExportOrderDialog";
export default {
  components: { EditRemarkDialog, ExportOrderDialog },
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
      },
      selectedItems: []
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

      if (this.searchForm.orderStatus !== "") {
        params.orderStatus = this.searchForm.orderStatus;
      }

      if (this.searchForm.orderNo !== "") {
        params.orderNo = this.searchForm.orderNo;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/getTaskOrders",
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
    async payOrder(params) {
      let res = await this.$http({
        url: "/seller/payOrder",
        method: "post",
        data: params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.$message.success("支付成功");
        this.handleSearch();
      } else {
        // this.$message.error("支付失败");
      }
    },
    async cancelOrder(params) {
      let res = await this.$http({
        url: "/seller/cancelOrder",
        method: "post",
        data: params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.$message.success("撤销成功");
        this.handleSearch();
      } else {
        // this.$message.error("支付失败");
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
    },
    selectableFn(item) {
      // console.log(item);
      if (item.orderStatus == 1) {
        return true; //不可勾选
      } else {
        return false; //可勾选
      }
    },
    onAlert(item, text, type) {
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // type  1: 支付订单， 2：撤销订单
          if (type === 1) {
            this.payOrder({
              orderId: item.taskOrderId
            });
          } else if (type === 2) {
            this.cancelOrder({
              orderId: item.taskOrderId
            });
          }
        })
        .catch(() => {});
    },
    exportOrder(ids) {
      this.$refs.exportOrderDialog.show(ids);
    },
    onBitchExportOrders() {
      if (this.selectedItems.length <= 0) {
        this.$message.error("请先选择需要导出的订单");
        return false;
      }

      if (this.selectedItems.length > 40) {
        this.$message.error("单次导出订单不能多于40个");
        return false;
      }

      let ids = [];
      this.selectedItems.forEach(m => {
        ids.push(m.taskOrderId);
      });
      console.log(ids);
      this.$refs.exportOrderDialog.show(ids.join(","));
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>
<style lang="less">
.orderMangerList {
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