<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>代采代发供货</el-breadcrumb-item>
        <el-breadcrumb-item>底单申请列表</el-breadcrumb-item>
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
            v-model="searchForm.status"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="0"
              label="未处理"
            ></el-option>
            <el-option
              :value="1"
              label="已处理"
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
        border
        stripe
        v-loading="loading"
        style="width: 100%;"
      >
        <el-table-column
          align="center"
          header-align="center"
          label="序号"
          prop="date"
          width="60"
        >
          <template slot-scope="scope">{{scope.$index+(pagination.pageNum - 1) * pagination.pageSize + 1}}</template>
        </el-table-column>
        <el-table-column
          label="申请时间"
          prop="createTime"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="申请状态"
          prop="status"
          width="90"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">未处理</span>
            <span
              class="color-success"
              v-if="scope.row.status === 1"
            >已处理</span>
          </template>
        </el-table-column>
        <el-table-column
          label="接收邮箱"
          prop="email"
          width="140"
        ></el-table-column>
        <el-table-column
          label="订单号"
          prop="orders"
        ></el-table-column>
        <el-table-column
          label="商家ID"
          prop="sellerId"
          width="90"
        ></el-table-column>
        <el-table-column
          label="商家手机号"
          prop="mobile"
          width="120"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          prop="mobile"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="el-icon-download"
              @click="onDownload(scope.row)"
            >打包下载底单</el-button>
            <!-- <el-button
              size="small"
              @click="onSetComplete(scope.row)"
            >设为已处理</el-button> -->
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

    <EditPurchaseRemarkDialog
      ref="editPurchaseRemarkDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import EditPurchaseRemarkDialog from "./components/EditPurchaseRemarkDialog";
export default {
  components: { EditPurchaseRemarkDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        status: ""
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
    async updateReplaceBuy(params) {
      let res = await this.$http({
        url: "/seller/approveApplyPrintKd",
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

      if (this.searchForm.status !== "") {
        params.status = this.searchForm.status;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/findTApplyPrintKdList",
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
    // 设为已处理
    onSetComplete(item) {
      this.$confirm("是否确定设为已处理？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateReplaceBuy({
            applyId: item.applyId,
            status: 1
          });
        })
        .catch(() => {});
    },
    onDownload(item) {
      let downloadEl = document.createElement("a");
      
      // 开发测试代码
      // downloadEl.href = `http://192.168.0.20:9130/gift-admin/downApplyPrintKdToZip?applyId=${item.applyId}`;
      
      // 正式使用的代码
      downloadEl.href =
        this.$loginURL + `/downApplyPrintKdToZip?applyId=${item.applyId}`;
        
      downloadEl.target = "_blank";
      document.body.append(downloadEl);
      downloadEl.click();
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>