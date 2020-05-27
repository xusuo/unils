<template>
  <div>
    <div class="channel-index-hd">
      <div>
        <div>账户余额</div>
        <div class="label">（可提现余额{{saleInfo.cashBalance}}）</div>
        <div class="h3">{{saleInfo.saleBalance}}</div>
        <div>
          <a
            href="javascript:;"
            @click="$router.push('/market/withdraw/apply')"
          >提现</a>
          <a
            href="javascript:;"
            @click="$router.push('/market/withdraw/list')"
          >入账明细</a>
        </div>
      </div>
      <div>
        <div>代理人数</div>
        <div class="h3">
          {{saleInfo.agentNum}}
        </div>
      </div>
      <div>
        <div>用户数</div>
        <div class="h3">
          {{saleInfo.sellerNum}}
        </div>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">今日包裹数 {{todayPackage ? todayPackage : 0}}</div>
      <div>近7日数据 <a
          href="javascript:;"
          @click="$router.push('/market/profitTrial')"
        >查看更多</a></div>
      <div>
        <ve-line
          :data="chartData5"
          :colors="colors"
        ></ve-line>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">新增注册数 {{todayRegister ? todayRegister : 0}}</div>
      <div>近7日数据 <a
          href="javascript:;"
          @click="$router.push('/market/profitTrial')"
        >查看更多</a></div>
      <div>
        <ve-line
          :data="chartData5"
          :colors="colors"
        ></ve-line>
      </div>
    </div>
  </div>
</template>

<script>
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
      chartData5: {
        columns: ["日期", "包裹数"],
        rows: [
          // { 日期: "20190416", 包裹数: 1393 }
        ]
      },
      chartData6: {
        columns: ["日期", "新增注册"],
        rows: [
          // { 日期: "20190416", 新增注册: 1393 }
        ]
      },
      saleInfo: {},
      todayPackage: null,
      todayRegister: null
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
        url: "/t-sale/queryOverlordDataMap",
        method: "get",
        params: {
          stationId: this.userInfo.stationId
        }
      });

      const { code, data } = res;
      if (code == 200) {
        this.todayPackage = data.todayPackage;
        this.todayRegister = data.todayRegister;
        this.saleInfo = data.saleInfo;
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
      this.chartData5.rows = arr;
    },
    dealChart6(data) {
      let arr = [];
      data.forEach(m => {
        arr.push({
          日期: moment(m.registerTime).format("YYYYMMDD"),
          新增注册: m.registerNum
        });
      });

      this.chartData6.rows = arr;
    }
  },
  created() {
    this.queryOverlordDataMap({
      startTime: moment().add(-7, "day").$d,
      endTime: moment().$d
    });
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
</style>

