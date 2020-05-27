<template>
  <div>
    <div class="custom-container-wrap">
      <el-table
        :data="tableData"
        stripe
        border
        v-loading="loading"
      >
        <el-table-column
          label="账号"
          prop="sellerAccount"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="QQ-微信"
          prop="agentMobile"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.sellerQq}}
            <br />
            {{scope.row.sellerWx}}
          </template>
        </el-table-column>
        <el-table-column
          label="用户等级"
          prop="saleName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.sellerLevel == 1">注册用户</template>
            <template v-if="scope.row.sellerLevel == 2">VIP用户</template>
            <template v-if="scope.row.sellerLevel == 3">黄金会员</template>
            <template v-if="scope.row.sellerLevel == 4">钻石会员</template>
          </template>
        </el-table-column>
        <el-table-column
          label="余额"
          prop="balance"
          header-align="center"
          align="center"
        >

        </el-table-column>
        <el-table-column
          label="注册时间"
          prop="createTime"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="总单量"
          prop="totalOrderNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="贡献奖金"
          prop="dedicateBonus"
          header-align="center"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="custom-pagination-wrap">
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
  </div>
</template>

<script>
export default {
  props: ["sellerList"],
  data() {
    return {
      loading: false,
      tableData: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  watch: {
    sellerList(value) {
      this.tableData = value;
    }
  }
};
</script>
