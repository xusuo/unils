<template>
  <div>
    <el-dialog
      title="运营分配记录"
      width="700px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      <div>
        <div
          v-for="(item, i) in tableData"
          :key="i"
        >
          {{item.createTime | formatYMDHMS}} 分配给：{{item.operateName}}
        </div>
      </div>
      <div style="text-align: right;">
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    show(item) {
      this.reset();
      this.getRequest({
        sellerId: item.sellerId
      });
      this.visible = true;
    },
    reset() {
      this.tableData = [];
      this.pagination = {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      };
    },
    async getRequest(params) {
      this.loading = true;
      try {
        let res = await this.$http({
          url: "/t-station/queryOperateDistribution",
          method: "get",
          params
        });
        const { code, data } = res;
        if (data) {
          this.tableData = data.records;
          this.pagination.total = parseInt(data.total);
        } else {
          this.tableData = [];
          this.pagination.total = 0;
        }
      } catch (error) {}
    }
  }
};
</script>