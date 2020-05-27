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
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="receiverNameCursor"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="receiverPhoneCursor"
          label="电话"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="礼品数量"
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
      orderList: []
    };
  },
  methods: {
    show(orderList) {
      // console.log(orderList);
      this.reset(orderList);
      this.visible = true;
    },
    reset(orderList) {
      this.orderList = orderList;
    },
    onSure() {
      // 确定去修改相应的值。
      this.$emit("on-change", this.orderList);

      this.visible = false;
    }
  }
};
</script>