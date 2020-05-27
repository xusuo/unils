<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的代理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="50px"
      >
        <el-form-item>
          <el-input
            v-model="searchForm.agentName"
            class="custom-select-200"
            placeholder="代理人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.agentAccount"
            class="custom-select-200"
            placeholder="代理人账号"
          ></el-input>
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
            @click="$refs.agentAddDialog.show()"
          >新建代理</el-button>
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
          label="代理人账号"
          prop="agentAccount"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="代理人姓名"
          prop="agentName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="agentMobile"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="客户数"
          prop="customerNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          <el-table-column
          label="账户余额"
          prop="agentBalance"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="累计金额"
          prop="agentTotalReward"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="本月新增客户数"
          prop="thisMonthNewAddCustomerNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="本月单量"
          prop="thisMonthOrderNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="上月单量"
          prop="upMonthOrderNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="agentTotalBonus"
          header-align="center"
          align="center"
          width="215"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="$refs.agentEditInfoDialog.show(scope.row);"
            >修改信息</el-button>
            <el-button
              size="small"
              @click="onResetPwd(scope.row)"
            >重置密码</el-button>
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

    <agentAddDialog
      ref="agentAddDialog"
      @success="handleSearch"
    />

    <AgentEditInfoDialog
      ref="agentEditInfoDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import AgentAddDialog from "./components/AgentAddDialog";
import AgentEditInfoDialog from "./components/AgentEditInfoDialog";
export default {
  components: { AgentAddDialog, AgentEditInfoDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        agentName: "",
        agentAccount: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize,
        stationId: this.userInfo.stationId
      };

      if (this.searchForm.agentName != "") {
        params.agentName = this.searchForm.agentName;
      }

      if (this.searchForm.agentAccount != "") {
        params.agentAccount = this.searchForm.agentAccount;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-sale/queryAgentInfoList",
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
    async resetPassword(params) {
      let res = await this.$http({
        url: "/auth/user/resetPassword",
        method: "post",
        data: params
      });
      const { data } = res;
      if (data) {
        this.$message.success("重置密码成功");
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
    onResetPwd(item) {
      this.$confirm("确定要重置该用户的登录密码吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.resetPassword({
            userId: item.userId
          });
        })
        .catch(() => {});
    }
  },
  created() {
    console.log(this.$refs);
    this.handleSearch();
  }
};
</script>