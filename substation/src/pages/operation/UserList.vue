<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="110px"
      >
        <el-form-item label="手机号">
          <el-input
            v-model="searchForm.sellerMobile"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="代理人">
          <el-input
            v-model="searchForm.agentName"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input
            v-model="searchForm.sellerName"
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
        <!-- <el-form-item label="未登录天数">
          <el-input
            v-model="searchForm.sellerWX"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="分配时间">
          <el-date-picker
            v-model="searchForm.distributionTime"
            class="custom-select-220"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最后联系时间">
          <el-date-picker
            v-model="searchForm.lastContactTime"
            class="custom-select-220"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="下次联系时间">
          <el-date-picker
            v-model="searchForm.nextContactTime"
            class="custom-select-220"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
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

        <el-form-item label="释放倒计时">
          <el-input
            v-model="searchForm.serviceDeadline"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="沟通类别">
          <el-select
            class="custom-select-220"
            v-model="searchForm.sellerType"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="0类 未联系上"
              :value="0"
            ></el-option>
            <el-option
              label="1类 已联系"
              :value="1"
            ></el-option>
            <el-option
              label="2类 初步沟通"
              :value="2"
            ></el-option>
            <el-option
              label="3类 深入沟通有意向"
              :value="3"
            ></el-option>
            <el-option
              label="4类 确定合作"
              :value="4"
            ></el-option>
            <el-option
              label="5类 已合作"
              :value="5"
            ></el-option>
            <el-option
              label="6类 悔单"
              :value="6"
            ></el-option>
            <el-option
              label="7类 无意向、放弃"
              :value="7"
            ></el-option>
            <el-option
              label="8类 信息错误"
              :value="8"
            ></el-option>
            <el-option
              label="9类 未联系"
              :value="9"
            ></el-option>
            <el-option
              label="10类 坚决不要"
              :value="10"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户规模">
          <el-select
            class="custom-select-220"
            v-model="searchForm.sellerScope"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="大商家"
              :value="1"
            ></el-option>
            <el-option
              label="中商家"
              :value="2"
            ></el-option>
            <el-option
              label="小商家"
              :value="3"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="使用状态">
          <el-select
            class="custom-select-220"
            v-model="searchForm.sellerHandle"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="未使用"
              :value="0"
            ></el-option>
            <el-option
              label="使用中"
              :value="1"
            ></el-option>
            <el-option
              label="暂停使用"
              :value="2"
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

        <!-- <el-form-item label="用户等级">
          <el-select
            class="custom-select-220"
            v-model="searchForm.sellerHandle"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="普通用户"
              :value="1"
            ></el-option>
            <el-option
              label="VIP用户"
              :value="2"
            ></el-option>
            <el-option
              label="黄金会员"
              :value="3"
            ></el-option>
            <el-option
              label="钻石会员"
              :value="4"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="上任运营">
          <el-select
            class="custom-select-220"
            v-model="searchForm.upOperateId"
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

        <!-- <el-form-item label="姓名">
          <el-input
            v-model="searchForm.sellerMobile"
            class="custom-select-220"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item> -->

        <el-form-item label="注册时间">
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
        row-class-name="f-cursor"
        stripe
        border
        v-loading="loading"
        @row-click="rowClick"
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
          label="手机号"
          prop="sellerMobile"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="注册时间"
          prop="registerTime"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="沟通分类"
          prop="sellerType"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.sellerType === 0">0类 未联系上</span>
            <span v-if="scope.row.sellerType === 1">1类 已联系</span>
            <span v-if="scope.row.sellerType === 2">2类 初步沟通</span>
            <span v-if="scope.row.sellerType === 3">3类 深入沟通有意向</span>
            <span v-if="scope.row.sellerType === 4">4类 确定合作</span>
            <span v-if="scope.row.sellerType === 5">5类 已合作</span>
            <span v-if="scope.row.sellerType === 6">6类 悔单</span>
            <span v-if="scope.row.sellerType === 7">7类 无意向、放弃</span>
            <span v-if="scope.row.sellerType === 8">8类 信息错误</span>
            <span v-if="scope.row.sellerType === 9">9类 未联系</span>
            <span v-if="scope.row.sellerType === 10">10类 坚决不要</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邀请数"
          prop="invitationNum"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="余额"
          prop="balance"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="激活时间"
          prop="activationDate"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="累计单量"
          prop="totalOrderNum"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="上任运营"
          prop="formerOperate"
          align="center"
        >
        </el-table-column>
        <el-table-column
          v-for="(item, i) in latelyPackageNum"
          :label="item.date"
          align="center"
          :key="i"
        >
          <template slot-scope="scope">
            {{scope.row.latelyPackageNum[i].packageNum}}
          </template>
        </el-table-column>
        <el-table-column
          label="未下单"
          prop="notPlaceOrderDayNum"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="今日登入"
          prop="todayLoginNum"
          align="center"
        >
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
  </div>
