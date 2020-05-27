<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户分配</el-breadcrumb-item>
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
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="邀请人账号">
          <el-input
            v-model="searchForm.invitationMobile"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="运营">
          <el-select
            class="custom-select-200"
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
        <el-form-item label="上一运营人员">
          <el-select
            v-model="searchForm.upOperateAccount"
            class="custom-select-200"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              v-for="(item, i) in operateList"
              :label="item.operateName"
              :value="item.operateAccount"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用状态">
          <el-select
            class="custom-select-200"
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
        <el-form-item label="用户标签">
          <el-select
            class="custom-select-200"
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
        <!-- <el-button type="danger">批量分配运营</el-button> -->
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
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column
          type="selection"
          width="50"
        >
        </el-table-column> -->
        <!-- <el-table-column
          label="账号"
          prop="sellerName"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column> -->
        <el-table-column
          label="手机"
          prop="customerName"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div>{{scope.row.sellerPhone}}</div>
            <!-- <div>{{scope.row.sellerQq}}</div>
            <div>{{scope.row.sellerWx}}</div> -->
          </template>
        </el-table-column>
        <el-table-column
          label="用户标签"
          prop="customerName"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <!-- 商家规模标签 -->
            <el-tag
              size="small"
              v-if="scope.row.sellerScope === 1"
              style="margin-bottom: 5px;"
            >大商家</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerScope === 2"
              style="margin-bottom: 5px;"
            >中商家</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerScope === 3"
              style="margin-bottom: 5px;"
            >小商家</el-tag>
            <!-- 商家使用情况标签 -->
            <el-tag
              size="small"
              v-if="scope.row.sellerHandle === 0"
              style="margin-bottom: 5px;"
            >未使用</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerHandle === 1"
              style="margin-bottom: 5px;"
            >使用中</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerHandle === 2"
              style="margin-bottom: 5px;"
            >暂停使用</el-tag>
            <!-- 商家联系情况标签 -->
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 0"
              style="margin-bottom: 5px;"
            >0类 未联系上</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 1"
              style="margin-bottom: 5px;"
            >1类 已联系</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 2"
              style="margin-bottom: 5px;"
            >2类 初步沟通</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 3"
              style="margin-bottom: 5px;"
            >3类 深入沟通有意向</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 4"
              style="margin-bottom: 5px;"
            >4类 确定合作</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 5"
              style="margin-bottom: 5px;"
            >5类 已合作</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 6"
              style="margin-bottom: 5px;"
            >6类 悔单</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 7"
              style="margin-bottom: 5px;"
            >7类 无意向、放弃</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 8"
              style="margin-bottom: 5px;"
            >8类 信息错误</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 9"
              style="margin-bottom: 5px;"
            >9类 未联系</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerType === 10"
              style="margin-bottom: 5px;"
            >10类 坚决不要</el-tag>
            <!-- 商家等级标签 -->
            <el-tag
              size="small"
              v-if="scope.row.sellerLevel === 1"
              style="margin-bottom: 5px;"
            >注册用户</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerLevel === 2"
              style="margin-bottom: 5px;"
            >VIP用户</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerLevel === 3"
              style="margin-bottom: 5px;"
            >黄金会员</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerLevel === 4"
              style="margin-bottom: 5px;"
            >钻石会员</el-tag>
            <!-- 商家剩余天数标签 -->
            <el-tag
              size="small"
              v-if="scope.row.serviceDeadline"
              style="margin-bottom: 5px;"
            >剩余{{scope.row.serviceDeadline}}天激活</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="运营"
          prop="currentOperate"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="销售"
          prop="saleName"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="代理人"
          prop="agentName"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="注册时间"
          prop="registerTime"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="使用状态"
          prop="customerName"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              size="small"
              v-if="scope.row.sellerHandle === 0"
            >未使用</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerHandle === 1"
            >使用中</el-tag>
            <el-tag
              size="small"
              v-if="scope.row.sellerHandle === 2"
            >暂停使用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="今日登录次数"
          prop="todayLoginNum"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="分配次数"
          prop="operateDistributionNum"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="余额"
          prop="balance"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="累计放单量"
          prop="totalOrderNum"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="上一运营人员"
          prop="formerOperate"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
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
                <el-dropdown-item>
                   <el-button size="small"@click="$refs.spareOperateDialog.show(scope.row.sellerId);"
                >分配运营</el-button>
              </el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;">
                  <el-button size="small" @click="$refs.setAgentDialog.show(scope.row.sellerId);"
                >设置代理</el-button>
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

    <SpareOperateDialog
      ref="spareOperateDialog"
      :operateList="operateList"
      @success="handleSearch"
    />

    <SetAgentDialog
      ref="setAgentDialog"
      :saleList="saleList"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import SpareOperateDialog from "./components/SpareOperateDialog";
import SetAgentDialog from "./components/SetAgentDialog";
export default {
  components: { SpareOperateDialog, SetAgentDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        sellerMobile: "",
        invitationMobile: "",
        operateId: "",
        saleId: "",
        agentId: "",
        upOperateAccount: "",
        sellerHandle: "",
        sellerType: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      selectedItems: [],
      // 运营列表
      operateList: [],
      // 销售列表
      saleList: [],
      // 代理列表
      agentList: []
    };
  },
  methods: {
    async queryOperateList() {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryOperateList",
        method: "get",
        params: {}
      });
      const { data } = res;
      if (data) {
        this.operateList = data;
      }
    },
    // /t-station/querySaleList
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
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      // console.log(this.searchForm);

      // 搜索条件

      if (this.searchForm.sellerMobile !== "") {
        params.sellerMobile = this.searchForm.sellerMobile;
      }

      if (this.searchForm.invitationMobile !== "") {
        params.invitationMobile = this.searchForm.invitationMobile;
      }

      if (this.searchForm.operateId !== "") {
        params.operateId = this.searchForm.operateId;
      }

      if (this.searchForm.saleId !== "") {
        params.saleId = this.searchForm.saleId;
      }

      if (this.searchForm.agentId !== "") {
        params.agentId = this.searchForm.agentId;
      }

      if (this.searchForm.upOperateAccount !== "") {
        params.upOperateAccount = this.searchForm.upOperateAccount;
      }

      if (this.searchForm.sellerHandle !== "") {
        params.sellerHandle = this.searchForm.sellerHandle;
      }

      if (this.searchForm.sellerType !== "") {
        params.sellerType = this.searchForm.sellerType;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/querySellerList",
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
    switchSales(value) {
      if (value) {
        this.queryAgentListBySale({
          saleId: value
        });
      } else {
        this.agentList = [];
      }
    }
  },
  async created() {
    await this.queryOperateList();
    await this.querySaleList();
    this.handleSearch();
  }
};
</script>