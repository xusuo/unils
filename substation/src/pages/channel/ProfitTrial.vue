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
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
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
        timeValues: [moment().add(-7, "day").$d, moment().$d]
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      chartData: {
        columns: ["日期", "数量"],
        rows: []
      }
    };
  },
  methods: {
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        // _index: this.pagination.pageNum,
        // _size: this.pagination.pageSize
        // 1是圆通
        expressId: 1
      };

      // 按时间搜索条件
      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length === 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/channel/queryOverlordDataMap",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        let arr = [];
        let bonus = data.latelyFifteenDaysBonus
          ? data.latelyFifteenDaysBonus
          : [];

        bonus.forEach(m => {
          arr.push({
            日期: moment(m.statisticsTime).format("YYYYMMDD"),
            数量: m.channelBonus
          });
        });

        console.log(arr);

        this.chartData.rows = arr;
      }
    },
    handleReset() {
      this.searchForm = {
        timeValues: [moment().add(-7, "day").$d, moment().$d]
      };
      this.getTableData();
    },
    handleSearch() {
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>