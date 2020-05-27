<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>提现</el-breadcrumb-item>
        <el-breadcrumb-item>资金明细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="150px"
      >
        <el-form-item>
          <el-select
            @change="handleSearch"
            class="filterInput"
            placeholder="按角色"
            v-model="searchForm.groupId"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="7"
              label="分站"
            ></el-option>
            <el-option
              :value="4"
              label="代理"
            ></el-option>
            <el-option
              :value="5"
              label="销售"
            ></el-option>
            <el-option
              :value="6"
              label="运营"
            ></el-option>
            <el-option
              :value="3"
              label="渠道"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
        label="用户账号："
        prop="mobile"
      >
        <el-input
          v-model="searchForm.userMobile"
          class="custom-select-260"
          placeholder="请输入用户账号"
          maxlength="100"
        ></el-input>
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
          label="用户账号"
          prop="userMobile"
          header-align="center"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="nickName"
          label="用户名称"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="groupName"
          label="用户类型"
          align="center"
        >
        </el-table-column>
         <el-table-column
          prop="typeName"
          label="类型"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="fees"
          label="金额"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="oldBalance"
          label="原金额"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="newBalance"
          label="剩余金额"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="logTime"
          label="创建时间"
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
        groupId: "",
        userMobile:""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      selectedItems: []
    };
  },
  methods: {
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.groupId !== "") {
        params.groupId = this.searchForm.groupId;
      }

      if (this.searchForm.userMobile !== "") {
        params.userMobile = this.searchForm.userMobile;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/admin/getUserLogList",
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
  },
  created() {
    this.handleSearch();
  }
};
</script>