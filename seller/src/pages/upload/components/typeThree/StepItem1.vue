<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 1 ? 'active' : ''}`,
    `${operateStep === 1 ? 'nowStep' : ''}`, 
    `${operateStep > 1 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 1"
        >1</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 1"
        ></i>
      </div>
      <h6 class="stepTitle">添加您想要的商品</h6>
    </div>

    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>
      <div class="slotBox">
        <div class="step1">
          <el-radio-group
            v-model="giftType"
            @change="changeGiftType"
          >
            <el-radio
              :label="0"
              :disabled="isDisabledNomal"
            >使用普通礼品
                <img src="@/assets/images/lp-icon.png" alt />
            </el-radio>
            <el-radio :label="1">使用信封礼品
                <img src="@/assets/images/xf-icon.png" alt />
            </el-radio>
          </el-radio-group>

          <template v-if="giftType === 0">
            <!-- 普通未选商品 -->
            <div
              v-if="!gift"
              class="noListBox"
              @click="callToSelectGift"
              style="margin-top: 10px;"
            >
              <div class="addBox">
                <i class="el-icon-plus iconadd"></i>
              </div>
              <div class="addText">选普通礼品</div>
            </div>
          </template>

          <template v-if="giftType === 1">
            <!-- 信封未选商品 -->
            <div
              v-if="!gift"
              class="noListBox"
              @click="callToSelectLetterGift"
              style="margin-top: 10px;"
            >
              <div class="addBox">
                <i class="el-icon-plus iconadd"></i>
              </div>
              <div class="addText">选信封礼品</div>
            </div>
          </template>

          <!-- 已选商品 -->
          <div
            v-if="gift"
            class="haveBoxList"
            style="margin-top: 10px;"
          >
            <div class="leftTable">
              <div class="proTitleBox">
                <span class="flex2">商品信息</span>
                <span class="flex1">单价</span>
                <span class="flex1">采购数量</span>
                <span class="flex1">小计</span>
              </div>

              <div class="proInfoItem">
                <div class="proInfo flex2 brH100">
                  <img
                    class="mainPic"
                    :src="$baseImageUrl + gift.pic_list[0] + '?imageView2/2/w/74/h/74'"
                    alt=""
                  >
                  <div class="proName">
                    <span class="topName">{{gift.gift_name}}</span>
                    <div class="weight">重量：{{gift.weight}}kg/件
                      <button class="color-primary weight-btn" @click="hanleweght" v-if="gift.is_weight == 1">修改重量</button>
                    </div>
                    
                  </div>
                </div>
                <span class="flex1 text brH100">￥{{gift.price}}</span>
                <span class="flex1 text brH100">
                  {{number}} <br />
                  <a
                    class="color-primary"
                    href="javascript:;"
                    @click="$refs.goodsNumSelectDialog.show(orderList);"
                  >设置采购数量</a>
                </span>
                <span class="flex1 redText brH100">￥{{gift.price}}</span>
              </div>

              <!-- <div class="bottomTotal">
                <div class="flex2 br1"></div>
                <div class="flex1 totalSpan textSpan">快递总价</div>
                <div class="flex1 totalSpan"></div>
                <div class="flex1 br1 totalSpan textStrong">￥--</div>
              </div> -->

              <div class="bottomTotal">
                <div class="flex2 br1 everyTips">下单后每个收件人将收到以上产品</div>
                <div class="flex1 totalSpan textSpan">商品总价</div>
                <div class="flex1 totalSpan"></div>
                <div class="flex1 br1 totalSpan textStrong">
                  ￥{{(gift.price * number).toFixed(2)}}
                </div>
              </div>

              <!-- <div class="bottomTotal">
                <div class="flex2 br1"></div>
                <div class="flex1 totalSpan textT">合计</div>
                <div class="flex1 totalSpan"></div>
                <div class="flex1 br1 totalSpan textTN"><i class="iconfont iconqian"></i>
                  {{gift.price * number}}
                </div>
              </div> -->
            </div>

            <div
              v-if="giftType === 0"
              class="rightEdit"
              @click="callToSelectGift"
            >
              <i class="el-icon-edit iconbianji"></i>
              <span class="editText">编辑商品</span>
            </div>

            <!-- <div
              v-if="giftType === 1"
              class="rightEdit"
              @click="callToSelectLetterGift"
            >
              <i class="el-icon-edit iconbianji"></i>
              <span class="editText">编辑商品</span>
            </div> -->
          </div>
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
// 选普通礼品
import SelectGiftDialog from "@/components/SelectGiftDialog";
// 选信封礼品
import SelectLetterGiftDialog from "@/components/SelectLetterGiftDialog";
// 调整礼品数量
import GoodsNumSelectDialog from "./GoodsNumSelectDialog";

export default {
  props: ["operateStep", "orderList"],
  components: {
    SelectGiftDialog,
    SelectLetterGiftDialog,
    GoodsNumSelectDialog
  },
  data() {
    return {
      gift: null,
      weg_input: '',
      dialogVisible: false,
      giftType: 0,
      // 是否禁用普通的选择
      isDisabledNomal: false
    };
  },
  computed: {
    number() {
      if (this.orderList.length) {
        let sum = 0;
        this.orderList.forEach(m => {
          sum += m.goodsNum;
        });

        return sum;
      }

      return 0;
    }
  },
  methods: {
    // 修改重量
    hanleweght() {
      this.dialogVisible = true;
      this.weg_input = this.gift.weight
    },
    handleexit () {
      let val = parseFloat(this.weg_input).toFixed(2)
      this.gift.weight = val;
      this.dialogVisible = false;
    },
    callToSelectGift() {
      this.$refs.selectGiftDialog.show();
    },
    callToSelectLetterGift() {
      this.$refs.selectLetterGiftDialog.show();
    },
    selectGift(gift) {
      this.gift = gift;
      this.$emit("change-gift", gift);
    },
    changeGiftType(value) {
      console.log(value);
      this.gift = null;
      this.$emit("change-gift", null);
    },
    onChangeOrderList(val) {
      this.$emit("change-order-list", val);
    },
    // 获取单个商品详细
    async getGiftInfo() {
      try {
        let res = await this.$http({
          url: this.$loginURL + "/getGiftInfo",
          method: "post",
          params: {
            goods_id: this.$route.query.id
          }
        });
        const { code, data } = res;
        if (code === 200) {
          console.log(data);
          data.pic_list = JSON.parse(data.pic_list);
          this.selectGift(data);
        } else {
          this.$message.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    let id = this.$route.query.id;
    console.log(id);
    if (id) {
      this.giftType = 1;
      this.isDisabledNomal = true;
      this.getGiftInfo();
    }
  }
};
</script>

<style lang="less" scoped>
.step1{
  /deep/.el-radio__label{
    font-size: 15px;
    img{
      width: 30px;
      vertical-align: -9px;
      display: inline-block;
    }
  }
}
.noListBox {
  display: flex;
  flex-direction: column;

  .addBox {
    width: 73px;
    height: 73px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border: 3px solid #ff4d70;
    margin-bottom: 10px;
    cursor: pointer;
    box-sizing: border-box;

    .iconadd {
      font-size: 40px;
      line-height: 1;
      color: #ff4d70;
      font-weight: 400;
    }
  }
  .addText {
    font-size: 14px;
    line-height: 20px;
    color: #ff4d70;
    font-weight: 400;
    width: 73px;
    text-align: center;
  }
}

.haveBoxList {
  width: 880px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;

  .flex1 {
    flex: 1;
  }

  .flex2 {
    flex: 2;
  }

  img {
    border: 0;
    outline-width: 0;
    vertical-align: top;
  }

  .leftTable {
    flex: 1;

    .proTitleBox {
      height: 38px;
      background: #fafafa;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;

      span {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.35);
        font-weight: 400;
        height: 100%;
        border-right: 1px solid #eee;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
      }
    }

    .proInfoItem {
      display: flex;

      .brH100 {
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        flex-flow: 1;
        padding: 10px;
        box-sizing: border-box;
      }

      .proInfo {
        display: flex;

        .mainPic {
          width: 60px;
          height: 60px;
          margin-right: 6px;
        }

        .proName {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .topName,
          .weight {
            font-size: 12px;
            line-height: 18px;
            color: rgba(0, 0, 0, 0.45);
            font-weight: 400;
          }
        }
      }

      .text {
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.65);
        font-weight: 400;
      }

      .redText {
        font-size: 14px;
        line-height: 20px;
        color: #eb000c;
        font-weight: 700;
      }
    }

    .bottomTotal {
      background: #fffcfc;
      display: flex;
      align-items: center;
      height: 28px;

      &:last-child {
        .totalSpan {
          border-bottom: none;
        }
      }

      .br1 {
        border-right: 1px solid #eee;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
      }

      .totalSpan {
        padding: 0 10px;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #eee;
      }

      .everyTips {
        font-size: 18px;
        line-height: 1;
        color: #000;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
      }

      .textSpan {
        font-size: 12px;
        line-height: 17px;
        color: #666;
        font-weight: 400;
      }

      .textStrong {
        font-size: 14px;
        line-height: 19px;
        color: #000;
        font-weight: 400;
        font-family: Helvetica;
        justify-content: flex-end;
      }

      .textTN {
        justify-content: flex-end;
        font-size: 20px;
        line-height: 1;
        color: #d31f32;
        font-weight: 700;
        font-family: 苹方;
      }
    }
  }

  .rightEdit {
    width: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .iconbianji {
      font-size: 24px;
      line-height: 1;
      color: #ff4d70;
      font-weight: 400;
      margin-bottom: 10px;
    }

    .editText {
      font-size: 14px;
      line-height: 20px;
      color: #ff4d70;
      font-weight: 400;
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
</style>
