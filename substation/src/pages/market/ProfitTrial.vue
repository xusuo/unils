<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>总览</el-breadcrumb-item>
        <el-breadcrumb-item>数据详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="60px"
      >
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
        timeValues: [moment().add(-15, "day").$d, moment().$d]
      },
      chartData: {
        columns: ["日期", "包裹数", "新增注册"],
        rows: []
      }
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    async queryOverlordDataMap() {
      // console.log(this.searchForm);
      let params = {
        // _index: this.pagination.pageNum,
        // _size: this.pagination.pageSize
        stationId: this.userInfo.stationId
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
        url: "/t-sale/queryOverlordDataMap",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        // console.log(this.searchForm);
        let packages = data.latelyFifteenDaysPackage
          ? data.latelyFifteenDaysPackage
          : [];

        let registers = data.latelyFifteenDaysRegister
          ? data.latelyFifteenDaysRegister
          : [];

        this.dealChart5(packages, registers);
      }
    },
    handleSearch() {
      this.queryOverlordDataMap();
    },
    dealChart5(data1, data2) {
      let arr = [];
      data1.forEach(m1 => {
        let m1d = moment(m1.packageTime).format("YYYYMMDD");
        arr.push({
          日期: m1d,
          包裹数: m1.packageNum
          // 新增注册: m.
        });
        // data2.forEach(m2 => {
        //   let m2d = moment(m2.packageTime).format("YYYYMMDD");

        //   if (m1d == m2d) {
        //     arr.push({
        //       日期: moment(m.packageTime).format("YYYYMMDD"),
        //       包裹数: m.packageNum
        //       // 新增注册: m.
        //     });
        //   }
        // });
      });

      this.chartData.rows = arr;
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>