<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我的商家</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="110px"
      >
        <el-form-item label="账号">
          <el-input
            v-model="searchForm.sellerMobile"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input
            v-model="searchForm.sellerQq"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input
            v-model="searchForm.sellerWx"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="代理人">
          <el-select
            class="custom-select-220"
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

        <el-form-item label="激活状态">
          <el-select
            class="custom-select-220"
            v-model="searchForm.sellerStatus"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="未激活"
              :value="0"
            ></el-option>
            <el-option
              label="已激活"
              :value="1"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="激活时间">
          <el-date-picker
            v-model="searchForm.activationTime"
            class="custom-select-220"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="运营">
          <el-select
            class="custom-select-220"
            v-model="searchForm.operateId"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              v-for="(item, i) in operateList"
              :label="item.operateName"
              :value="item.operateId"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="偏远预警">
          <el-select
            class="custom-select-220"
            v-model="searchForm.alertType"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="无预警"
              :value="0"
            ></el-option>
            <el-option
              label="大于1%"
              :value="1"
            ></el-option>
            <el-option
              label="大于2%"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="obtns">
        <span style="margin-right: 15px;">总计 {{pagination.total}} 人</span>
        <el-button
          icon="el-icon-refresh"
          @click="handleReset"
        >重置</el-button>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >查询</el-button>
      </div>
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
          prop="sellerName"
          header-align="center"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="手机/QQ/微信"
          prop="customerName"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div>{{scope.row.sellerPhone}}</div>
            <div>{{scope.row.sellerQq}}</div>
            <div>{{scope.row.sellerWx}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="账号所属"
          prop="agentName"
          header-align="center"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="邀请好友"
          prop="myInvitationSellerNum"
          header-align="center"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="昨日放单量"
          prop="yesterdayOrderNum"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="累计放单量"
          prop="totalOrderNum"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="近3日平均放单量"
          prop="nearly3DaysAverageOrderNum"
          align="center"
          width="120"
        >
        </el-table-column>

        <el-table-column
          label="激活状态"
          prop="activationDate"
          align="center"
        >
          <template slot-scope="scope">
            <span
              class="color-danger"
              v-if="scope.row.sellerStatus == 0"
            >未激活</span>
            <span
              class="color-success"
              v-if="scope.row.sellerStatus == 1"
            >已激活</span>
          </template>
        </el-table-column>

        <el-table-column
          label="激活时间"
          prop="activationTime"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.activationTime}}
          </template>
        </el-table-column>

        <el-table-column
          label="贡献奖金"
          prop="devoteCost"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="奖励到期时间"
          prop="bonusTime"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.bonusTime}}
          </template>
        </el-table-column>

        <!-- <el-table-column
          label="偏远地区比例"
          prop="activationDate"
          align="center"
        >
        </el-table-column> -->
        <el-table-column
          label="我的备注"
          prop="remark"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          prop="todayLoginNum"
          align="center"
          width="170"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="$refs.userInfoDialog.show(scope.row);"
            >查看</el-button>
            <el-button
              size="small"
              @click="$refs.setSelletRemarkDialog.show(scope.row);"
            >备注</el-button>
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

    <UserInfoDialog
      :operateList="operateList"
      :saleList="saleList"
      ref="userInfoDialog"
    />

    <SetSelletRemarkDialog
      ref="setSelletRemarkDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import moment from "dayjs";
import UserInfoDialog from "./components/UserInfoDialog";
import SetSelletRemarkDialog from "./components/SetSelletRemarkDialog";
export default {
  components: { UserInfoDialog, SetSelletRemarkDialog },
  data() {
    return {
      loading: false,
      tableData: [{}],
      searchForm: {
        sellerAccount: "",
        sellerQq: "",
        sellerWx: "",
        operateId: "",
        agentId: "",
        sellerStatus: "",
        activationTime: "",
        alertType: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      // 运营列表
      operateList: [],
      // 销售列表
      saleList: [],
      // 代理列表
      agentList: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    async queryOperateList() {
      // console.log(params);
      let res = await this.$http({
        url: "/t-sale/queryOperateList",
        method: "get",
        params: {
          stationId: this.userInfo.stationId
        }
      });
      const { data } = res;
      if (data) {
        this.operateList = data;
      }
    },
    async queryAgentInfoList(params) {
      let res = await this.$http({
        url: "/t-sale/queryAgentInfoList",
        method: "get",
        params
      });
      const { data } = res;
      if (data) {
        this.agentList = data.records;
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        stationId: this.userInfo.stationId,
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.sellerAccount !== "") {
        params.sellerAccount = this.searchForm.sellerAccount;
      }

      if (this.searchForm.sellerQq !== "") {
        params.sellerQq = this.searchForm.sellerQq;
      }

      if (this.searchForm.sellerWx !== "") {
        params.sellerWx = this.searchForm.sellerWx;
      }

      if (this.searchForm.operateId !== "") {
        params.operateId = this.searchForm.operateId;
      }

      if (this.searchForm.agentId !== "") {
        params.agentId = this.searchForm.agentId;
      }

      if (this.searchForm.sellerStatus !== "") {
        params.sellerStatus = this.searchForm.sellerStatus;
      }

      if (this.searchForm.activationTime !== "") {
        params.activationTime = this.searchForm.activationTime;
      }

      if (this.searchForm.alertType !== "") {
        params.alertType = this.searchForm.alertType;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-sale/querySellerInfoList",
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
    }
  },
  async created() {
    await this.queryOperateList();
    await this.queryAgentInfoList({
      _index: 1,
      _size: 1000,
      stationId: this.userInfo.stationId
    });
    this.handleSearch();
  }
};
</script>