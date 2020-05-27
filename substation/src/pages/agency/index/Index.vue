<template>
  <div>
    <div class="channel-index-hd">
      <div>
        <div class="h3">￥{{balance ? balance : 0}}</div>
        <!-- <div class="h4">赵梁春渠道</div> -->
        <div>
          <a
            href="javascript:;"
            @click="$router.push('/agency/withdraw/apply')"
          >提现</a>
          <a
            href="javascript:;"
            style="margin-left: 20px;"
            @click="$router.push('/agency/withdraw/list')"
          >资金流水</a>（可提现余额{{cashBalance}}）
        </div>
      </div>
      <div>
        <div class="h3">{{invitationNum ? invitationNum : 0}}</div>
        <div class="h4">邀请人数</div>
        <div>
          <el-button
            type="danger"
            ref="copySellerUrl"
            :data-clipboard-text="inviteUrl"
            @click="handlecopy"
          >复制邀请链接</el-button>
        </div>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">我的成本</div>
      <div>
        <div
          class="logistic-set"
          style="margin-bottom: 15px;"
        >
          <div class="log-item">
            <h4>
              圆通快递-信封件
              <!-- <el-select
                v-model="type"
                @change="switchExpress"
              >
                <el-option
                  v-for="(item, i) in expressList"
                  :label="item.expressName"
                  :value="item.expressId"
                  :key="i"
                ></el-option>
              </el-select> -->
            </h4>
            <ul
              class="price"
              v-for="(item, i) in xfCost"
              :key="i"
            >
              <!-- <li>
                <span>分仓名称</span>
                <p>
                  <strong>{{item.pointName ? item.pointName : "--"}}</strong>
                </p>
              </li> -->
              <li>
                <span>{{item.onePrice}}元</span>
                <p>全国统一价</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="logistic-set">
          <div class="log-item">
            <h4>
              申通快递
              <!-- <el-select
                v-model="type"
                @change="switchExpress"
              >
                <el-option
                  v-for="(item, i) in expressList"
                  :label="item.expressName"
                  :value="item.expressId"
                  :key="i"
                ></el-option>
              </el-select> -->
            </h4>
            <ul
              class="price"
              v-for="(item, i) in myCost"
              :key="i"
            >
              <!-- <li>
                <span>分仓名称</span>
                <p>
                  <strong>{{item.pointName ? item.pointName : "--"}}</strong>
                </p>
              </li> -->
              <li>
                <span>{{item.first}}元</span>
                <p>普通地区0.5kg</p>
              </li>
              <li>
                <span>{{item.firstKg}}元</span>
                <p>普通地区0.5-1kg</p>
              </li>
              <li>
                <span>{{item.additional}}元</span>
                <p>普通地区续重</p>
              </li>
              <li>
                <span>{{item.farFirst}}元</span>
                <p>偏远地区0.5kg</p>
              </li>
              <li>
                <span>{{item.farFirstKg}}元</span>
                <p>偏远地区0.5-1kg</p>
              </li>
              <li>
                <span>{{item.farAdditional}}元</span>
                <p>偏远地区续重</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">今日包裹数 {{todayPackage ? todayPackage : 0}}</div>
      <div>近7日数据 <a
          href="javascript:;"
          @click="$router.push('/agency/profitTrial')"
        >查看更多</a></div>
      <div>
        <ve-line
          :data="chartData1"
          :colors="colors"
        ></ve-line>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">新增注册数 {{todayRegister ? todayRegister : 0}}</div>
      <div>近7日数据 <a
          href="javascript:;"
          @click="$router.push('/agency/profitTrial')"
        >查看更多</a></div>
      <div>
        <ve-line
          :data="chartData2"
          :colors="colors"
        ></ve-line>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import moment from "dayjs";
