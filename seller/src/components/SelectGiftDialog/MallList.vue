<template>
  <div>
    <ul class="gift-list">
      <li
        v-for="(item, i) in tableData"
        :key="i"
      >
        <div class="sel-gift-pic">
          <img
            :src="$baseImageUrl + item.pic_list[0] + '?imageView2/2/w/74/h/74'"
            alt=""
          >
        </div>
        <div class="sel-gift-detail">
          <div class="sel-gift-name">{{item.gift_name}}</div>
          <div class="sel-gift-tls">
            <span class="sel-gift-price">￥{{item.price}}</span>
            <!-- <span class="sel-gift-weight">{{item.weight}}</span> -->
          </div>
          <div class="sel-gift-stock">
            <div>{{item.weight}} kg /{{item.unit}}</div>
            <div>余 {{item.stock}} 件</div>
          </div>
        </div>

        <div
          class="sel-gift-select"
          @click="select(item)"
        >点击选择该礼品</div>
      </li>
    </ul>

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
      searchForm: {
        sellerAccount: "",
        sellerQq: "",
        sellerWx: "",
        operateId: "",
        agentId: "",
        sellerStatus: "",
        activationTime: "",
        alertType: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    async getTableData(params) {
      params.giftType = 0;
      params.edmType = 0;
      try {
        let res = await this.$http({
          url: this.$loginURL + "/getGiftListPage",
          method: "post",
          params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          let arr = [];
          data.records.forEach(m => {
            m.pic_list = JSON.parse(m.pic_list);

            arr.push(m);
          });

          this.tableData = arr;
          this.pagination.total = parseInt(data.total);
        }
      } catch (error) {}
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = pageSize;
      this.getTableData({
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      });
    },
    handleCurrentChange(p) {
      this.pagination.pageNum = p;
      this.getTableData({
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      });
    },
    handleSelectionChange(val) {
      this.selectedItems = val;
    },
    handleSearch() {
      this.pagination.pageNum = 1;
      this.getTableData({
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      });
    },
    handleReset() {
      this.searchForm = {};
      this.handleSearch();
    },
    select(item) {
      console.log(item)
      console.log(item.stock)

      if( item.stock > 0 && item.stock < 10) {
        this.$confirm('该礼品库存只剩：'+item.stock+'，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let gift = JSON.parse(JSON.stringify(item));
          gift.cartId = null;
          this.$emit("select", gift);
          
        }).catch(() => {
          return false;
        });
      }else if(item.stock ==0) {
        this.$message.error("该礼品库存不足");
        return false;
      }
      else {

        let gift = JSON.parse(JSON.stringify(item));
        gift.cartId = null;
        this.$emit("select", gift);
        
      }

    }
  },
  created() {
    this.handleSearch();
  }
};
</script>

<style lang="less" scoped>
.gift-list {
  display: flex;
  flex-wrap: wrap;

  img {
    border: 0;
    outline-width: 0;
    vertical-align: top;
  }

  li {
    position: relative;
    width: 255px;
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 5px;
    display: flex;
    box-sizing: border-box;
    border: 1px solid #ddd;
    cursor: pointer;

    &:hover {
      border-color: #f00;

      .sel-gift-select {
        display: block;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    .sel-gift-pic {
      img {
        width: 74px;
        height: 74px;
      }
    }

    .sel-gift-detail {
      flex: 1;
      margin-left: 5px;

      .sel-gift-name {
        font-size: 12px;
        color: #999;
      }

      .sel-gift-tls {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .sel-gift-price {
          font-size: 14px;
          line-height: 20px;
          color: #eb000c;
          font-weight: 400;
        }

        .sel-gift-weight {
          font-size: 12px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-weight: 400;
        }
      }

      .sel-gift-stock {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.25);
        font-weight: 400;
        text-align: right;
      }
    }

    .sel-gift-select {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 235, 235, 0.7);
      line-height: 86px;
      text-align: center;
      font-weight: bold;
      display: none;
    }
  }
}
</style>