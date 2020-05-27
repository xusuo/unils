<template>
  <div class="paySelfStore">
    <Search />

    <div class="paySelfStoreBox banxin">
      <div class="topTips">
        <span>
          当您对某商品有大量需求时，为避免您要用的时候被其他客户下单，您可以提前购买，保障足够的库存。
        </span>
        <!-- 同时所购商品还能获得折扣。 -->
      </div>

      <table class="table-product">
        <thead>
          <tr>
            <th>商品信息</th>
            <th>单价</th>
            <th>采购数量</th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <el-input-number
                size="mini"
                v-model="num"
              ></el-input-number>
            </td>
            <td>
              <strong>￥0.00</strong>
            </td>
          </tr>
          <tr>
            <td
              colspan="3"
              style="text-align: left;"
            >
              优惠：无折扣
            </td>
            <td>
              <strong>0.00</strong>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td
              colspan="4"
              style="text-align: right;"
            >
              <span>
                合计：

              </span>

              <strong>
                ￥0.75
              </strong>

              <el-button type="danger">确认支付</el-button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

  </div>
</template>


<script>
import Search from "../common/Search"; // 搜索
export default {
  components: {
    Search
  },
  data() {
    return {
      num: 0,
      tableData: []
    };
  }
};
</script>


<style lang="less" scoped>
.paySelfStore {
  background: #fff;

  strong {
    color: #eb000c;
  }

  .paySelfStoreBox {
    padding: 20px 0 100px 0;
  }

  .topTips {
    margin: 0 0 10px;
    border: 1px solid #58a4ff;
    background: #f6fdff;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    span {
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
    }
  }
}
</style>
