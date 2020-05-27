<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工单管理</el-breadcrumb-item>
        <el-breadcrumb-item>工单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="90px"
      >
        <el-form-item label="工单状态：">
          <el-select
            @change="handleSearch"
            class="filterInput"
            placeholder="按工单状态"
            v-model="searchForm.status"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="0"
              label="待处理"
            ></el-option>
            <el-option
              :value="1"
              label="正在处理"
            ></el-option>
            <el-option
              :value="2"
              label="处理完成"
            ></el-option>
          </el-select>
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
          label="工单类型"
          prop="anncTitle"
          header-align="center"
          align="center"
          width="75"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.questionType === 1">资金财务</span>
            <span v-if="scope.row.questionType === 2">下单指南</span>
            <span v-if="scope.row.questionType === 3">包裹物流</span>
            <span v-if="scope.row.questionType === 4">其他问题</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="问题描述"
        >
        </el-table-column>
        <el-table-column
          prop="contactWay"
          label="联系方式"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="annexUrl"
          label="附件"
          width="110"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.annexUrl">
              {{$baseImageUrl + scope.row.annexUrl}}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="picUrl"
          label="截图"
          width="70"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.picUrl">
              <img
                v-for="(item, i) in scope.row.picUrl"
                :src="$baseImageUrl + item"
                alt=""
                style="width: 50px;height: 50px;margin-bottom: 5px;"
              >
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="80"
        >
          <template slot-scope="scope">
            <span
              class="color-gray"
              v-if="scope.row.status === 0"
            >待处理</span>
            <span
              class="color-danger"
              v-if="scope.row.status === 1"
            >正在处理</span>
            <span
              class="color-success"
              v-if="scope.row.status === 2"
            >处理完成</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          header-align="center"
          align="center"
          width="150"
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
            <template v-if="scope.row.status == 0 || scope.row.status == 1">
              <el-button
                size="small"
                @click="$refs.editWorkOrderDialog.show(scope.row)"
              >处理</el-button>
            </template>
            <template v-else>
              --
            </template>
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

    <EditWorkOrderDialog
      ref="editWorkOrderDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import EditWorkOrderDialog from "./components/EditWorkOrderDialog";
export default {
  components: { EditWorkOrderDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        status: ""
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

      if (this.searchForm.status !== "") {
        params.status = this.searchForm.status;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/selectUserQuestionList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        let arr = [];
        data.records.forEach(m => {
          if (m.picUrl) {
            m.picUrl = m.picUrl.split(",");
          }
          arr.push(m);
        });
        this.tableData = arr;
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