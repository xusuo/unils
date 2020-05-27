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
        <el-form-item label="账号">
          <el-input
            v-model="searchForm.sellerMobile"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input
            v-model="searchForm.sellerQQ"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input
            v-model="searchForm.sellerWX"
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
        <el-form-item label="邀请人账号">
          <el-input
            v-model="searchForm.invitationMobile"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="激活状态">
          <el-select
            class="custom-select-200"
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
        <el-form-item label="释放倒计时">
          <el-date-picker
            v-model="searchForm.serviceDeadline"
            class="custom-select-200"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="未登录天数">
          <el-input
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="最后联系时间">
          <el-date-picker
            v-model="searchForm.lastContactTime"
            class="custom-select-200"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下次联系时间">
          <el-date-picker
            v-model="searchForm.nextContactTime"
            class="custom-select-200"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="偏远预警">
          <el-select
            class="custom-select-200"
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
        <el-form-item label="沟通类别">
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
        <el-form-item label="用户规模">
          <el-select
            class="custom-select-200"
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
    
   
    <el-popover placement="right" width="120" trigger="click">

      <el-checkbox style="margin-bottom: 10px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

      <el-checkbox-group v-model="checkList"  @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in settptions" :key="item.label" :label="item.label">{{item.name}}</el-checkbox>
      </el-checkbox-group> 

        <el-tooltip slot="reference" class="item" effect="dark" content="显示更多列表格" placement="bottom">

          <i class="el-icon-setting setTable-btn"></i>
        </el-tooltip>

    </el-popover>



      <el-table
        :data="tableData"
        row-class-name="f-cursor"
        stripe
        border
        v-loading="loading"
        @row-click="rowClick"
      >
      <el-table-column
          label="手机"
          prop="customerName"
          align="center" v-if="showptions.customerName"
          width="200"
        >
          <template slot-scope="scope">
            <div>{{scope.row.sellerPhone}}</div>
            <!-- <div>{{scope.row.sellerQq}}</div>
            <div>{{scope.row.sellerWx}}</div> -->
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="姓名"
          prop="sellerName"
          header-align="center"
          align="center"
          width="120"
        >
        </el-table-column> -->
        <el-table-column
          label="运营小记"
          prop="operateNotes" v-if="showptions.operateNotes"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="最后联系/下次联系" v-if="showptions.lastContactTime"
          prop="lastContactTime"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            {{scope.row.lastContactTime }}<br />
            {{scope.row.nextContactTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="用户标签"
          prop="sellerType" v-if="showptions.sellerType"
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
        <!-- <el-table-column
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
        </el-table-column> -->
        <el-table-column
          label="注册时间" width="150"
          prop="registerTime" v-if="showptions.registerTime"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="上次下单时间"
          prop="lastTime"
          align="center" v-if="showptions.lastTime"
          width="130"
        >
        </el-table-column>
        <el-table-column
          label="现在运营"
          prop="currentOperate" v-if="showptions.currentOperate"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="上任运营"
          prop="formerOperate" v-if="showptions.formerOperate"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分配运营次数"
          prop="operateDistributionNum" v-if="showptions.operateDistributionNum"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="邀请好友"
          prop="invitationNum" v-if="showptions.invitationNum"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="余额"
          prop="balance" v-if="showptions.balance"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="累计充值金额"
          prop="totalRecharge" v-if="showptions.totalRecharge"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="今日登录次数"
          prop="todayLoginNum" v-if="showptions.todayLoginNum"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="未登录天数"
          prop="notLoginDayNum" v-if="showptions.notLoginDayNum"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="昨日放单量"
          prop="yesterdayOrderNum" v-if="showptions.yesterdayOrderNum"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="累计放单量"
          prop="totalOrderNum" v-if="showptions.totalOrderNum"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          label="近3日平均放单量"
          prop="threeDaysOrderNum" v-if="showptions.threeDaysOrderNum"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="累计平均放单量"
          prop="averageOrderNum" v-if="showptions.averageOrderNum"
          align="center"
          width="120"
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
        sellerQQ: "",
        sellerWX: "",
        invitationMobile: "",
        sellerStatus: "",
        serviceDeadline: "",
        lastContactTime: "",
        nextContactTime: "",
        alertType: "",
        sellerScope: "",
        sellerHandle: "",
        sellerType: "",
        operateId: "",
        saleId: "",
        agentId: ""
      },
      checkAll: true,
      isIndeterminate: true,
      showptions: {
        customerName: true,
        sellerType: true,
        registerTime: true,
        invitationNum: true,
        balance: true,
        totalRecharge: true,
        todayLoginNum: true,
        yesterdayOrderNum: true,
        totalOrderNum: true,
        threeDaysOrderNum: true,
        averageOrderNum: true,
      },
      settptions: [
        {label: 'customerName', name: '手机'},
        {label: 'operateNotes', name: '运营小记'},
        {label: 'lastContactTime', name: '最后联系/下次联系'},
        {label: 'sellerType', name: '用户标签'},
        {label: 'registerTime', name: '注册时间'},
        {label: 'lastTime', name: '上次下单时间'},
        {label: 'currentOperate', name: '现在运营'},
        {label: 'formerOperate', name: '上任运营'},
        {label: 'operateDistributionNum', name: '分配运营次数'},
        {label: 'invitationNum', name: '邀请好友'},
        {label: 'balance', name: '余额'},
        {label: 'totalRecharge', name: '累计充值金额'},
        {label: 'todayLoginNum', name: '今日登录次数'},
        {label: 'notLoginDayNum', name: '未登录天数'},
        {label: 'yesterdayOrderNum', name: '昨日放单量'},
        {label: 'totalOrderNum', name: '累计放单量'},
        {label: 'threeDaysOrderNum', name: '近3日平均放单量'},
        {label: 'averageOrderNum', name: '累计平均放单量'},
      ],
      checkList:  [
        'customerName',
        'sellerType',
        'registerTime',
        'invitationNum',
        'balance',
        'totalRecharge',
        'todayLoginNum',
        'yesterdayOrderNum',
        'totalOrderNum',
        'threeDaysOrderNum',
        'averageOrderNum',
      ],
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
  methods: {
     handleCheckAllChange(val) {
      const arr = this.settptions.map(ele => {
        return ele.label
      })
      this.checkList = val ? arr : [];
      this.isIndeterminate = false;
      Object.keys(this.showptions).forEach(element => {
        this.showptions[element] = val;
      });
    },
    handleCheckedCitiesChange(value) {
      Object.keys(this.showptions).forEach(element => {
        this.showptions[element] = false;
      });
      if(value){
        value.map(ele => {
         this.showptions[ele] = true;
        })
      }
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.settptions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.settptions.length;
    },
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

      if (this.searchForm.sellerQQ !== "") {
        params.sellerQQ = this.searchForm.sellerQQ;
      }

      if (this.searchForm.sellerWX !== "") {
        params.sellerWX = this.searchForm.sellerWX;
      }

      if (this.searchForm.invitationMobile !== "") {
        params.invitationMobile = this.searchForm.invitationMobile;
      }

      if (this.searchForm.sellerStatus !== "") {
        params.sellerStatus = this.searchForm.sellerStatus;
      }

      if (this.searchForm.serviceDeadline !== "") {
        params.serviceDeadline = this.searchForm.serviceDeadline;
      }

      if (this.searchForm.lastContactTime !== "") {
        params.lastContactTime = this.searchForm.lastContactTime;
      }

      if (this.searchForm.nextContactTime !== "") {
        params.nextContactTime = this.searchForm.nextContactTime;
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

      if (this.searchForm.sellerType !== "") {
        params.sellerType = this.searchForm.sellerType;
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
    rowClick(item) {
      // console.log(item);
      this.$refs.userInfoDialog.show(item);
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
<style scoped>
  .setTable-btn{
    float: right;
    color: #666;
    font-size: 20px;
    margin: 25px 10px 10px;
    cursor: pointer;
  }
</style>