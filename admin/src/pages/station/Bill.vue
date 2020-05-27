<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分站</el-breadcrumb-item>
        <el-breadcrumb-item>分站账单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="80px"
      >

      <el-form-item>
          <el-input
            v-model="searchForm.userMobile"
            class="custom-select-200"
            placeholder="分站负责人手机"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.keyWords"
            class="custom-select-200"
            placeholder="分站名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="账单日期">
         <el-date-picker
          v-model="searchForm.timeValues"
            class="custom-select-220"
          type="month"
          @change="handleSearch"
          placeholder="选择月">
        </el-date-picker>
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
          label="账单日期"
          prop="billTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分站名称"
          prop="stationName"
          header-align="center"
          align="center"
          width="90"
        >
        </el-table-column>
        <el-table-column
          label="负责人"
          prop="nickName"
          header-align="center"
          align="center"
          width="90"
        >
        </el-table-column>
        <el-table-column
          label="负责人手机"
          prop="userMobile"
          header-align="center"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          label="下单商家数"
          prop="sellerNum"
          header-align="center"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          label="有效订单数"
          prop="taskNum"
          header-align="center"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          label="总快递费"
          prop="expressFee"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="上月收益"
          prop="money"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="用户是否确认"
          prop="customerName"
          header-align="center"
          align="center"
          width="110"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.selfLook == 0">待确认</span>
            <span
              class="color-success"
              v-if="scope.row.selfLook == 1"
            >已确认</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户确认日期"
          prop="selfLookTime" 
          header-align="center"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          label="是否已审核"
          prop="platLook"
          header-align="center"
          align="center"
          width="110"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.platLook == 0">待审核</span>
            <span
              class="color-success"
              v-if="scope.row.platLook == 1"
            >已审核</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核日期"
          prop="platLookTime" width="150"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime" width="150"
          header-align="center"
          align="center"
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
                <el-dropdown-item style="margin: 5px 0;">
                  <el-button size="small" type="small"><a :href="scope.row.qiniuUrl" target="_blank">下载账单</a></el-button>
                </el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;">
                  <el-button size="small" type="success"
                v-if="!scope.row.platLook"
                @click="onHandle(scope.row)"
                >确定账单</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

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
import { loginURL } from '@/utils/config.js'

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        channelId: "",
        keyWords: "",
        userMobile:"",
        timeValues: ''
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      channelList: []
    };
  },
  methods: {
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize,
        groupId:7
      };

      if (this.searchForm.channelId !== "") {
        params.channelId = this.searchForm.channelId;
      }

      if (this.searchForm.userMobile !== "") {
        params.userMobile = this.searchForm.userMobile;
      }

      if (this.searchForm.keyWords !== "") {
        params.stationName = this.searchForm.keyWords;
        params.domain = this.searchForm.keyWords;
      }

      // 按时间搜索条件
      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length !== ''
      ) {
        let date = new Date(this.searchForm.timeValues);
        let year = date.getFullYear();
        let month = date.getMonth()+1;

        params.startTime = year+`-`+month;
        params.endTime =  year+`-`+month;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/auth/user/getUserBillList",
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
    // 修改状态
    async editRequest(params) {
      try {
        let res = await this.$http({
          url: "/auth/user/updateUserBill",
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

    // 审核
    onHandle(item) {
      this.$confirm("是否已核对该账单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //
          this.editRequest({
            stationId: item.stationId,
            platLook: 1,
            billId: item.billId
          });
        })
        .catch(() => {});
    },
  },
  async created() {
    this.getTableData();
  }
};
</script>