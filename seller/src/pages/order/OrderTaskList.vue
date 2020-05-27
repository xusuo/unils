<template>
  <div class="sheetOrderList">
    <div class="custom-bread-wrap">
      智能任务列表
      <span>（{{pagination.total}}）</span>
    </div>
    <div class="formFilter">
      <el-form
        :inline="true"
        :model="searchForm"
      >
        <el-form-item>
          <el-select
            class="filterInput"
            placeholder="按条件"
            v-model="searchForm.searchStatus"
          >
            <el-option
              value=""
              label="按条件"
            ></el-option>
            <el-option
              value="0"
              label="店铺ID"
            ></el-option>
            <el-option
              value="1"
              label="订单编号"
            ></el-option>
            <el-option
              value="2"
              label="收件人姓名"
            ></el-option>
            <el-option
              value="3"
              label="收件人手机号"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            class="filterInput"
            placeholder="请输入"
            v-model="searchForm.keyword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            class="custom-select-130"
            v-model="searchForm.timeStatus"
            placeholder="请选择"
          >
            <el-option
              label="按时间"
              :value="''"
            ></el-option>
            <el-option
              label="导入时间"
              value="createTime"
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
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            class="filterInput"
            placeholder="按状态"
            v-model="searchForm.status"
          >
            <el-option
              value=""
              label="按订单状态"
            ></el-option>
            <el-option
              value="0"
              label="待同步"
            ></el-option>
            <el-option
              :value="1"
              label="同步成功"
            ></el-option>
            <el-option
              :value="2"
              label="同步失败"
            ></el-option>
            <el-option
              :value="3"
              label="待验证订单"
            ></el-option>
            <el-option
              :value="4"
              label="验证订单失败"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            class="filterInput"
            placeholder="按备注状态"
            v-model="searchForm.remark"
          >
            <el-option
              value=""
              label="按备注状态"
            ></el-option>
            <el-option
              value="0"
              label="待备注"
            ></el-option>
            <el-option
              :value="1"
              label="已备注"
            ></el-option>
            <el-option
              :value="2"
              label="备注成功"
            ></el-option>
            <el-option
              :value="3"
              label="备注失败"
            ></el-option>
            <el-option
              :value="4"
              label="无需备注"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            class="filterInput"
            placeholder="按发货状态"
            v-model="searchForm.send"
          >
            <el-option
              value=""
              label="按发货状态"
            ></el-option>
            <el-option
              value="0"
              label="待发货"
            ></el-option>
            <el-option
              :value="1"
              label="无需发货"
            ></el-option>
            <el-option
              :value="2"
              label="发货成功"
            ></el-option>
            <el-option
              :value="3"
              label="发货失败"
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
        @selection-change="handleSelectionChange"
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
          label="订单号"
          prop="orderNoCursor"
        >
        </el-table-column>
        <el-table-column
          label="店铺ID"
          prop="shopIdCursor"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="addTimeCursor"
        >
        </el-table-column>
        <el-table-column
          label="任务处理状态"
          prop="orderNo"
        >
          <template slot-scope="scope">
            <span
              class="color-danger"
              v-if="scope.row.status === 0"
            >导入失败</span>
            <span
              class="color-success"
              v-if="scope.row.status === 1"
            >导入成功</span>
            <span v-if="scope.row.status === 2">正在导入中...</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误原因"
          prop="errorMsg"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          header-align="center"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-button size="small">选礼品</el-button>
            <br />
            选完礼品有后面两个按钮=><br />
            <el-button size="small">确认支付</el-button>
            <el-button size="small">撤销</el-button>
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

    <div>
      <el-button
        type="primary"
        @click="$refs.selectGiftDialog.show();"
      >批量选礼品</el-button>
      <el-button
        type="primary"
        @click="onPayPackages"
      >批量支付</el-button>
    </div>

    <SelectGiftDialog
      ref="selectGiftDialog"
      @select="selectGift"
    />
  </div>
</template>

<script>
import SelectGiftDialog from "@/components/SelectGiftDialog";
export default {
  components: {
    SelectGiftDialog
  },
  data() {
    return {
      searchForm: {
        searchStatus: "",
        keyword: "",
        timeStatus: "",
        timeValues: [],
        status: "",
        remark: "",
        send: ""
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
        _size: this.pagination.pageSize,
        shopId: "1112546859620126724"
      };

      if (
        this.searchForm.searchStatus !== "" &&
        this.searchForm.keyword !== ""
      ) {
        params[this.searchForm.searchStatus] = this.searchForm.keyword;
      }

      if (
        this.searchForm.timeStatus !== "" &&
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length >= 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      if (this.searchForm.status !== "") {
        params.status = this.searchForm.status;
      }

      if (this.searchForm.remark !== "") {
        params.remark = this.searchForm.remark;
      }

      if (this.searchForm.send !== "") {
        params.send = this.searchForm.send;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/getTaskCursorOrders",
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
    },
    // 选择礼品
    selectGift(gift) {
      console.log(gift);
    },
    // 批量支付
    onPayPackages() {
      this.$confirm("确定支付这批订单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // type  1: 支付订单， 2：撤销订单
          // if (type === 1) {
          //   this.payOrder({
          //     orderId: item.taskOrderId
          //   });
          // } else if (type === 2) {
          //   this.cancelOrder({
          //     orderId: item.taskOrderId
          //   });
          // }
        })
        .catch(() => {});
    }
  },
  created() {
    // this.searchForm.orderId = this.$route.query.orderId; // 订单管理点击查看详情，取orderId
    // this.handleSearch();
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