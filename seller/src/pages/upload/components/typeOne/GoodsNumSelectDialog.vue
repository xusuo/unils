<template>
  <div>
    <el-dialog
      title="调整礼品数量"
      width="800px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <el-table
        :data="orderList"
        border
        stripe
      >
        <el-table-column
          prop="orderNoCursor"
          label="订单号"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="receiverNameCursor"
          label="姓名"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="receiverPhoneCursor"
          label="电话"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="goodsNameCursor"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="礼品数量"
          width="160"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.goodsNum"
              :min="1"
              :max="10"
              :precision="0"
              size="small"
              controls-position="right"
            >
            </el-input-number>
          </template>
        </el-table-column>
      </el-table>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="loading"
          @click="onSure"
        >确定</el-button>
      </div>
    </el-dialog>

    <SendSmsTest ref="sendSmsTest" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loading: false,
      orderList: [],
      validedOrders: []
    };
  },
  methods: {
    show(orderList, validedOrders) {
      console.log(orderList, validedOrders);
      this.reset(orderList, validedOrders);
      this.visible = true;
    },
    reset(orderList, validedOrders) {
      this.orderList = orderList;
      this.validedOrders = validedOrders;
    },
    onSure() {
      // 把处理好的订单,返回给主组件,给后面的步骤用
      let arr = this.validedOrders;

      // 重置数量
      arr.forEach(a => {
        a.num = 0;
        a.countNum = 0;
      });

      this.orderList.forEach(m => {
        let flag = true;
        let goodsNameCursor = m.goodsNameCursor;

        arr.forEach(a => {
          if (a.goodsNameCursor === goodsNameCursor) {
            flag = false;
            a.num++;
            a.countNum += m.goodsNum;
          }
        });
      });

      // 确定去修改相应的值。
      this.$emit("on-change", {
        orderList: this.orderList,
        validedOrders: arr
      });

      this.visible = false;
    }
  }
};
</script>