<template>
  <div class="userCenter ">
    <Search />
    <div class="userCenterBox banxin">
      <user-center-menu />
      <div class="rightContent">
        <Notice />
        <div class="userHeadInfo">
          <div class="attr">
            <img
              src="./images/user-attr.png"
              alt=""
            >
          </div>
          <div class="infos">
            <div class="infosPhone">
              {{sellerInfo.sellerMobile}}
            </div>
            <div class="infosBlance">
              <div>
                <div class="blanceTitle">
                  余额
                  <button @click="$router.push('/userCenter/moneyManger/Recharge')">充值</button>
                </div>
                <div class="blanceNumber">
                  {{sellerInfo.capitalBalance}}
                  <span>元</span>
                </div>
              </div>
              <div>
                <div class="blanceTitle">邀请（人）</div>
                <div class="blanceNumber">
                  {{sellerInfo.myInviteSuccess ? sellerInfo.myInviteSuccess : 0}}
                </div>
              </div>
            </div>
            <div class="infosPrice">
              <div class="infosPriceTitle">我的快递价格</div>
              <div style="margin-top: 5px;">圆通快递</div>
              <div class="infosPriceNum">
                <span>
                  信封件（固定重量）全国
                  ￥{{bigBugs.xffirst}}
                </span>
              </div>
              <div style="margin-top: 15px;">申通快递</div>
              <div class="infosPriceNum">
                <span>
                  0.5kg/￥
                  <template v-if="sellerInfo.alertType === 0">{{bigBugs.first}}</template>
                  <template v-else>{{bigBugs.farFirst}}</template>
                </span>
                <span>
                  0.5~1.0kg/￥
                  <template v-if="sellerInfo.alertType === 0">{{bigBugs.firstKg}}</template>
                  <template v-else>{{bigBugs.farFirstKg}}</template>
                </span>
                <span>
                  1.0kg以上续重/￥
                  <template v-if="sellerInfo.alertType === 0">{{bigBugs.additional}}</template>
                  <template v-else>{{bigBugs.farAdditional}}</template>
                </span>
              </div>
            </div>
          </div>
          <div class="opts">
            <button
              class="sureSubmit"
              @click="$router.push('/upload')"
            >
              进入立即发货
            </button>
          </div>
        </div>
        <router-view class="routeChild"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../common/Search"; // 搜索
