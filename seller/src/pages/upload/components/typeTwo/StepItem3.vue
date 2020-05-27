<template>
  <div class="stepGiftEdit">
    <div style="display: flex;justify-content: space-between;
    width:800px;margin:0 auto;margin-top: 30px;">
      <div>
        <el-radio-group
          v-model="giftType"
          @change="changeGiftType"
        >
          <el-radio :label="0">使用普通礼品</el-radio>
          <el-radio :label="1">使用信封礼品</el-radio>
        </el-radio-group>
      </div>
      <div>
        <a
          class="color-primary"
          href="javascript:;"
          @click="$refs.goodsNumSelectDialog.show(uploadTypeTwo.orderList, uploadTypeTwo.validedOrders);"
        >设置采购数量</a>
      </div>
    </div>

    <div class="chooseListBox">
      <div
        class="chooseItem"
        v-for="(item, i) in uploadTypeTwo.validedOrders"
        :key="i"
      >
        <div class="title">
          <span>{{item.goodsNameCursor}}</span>
          <strong>订单数量：{{item.num}}</strong>
        </div>

        <div
          class="checkedBox"
          v-if="item.gift"
        >
          <div class="topCheck">
            <strong
              v-if="giftType === 0"
              class="reset"
              @click="callToSelectGift(item)"
            >重新设置礼品</strong>
            <strong
              v-if="giftType === 1"
              class="reset"
              @click="callToSelectLetterGift(item)"
            >重新设置礼品</strong>

            <div class="productList">
              <div class="proTitle">
                <span class="flex4">商品信息</span>
                <span class="flex2 center">商品单价</span>
                <span class="flex2 center">数量</span>
                <span class="flex2 center">单个重量/kg</span>
              </div>
              <div class="proInfo">
                <div class="productInfoImg flex4">
                  <img
                    class="mainPic"
                    :src="$baseImageUrl + item.gift.pic_list[0] + '?imageView2/2/w/74/h/74'"
                    alt=""
                  >
                  <strong class="mainTitle">{{item.gift.gift_name}}</strong>
                </div>
                <span class="flex2 center">￥ {{item.gift.price}}</span>
                <span class="flex2 center">{{item.countNum}}</span>
                <span class="flex2 center">{{item.gift.weight}}
                  <button class="color-primary weight-btn" @click="hanleweght(i)" v-if="item.gift.is_weight == 1 && giftType == 0">修改重量</button>
                </span>
              </div>
            </div>
          </div>

          <div class="bottomTotal">
            <span class="flex1 center">包裹总重量：{{item.gift.weight * item.countNum}}kg</span>
            <span class="flex1 center">商品总价：{{(item.gift.price * item.countNum).toFixed(2)}}元</span>
          </div>
        </div>

        <div
          class="toSetGift"
          v-if="!item.gift"
        >
          <button
            v-if="giftType === 0"
            class="setButton"
            @click="callToSelectGift(item)"
          >设置普通礼品</button>
          <button
            v-if="giftType === 1"
            class="setButton"
            @click="callToSelectLetterGift(item)"
          >设置信封礼品</button>
        </div>
      </div>
    </div>

    <div
      class="allTotal"
      style="margin-top: 20px;"
    >
      <div class="contTotal">
        <div class="allLeft">
          <span>财务备注：</span>
          <SelectFinancial @select="onSelectRemark" />
        </div>
        <div class="buttons">
          <button
            class="backReLoad button"
            @click="goBack"
          >返回</button>
          <button
            class="surePay button"
            :disabled="!isCanAddOrder"
            @click="addOrder"
          >选好了，去支付</button>
        </div>
      </div>
    </div>

    <SelectGiftDialog
      ref="selectGiftDialog"
      @select="selectGift"
    />

    <SelectLetterGiftDialog
      ref="selectLetterGiftDialog"
      @select="selectGift"
    />

    <GoodsNumSelectDialog
      ref="goodsNumSelectDialog"
      @on-change="onChangeOrderList"
    />

    <el-dialog
      title="修改重量"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose">

      <div class="dialoweght">
        <label for="重量：">重量：</label>
        <el-input v-model="weg_input" placeholder="请输入重量"></el-input>
        <span>kg/件</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleexit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { giftMixin } from "@/utils/mixin";
// 选普通礼品
import SelectGiftDialog from "@/components/SelectGiftDialog";
// 选信封礼品
import SelectLetterGiftDialog from "@/components/SelectLetterGiftDialog";
import SelectFinancial from "../SelectFinancial";
// 调整礼品数量
import GoodsNumSelectDialog from "./GoodsNumSelectDialog";

