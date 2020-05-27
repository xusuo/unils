<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>总览</el-breadcrumb-item>
        <el-breadcrumb-item>入账明细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
      >
        <el-form-item>
          <el-select
            class="custom-select-130"
            v-model="searchForm.searchStatus"
            placeholder="请选择"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="退款"
              :value="1"
            ></el-option>
            <el-option
              label="奖金"
              :value="2"
            ></el-option>
            <el-option
              label="提现"
              :value="3"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.timeValues"
            class="custom-select-220"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="交易日期"
            end-placeholder="结束日期"
            @change="handleSearch"
            :picker-options="pickerOptions"
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
      </el-form>
    </div>

    <div class="yt-common-ctn">
      <div>
        <div
          class="custom-container-wrap"
          style="margin-top: 0;"
        >
          <el-table
            :data="tableData"
            stripe
            border
            v-loading="loading"
          >
            <el-table-column
              label="时间"
              prop="logTime"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column
              label="贡献奖金"
              prop="customerName"
              header-align="center"
              align="center"
            >
            </el-table-column> -->
            <el-table-column
              label="交易类型"
              prop="logTypwe"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="账号"
              prop="txNo"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column
              label="所属分站"
              prop="customerName"
              header-align="center"
              align="center"
            >
            </el-table-column> -->
            <el-table-column
              label="交易前余额"
              prop="oldBalance"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="交易后余额"
              prop="newBalance"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <!-- <el-table-column
              label="交易备注"
              prop="customerName"
              header-align="center"
              align="center"
            >
            </el-table-column> -->
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        helpType: "",
        helpTitle: "",
        helpContent: "",
        seq: 0
      },
      rules: {
        helpType: [
          {
            required: true,
            message: "请选择问题类型",
            trigger: "change"
          }
        ]
      },
      loading: false,
      tableData: [],
      searchForm: {},
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.form));
          console.log(params);
          // this.updateHelp({
          //   id: this.$route.query.id,
          //   ...params
          // });
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      // 文本搜索条件
      // if (
      //   this.searchForm.searchStatus !== "" &&
      //   this.searchForm.keywords !== ""
      // ) {
      //   params[this.searchForm.searchStatus] = this.searchForm.keywords;
      // }

      // 按时间搜索条件
      // if (
      //   this.searchForm.timeStatus !== "" &&
      //   this.searchForm.timeValues &&
      //   this.searchForm.timeValues.length === 2
      // ) {
      //   if (this.searchForm.timeStatus === "createTime") {
      //     params.minCreateTime = this.searchForm.timeValues[0];
      //     params.maxCreateTime = this.searchForm.timeValues[1];
      //   } else if (this.searchForm.timeStatus === "loginTime") {
      //     params.minLoginTime = this.searchForm.timeValues[0];
      //     params.maxLoginTime = this.searchForm.timeValues[1];
      //   }
      // }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/channel/queryCapitalStream",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data.records;
        this.pagination.total = data.total;
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
  created() {
    this.handleSearch();
  }
};
</script>