import Notice from "../common/Notice"; // 通知
import UserCenterMenu from "./UserCenterMenu";
export default {
  components: {
    Search,
    Notice,
    UserCenterMenu
  },
  data() {
    return {
      moneyShow: false,
      sellerInfo: {},
      priceSet: {},
      xFPrice: "0",
      // 这里可能有大BUG 。。。
      bigBugs: {}
    };
  },
  methods: {
    mouseenter() {
      this.moneyShow = true;
      clearTimeout(this._timer);
    },
    mouseleave() {
      this._timer = setTimeout(() => {
        this.moneyShow = false;
      }, 250);
    },
    async getSellerInfo() {
      let res = await this.$http({
        url: "/admin/getSellerInfo",
        method: "post",
        params: {}
      });

      const { code, data } = res;
      if (code == 200) {
        this.sellerInfo = data ? data : {};
      }
    },
    async getStationPriceSet() {
      let res = await this.$http({
        url: "/admin/getStationPriceSet",
        method: "post",
        params: {}
      });

      const { code, data } = res;
      if (code == 200) {
        let level = this.sellerInfo.sellerLevel;
        // this.priceSet = data ? data : {};
        data.forEach(m => {
          if (m.levelId == level) {
            this.priceSet = m;
          }
        });
      }
    },
    async getXFGiftSellerPriceSet() {
      let res = await this.$http({
        url: "/admin/getXFGiftSellerPriceSet",
        method: "get",
        params: {}
      });

      const { code, data } = res;
      if (code == 200 && data) {
        this.bigBugs = data;
      }
    },
    onRefreshBalance() {
      this.getSellerInfo();
    }
  },
  async created() {
    await this.getSellerInfo();
    this.getStationPriceSet();
    this.getXFGiftSellerPriceSet();
  }
};
</script>
<style lang='less'>
.userCenter {
  min-height: 600px;

  .userCenterBox {
    padding: 37px 0 0 0;
    display: flex;

    .leftBars {
    }

    .el-menu {
      border-right: none;
      padding-top: 30px;
      padding-left: 20px;
      margin-right: 10px;

      > .el-submenu {
        margin-bottom: 10px;
      }
    }
    .el-menu-item,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }

    .el-menu-item:focus,
    .el-menu-item:hover {
      background: none;
      // text-decoration: underline;
    }

    .el-submenu .el-menu-item {
      height: 40px;
      line-height: 40px;
      min-width: 180px;
      padding: 0 45px;
    }
    .el-submenu {
      > .el-menu {
        padding-top: 10px;
        padding-left: 0;

        .el-menu-item {
          padding-left: 20px !important;
          color: #666;
        }
      }
    }
    .el-menu-item-group__title {
      padding: 0;
    }
    .el-menu-item.is-active {
      color: #ff4d70 !important;
      // background: linear-gradient(308deg, #ff4573, #ff6767);
    }
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
      color: #000;
      font-size: 16px;
    }
    .el-submenu__title:focus,
    .el-submenu__title:hover {
      outline: 0;
      background: none;
    }

    .rightContent {
      flex: 1;
      background: #fff;

      .userHeadInfo {
        display: flex;
        padding: 40px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        font-weight: lighter;

        .attr {
          width: 116px;
          height: 116px;
          display: inline-block;
          border: 1px solid #ddd;
          padding: 5px;
          margin-right: 30px;
          border-radius: 100%;
          box-sizing: border-box;
        }

        .infos {
          flex: 1;

          .infosPhone {
            margin-top: 10px;
            margin-bottom: 15px;
            font-size: 20px;
            color: #616161;
          }

          .infosBlance {
            display: flex;
            margin-bottom: 25px;

            > div {
              margin-right: 110px;
            }

            .blanceTitle {
              font-size: 14px;
              color: #999;

              button {
                width: 47px;
                height: 22px;
                margin-left: 10px;
                line-height: 22px;
                border-radius: 4px;
                background: #ff4d70;
                color: #fff;
              }
            }

            .blanceNumber {
              font-weight: bold;
              font-size: 20px;
              color: #ff4d70;

              > span {
                font-size: 12px;
              }
            }
          }

          .infosPrice {
            .infosPriceTitle {
              font-size: 14px;
              color: #999;
            }

            .infosPriceNum {
              font-weight: bold;
              color: #ff4d70;

              span {
                margin-right: 60px;
              }
            }
          }
        }

        .opts {
          margin-left: 70px;
          .sureSubmit {
            width: 185px;
            height: 54px;
            background: #ff4d70;
            font-size: 16px;
            color: #fff;
          }
        }
      }

      .routeChild {
        background: #fff;
        min-height: 470px;
      }
    }
  }
}
.HoverBox {
  position: relative;

  .slotCont {
    cursor: pointer;
    .button-s {
      font-size: 12px;
      line-height: 20px;
      background: #f64f6f;
      padding: 0 10px;
      border: 1px solid #f64f6f;
      border-radius: 4px;
      margin: 0 10px;
      transition: all 0.3s;
      cursor: pointer;
      display: inline-block;
      color: #fff;
    }
  }
  .listBox {
    position: absolute;
    top: 30px;
    left: 0;
    background: #fff;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 2px 4px 1px rgba(255, 151, 171, 0.2);
    z-index: 999;
    li {
      height: 40px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 15px;
      cursor: pointer;
      transition: all 0.2s;
      color: rgba(0, 0, 0, 0.85);
      &:hover {
        background: #f64f6f;
        span {
          color: #fff !important;
        }
      }
      span {
        line-height: 1;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
}
</style>