export default {
  mixins: [giftMixin],
  components: {
    SelectGiftDialog,
    SelectLetterGiftDialog,
    SelectFinancial,
    GoodsNumSelectDialog
  },
  data() {
    return {
      activeOrder: {},
      // 是否能下单
      isCanAddOrder: false,
      point: "",
      weg_input: '',
      dialogVisible: false,
      remark: "",
      inx: 0,
      giftType: 0
    };
  },
  methods: {
    // 修改重量
    hanleweght(index) {
      this.dialogVisible = true;
      if(typeof index == 'number') {
        this.inx = index;
        this.weg_input = this.uploadTypeTwo.validedOrders[index].gift.weight
        return false;
      }
      this.weg_input = '';
      this.inx = ''
    },
    handleexit () {
      this.dialogVisible = false;
      let val = parseFloat(this.weg_input).toFixed(2)
      if(typeof this.inx == 'number') {
        this.uploadTypeTwo.validedOrders[this.inx].gift.weight = val;
        return false;
      }

      if(this.weg_input == '') {
        this.$message.error('请输入重量');
        return false;
      }
      this.uploadTypeTwo.validedOrders.map(ele => {
        ele.gift.weight = val;
      });
      
    },
    // 打开选商品的弹窗
    callToSelectGift(item) {
      this.activeOrder = item;
      this.$refs.selectGiftDialog.show(item);
    },
    callToSelectLetterGift(item) {
      this.activeOrder = item;
      this.$refs.selectLetterGiftDialog.show(item);
    },
    // 改变订单里面的数量。
    onChangeOrderList(o) {
      // 写到vuex
      this.setUploadTypeTwo({
        orderList: o.orders,
        validedOrders: JSON.parse(JSON.stringify(o.validedOrders))
      });
    },
    // 选择礼品
    selectGift(gift) {
      // console.log(this.uploadTypeTwo.validedOrders);
      let validedOrders = this.uploadTypeTwo.validedOrders;
      this.activeOrder.gift = gift;

      // 检查看看，是不是能去创建订单
      let l = 0;
      validedOrders.forEach(m => {
        if (m.gift) {
          l++;
        }
      });

      if (l === validedOrders.length) {
        this.isCanAddOrder = true;
      } else {
        this.isCanAddOrder = false;
      }
    },
    // 选择了备注
    onSelectRemark(remark) {
      // console.log(remark);
      this.remark = remark;
    },
    // 开始去下单，获取相关的金额。
    async addOrder() {
      console.log(
        this.uploadTypeTwo.orderList,
        this.uploadTypeTwo.validedOrders
      );
      // this.c

      // if (this.point === "") {
      //   this.$message.error("请选择仓库");
      //   return false;
      // }

      let orderList = this.uploadTypeTwo.orderList;
      let validedOrders = this.uploadTypeTwo.validedOrders;

      let params = {
        type: this.uploadTypeTwo.type,
        importId: this.uploadTypeTwo.importId,
        sellerCartVo: [],
        remark: this.remark
      };

       orderList.forEach(m => {

        // 设置礼品
        validedOrders.forEach(a => {
          if (a.goodsNameCursor ===  m.goodsNameCursor) {
            m.gift = a.gift;
          }
        });
    

        let o = {
          taskId: m.taskIdCursor,
          goodId: m.gift.goods_id,
          weight: m.gift.weight,
          num: m.goodsNum
        };

        // // 私有仓库ID,没有加入私有仓库的礼品则不传这个参数
        if (m.gift.cartId) {
          o.cartId = m.gift.cartId;
        }

        params.sellerCartVo.push(o);
      });


      let res = await this.$http({
        url: "/seller/createOrder",
        method: "post",
        data: params
      });

      const { code, data } = res;

      // console.log(res);
      if (code == 200) {
        // 导入订单，并且关联礼品包成功，到下一页
        this.$message.success("创建订单成功，请及时支付。");
        // 这里建议搞一个订单详细页，直接可以支付，不用到列表页一个一个的去支付。体验不好。
        this.$router.push("/order/orderManger");
      }
    },
    goBack() {
      // 重置
      this.setUploadTypeTwo({
        uploadStep: 1,
        errorNum: 0,
        rightNum: 0,
        orderList: [],
        validedOrders: []
      });
      this.$router.push("/upload");
    },
    changeGiftType(value) {
      let validedOrders = this.uploadTypeTwo.validedOrders;
      validedOrders.forEach(m => {
        m.gift = null;
      });
      this.isCanAddOrder = false;

      // if (value === 0) {
      //   validedOrders.forEach(m => {
      //     m.gift = null;
      //   });
      //   this.isCanAddOrder = false;
      // } else if (value === 1) {
      //   if (this.emvelopeGift) {
      //     validedOrders.forEach(m => {
      //       m.gift = this.emvelopeGift;
      //     });
      //     this.isCanAddOrder = true;
      //   } else {
      //     validedOrders.forEach(m => {
      //       m.gift = null;
      //     });
      //     this.isCanAddOrder = false;
      //     this.$message.error("当前分站没有信封礼品，请联系管理员开通");
      //   }
      // }
    }
  },
  created() {
    // console.log(this.uploadTypeTwo.orderList);
    // console.log(this.uploadTypeTwo.validedOrders);
  }
};
</script>

