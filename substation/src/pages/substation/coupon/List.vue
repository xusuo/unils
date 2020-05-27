<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>红包管理</el-breadcrumb-item>
        <el-breadcrumb-item>红包列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="50px"
      >
        <!-- <el-form-item label="销售">
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
        </el-form-item> -->
        <el-form-item>
          <el-select
            v-model="searchForm.couponStatus"
            class="custom-select-200"
            placeholder="按红包状态"
            @change="handleSearch"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="有效"
              :value="1"
            ></el-option>
            <el-option
              label="已过期"
              :value="2"
            ></el-option>
            <el-option
              label="已停用"
              :value="3"
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
        <el-form-item>
          <el-button
            type="danger"
            icon="el-icon-plus"
            @click="$refs.createCouponDialog.show();"
          >添加红包</el-button>
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
          label="红包名称"
          prop="couponName"
        >
        </el-table-column>
        <el-table-column
          label="红包面额"
          prop="amount"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="红包总数量"
          prop="nums"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="剩余数量"
          prop="leftNums"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="红包状态"
          prop="couponStatus"
          header-align="center"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <span
              class="color-success"
              v-if="scope.row.couponStatus == 1"
            >有效</span>
            <span
              class="color-danger"
              v-if="scope.row.couponStatus == 2"
            >已过期</span>
            <span
              class="color-danger"
              v-if="scope.row.couponStatus == 3"
            >已停用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="过期时间"
          prop="deadlineTime"
          header-align="center"
          align="center"
          width="100"
        >
          
        </el-table-column>
        <el-table-column
          label="操作"
          prop="deadlineTime"
          header-align="center"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.couponStatus == 1">
              <el-button @click="onSetInvalid(scope.row)">设为停用</el-button>
            </template>
            <template v-else>
              --
            </template>
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

    <CreateCouponDialog
      ref="createCouponDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import CreateCouponDialog from "./components/CreateCouponDialog";
export default {
  components: { CreateCouponDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        couponStatus: ""
        // timeValues: []
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
    async updateCoupon(params) {
      try {
        let res = await this.$http({
          url: "/t-station/updateCoupon",
          method: "post",
          data: params
        });
        const { code, data } = res;
        if (code === 200) {
          this.$message.success("操作成功");
          this.handleSearch();
        }
      } catch (error) {
        console.log(error);
        this.$message.error(error.toString());
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      // 文本搜索条件
      if (this.searchForm.couponStatus !== "") {
        params.couponStatus = this.searchForm.couponStatus;
      }

      // 按时间搜索条件
      // if (
      //   this.searchForm.timeValues &&
      //   this.searchForm.timeValues.length === 2
      // ) {
      //   params.startTime = this.searchForm.timeValues[0];
      //   params.endTime = this.searchForm.timeValues[1];
      // }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/selectCouponList",
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
    },
    // 设为停用
    onSetInvalid(item) {
      this.$confirm(`确定把该红包设为停用吗？`, `操作提示`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateCoupon({
            couponId: item.couponId,
            couponStatus: 3
          });
        })
        .catch(() => {});
    }
  },
  async created() {
    this.handleSearch();
  }
};
</script>