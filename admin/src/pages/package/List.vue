<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>包裹管理</el-breadcrumb-item>
        <el-breadcrumb-item>包裹列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="120px"
      >
        <el-form-item label="第三方订单号：">
          <el-input
            v-model="searchForm.orderNo"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="电子面单号：">
          <el-input
            v-model="searchForm.waybillNo"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="商品名称：">
          <el-input
            v-model="searchForm.goodsTitle"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="收货人：">
          <el-input
            v-model="searchForm.receiverName"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号：">
          <el-input
            v-model="searchForm.receiverPhone"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="礼品发货状态：">
          <el-select
            v-model="searchForm.taskStatus"
            class="custom-select-160"
            @change="handleSearch"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <!-- <el-option
              label="待匹配包裹"
              :value="0"
            ></el-option> -->
            <el-option
              label="待付款"
              :value="1"
            ></el-option>
            <el-option
              label="待发货"
              :value="2"
            ></el-option>
            <el-option
              label="已发货"
              :value="3"
            ></el-option>
            <el-option
              label="已完成"
              :value="4"
            ></el-option>
              <el-option
              label="打单失败"
              :value="5"
            ></el-option>
            <!-- <el-option
              label="已完成"
              :value="5"
            ></el-option> -->
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
      class="custom-operate-wrap"
      style="margin-top: 10px;"
    >
      <el-button
        type="primary"
        @click="onBatchUser"
      >批量发货</el-button>
      <el-button
        type="primary"
        @click="onBatchTally"
      >批量结算</el-button>
    </div>

    <div class="custom-container-wrap">
      <el-table
        :data="tableData"
        stripe
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="第三方订单号"
          prop="orderNo"
          header-align="center"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="goodsTitle"
          header-align="center"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="收货人"
          prop="receiverName"
          header-align="center"
          align="center"
          width="70"
        >
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="receiverPhone"
          header-align="center"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          label="地址"
          prop="receiverAddress"
          header-align="center"
          width="450"
        >
          <template slot-scope="scope">
            {{scope.row.receiverState + scope.row.receiverCity + scope.row.receiverDistrict + scope.row.receiverAddress}}
          </template>
        </el-table-column>
        <el-table-column
          label="礼品发货状态"
          prop="taskStatus"
          header-align="center"
          align="center"
          width="110"
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
          label="分站名称"
          prop="stationName"
          header-align="center"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          label="商家手机号"
          prop="sellerMobile"
          header-align="center"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          label="电子面单号"
          prop="waybillNo"
          header-align="center"
          align="center"
          width="160"
        >
        </el-table-column>
        <el-table-column
          label="快递"
          prop="taskExpressName"
          header-align="center"
          align="center"
          width="125"
        >
        </el-table-column>
        <el-table-column
          label="下单时间"
          prop="addTime"
          header-align="center"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          header-align="center"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="面单打印时间"
          prop="printTime"
          header-align="center"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="第三方发货时间"
          prop="tbTime"
          header-align="center"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="第三方发货状态"
          prop="tbTime"
          header-align="center"
          align="center"
          width="120"
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
          header-align="center"
          align="center"
          width="100"
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
          header-align="center"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
          width="120"
          fixed="right"
        >
          <template slot-scope="scope">

            <el-dropdown>
              <el-button type="primary">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><el-button
              size="small"
              @click="onUse(scope.row)"
            >设为已发货</el-button>
                  </el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;">
                   <el-button
              size="small"
              @click="onTally(scope.row)"
            >结算该订单</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  
                   <el-button
              size="small"
              @click="onDownload(scope.row)"
              :disabled="!scope.row.printKdImg"
            >下载底图</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <!-- <el-dropdown>
              <el-button type="primary">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>

                </el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;">

                </el-dropdown-item>
                <el-dropdown-item>
                  
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown> -->
            
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

    <!-- <CreateChannelDialog
      ref="createChannelDialog"
      @success="handleSearch"
    />
    <EditChannelDialog
      ref="editChannelDialog"
      @success="handleSearch"
    /> -->
  </div>
</template>

<script>
// import CreateChannelDialog from "./components/CreateChannelDialog";
// import EditChannelDialog from "./components/EditChannelDialog";
export default {
  // components: { CreateChannelDialog, EditChannelDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        orderNo: "",
        taskStatus: "",
        waybillNo: "",
        goodsTitle: "",
        receiverName: "",
        receiverPhone: ""
        // searchStatus: "",
        // keywords: "",
        // timeValues: []
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 15, 20, 30, 50, 100],
        pageSize: 20,
        total: 0
      },
      selectedItems: []
    };
  },
  methods: {
    // 修改状态
    async editRequest(params) {
      try {
        let res = await this.$http({
          url: "/task/updateFahuoStatus",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("操作成功");
          this.handleSearch();
        }
      } catch (error) {}
    },
    // 结算订单
    async commissionTask(params) {
      try {
        let res = await this.$http({
          url: "/task/commissionTask",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("操作成功");
          this.handleSearch();
        }
      } catch (error) {}
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.orderNo !== "") {
        params.orderNo = this.searchForm.orderNo;
      }

      if (this.searchForm.taskStatus !== "") {
        params.taskStatus = this.searchForm.taskStatus;
      }

      if (this.searchForm.waybillNo !== "") {
        params.waybillNo = this.searchForm.waybillNo;
      }

      if (this.searchForm.goodsTitle !== "") {
        params.goodsTitle = this.searchForm.goodsTitle;
      }

      if (this.searchForm.receiverName !== "") {
        params.receiverName = this.searchForm.receiverName;
      }

      if (this.searchForm.receiverPhone !== "") {
        params.receiverPhone = this.searchForm.receiverPhone;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/task/getTaskAdminListPage",
        method: "post",
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
    // 单个发货
    onUse(item) {
      this.$confirm("设为已发货是测试用的接口，建议不要继续！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //
          this.editRequest({
            // 多个用英文逗号分开
            ids: item.taskId + ""
          });
        })
        .catch(() => {});
    },
    // 单个结算
    onTally(item) {
      this.$confirm("结算订单是测试用的接口，建议不要继续！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.commissionTask({
            // 多个用英文逗号分开
            taskId: item.taskId
          });
        })
        .catch(() => {});
    },
    // 批量发货
    onBatchUser() {
      console.log(this.selectedItems);
      if (this.selectedItems.length <= 0) {
        this.$message.error("请选择订单，再操作");
        return false;
      }

      this.$confirm("设为已发货是测试用的接口，建议不要继续！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //
          this.editRequest({
            // 多个用英文逗号分开
            ids: this.selectedItems.join(",")
          });
        })
        .catch(() => {});
    },
    // 批量结算
    onBatchTally() {
      if (this.selectedItems.length <= 0) {
        this.$message.error("请选择订单，再操作");
        return false;
      }

      this.$confirm("结算订单是测试用的接口，建议不要继续！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.commissionTask({
            // 多个用英文逗号分开
            taskId: this.selectedItems.join(",")
          });
        })
        .catch(() => {});
    },
    // 下载底图
    onDownload(item) {
      let downloadEl = document.createElement("a");
      downloadEl.href = this.$baseImageUrl + "/" + item.printKdImg;
      downloadEl.target = "_blank";
      downloadEl.download = "底图";
      document.body.append(downloadEl);
      downloadEl.click();
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>