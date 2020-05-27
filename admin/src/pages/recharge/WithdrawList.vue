<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>提现</el-breadcrumb-item>
        <el-breadcrumb-item>提现管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="150px"
      >
        <el-form-item>
          <el-select
            @change="handleSearch"
            class="filterInput"
            placeholder="按状态"
            v-model="searchForm.txHandle"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="1"
              label="待审核"
            ></el-option>
            <el-option
              :value="2"
              label="已通过"
            ></el-option>
            <el-option
              :value="3"
              label="驳回"
            ></el-option>
          </el-select>
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
          label="申请编号"
          prop="txNo"
          header-align="center"
          align="center"
          width="130"
        >
        </el-table-column>
        <el-table-column
          prop="txMoney"
          label="金额"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="bankName"
          label="银行名称"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="bankDot"
          label="支行名称"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="onedaySaleNum"
          label="开户地"
        >
          <template slot-scope="scope">
            {{scope.row.bankProvince}}-
            {{scope.row.bankCity}}-
            {{scope.row.bankArea}}
          </template>
        </el-table-column>
        <el-table-column
          prop="bankCode"
          label="收款账号"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="openName"
          label="姓名"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="wishNums"
          label="申请状态"
          width="120"
        >
          <template slot-scope="scope">
            <!-- 提现审核 1:待审核 2:已通过 3:驳回 -->
            <span v-if="scope.row.txHandle == 1">待审核</span>
            <span
              class="color-success"
              v-if="scope.row.txHandle == 2"
            >已通过</span>
            <span
              class="color-danger"
              v-if="scope.row.txHandle == 3"
            >已驳回</span>
            <el-tooltip
              v-if="scope.row.txHandle == 3"
              class="item"
              effect="dark"
              :content="scope.row.txMsgs"
              placement="top"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="txCreate"
          label="申请时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.txHandle == 1">
              <el-button
                size="small"
                @click="onAgree(scope.row)"
              >通过</el-button>
              <el-button
                type="danger"
                size="small"
                @click="onReject(scope.row)"
              >拒绝</el-button>
            </template>
            <template v-else>--</template>
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
      searchForm: {
        txHandle: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      selectedItems: []
    };
  },
  methods: {
    async approveWithdrawals(params) {
      let res = await this.$http({
        url: "/admin/approveWithdrawals",
        method: "post",
        data: params
      });

      const { code, data } = res;
      if (code == 200 && data) {
        this.$message.success("操作成功");
        this.handleSearch();
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.txHandle !== "") {
        params.txHandle = this.searchForm.txHandle;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/admin/findWithdrawals",
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
    // 通过
    onAgree(item) {
      this.$confirm("确定已经给该用户支付提现金额，并通过该申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.approveWithdrawals({
            txId: item.txId,
            txHandle: 2
          });
        })
        .catch(() => {});
    },
    // 拒绝
    onReject(item) {
      this.$prompt("确定拒绝该提现申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: value => {
          if (value && value.length > 0) {
            return true;
          }

          return false;
        },
        inputErrorMessage: "请输入拒绝原因"
      })
        .then(({ value }) => {
          this.approveWithdrawals({
            txId: item.txId,
            txHandle: 3,
            txMsgs: value
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>