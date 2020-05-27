<template>
  <div class="mySocket">
    <div class="custom-bread-wrap">
      我的库存
      <span>（{{pagination.total}}）</span>
    </div>

    <div class="tables">
      <el-table
        :data="tableData"
        border
        stripe
      >
        <el-table-column
          prop="goodsId"
          label="商品信息"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <div class="gift-info">
              <img
                :src="$baseImageUrl + scope.row.picList[0]"
                alt=""
                style="width: 50px;height:  50px;"
              >
              <div class="info">
                <div>{{scope.row.goodsName}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="amout"
          label="商品价值"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="购买时间"
          width="140"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="payTime"
          label="重量/KG"
          width="140"
        >
        </el-table-column> -->
        <!-- <el-table-column
          prop="goodsNums"
          label="总数量"
        >
        </el-table-column> -->
        <el-table-column
          prop="quantity"
          label="可用数量"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          label="操作"
          width="60"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.quantity <= 0">
              <a
                href="javascript:;"
                class="button-text delete"
                @click="onDelete(scope.row)"
              >删除</a>
            </template>
            <template v-else>
              --
            </template>
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
    async deleteSellerCart(params) {
      try {
        let res = await this.$http({
          url: "/seller/deleteSellerCart",
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
        _size: this.pagination.pageSize,
        // 订单状态 0-待支付; 1-支付成功; 2-支付失败; 3-取消订单
        orderStatus: 1
      };

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/getSellerCarts",
        method: "get",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        let arr = [];
        data.forEach(m => {
          m.picList = JSON.parse(m.picList);
          arr.push(m);
        });

        this.tableData = arr;
        // console.log(this.tableData);
        // this.tableData = data.records;
        // this.pagination.total = parseInt(data.total);
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
      this.$confirm(`确定删除该库存商品吗？`, `删除提示`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSellerCart({
            cartId: item.cartId
          });
        })
        .catch(() => {});
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