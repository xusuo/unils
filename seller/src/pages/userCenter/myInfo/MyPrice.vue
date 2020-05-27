<template>
  <div class="myPrice">
    <div class="myPrice">
      <p>
        您当前的等级为
        <span style="font-weight: bold;">
          <template v-if="sellerInfo.sellerLevel === 0">未知</template>
          <template v-if="sellerInfo.sellerLevel === 1">注册用户</template>
          <template v-if="sellerInfo.sellerLevel === 2">VIP用户</template>
          <template v-if="sellerInfo.sellerLevel === 3">黄金会员</template>
          <template v-if="sellerInfo.sellerLevel === 4">钻石会员</template>
        </span>
      </p>
      <div
        class="tables"
        v-if="sellerInfo.sellerLevel === 1"
      >
        <div
          class="priceBox"
          style="margin: auto;"
        >
          <p class="levelTitle">注册用户</p>
          <div class="tableContent">
            <div>
              <span>重量</span>
              <span>价钱</span>
            </div>
            <ul>
              <li>
                <span>0.5kg内</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{registerCb.first ? registerCb.first : "--"}}
                  </template>
                  <template v-else>
                    {{registerCb.farFirst ? registerCb.farFirst : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>0.5kg-1kg</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{registerCb.firstKg ? registerCb.firstKg : "--"}}
                  </template>
                  <template v-else>
                    {{registerCb.farFirstKg ? registerCb.farFirstKg : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>1kg以上续重</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{registerCb.additional ? registerCb.additional : "--"}}
                  </template>
                  <template v-else>
                    {{registerCb.farAdditional ? registerCb.farAdditional : "--"}}
                  </template>
                  元/kg
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="rulesBox">
          <h6 class="ruleText">总计邀请 3 人免费</h6>
          <div class="arrowsLine">
            <strong class="vipLeve">升级为 VIP</strong>
            <span class="el-icon-arrow-right arrows"></span>
          </div>
          <h6 class="ruleText">
            已邀请
            <strong>{{sellerInfo.myInviteSuccess ? sellerInfo.myInviteSuccess : 0}}</strong>
            人
          </h6>
          <button
            class="button-n btnsReg"
            ref="copySellerUrl"
            :data-clipboard-text="inviteUrl"
          >复制邀请链接</button>
        </div>
        <div class="priceBox">
          <p class="levelTitle">VIP用户</p>
          <div class="tableContent">
            <div>
              <span>重量</span>
              <span>价钱</span>
            </div>
            <ul>
              <li>
                <span>0.5kg内</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{vipCb.first ? vipCb.first : "--"}}
                  </template>
                  <template v-else>
                    {{vipCb.farFirst ? vipCb.farFirst : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>0.5kg-1kg</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{vipCb.firstKg ? vipCb.firstKg : "--"}}
                  </template>
                  <template v-else>
                    {{vipCb.farFirstKg ? vipCb.farFirstKg : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>1kg以上续重</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{vipCb.additional ? vipCb.additional : "--"}}
                  </template>
                  <template v-else>
                    {{vipCb.farAdditional ? vipCb.farAdditional : "--"}}
                  </template>
                  元/kg
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="tables"
        v-if="sellerInfo.sellerLevel === 2"
      >
        <div
          class="priceBox"
          style="text-align: center;margin-left: 280px;"
        >
          <p class="levelTitle">VIP用户</p>
          <div class="tableContent">
            <div>
              <span>重量</span>
              <span>价钱</span>
            </div>
            <ul>
              <li>
                <span>0.5kg内</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{vipCb.first ? vipCb.first : "--"}}
                  </template>
                  <template v-else>
                    {{vipCb.farFirst ? vipCb.farFirst : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>0.5kg-1kg</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{vipCb.firstKg ? vipCb.firstKg : "--"}}
                  </template>
                  <template v-else>
                    {{vipCb.farFirstKg ? vipCb.farFirstKg : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>1kg以上续重</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{vipCb.additional ? vipCb.additional : "--"}}
                  </template>
                  <template v-else>
                    {{vipCb.farAdditional ? vipCb.farAdditional : "--"}}
                  </template>
                  元/kg
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div style="margin-top: 10px;">
              您已邀请
              <strong>{{sellerInfo.myInviteSuccess ? sellerInfo.myInviteSuccess : 0}}</strong>
              人
            </div>
            <button
              class="button-n btnsReg"
              ref="copySellerUrl"
              :data-clipboard-text="inviteUrl"
            >复制邀请链接</button>
          </div>
        </div>
      </div>
      <div
        class="tables"
        v-if="sellerInfo.sellerLevel === 3"
      >
        <div
          class="priceBox"
          style="text-align: center;margin-left: 280px;"
        >
          <p class="levelTitle">黄金会员</p>
          <div class="tableContent">
            <div>
              <span>重量</span>
              <span>价钱</span>
            </div>
            <ul>
              <li>
                <span>0.5kg内</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{goldCb.first ? goldCb.first : "--"}}
                  </template>
                  <template v-else>
                    {{goldCb.farFirst ? goldCb.farFirst : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>0.5kg-1kg</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{goldCb.firstKg ? goldCb.firstKg : "--"}}
                  </template>
                  <template v-else>
                    {{goldCb.farFirstKg ? goldCb.farFirstKg : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>1kg以上续重</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{goldCb.additional ? goldCb.additional : "--"}}
                  </template>
                  <template v-else>
                    {{goldCb.farAdditional ? goldCb.farAdditional : "--"}}
                  </template>
                  元/kg
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div style="margin-top: 10px;">
              您已邀请
              <strong>{{sellerInfo.myInviteSuccess ? sellerInfo.myInviteSuccess : 0}}</strong>
              人
            </div>
            <button
              class="button-n btnsReg"
              ref="copySellerUrl"
              :data-clipboard-text="inviteUrl"
            >复制邀请链接</button>
          </div>
        </div>
      </div>
      <div
        class="tables"
        v-if="sellerInfo.sellerLevel === 4"
      >
        <div
          class="priceBox"
          style="text-align: center;margin-left: 280px;"
        >
          <p class="levelTitle">钻石会员</p>
          <div class="tableContent">
            <div>
              <span>重量</span>
              <span>价钱</span>
            </div>
            <ul>
              <li>
                <span>0.5kg内</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{diamondCb.first ? diamondCb.first : "--"}}
                  </template>
                  <template v-else>
                    {{diamondCb.farFirst ? diamondCb.farFirst : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>0.5kg-1kg</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{diamondCb.firstKg ? diamondCb.firstKg : "--"}}
                  </template>
                  <template v-else>
                    {{diamondCb.farFirstKg ? diamondCb.farFirstKg : "--"}}
                  </template>
                  元/单
                </span>
              </li>
              <li>
                <span>1kg以上续重</span>
                <span>
                  <template v-if="sellerInfo.alertType === 0">
                    {{diamondCb.additional ? diamondCb.additional : "--"}}
                  </template>
                  <template v-else>
                    {{diamondCb.farAdditional ? diamondCb.farAdditional : "--"}}
                  </template>
                  元/kg
                </span>
              </li>
            </ul>
          </div>
          <div>
            <div style="margin-top: 10px;">
              您已邀请
              <strong>{{sellerInfo.myInviteSuccess ? sellerInfo.myInviteSuccess : 0}}</strong>
              人
            </div>
            <button
              class="button-n btnsReg"
              ref="copySellerUrl"
              :data-clipboard-text="inviteUrl"
            >复制邀请链接</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      sellerInfo: {},
      registerCb: {},
      vipCb: {},
      goldCb: {},
      diamondCb: {},
      inviteUrl: ""
    };
  },
  methods: {
    async getSellerInfo() {
      let res = await this.$http({
        url: "/admin/getSellerInfo",
        method: "post",
        params: {}
      });

      const { code, data } = res;
      if (code == 200) {
        let sellerInfo = data ? data : { myInviteCode: "" };
        this.sellerInfo = sellerInfo;
      }
    },
    async getStationPriceSet() {
      let res = await this.$http({
        url: "/admin/getStationPriceSet",
        method: "post",
        params: {
          stationId: JSON.parse(localStorage.getItem("stationInfo")).stationId
        }
      });

      const { code, data } = res;
      if (code == 200) {
        // if (data && data.length === 2) {
        //   this.registerCb = data[0];
        //   this.vipCb = data[1];
        // }
        data.forEach(m => {
          if (m.levelId == 1) {
            this.registerCb = m;
          } else if (m.levelId == 2) {
            this.vipCb = m;
          } else if (m.levelId == 3) {
            this.goldCb = m;
          } else if (m.levelId == 4) {
            this.diamondCb = m;
          }
        });
      }
    },
    async getSellerInvitationCode() {
      // admin/getSellerInvitationCode
      let res = await this.$http({
        url: "/admin/getSellerInvitationCode",
        method: "post",
        params: {}
      });

      const { code, data } = res;
      if (code == 200) {
        this.inviteUrl = location.origin + "/#/reg?code=" + data;
      }
    }
  },
  async mounted() {
    // 这个地方这样写的原因是复制到粘贴板需要页面渲染后才能用
    await this.getSellerInfo();
    await this.getSellerInvitationCode();
    await this.getStationPriceSet();

    this.copySellerEvt = new Clipboard(this.$refs.copySellerUrl);
    this.copySellerEvt.on("success", e => {
      this.$message.success("复制成功");
    });
    this.copySellerEvt.on("error", e => {
      this.$message.error("该浏览器不支持自动复制");
    });
  }
};
</script>
<style lang='less'>
.myPrice {
  padding: 20px;
  padding-top: 10px;
  p {
    font-size: 15px;
    line-height: 36px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
  }
  .tables {
    display: flex;
    align-items: center;
    padding: 20px 0;
    .levelTitle {
      text-align: center;
      font-size: 14px;
      line-height: 1;
      color: #333;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .tableContent {
      width: 330px;
      border: 1px solid #ff4d70;
      div {
        width: 330px;
        background: #ff4d70;
        text-align: center;
        display: flex;
        align-items: center;
        span {
          flex: 1;
          text-align: center;
          font-size: 12px;
          line-height: 30px;
          color: #fff;
          font-weight: 400;
        }
      }
      ul {
        width: 330px;
        li {
          border-top: 1px solid #eee;
          font-size: 12px;
          line-height: 30px;
          color: rgba(0, 0, 0, 0.65);
          font-weight: 400;
          display: flex;
          align-items: center;
          span {
            width: 165px;
            flex: 1;
            text-align: center;
          }
        }
      }
    }
    .rulesBox {
      width: 200px;
      margin: 0 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      -webkit-transform: translateY(30px);
      transform: translateY(30px);
      .ruleText {
        font-size: 16px;
        line-height: 1;
        color: #000;
        font-weight: 700;
        strong {
          font-size: 16px;
          line-height: 1;
          color: #ff4d70;
          font-weight: 700;
          font-family: Helvetica Neue;
        }
      }
      .arrowsLine {
        width: 100%;
        height: 2px;
        background: #999;
        position: relative;
        margin: 30px 0;
        .vipLeve {
          background: #fff;
          position: absolute;
          width: 112px;
          height: 40px;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          font-size: 16px;
          line-height: 1;
          color: #ff4d70;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        .arrows {
          font-size: 30px;
          line-height: 1;
          color: #999;
          font-weight: 400;
          position: absolute;
          top: -14px;
          right: -11px;
        }
      }
    }
    .btnsReg {
      font-size: 14px;
      line-height: 38px;
      color: #fff;
      background: #ff4d70;
      padding: 0 32px;
      border: 1px solid #ff4d70;
      transition: all 0.3s;
      border-radius: 2px;
      white-space: nowrap;
      margin: 20px 0 0;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 12px;
      line-height: 1;
      color: #fff;
      font-weight: 400;
      border-radius: 4px;
    }
  }
}
</style>