</template>

<script>
import moment from "dayjs";
import UserInfoDialog from "./components/UserInfoDialog";
export default {
  components: { UserInfoDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        sellerMobile: "",
        sellerName: "",
        agentName: "",
        sellerQq: "",
        sellerWx: "",
        distributionTime: "",
        lastContactTime: "",
        nextContactTime: "",
        sellerStatus: "",
        serviceDeadline: "",
        activationTime: "",
        sellerType: "",
        alertType: "",
        sellerScope: "",
        sellerHandle: "",
        upOperateId: "",
        timeValues: []
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
      agentList: [],
      latelyPackageNum: [
        {
          date: moment()
            .add(-7, "day")
            .format("MM-DD")
        },
        {
          date: moment()
            .add(-6, "day")
            .format("MM-DD")
        },
        {
          date: moment()
            .add(-5, "day")
            .format("MM-DD")
        },
        {
          date: moment()
            .add(-4, "day")
            .format("MM-DD")
        },
        {
          date: moment()
            .add(-3, "day")
            .format("MM-DD")
        },
        {
          date: moment()
            .add(-2, "day")
            .format("MM-DD")
        },
        {
          date: moment()
            .add(-1, "day")
            .format("MM-DD")
        },
        {
          date: "今日"
        }
      ]
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
        url: "/t-operate/queryOperateList",
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
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        stationId: this.userInfo.stationId,
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.sellerMobile !== "") {
        params.sellerMobile = this.searchForm.sellerMobile;
      }

      if (this.searchForm.sellerName !== "") {
        params.sellerName = this.searchForm.sellerName;
      }

      if (this.searchForm.agentName !== "") {
        params.agentName = this.searchForm.agentName;
      }

      if (this.searchForm.sellerQq !== "") {
        params.sellerQq = this.searchForm.sellerQq;
      }

      if (this.searchForm.sellerWx !== "") {
        params.sellerWx = this.searchForm.sellerWx;
      }

      if (this.searchForm.distributionTime !== "") {
        params.distributionTime = this.searchForm.distributionTime;
      }

      if (this.searchForm.lastContactTime !== "") {
        params.lastContactTime = this.searchForm.lastContactTime;
      }

      if (this.searchForm.nextContactTime !== "") {
        params.nextContactTime = this.searchForm.nextContactTime;
      }

      if (this.searchForm.sellerStatus !== "") {
        params.sellerStatus = this.searchForm.sellerStatus;
      }

      if (this.searchForm.serviceDeadline !== "") {
        params.serviceDeadline = this.searchForm.serviceDeadline;
      }

      if (this.searchForm.activationTime !== "") {
        params.activationTime = this.searchForm.activationTime;
      }

      if (this.searchForm.sellerType !== "") {
        params.sellerType = this.searchForm.sellerType;
      }

      if (this.searchForm.alertType !== "") {
        params.alertType = this.searchForm.alertType;
      }

      if (this.searchForm.sellerScope !== "") {
        params.sellerScope = this.searchForm.sellerScope;
      }

      if (this.searchForm.sellerHandle !== "") {
        params.sellerHandle = this.searchForm.sellerHandle;
      }

      if (this.searchForm.upOperateId !== "") {
        params.upOperateId = this.searchForm.upOperateId;
      }

      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length >= 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-operate/querySellerList",
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
    rowClick(item) {
      // console.log(item);
      this.$refs.userInfoDialog.show(item);
    }
  },
  async created() {
    await this.queryOperateList();
    this.handleSearch();
  }
};
</script>