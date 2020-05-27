
 /*
 * @Author: 陈晨 
 * @Date: 2019-05-27 10:57:49 
 * @Last Modified by: 陈晨
 * @Last Modified time: 2019-05-30 14:52:09
 */
<template>
  <div class="history banxin">
    <div
      class="private__tips"
      v-show="closeHide"
    >
      <div>
        <p>私有仓库是指：当您对某商品有大量需求时，为避免您要用的时候被其他客户下单，您可以提前购买，保障足够的库存。</p>
        <!-- 同时所购商品还能获得折扣； -->
        <em>下单商品不再计费</em>
      </div>
      <!-- <i
        @click="closeTips"
        class="el-icon-close"
      ></i> -->
    </div>
    <ul class="history__list">
      <li class="history__list__head">
        <p>
          <span>商品信息</span>
          <span>数量</span>
        </p>
        <p>
          <span>包裹总计</span>
          <span>操作</span>
        </p>
      </li>
      <li
        class="history__list__item"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div class="infoNum flex1">
          <div class="infoNumChildItem">
            <div class="info flex3 mr20">
              <img
                :alt="item.goodsName"
                class="mainPic"
                :src="$baseImageUrl+JSON.parse(item.picList)[0]"
              >
              <div class="detail flex1">
                <p class="productName">{{item.goodsName}}</p>
                <div class="priceWeight">
                  <!-- <span class="price">0.79元/件</span> -->
                  <!-- <span class="weight">0.06kg/件</span> -->
                </div>
              </div>
            </div>
            <div class="num flex1">
              <span class="text">{{item.quantity}}</span>
            </div>
          </div>
        </div>
        <div class="countOperate flex1">
          <div class="countBox flex1">
            <div class="countDetail">
              <span>商品总额：</span>
              <strong>￥{{item.amout}}</strong>
            </div>
            <!-- <div class="countDetail">
              <span>基础运费：</span>
              <strong>￥3.2</strong>
            </div> -->
            <!-- <div class="countDetail">
              <span>总计：</span>
              <strong>￥3.99</strong>
            </div> -->
          </div>
          <div class="operate flex1">
            <!-- <button class="sendAgain button-n">再次发货</button>-->
            <template v-if="item.quantity <= 0">
              <b
                class="button-text delete"
                @click="onDelete(item)"
              >删除</b>
            </template>
            <template v-else>
              --
            </template>
          </div>
        </div>
      </li>
    </ul>
    <empty-box v-if="tableData.length <= 0" />
    <!-- <div class="custom-pagination-wrap">
      <el-pagination
        :current-page="pagination.pageNum"
        :page-size="pagination.pageSize"
        :page-sizes="pagination.sizeList"
        :total="pagination.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
import EmptyBox from "../../common/EmptyBox";
export default {
  components: {
    EmptyBox
  },
  data() {
    return {
      closeHide: true,
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
    closeTips() {
      this.closeHide = false;
    },
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
      try {
        let params = {
          // 订单状态 0-待支付; 1-支付成功; 2-支付失败; 3-取消订单
          orderStatus: 1
        };
        let res = await this.$http({
          url: "/seller/getSellerCarts",
          method: "get",
          params: params
        });
        const { code, data, message = "获取失败" } = res;
        if (code === 200) {
          this.tableData = data;
        } else {
          this.$message.error(message);
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
    handleSearch() {
      this.pagination.pageNum = 1;
      this.getTableData();
    },
    onDelete(item) {
      this.$confirm(`确定删除该购物车商品吗？`, `删除提示`, {
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
<style lang='less'>
@import "./history.less";
</style>