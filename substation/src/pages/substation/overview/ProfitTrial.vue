<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>总览</el-breadcrumb-item>
        <el-breadcrumb-item>奖金趋势</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="60px"
      >
        <el-form-item label="类型">
          <el-select
            class="custom-select-130"
            v-model="searchForm.searchStatus"
            placeholder="请选择"
          >
            <el-option
              label="发包类型趋势"
              :value="1"
            ></el-option>
            <el-option
              label="注册数"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="searchForm.timeValues"
            class="custom-select-220"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="交易日期"
            end-placeholder="结束日期"
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
        <!-- <el-form-item>
          <el-button
            icon="el-icon-refresh"
            @click="handleReset"
          >重置</el-button>
        </el-form-item> -->
      </el-form>
    </div>

    <div style="margin-top: 20px;">
      <ve-line
        :data="chartData"
        :colors="colors"
      ></ve-line>
    </div>
  </div>
</template>

<script>
import moment from "dayjs";
export default {
  data() {
    this.colors = [
      "#4882f0",
      "#2f4554",
      "#61a0a8",
      "#d48265",
      "#91c7ae",
      "#749f83",
      "#ca8622",
      "#bda29a",
      "#6e7074",
      "#546570",
      "#c4ccd3"
    ];

    return {
      loading: false,
      tableData: [],
      searchForm: {
        searchStatus: 1,
        timeValues: [moment().add(-15, "day").$d, moment().$d]
      },
      chartData: {
        columns: ["日期", "数量"],
        rows: []
      }
    };
  },
  methods: {
    async queryOverlordDataMap() {
      // console.log(this.searchForm);
      let params = {
        // _index: this.pagination.pageNum,
        // _size: this.pagination.pageSize
      };

      // 按时间搜索条件
      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length === 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      let res = await this.$http({
        url: "/t-station/queryOverlordDataMap",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        console.log(this.searchForm);
        if (this.searchForm.searchStatus === 1) {
          let packages = data.latelyFifteenDaysPackage
            ? data.latelyFifteenDaysPackage
            : [];

          this.dealChart5(packages);
        } else if (this.searchForm.searchStatus === 2) {
          let registers = data.latelyFifteenDaysRegister
            ? data.latelyFifteenDaysRegister
            : [];

          this.dealChart6(registers);
        }
      }
    },
    handleSearch() {
      this.queryOverlordDataMap();
    },
    dealChart5(data) {
      let arr = [];
      data.forEach(m => {
        arr.push({
          日期: moment(m.packageTime).format("YYYYMMDD"),
          数量: m.packageNum
        });
      });
      this.chartData.rows = arr;
    },
    dealChart6(data) {
      let arr = [];
      data.forEach(m => {
        arr.push({
          日期: moment(m.registerTime).format("YYYYMMDD"),
          数量: m.registerNum
        });
      });

      this.chartData.rows = arr;
    }
  },
  created() {
    if (this.$route.query.searchStatus) {
      this.searchForm.searchStatus = parseInt(this.$route.query.searchStatus);
    }

    this.handleSearch();
  }
};
</script>