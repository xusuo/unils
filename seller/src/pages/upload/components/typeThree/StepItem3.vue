<template>
  <div
    class="stepItem"
    :class="[`${operateStep >= 3 ? 'active' : ''}`,
    `${operateStep === 3 ? 'nowStep' : ''}`, 
    `${operateStep > 3 ? 'passed' : ''}`]"
  >
    <div class="title">
      <div class="cicle">
        <span
          class="nums"
          v-if="operateStep <= 3"
        >3</span>
        <i
          class="el-icon-check checked"
          v-if="operateStep > 3"
        ></i>
      </div>
      <h6 class="stepTitle">填写收件人地址</h6>
    </div>

    <div class="cont">
      <div class="line">
        <span class="lineBg"></span>
      </div>

      <div class="slotBox">
        <div class="modelBox">
          <div
            class="modelItem "
            :class="[`${active === 1 ? 'modelActive' : ''}`]"
            @click="changeActive(1)"
          >
            <span>地址模板一</span>
          </div>
          <div
            class="modelItem"
            :class="[`${active === 2 ? 'modelActive' : ''}`]"
            @click="changeActive(2)"
          >
            <span>地址模板二</span>
          </div>
        </div>

        <WarningTips />

        <el-table
          v-if="orders.length"
          :data="orders"
          stripe
          border
          style="margin-bottom: 10px;"
        >
          <el-table-column
            label="序号"
            prop="index"
            header-align="center"
            align="center"
            width="50"
          >
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column
            label="订单编号"
            prop="orderNoCursor"
            header-align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="receiverNameCursor"
            header-align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="电话"
            prop="receiverPhoneCursor"
            header-align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="地址"
            prop="showAddress"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            prop="sellerName"
            header-align="center"
            align="center"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="removeOrderByIndex(scope.$index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div
          v-if="active === 1"
          class="addressBox"
        >
          <em>收件人</em>
          <div>
            <el-input
              v-model="ordetText"
              type="textarea"
              :rows="6"
              placeholder="订单编号，姓名，电话，地址
订单编号，姓名，电话，地址
订单编号，姓名，电话，地址"
              style="width: 752px;"
            ></el-input>
          </div>
          <button
            class="sureAddFinel"
            @click="addComplete"
          >确认并添加</button>
        </div>

        <div
          v-if="active === 2"
          class="addressListBox"
        >
          <div class="addressItem">
            <em>收件人</em>
            <div class="inputsBox">
              <el-input
                v-model="form.orderNoCursor"
                class="inpu"
                size="small"
                placeholder="订单编号"
                style="width: 140px;"
              ></el-input>
              <el-input
                v-model="form.receiverNameCursor"
                class="inpu"
                size="small"
                placeholder="姓名"
                style="width: 140px;"
              ></el-input>
              <el-input
                v-model="form.receiverPhoneCursor"
                class="inpu"
                size="small"
                placeholder="手机"
                style="width: 140px;"
              ></el-input>
              <el-input
                v-model="form.receiverStateCursor"
                class="inpu"
                size="small"
                placeholder="省"
                style="width: 88px;"
              ></el-input>
              <el-input
                v-model="form.receiverCityCursor"
                class="inpu"
                size="small"
                placeholder="市"
                style="width: 88px;"
              ></el-input>
              <el-input
                v-model="form.receiverAreaCursor"
                class="inpu"
                size="small"
                placeholder="区"
                style="width: 88px;"
              ></el-input>
              <el-input
                v-model="form.receiverTownCursor"
                class="inpu"
                size="small"
                placeholder="详细地区"
                style="width: 300px;"
              ></el-input>
              <button
                class="delete"
                @click="addOrder"
              >确认并添加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WarningTips from "./WarningTips";
