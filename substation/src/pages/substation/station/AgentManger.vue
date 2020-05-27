<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理人列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="销售-代理">
          <el-select
            class="custom-select-100"
            v-model="searchForm.saleId"
            placeholder="请选择"
            @change="switchSales"
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
          <el-select
            class="custom-select-100"
            v-model="searchForm.agentId"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              v-for="(item, i) in agentList"
              :label="item.agentName"
              :value="item.agentId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理账号">
          <el-input
            v-model="searchForm.agentAccount"
            class="custom-select-200"
            placeholder="请输入内容"
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
            type="primary"
            icon="el-icon-plus"
            @click="$refs.agentAddDialog.show()"
          >新增代理</el-button>
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
          label="代理人姓名"
          prop="agentName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="代理人账号"
          prop="agentAccount"
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
          label="所属销售姓名"
          prop="saleName"
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
          label="账户余额"
          prop="balance"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="累计奖金"
          prop="totalReward"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">

            <el-dropdown>
              <el-button type="primary">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><el-button
                size="small"
                @click="$refs.resetAgentSaleDialog.show(scope.row)"
              >重设上级销售</el-button></el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;"><el-button
                size="small"
                @click="$router.push('/station/agentManger/detail?id=' + scope.row.agentId)"
              >查看</el-button></el-dropdown-item>
                <el-dropdown-item><el-button
                size="small"
                @click="onResetPwd(scope.row)"
              >重置密码</el-button></el-dropdown-item>
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

    <ResetAgentSaleDialog
      :saleList="saleList"
      ref="resetAgentSaleDialog"
      @success="handleSearch"
    />
      <agentAddDialog
      ref="agentAddDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import ResetAgentSaleDialog from "./components/ResetAgentSaleDialog";
import AgentAddDialog from "./components/AgentAddDialog";
export default {
  components: { ResetAgentSaleDialog, AgentAddDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        agentId: "",
        agentAccount: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      // 销售列表
      saleList: [],
      // 代理列表
      agentList: []
    };
  },
  methods: {
    async querySaleList() {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/querySaleList",
        method: "get",
        params: {}
      });
      const { data } = res;
      if (data) {
        this.saleList = data;
      }
    },
    //
    async queryAgentListBySale(params) {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryAgentListBySale",
        method: "get",
        params
      });
      const { data } = res;
      if (data) {
        this.agentList = data;
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
    async getTableData() {
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.agentId !== "") {
        params.agentId = this.searchForm.agentId;
      }

      if (this.searchForm.agentAccount !== "") {
        params.agentAccount = this.searchForm.agentAccount;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryAgentManageList",
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
    addAgent(){

    },
    switchSales(value) {
      if (value) {
        this.queryAgentListBySale({
          saleId: value
        });
      } else {
        this.agentList = [];
      }
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
  async created() {
    await this.querySaleList();
    this.handleSearch();
  }
};
</script>