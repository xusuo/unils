<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分站</el-breadcrumb-item>
        <el-breadcrumb-item>分站列表</el-breadcrumb-item>
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
          <el-select
            v-model="searchForm.channelId"
            class="custom-select-160"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              v-for="(item, i) in channelList"
              :label="item.name"
              :value="item.channelId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.keyWords"
            class="custom-select-200"
            placeholder="分站名称、域名关键词"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
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
            @click="$refs.createStationDialog.show();"
          >添加分站</el-button>
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
          label="所属渠道"
          prop="name"
          header-align="center"
          align="center"
          width="90"
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
          label="分站域名"
          prop="domain" width="220"
          header-align="center"
          align="center"
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
          prop="loginAccount"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="省份"
          prop="provice"
          header-align="center"
          align="center"
          width="70"
        >
        </el-table-column>
        <el-table-column
          label="城市"
          prop="city"
          header-align="center"
          align="center"
          width="70"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="customerName"
          header-align="center"
          align="center"
          width="60"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">待审核</span>
            <span
              class="color-success"
              v-if="scope.row.status == 1"
            >正常</span>
            <span
              class="color-danger"
              v-if="scope.row.status == 2"
            >禁用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop="createTime" width="150"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="代理人数"
          prop="agentNum"
          header-align="center"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="商家数"
          prop="sellerNum"
          header-align="center"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="有效包裹数"
          prop="totalPackageNum"
          header-align="center"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="账户余额"
          prop="balance"
          header-align="center"
          align="center"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="累计奖金"
          prop="totalReward"
          header-align="center"
          align="center"
          width="80"
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
              v-if="scope.row.status != 2"
              icon="el-icon-remove-outline"
              @click="onDisable(scope.row)"
            >禁用</el-button></el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;"><el-button
              size="small"
              icon="el-icon-setting"
              @click="$router.push('/station/list/setCost?id=' + scope.row.stationId + 
              '&name=' + scope.row.stationName + '&channelId=' + scope.row.channelId + 
              '&cname=' + scope.row.name)"
            >成本设置</el-button></el-dropdown-item>
                <el-dropdown-item><el-button
              size="small"
              icon="el-icon-edit"
              @click="$refs.editStationDialog.show(scope.row);"
              style="margin-right: 10px;"
            >修改信息</el-button></el-dropdown-item>
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

    <CreateStationDialog
      ref="createStationDialog"
      @success="handleSearch"
      :channelList="channelList"
    />
    <EditStationDialog
      ref="editStationDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import CreateStationDialog from "./components/CreateStationDialog";
import EditStationDialog from "./components/EditStationDialog";
export default {
  components: { CreateStationDialog, EditStationDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        channelId: "",
        keyWords: "",
        timeValues: []
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
    async getChannelList() {
      let params = {
        _index: 1,
        _size: 1000
      };

      let res = await this.$http({
        url: "/channel/getChannelAdminListPage",
        method: "post",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.channelList = data.records;
      } else {
        this.channelList = [];
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.channelId !== "") {
        params.channelId = this.searchForm.channelId;
      }

      if (this.searchForm.keyWords !== "") {
        params.stationName = this.searchForm.keyWords;
        params.domain = this.searchForm.keyWords;
      }

      // 按时间搜索条件
      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length === 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      console.log(params)
      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/station/getStationAdminListPage",
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
          url: "/station/updateStation",
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
    // 禁用
    onDisable(item) {
      this.$confirm("是否确定禁用该分站?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //
          this.editRequest({
            stationId: item.stationId,
            status: 2,
            loginAccount: item.loginAccount,
            nickName: item.nickName
          });
        })
        .catch(() => {});
    }
  },
  async created() {
    await this.getChannelList();
    this.getTableData();
  }
};
</script>