export default {
  props: ["operateStep"],
  components: { WarningTips },
  data() {
    return {
      active: 1,
      orders: [],
      ordetText: "",
      form: {
        orderNoCursor: "",
        receiverNameCursor: "",
        receiverPhoneCursor: "",
        receiverStateCursor: "",
        receiverCityCursor: "",
        receiverAreaCursor: "",
        receiverTownCursor: ""
      }
    };
  },
  methods: {
    changeActive(type) {
      this.active = type;
    },
    // 校验用户输入的订单文本信息
    checkOrderText() {},
    addComplete() {
      let ordetText = this.ordetText.split(/[(\r\n)\r\n]+/);
      // console.log(ordetText);
      ordetText.forEach(m => {
        let s = m.split(/[，,]/);

        if(m) {
          let num,
              name,
              mobile,
              city;
          s.forEach((n,i) => {
            var re = new RegExp("^[ ]+$");
            re.test(n);
            if(!re.test(n)) {

              if(i == 0 && n !== null) {
                num = n
              } else if(i == 1 && n !== null) {
                name = n
              } else if(i == 2 && n !== null) {
                mobile = n
              }else {
                if(typeof city === 'undefined'){
                  city = ''
                  city += n
                }else {
                  city += n
                }
              }
            }

          });
          if(city) {
            let p = city.split(' ');
            let detamap;
            p.map((ele,index) => {
              if(index>3) {
                if(typeof detamap === 'undefined'){
                  detamap = ''
                  return detamap+='，'+ele
                }else {
                  return detamap+='，'+ele
                }
              }
            })
            this.orders.push({
              orderNoCursor: num,
              receiverNameCursor: name,
              receiverPhoneCursor: mobile,
              // 省
              receiverStateCursor: p[0],
              // 市
              receiverCityCursor: p[1],
              // 区
              receiverAreaCursor: p[2],
              // 街道
              receiverTownCursor: p[3],
              // 详细地址
              receiverAddressCursor: p[3]+detamap,
              // 显示在前台得地址
              showAddress: p[0] + p[1] + p[2] + p[3]+detamap,
              // 商品数量，默认为 1
              goodsNum: 1
            });
          };

        }
        
        // if (s.length === 4) {
        //   let p = s[3].split(" ");
        //   // console.log(p)
        //   this.orders.push({
        //     orderNoCursor: s[0],
        //     receiverNameCursor: s[1],
        //     receiverPhoneCursor: s[2],
        //     // 省
        //     receiverStateCursor: p[0],
        //     // 市
        //     receiverCityCursor: p[1],
        //     // 区
        //     receiverAreaCursor: p[2],
        //     // 街道
        //     receiverTownCursor: p[3],
        //     // 详细地址
        //     receiverAddressCursor: p[3],
        //     // 显示在前台得地址
        //     showAddress: p[0] + p[1] + p[2] + p[3],
        //     // 商品数量，默认为 1
        //     goodsNum: 1
        //   });
        // }
      });

      console.log(this.orders);

      this.ordetText = "";

      this.$emit("change-order-list", this.orders);
    },
    addOrder() {
      let form = this.form;
      let orderNoCursor = form.orderNoCursor;
      let receiverNameCursor = form.receiverNameCursor;
      let receiverPhoneCursor = form.receiverPhoneCursor;
      let receiverStateCursor = form.receiverStateCursor;
      let receiverCityCursor = form.receiverCityCursor;
      let receiverAreaCursor = form.receiverAreaCursor;
      let receiverTownCursor = form.receiverTownCursor;
      let receiverAddressCursor = receiverTownCursor;
      let showAddress =
        receiverStateCursor +
        receiverCityCursor +
        receiverAreaCursor +
        receiverTownCursor;

      this.orders.push({
        orderNoCursor,
        receiverNameCursor,
        receiverPhoneCursor,
        receiverStateCursor,
        receiverCityCursor,
        receiverAreaCursor,
        receiverTownCursor,
        receiverAddressCursor,
        showAddress,
        // 商品数量，默认为 1
        goodsNum: 1
      });

      this.form.orderNoCursor = "";
      this.form.receiverNameCursor = "";
      this.form.receiverPhoneCursor = "";
      this.form.receiverStateCursor = "";
      this.form.receiverCityCursor = "";
      this.form.receiverAreaCursor = "";
      this.form.receiverTownCursor = "";

      this.$emit("change-order-list", this.orders);
    },
    removeOrderByIndex(index) {
      this.orders.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.modelBox {
  display: flex;
  width: 180px;
  height: 40px;
  box-sizing: border-box;
  // border: 1px solid #dedede;
  margin-bottom: 10px;

  .modelItem {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    border: 1px solid #dedede;
    margin-left: -1px;

    span {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.25);
      font-weight: 400;
    }

    &.modelActive {
      border-color: #ff4d70;
      z-index: 1;

      span {
        color: #ff4d70;
      }
    }
  }
}

.addressBox {
  display: flex;
  flex-direction: column;

  em {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 400;
    margin-bottom: 10px;
  }

  .sureAddFinel {
    width: 180px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: #ff4d70;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    font-weight: 400;
    margin-top: 15px;
    cursor: pointer;
    transition: all 0.2s;
    box-sizing: border-box;
    border: none;
  }
}

.addressListBox {
  .addressItem {
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;

    em {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: 400;
      margin-bottom: 10px;
    }

    .inputsBox {
      display: flex;
      align-items: center;

      .inpu {
        margin-right: 6px;
      }
    }

    .delete {
      width: 120px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      background: #ff4d70;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      font-weight: 400;
      margin-right: 6px;
      border: none;
    }
  }
}
</style>
