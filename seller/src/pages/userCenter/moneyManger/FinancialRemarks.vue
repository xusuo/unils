<template>
  <div class="financialRemarks">
    <div class="custom-bread-wrap">
      财务备注
      <span>（{{pagination.total}}）</span>
    </div>

    <div style="margin-bottom: 15px;">
      <el-button
        type="primary"
        icon="el-icon-plus"
        v-if="pagination.total < 10"
        @click="$refs.addFinancialRemarkDialog.show()"
      >新增财务备注</el-button>
    </div>

    <div class="tables">
      <el-table
        :data="tableData"
        border
        stripe
      >
        <el-table-column
          prop="note"
          label="备注内容"
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
              @click="onDelete(scope.row)"
            >删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <div class="pages">
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
    </div> -->

    <AddFinancialRemarkDialog
      ref="addFinancialRemarkDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import AddFinancialRemarkDialog from "@/components/AddFinancialRemarkDialog";
export default {
  components: { AddFinancialRemarkDialog },
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
    async deleteFinanceNote(params) {
      try {
        let res = await this.$http({
          url: "/admin/deleteFinanceNote",
          method: "get",
          params
        });
        const { code, data } = res;
        if (code === 200) {
          this.$message.success("删除成功");
          this.handleSearch();
        }
      } catch (error) {
        console.log(error);
        this.$message.error(error.toString());
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/admin/selectFinanceNoteList",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        // console.log(this.tableData);
        this.tableData = data;
        this.pagination.total = parseInt(data.length);
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
    onDelete(item) {
      this.$confirm(`确定删除该财务备注吗？`, `删除提示`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteFinanceNote({
            noteId: item.noteId
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
<style lang="less" scoped>
.financialRemarks {
  padding: 20px;

  .tables {
  }

  .pages {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
