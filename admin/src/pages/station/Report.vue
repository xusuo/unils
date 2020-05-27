<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分站</el-breadcrumb-item>
        <el-breadcrumb-item>分站报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm" 
        ref="searchForm"
        class="demo-form-inline"
        label-width="50px"
      >
        <el-form-item label="分站" prop="statiovalue">
          <el-select placeholder="请选择" v-model="searchForm.statiovalue" @change="handlechanne">
            <el-option
              v-for="item in channelList"
              :key="item.stationId"
              :label="item.stationName"
              :value="item.stationId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="timeValues">
          <el-date-picker
            v-model="searchForm.timeValues"
            class="custom-select-200"
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
            @click="getTableData"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-refresh"
             @click="resetForm('searchForm')"
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
          label="日期"
          prop="statisticsTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总订单数"
          prop="totalOrderNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总包裹数"
          prop="totalPackageNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="新增注册"
          prop="newRegisterNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="当日下单用户"
          prop="placeOrderNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总用户数"
          prop="totalUserNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分站名称"
          prop="stationName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分站当天奖金"
          prop="stationCost"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="分站累计奖金"
          prop="stationTotalReward"
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
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        statiovalue: '',
        timeValues: '',
      },
      channelList: [],
      stationId: '',
      startTime: '',
      endTime: '',
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 10,
        total: Number
      }
    };
  },
  methods: {
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize,
        stationId: this.stationId,
        startTime: this.startTime,
        endTime: this.endTime,
      };

      // 文本搜索条件
      if (
        this.searchForm.searchStatus !== "" &&
        this.searchForm.keywords !== ""
      ) {
        params[this.searchForm.searchStatus] = this.searchForm.keywords;
      }

      // 按数值类型搜索条件
      if (
        this.searchForm.numberStatus !== "" &&
        this.searchForm.minNumber &&
        this.searchForm.maxNumber &&
        this.searchForm.minNumber !== "" &&
        this.searchForm.maxNumber !== ""
      ) {
        let min = 0;
        let max = 0;

        if (this.searchForm.minNumber > this.searchForm.maxNumber) {
          min = this.searchForm.maxNumber;
          max = this.searchForm.minNumber;
        } else {
          min = this.searchForm.minNumber;
          max = this.searchForm.maxNumber;
        }

        if (this.searchForm.numberStatus === "capitalBalance") {
          params.minCapitalBalance = min;
          params.maxCapitalBalance = max;
        } else if (this.searchForm.numberStatus === "releaseBalance") {
          params.minReleaseBalance = min;
          params.maxReleaseBalance = max;
        }
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/station/getStationReportStatistics",
        method: "get",
        params
      });
      console.log(res)
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

    // 分站列表
    async getSubstationList(){
      try {
        const res = await this.$http({
          url: "/station/getStationListForAdmin",
          method: "get",
        });
        this.channelList = res.data
        // this.stationId = res.data[0].stationName
        // console.log(this.stationId)
      } catch (e) {
        console.log(e);
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
    handleSearch(item) {
      this.pagination.pageNum = 1;
      // this.getTableData()
      if(item){
        this.startTime = item[0]
        this.endTime = item[1]
      }else{
        this.startTime = ''
        this.endTime = ''
      }
    },
    handlechanne(item){
      this.stationId = item
    },
    handleReset() {
      this.searchForm = {};
      this.getTableData();
    },
    resetForm(formName) {
      console.log(formName)
      this.$refs[formName].resetFields();
    }
  },
  created(){
    this.getSubstationList();
      this.getTableData();
  },

};
</script>