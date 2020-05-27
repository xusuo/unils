<template>
  <div class="mySocket">
    <div class="custom-bread-wrap">
      公告
      <span>（{{pagination.total}}）</span>
    </div>

    <div class="tables">
      <el-table
        :data="tableData"
        border
        stripe
      >
        <el-table-column
          prop="anncTitle"
          label="标题"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="anncSummary"
          label="信息概要"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="推送时间"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="操作"
          width="80"
        >
          <template slot-scope="scope">
            <a
              href="javascript:;"
              @click="$router.push('/userCenter/messageCenter/noticeList/notice?id=' + scope.row.anncId)"
            >查看</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pages">
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
      searchForm: {
        timeValues: [],
        orderStatus: "",
        order_no: ""
      },
      tableData: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 20, 30, 50, 100],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

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
        // console.log(this.tableData);
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
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="less">
.mySocket {
  padding: 20px;

  .tables {
  }

  .pages {
    margin-top: 20px;
    text-align: right;
  }
}

.gift-info {
  display: flex;

  > img {
    width: 50px;
  }

  > .info {
    flex: 1;
    margin-left: 10px;
    text-align: left;
  }
}
</style>