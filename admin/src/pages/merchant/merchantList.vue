<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>商家</el-breadcrumb-item>
        <el-breadcrumb-item>商家列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="110px"
      >
        <el-form-item label="商家姓名">
          <el-input
            class="custom-select-200"
            placeholder="请输入内容"
            v-model="searchForm.sellerName"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            class="custom-select-200"
            placeholder="请输入内容"
            v-model="searchForm.sellerMobile"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input
            class="custom-select-200"
            placeholder="请输入内容"
            v-model="searchForm.sellerQQ"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input
            class="custom-select-200"
            placeholder="请输入内容"
            v-model="searchForm.sellerWX"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="最后联系时间">
          <el-date-picker
            class="custom-select-200"
            placeholder="选择日期"
            v-model="searchForm.lastContactTime"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="下次联系时间">
          <el-date-picker
            class="custom-select-200"
            placeholder="选择日期"
            v-model="searchForm.nextContactTime"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item label="注册时间">
          <el-date-picker
            class="custom-select-200"
            placeholder="选择日期"
            v-model="searchForm.createTime"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="obtns">
        <span style="margin-right: 15px;">总计 {{pagination.total}} 家</span>
        <el-button
          @click="handleReset"
          icon="el-icon-refresh"
        >重置</el-button>
        <el-button
          @click="handleSearch"
          icon="el-icon-search"
          type="primary"
        >查询</el-button>
      </div>
    </div>
    <div
      class="custom-container-wrap shop-list"
      style="margin-top: 10px;"
    >
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          align="center"
          header-align="center"
          label="所属分站"
          prop="stationName"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="商家ID"
          prop="sellerId"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="商家姓名"
          prop="sellerName"
          width="120"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          header-align="center"
          label="最后联系/下次联系时间"
          prop="shopName"
          width="200"
        >
          <template slot-scope="scope"></template>
        </el-table-column> -->
        <!-- <el-table-column
          align="center"
          header-align="center"
          label="商家类目"
          prop="mainCategory"
        ></el-table-column> -->
        <el-table-column
          align="center"
          header-align="center"
          label="手机/QQ/微信"
          prop="shopMobile"
          width="120"
        >
          <template slot-scope="scope">
            <div>{{scope.row.sellerMobile}}</div>
            <div>{{scope.row.sellerQq}}</div>
            <div>{{scope.row.sellerWechat}}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="注册时间"
          prop="createTime"
          width="90"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="现任运营"
          prop="serviceAccount"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="上任运营"
          prop="serviceBeforeAccount"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="销售"
          prop="saleName"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="代理"
          prop="agentName"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="余额"
          prop="capitalBalance"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="累计充值金额"
          prop="rechargeBalance"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="昨日放单量"
          prop="yestOrderNum"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="累计放单量"
          prop="totalOrderNum"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="近3日放单量"
          prop="threeOrderNum"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="累计平均放单量"
          prop="avgOrderNum"
          width="110"
        ></el-table-column>
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
    <AddStoreDialog
      @success="handleSearch"
      ref="addStoreDialog"
    />
    <RemarkSetDialog
      @success="handleSearch"
      ref="remarkSetDialog"
    />
    <EditStoreDialog
      @success="handleSearch"
      ref="editStoreDialog"
    />
  </div>
</template>

<script>
import AddStoreDialog from "./components/AddStoreDialog";
import RemarkSetDialog from "./components/RemarkSetDialog";
import EditStoreDialog from "./components/EditStoreDialog";
export default {
  components: { AddStoreDialog, RemarkSetDialog, EditStoreDialog },
  data() {
    return {
      searchForm: {
        createTime: ""
      },
      tableData: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 10,
        total: 0
      }
    };
  },
  methods: {
    // 刷新有效期
    async refreshTime(id) {
      let res = await this.$http({
        url: "/seller/getAssistantStatus",
        method: "get",
        params: {
          shopId: id
        }
      });
      const { code, data, message = "刷新失败，请稍后重试" } = res;
      const { time, status } = data;
      if (code === 200) {
        // status  0 已开通 1 已失效 2 未开通
        if (status === 0) {
          this.$message.success("刷新成功");
        } else if (status === 1) {
          this.$message.success("打印助手已失效，请续费重新刷新");
        } else if (status === 2) {
          this.$message.success("未开通");
        }
        this.handleSearch();
      } else {
        this.$message.error(message);
      }
    },
    async getTableData() {
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };
      if (this.searchForm.sellerName !== "") {
        params.sellerName = this.searchForm.sellerName;
      }
      if (this.searchForm.sellerQQ !== "") {
        params.sellerQQ = this.searchForm.sellerQQ;
      }
      if (this.searchForm.sellerMobile !== "") {
        params.sellerMobile = this.searchForm.sellerMobile;
      }
      if (this.searchForm.sellerWX !== "") {
        params.sellerWX = this.searchForm.sellerWX;
      }
      if (this.searchForm.createTime !== "") {
        params.createTime = this.searchForm.createTime;
      }
      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/sellerList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data.records;
        this.pagination.total = parseInt(data.total);
        // this.pagination.total = data.total;
      } else {
        this.tableData = [];
        this.pagination.total = 0;
      }
    },
    async updateStatus(params) {
      try {
        let res = await this.$http({
          url: "/seller/updateSellerShop",
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
    async validatePrintingAide(params) {
      try {
        let res = await this.$http({
          url: "/seller/shop/validatePrintingAide",
          method: "get",
          params
        });
        const { code, data } = res;
        if (code === 200) {
          this.$message.success("验证成功");
          // this.handleSearch();
        }
      } catch (error) {
        console.log(error);
        this.$message.error(error.toString());
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
    },
    onSubmit() {
      console.log(this.searchForm);
      console.log("submit!");
    },
    // 开启/停用店铺
    onUpdateStatus(item, type, text) {
      this.$confirm(`确定${text}该店铺吗？`, `${text}提示`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateStatus({
            shopId: item.shopId,
            shopStatus: type
          });
        })
        .catch(() => {});
    },
    // 首次验证智能助手
    verfAssistant(item) {
      this.$confirm(
        `需要在淘宝卖家服务市场订购了 “易佳打印” 才能验证，确定验证该店铺的智能助手吗？`,
        `验证智能助手提示`,
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.validatePrintingAide({
            shopId: item.shopId,
            // 暂时固定t1
            assistantCode: "t1"
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

<style lang="less">
.color-blue {
  color: #606266;
  padding: 2px 5px;
  border: 1px solid #ccc;
}
.shop-list {
  .el-table .cell {
    padding: 0;
  }
}
</style>
