<template>
  <div class="shopList">
    <div class="custom-bread-wrap">
      店铺管理
      <span>（{{pagination.total}}）</span>
    </div>

    <div class="custom-btns-wrap">
      <el-button
        @click="$refs.addStoreDialog.show()"
        icon="el-icon-plus"
        type="primary"
      >新增店铺</el-button>
      <a
        href="https://fuwu.taobao.com/ser/detail.htm?service_code=ts-1805920&code=ts-1805920"
        target="_blank"
        style="margin-left: 40px;"
      >去订购智能助手 >></a>
    </div>
    <div class="custom-container-wrap shop-list">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          align="center"
          header-align="center"
          label="店铺主账号"
          prop="shopNick"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="店铺名称"
          prop="shopName"
          width="120"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          header-align="center"
          label="发件人"
          prop="shopDeliver"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="发件人手机"
          prop="shopMobile"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="发件地址"
          prop="shopAddress"
        ></el-table-column> -->
        <el-table-column
          align="center"
          header-align="center"
          label="类型"
          prop="shopType"
          width="65"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.shopType == 0">淘宝</div>
            <div v-if="scope.row.shopType == 1">天猫</div>
            <div v-if="scope.row.shopType == 2">京东</div>
            <div v-if="scope.row.shopType == 3">拼多多</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="智能助手"
          prop="assistantName"
          width="78"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.shopAssistant == 0">
              <!-- {{scope.row.assistantName}} -->
              易佳打印
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="智能助手操作"
          prop="address"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.shopAssistant == 0">
              <div style="margin-bottom: 5px;">
                <a
                  :href="scope.row.xzsBuyUrl"
                  class="color-blue"
                  target="view_window"
                >续费</a>
              </div>
              <div style="margin-bottom: 5px;">
                <a
                  :href="scope.row.xzsLoginUrl"
                  class="color-blue"
                  target="new_window"
                >登录</a>
              </div>
              <div>
                <a
                  @click="refreshTime(scope.row.shopId)"
                  class="color-blue"
                  href="javascript:"
                >刷新有效期</a>
              </div>
            </div>
            <div v-if="scope.row.shopAssistant == 1">
              <!-- <el-button
                @click="verfAssistant(scope.row)"
                size="mini"
              >首次验证助手</el-button> -->
              <el-button
                @click="refreshTime(scope.row.shopId)"
                size="mini"
              >首次验证助手</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="智能助手有效期"
          prop="assistantTime"
          width="110"
        >
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="店铺状态"
          prop="shopStatus"
          width="78"
        >
          <template slot-scope="scope">
            <span
              class="color-success"
              v-if="scope.row.shopStatus == 0"
            >正常</span>
            <span
              class="color-danger"
              v-if="scope.row.shopStatus == 1"
            >禁用</span>
            <el-tooltip
              :content="scope.row.shopStatusMsg"
              class="item"
              effect="light"
              placement="top"
              v-if="scope.row.shopStatus == 1 && scope.row.shopStatusMsg"
            >
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          header-align="center"
          label="店铺操作"
          prop="address"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                @click="$refs.editStoreDialog.show(scope.row)"
                size="mini"
              >编辑</el-button>
            </div>
            <div style="margin:5px 0 0 0;">
              <el-button
                @click="onUpdateStatus(scope.row, 0, '启用')"
                size="mini"
                v-if="scope.row.shopStatus == 1"
              >启用</el-button>
            </div>
            <div style="margin:5px 0 0 0;">
              <el-button
                @click="onUpdateStatus(scope.row, 1, '停用')"
                size="mini"
                v-if="scope.row.shopStatus == 0"
              >停用</el-button>
            </div>
            <div style="margin:5px 0 0 0;">
              <el-button
                @click="$refs.remarkSetDialog.show(scope.row)"
                size="mini"
              >备注设置</el-button>
            </div>
            <div
              v-if="!scope.row.assistantTime"
              style="margin:5px 0 0 0;"
            >
              <el-button
                @click="onDelete(scope.row)"
                size="mini"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      searchForm: {},
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
          this.$message.error("打印助手已失效，请续费重新开通");
        } else if (status === 2) {
          this.$message.error("未开通");
        }
        this.handleSearch();
      } else {
        this.$message.error(message);
      }
    },
    async getTableData() {
      let params = {
        // _index: this.pagination.pageNum,
        // _size: this.pagination.pageSize
      };
      // if (this.searchForm.taskStatus !== "") {
      //   params.taskStatus = this.searchForm.taskStatus;
      // }
      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/findSellerShopList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data;
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
    async deleteSellerShop(params) {
      try {
        let res = await this.$http({
          url: "/seller/deleteSellerShop",
          method: "get",
          params
        });
        const { code, data } = res;
        if (code === 200) {
          this.$message.success("删除成功");
          this.handleSearch();
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
    },
    onDelete(item) {
      this.$confirm(`确定删除该店铺吗？`, `删除店铺提示`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSellerShop({
            shopId: item.shopId
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
.shopList {
  padding: 20px;
}
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
