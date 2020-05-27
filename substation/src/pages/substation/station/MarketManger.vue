<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
        <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="销售姓名">
          <el-input
            v-model="searchForm.saleName"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="销售帐号">
          <el-input
            v-model="searchForm.saleAccount"
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
            type="danger"
            icon="el-icon-plus"
            @click="$refs.createSaleDialog.show();"
          >添加销售</el-button>
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
          label="姓名"
          prop="saleName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="登录账号"
          prop="saleAccount"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="saleMobile"
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
          label="销售奖金"
          prop="onePrice"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <!-- <el-table-column
          label="奖金时间"
          prop="bonusTime"
          header-align="center"
          align="center"
        >
        </el-table-column> -->
        <el-table-column
          label="代理数"
          prop="agentNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="本月新增商家数"
          prop="thisMonthNewSellerNum"
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
                @click="$refs.editSaleDialog.show(scope.row)"
              >修改</el-button></el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;"><el-button
                size="small"
                @click="onResetPwd(scope.row)"
              >重置密码</el-button></el-dropdown-item>
                <el-dropdown-item><el-button
                size="small"
                @click="$refs.editSaleBonusDialog.show(scope.row), handleDelita(scope.row);"
              >设置提成</el-button></el-dropdown-item>
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

    <CreateSaleDialog
      ref="createSaleDialog"
      @success="handleSearch"
    />
    <EditSaleDialog
      ref="editSaleDialog"
      @success="handleSearch"
    />
    <EditSaleBonusDialog :tableList="tableList"
      ref="editSaleBonusDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import CreateSaleDialog from "./components/CreateSaleDialog";
import EditSaleDialog from "./components/EditSaleDialog";
import EditSaleBonusDialog from "./components/EditSaleBonusDialog";
export default {
  components: { CreateSaleDialog, EditSaleDialog, EditSaleBonusDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      tableList: [],
      searchForm: {
        saleName: "",
        saleAccount: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.saleName !== "") {
        params.saleName = this.searchForm.saleName;
      }

      if (this.searchForm.saleAccount !== "") {
        params.saleAccount = this.searchForm.saleAccount;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/querySaleManageList",
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
    async handleDelita(item){
      try {
        const res = await this.$http({
          url: "/t-station/getAuthMinPriceByAdmin",
          method: "get",
          params: {
            saleId: item.saleId,
            operateId: item.operateId,
            agentId: item.agentId,
            sellerId: item.sellerId,
          }
        });
        this.tableList = res.data;
       
      if(this.userInfo.stationType == 3){
          const getdata = await this.$http({
            url: "/t-station/getStationStatus",
            method: "get",
          });
          if(getdata.data.stationPrice != 'ok'){
            this.$alert('本分站还未设置成本价，请联系管理进行设置!', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/substation/index')
              }
            });
            return false;
          }
          if(getdata.data.stationPrice == 'ok' && getdata.data.sellerPrice != 'ok'){
            this.$alert('请先设置商家成本价! 点击确认跳转菜单 定价策略!', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/station/priceRule')
              }
            });
          }
        }

      } catch (error) {
        this.loading = false;
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
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>