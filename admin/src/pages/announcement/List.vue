<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="90px"
      >
        <!-- <el-form-item label="第三方订单号：">
          <el-input
            v-model="searchForm.orderNo"
            class="custom-select-200"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item> -->

        <!-- <el-form-item label="发布状态：">
          <el-select
            v-model="searchForm.taskStatus"
            class="custom-select-160"
            @change="handleSearch"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option
              label="已发布"
              :value="1"
            ></el-option>
            <el-option
              label="未发布"
              :value="2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-button
            icon="el-icon-refresh"
            @click="handleReset"
          >重置</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="danger"
            icon="el-icon-plus"
            @click="$router.push('/announcement/list/create')"
          >添加公告</el-button>
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
          label="公告标题"
          prop="anncTitle"
          header-align="center"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="公告类型"
          prop="anncType"
          header-align="center"
          align="center"
          width="90"
        >
          <template slot-scope="scope">
            <span
              class="color-success"
              v-if="scope.row.anncType == 1"
            >普通公告</span>
            <span
              class="color-danger"
              v-if="scope.row.anncType == 2"
            >紧急公告</span>
          </template>
        </el-table-column>
        <el-table-column
          label="公告摘要"
          prop="anncSummary"
          header-align="center"
          align="center"
        >
        </el-table-column>

         <el-table-column
          label="是否弹窗"
          prop="isPopup"
          header-align="center"
          align="center"
          width="90"
        >
          <template slot-scope="scope">
            <span
              class="color-success"
              v-if="scope.row.isPopup"
            >是</span>
            <span
              class="color-danger"
              v-else
            >否</span>
          </template>
        </el-table-column>

        <el-table-column
          label="公告状态"
          prop="anncStatus"
          header-align="center"
          align="center"
          width="90"
        >
          <template slot-scope="scope">
            <span
              class="color-success"
              v-if="scope.row.anncStatus == 1"
            >已发布</span>
            <span
              class="color-danger"
              v-if="scope.row.anncStatus == 2"
            >未发布</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          header-align="center"
          align="center"
          width="140"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
          width="140"
          fixed="right"
        >
          <template slot-scope="scope">
           
            <el-dropdown>
              <el-button type="primary">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
              size="small"
              @click="$router.push('/announcement/list/edit?id=' + scope.row.anncId)"
            >编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0 0;">
                  <el-button
              size="small"
              type="danger"
              @click="onDelete(scope.row)"
            >删除</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        orderNo: "",
        taskStatus: 2
        // searchStatus: "",
        // keywords: "",
        // timeValues: []
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
    // 删除公告
    async deleteAnnouncement(params) {
      try {
        let res = await this.$http({
          url: "/admin/deleteAnnouncement",
          method: "get",
          params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("操作成功");
          this.handleSearch();
        }
      } catch (error) {}
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.orderNo) {
        params.orderNo = this.searchForm.orderNo;
      }

      if (this.searchForm.taskStatus) {
        params.taskStatus = this.searchForm.taskStatus;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/admin/queryTAnnouncementList",
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
    // 单个删除公告
    onDelete(item) {
      this.$confirm("是否确定删除该公告", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteAnnouncement({
            anncId: item.anncId
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>