<template>
  <div>
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
        <!-- 主图 + 标题 -->
      </el-table-column>
      <el-table-column
        prop="amout"
        label="总价格"
      >
      </el-table-column>
      <el-table-column
        prop="payTime"
        label="购买时间"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="可用数量"
      >
      </el-table-column>
      <el-table-column
        prop="orderAmount"
        label="操作"
        header-align="center"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="select(scope.row);"
          >选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div style="text-align: right;">
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
      loading: false,
      form: {
        mobile: ""
      },
      rules: {
        // shopName: [
        //   {
        //     whitespace: true,
        //     required: true,
        //     message: "请输入店铺名",
        //     trigger: "blur"
        //   }
        // ]
      },
      tableData: [],
      searchForm: {},
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    async getTableData() {
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize,
        // 订单状态 0-待支付; 1-支付成功; 2-支付失败; 3-取消订单
        orderStatus: 1
      };

      try {
        let res = await this.$http({
          url: "/seller/getSellerCarts",
          method: "get",
          params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          let arr = [];
          data.forEach(m => {
            m.picList = JSON.parse(m.picList);
            arr.push(m);
          });

          this.tableData = arr;
          // console.log(this.tableData);
          // this.pagination.total = parseInt(data.total);
        }
      } catch (error) {
        console.log(error);
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
    select(item) {
      if (item.quantity == 0) {
        this.$message.error("礼品库存不足，请重新选择");
        return false;
      }
      let gift = {
        pic_list: item.picList,
        gift_name: item.goodsName,
        weight: item.weight,
        price: item.price,
        goods_id: '',
        cartId: item.cartId,
        quantity: item.quantity
      };

      // 这里如果是私有仓库的,则加一个 cartId
      //       if(...){
      // gift.cartId = cartId
      //       }
      this.$emit("select", gift);
    }
  },
  created() {
    this.handleSearch();
  }
};
</script>

<style lang="less" scoped>
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