export default {
  data() {
    this.colors = [
      "#4882f0",
      "#2f4554",
      "#61a0a8",
      "#d48265",
      "#91c7ae",
      "#749f83",
      "#ca8622",
      "#bda29a",
      "#6e7074",
      "#546570",
      "#c4ccd3"
    ];

    return {
      chartData1: {
        columns: ["日期", "包裹数"],
        rows: [
          // { 日期: "20190416", 包裹数: 1393 },
        ]
      },
      chartData2: {
        columns: ["日期", "新增注册"],
        rows: [
          // { 日期: "20190416", 新增注册: 1393 },
        ]
      },
      balance: 0,
      invitationCode: "",
      invitationNum: 0,
      todayPackage: null,
      todayRegister: null,
      inviteUrl: "",
      myCost: [],
      xfCost: [],
      isSetPrice:"",
      expressName:""
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    async queryOverlordDataMap() {
      let res = await this.$http({
        url: "/t-agent/queryOverlordDataMap",
        method: "get",
        params: {
          stationId: this.userInfo.stationId
        }
      });

      console.log(res)

      const { code, data } = res;
      if (code == 200) {
        this.todayPackage = data.todayPackage;
        this.todayRegister = data.todayRegister;
        this.todayRegister = data.todayRegister;
        this.balance = data.balance;
        this.invitationCode = data.invitationCode;
        // this.inviteUrl = location.origin + "/#/reg?code=" + data.invitationCode;
        this.inviteUrl = data.invitationCode;
        this.cashBalance = data.cashBalance;
        console.log(this.inviteUrl);
        this.invitationNum = data.invitationNum;
        this.isSetPrice = data.isSetPrice;
        this.expressName = data.expressName;
        let packages = data.latelyFifteenDaysPackage
          ? data.latelyFifteenDaysPackage
          : [];
        this.dealChart5(packages);

        let registers = data.latelyFifteenDaysRegister
          ? data.latelyFifteenDaysRegister
          : [];
     
        this.dealChart6(registers);
      }
    },
    dealChart5(data) {
      let arr = [];
      data.forEach(m => {
        arr.push({
          日期: moment(m.packageTime).format("YYYYMMDD"),
          包裹数: m.packageNum
        });
      });
      this.chartData1.rows = arr;
    },
    dealChart6(data) {
      let arr = [];
      data.forEach(m => {
        arr.push({
          日期: moment(m.registerTime).format("YYYYMMDD"),
          新增注册: m.registerNum
        });
      });

      this.chartData2.rows = arr;
    },
    async findAgentPriceSet() {
      let res = await this.$http({
        url: "/t-agent/findAgentPriceSet",
        method: "get",
        params: {
          stationId: this.userInfo.stationId
        }
      });

      const { code, data } = res;
      if (code == 200) {
        this.myCost = data.giftPrice;
        this.xfCost = data.xFPrice;
      }
    },
    handlecopy(){
      if(this.isSetPrice){
      this.copySellerEvt = new Clipboard(this.$refs.copySellerUrl.$el);
      this.copySellerEvt.on("success", e => {
        this.$message.success("复制成功");
      });
      this.copySellerEvt.on("error", e => {
        this.$message.error("该浏览器不支持自动复制");
      });
    }else{
        this.$confirm('您还未设置代理价格,请联系分站管理员!', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
        }).catch(() => {        
        });
    }
    }
  },
  created() {
    this.queryOverlordDataMap({
      startTime: moment().add(-7, "day").$d,
      endTime: moment().$d
    });
    this.findAgentPriceSet();
  },
  mounted() {
    if(this.isSetPrice){
        this.handlecopy()
    }
  
  }
};
</script>


<style lang="less">
.channel-index-hd {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);

  > div {
    flex: 1;
    text-align: center;

    > .h2 {
      font-size: 26px;
      line-height: 30px;
      font-weight: 700;
    }
    > .h3 {
      font-size: 36px;
      color: #ff3341;
    }
    > .h4 {
      font-size: 16px;
      line-height: 30px;
      font-weight: 700;
    }
    > .h5 {
      font-size: 14px;
      color: #999;
    }
  }
}
.logistic-set {
  .log-item {
    h4 {
      font-size: 14px;
      color: #303133;
      margin-bottom: 10px;
    }

    .price {
      display: flex;
      border: 1px solid #979797;
      border-radius: 4px;
      margin-bottom: 10px;

      li {
        flex: 1;
        border-right: 1px solid #979797;
        font-size: 16px;
        color: #303133;
        line-height: 22px;
        padding: 24px;
        text-align: center;
        -ms-flex-item-align: center;
        align-self: center;

        &:last-child {
          border-right: none;
        }

        span {
          margin-bottom: 10px;
        }

        p {
          font-size: 14px;
        }
      }
    }
  }

  .tips {
    font-size: 16px;

    em {
      color: #ff3341;
    }
  }
}
</style>