<style lang="less" scoped>
.stepGiftEdit {
  .flex1 {
    flex: 1;
  }

  .flex2 {
    flex: 2;
  }

  .flex4 {
    flex: 4;
  }

  .center {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .chooseListBox {
    width: 800px;
    margin: 0 auto;
    padding: 20px 0 30px;

    .chooseItem {
      margin-bottom: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);

      .title {
        height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 14px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.45);
          font-weight: 400;
          flex: 1;
        }

        strong {
          font-size: 14px;
          line-height: 20px;
          color: #f64f6f;
          font-weight: 400;
          width: 100px;
          text-align: right;
        }
      }

      .toSetGift {
        padding: 10px 20px;
        display: flex;
        justify-content: flex-end;

        .setButton {
          width: 180px;
          height: 40px;
          border: 1px solid #f64f6f;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          font-size: 14px;
          line-height: 20px;
          color: #f64f6f;
          font-weight: 400;
          background: transparent;
          cursor: pointer;
        }
      }

      .checkedBox {
        display: flex;
        flex-direction: column;

        .topCheck {
          padding: 10px 20px;
          display: flex;
          flex-direction: column;

          .reset {
            align-self: flex-end;
            font-size: 14px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.45);
            font-weight: 400;
            text-decoration: underline;
            cursor: pointer;
            margin-bottom: 12px;
          }
        }

        .productList {
          .proTitle {
            display: flex;
            align-items: center;
            height: 32px;

            span {
              font-size: 12px;
              line-height: 18px;
              color: rgba(0, 0, 0, 0.35);
              font-weight: 400;
            }
          }

          .proInfo {
            background: #fafafa;
            margin-bottom: 10px;
            display: flex;
            font-size: 12px;

            .productInfoImg {
              display: flex;
              align-items: center;

              .mainPic {
                width: 58px;
                height: 58px;
                margin-right: 10px;
              }

              .mainTitle {
                font-size: 12px;
                line-height: 18px;
                color: rgba(0, 0, 0, 0.65);
                font-weight: 400;
                margin-right: 20px;
              }
            }
          }
        }

        .bottomTotal {
          height: 40px;
          background: #fafafa;
          padding: 0 10px;
          display: flex;
          align-items: center;

          span {
            font-size: 12px;
            line-height: 18px;
            color: rgba(0, 0, 0, 0.55);
            font-weight: 400;

            strong {
              font-size: 16px;
              line-height: 22px;
              color: #eb000c;
              font-weight: 700;
            }
          }
        }
      }
    }
  }

  .allTotal {
    background: #fafafa;
    padding: 10px 20px;

    .contTotal {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1260px;
      margin: 0 auto;
    }

    .allLeft {
      display: flex;
      flex-direction: column;
      margin-right: 100px;

      .addComment {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        span {
          font-size: 12px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.65);
          font-weight: 400;
          margin-right: 6px;
        }

        .financeComment {
          display: flex;
          align-items: center;
        }
      }

      .textNum {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.35);
        font-weight: 400;

        strong {
          font-size: 14px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.65);
          font-weight: 700;
        }

        em {
          font-size: 14px;
          line-height: 20px;
          color: #eb000c;
          font-weight: 700;
        }
      }
    }

    .buttons {
      display: flex;
      align-items: center;

      .button {
        width: 180px;
        height: 40px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        transition: 0.2s;
        cursor: pointer;
        background: transparent;
        border: 0;

        &:disabled {
          background-color: #d9d9d9 !important;
          border-color: #d9d9d9 !important;
          cursor: not-allowed;
        }

        &:hover {
          opacity: 0.8;
        }
      }

      .backReLoad {
        border: 1px solid #f64f6f;
        font-size: 14px;
        line-height: 20px;
        color: #f64f6f;
        font-weight: 400;
        margin-right: 10px;
      }

      .surePay {
        background: #f64f6f;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
        font-weight: 400;
      }
    }
  }
}

.weight-btn{
  float: right;
}
.dialoweght{
  overflow: hidden;
  padding: 10px 30px;
  label {
    float: left;
    line-height: 38px;
  }
  .el-input{
    width: 250px;
    float: left;
  }
  span{
    float: left;
    line-height: 38px;
    color: #666;
    margin-left: 10px;
  }
}

.setButton {
  height: 40px;
  border: 1px solid #f64f6f;
  border-radius: 2px;
  flex-direction: row;
  font-size: 14px;
  color: #f64f6f;
  font-weight: 400;
  background: transparent;
  cursor: pointer;
}

</style>
