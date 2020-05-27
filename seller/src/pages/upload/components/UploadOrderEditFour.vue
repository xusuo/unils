<template>
  <div class="stepOrderEdit">
    <div class="titleBox">
      <div class="circle">
        <span>2</span>
      </div>
      <h6 class="titleText">根据输入订单号，核对校验结果。</h6>
      <strong
        @click="back"
        class="backTopStep"
      >返回重新上传>></strong>
    </div>

    <div class="editBox">
      <strong class="tips">请先修改后校验</strong>

      <div class="tipsErrorBox">
        <div class="leftNums">
          <i class="el-icon-circle-check okIcon"></i>
          <span class="errorText">
            验证失败 {{errorNum}} 条，
            成功 {{rightNum}} 条，
            总计 {{orders.length}} 条。
          </span>
        </div>
        <button
          @click="sureToNext"
          class="sureSubmit"
        >确认订单无误，并创建拉取订单详细的任务</button>
      </div>

      <div class="tabBox">
        <div class="title">
          <span class="flex2">第三方订单编号</span>
          <span class="flex3">收货人地址</span>
          <span class="flex4">商品名</span>
          <span class="flex1">校验结果</span>
          <span class="flex2">错误原因</span>
          <!-- <span class="flex2">操作</span> -->
        </div>

        <div
          class="tabItem"
          v-for="(item, i) in orders.slice((pagination.pageNum-1)*pagination.pageSize,pagination.pageNum*pagination.pageSize)"
        >
          <span class="flex2 orderNumber">{{item.orderNoCursor}}</span>
          <span class="flex3 address">{{item.receiverStateCursor + item.receiverCityCursor + item.receiverDistrictCursor + item.receiverAddressCursor}}</span>
          <span class="flex4 productName">
            {{item.goodsNameCursor}}
            <!-- <i
              @click="$refs.editProductName.show(item)"
              class="el-icon-edit editIcon"
            ></i> -->
          </span>
          <span class="flex1 result">
            <b v-if="item.checkResult">正确</b>
            <b
              v-else
              class="color-danger"
            >错误</b>
          </span>
          <span class="flex2 result">
            <b
              v-if="!item.checkResult"
              class="color-danger"
            >{{item.errorMsg}}</b>
          </span>
          <!-- <span class="flex2 operate center">
            <a
              href="javascript:;"
              v-if="!item.checkResult"
              @click="removeItem(i)"
            >删除</a>
          </span> -->
        </div>
      </div>

      <div style="text-align: right;margin-top: 10px;">
        <el-pagination
          :current-page="pagination.pageNum"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          background
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>

    <EditProductName
      @success="handleSuccess"
      ref="editProductName"
    />
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
import EditProductName from "./EditProductName";
export default {
  mixins: [giftMixin],
  props: ["orderList", "errorNum", "rightNum"],
  components: { EditProductName },
  data() {
    return {
      orders: [],
      pagination: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    };
  },
  watch: {
    orderList() {
      console.log("---订单列表变化了");
    }
  },
  methods: {
    // 切换页数
    handleCurrentChange(p) {
      this.pagination.pageNum = p;
      console.log(p);
    },
    handleSuccess(item) {
      this.orders[item.index].goodsNameCursor = item.goodsNameCursor;
    },
    removeItem(i) {
      this.orders.splice(i, 1);
      this.$emit("change-orders", {
        orders: this.orders,
        validOrders: []
      });
    },
    sureToNext() {
      //
      let l = 0;
      // 必须有订单才能下一步
      if (this.orders.length <= 0) {
        this.$message.error("无有效订单，无法下一步");
        return false;
      }

      this.orders.forEach(m => {
        if (!m.checkResult) {
          l++;
        }
      });

      // 订单中不能有错误的订单
      // if (l > 0) {
      //   this.$message.error("订单中存在错误的订单，无法下一步，请删除错误订单");
      //   return false;
      // }

      // 切换step
      this.$emit("next", 3);

      // 把处理好的订单,返回给主组件,给后面的步骤用
      let arr = [];
      this.orders.forEach(m => {
        let flag = true;
        let goodsNameCursor = m.goodsNameCursor;

        if (m.checkResult) {
          arr.forEach(a => {
            if (a.goodsNameCursor === goodsNameCursor) {
              flag = false;
              a.num++;
              a.countNum += m.goodsNum;
            }
          });

          if (flag) {
            arr.push({
              ...m,
              num: 1,
              countNum: m.goodsNum,
              gift: null
            });
          }
        }
      });

      this.$emit("change-orders", {
        orders: this.orders,
        validOrders: arr
      });
    },
    back() {
      // 切换step
      this.$emit("next", 1);
    }
  },
  created() {
    console.log(this.orderList);
    this.orders = this.orderList;
    this.pagination.total = this.orders.length;
  }
};
</script>

<style lang="less" scoped>
.stepOrderEdit {
  padding-bottom: 30px;

  .titleBox {
    display: flex;
    align-items: center;

    .circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #f64f6f;
      justify-content: center;
      flex-direction: row;
      margin-right: 14px;
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        line-height: 20px;
        color: #f64f6f;
        font-weight: 400;
      }
    }

    .titleText {
      font-size: 16px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 700;
      margin-right: 10px;
    }

    .backTopStep {
      font-size: 12px;
      line-height: 18px;
      color: #f64f6f;
      font-weight: 400;
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .editBox {
    display: flex;
    flex-direction: column;
    padding-left: 44px;

    .tips {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      font-weight: 400;
      margin-bottom: 10px;
    }

    .tipsErrorBox {
      height: 40px;
      box-sizing: border-box;
      border: 1px solid #10b573;
      border-radius: 2px;
      background: rgba(16, 181, 115, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      margin-bottom: 10px;

      .leftNums {
        display: flex;
        align-items: center;

        .okIcon {
          font-size: 14px;
          line-height: 1;
          color: #10b573;
          font-weight: 400;
          margin-right: 10px;
        }

        .errorText {
          font-size: 12px;
          line-height: 18px;
          color: #666;
          font-weight: 400;
        }
      }

      .sureSubmit {
        height: 30px;
        padding: 0 12px;
        border: 1px solid #ff4d70;
        border-radius: 2px;
        background: #fff;
        font-size: 12px;
        line-height: 18px;
        color: #ff4d70;
        font-weight: 400;
        transition: 0.2s;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .tabBox {
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 2px;

    .flex1 {
      flex: 1;
    }

    .flex2 {
      flex: 2;
    }

    .flex3 {
      flex: 3;
    }

    .flex4 {
      flex: 4;
    }

    .title {
      display: flex;
      align-items: center;
      background: #fafafa;
      height: 40px;
      border-bottom: 1px solid #e9e9e9;

      span {
        padding: 0 8px;
        border-right: 1px solid #e9e9e9;
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        font-size: 12px;
        line-height: 18px;
        color: #666;
        font-weight: 400;

        &:last-child {
          border-right: none;
        }
      }
    }

    .tabItem {
      display: flex;
      border-bottom: 1px solid #e9e9e9;

      &:last-child {
        border-bottom: none;
      }

      span {
        padding: 8px;
        box-sizing: border-box;
        border-right: 1px solid #e9e9e9;
        font-size: 12px;
        line-height: 18px;
        color: #666;
        font-weight: 400;
        display: flex;

        &:last-child {
          border-right: 0;
        }

        .editIcon {
          font-size: 16px;
          line-height: 1;
          color: #eb000c;
          font-weight: 400;
          cursor: pointer;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
