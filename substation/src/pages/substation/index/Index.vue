<template>
  <div>
    <div class="index-hd">
      <div class="l">
        <div class="index-hd-count">
          <div class="t1">
            <div class="t1-name">账户余额</div>
            <div class="label">（可提现余额{{stationInfo.cashBalance}}）</div>
            <div class="t1-num">{{stationInfo.balance ? stationInfo.balance : 0}}</div>
            <div class="t1-go">
              <el-button
                type="danger"
                size="mini"
                @click="$router.push('/index/withdraw/apply')"
              >去提现</el-button>
            </div>
            <div class="t1-tip">
              每月10号可申请上月奖金提现1次
            </div>
          </div>
          <div class="t2">
            <div class="t2-name">累计奖金</div>
            <div class="t2-num">{{stationInfo.totalReward ? stationInfo.totalReward : 0}}</div>
            <div class="t1-go">
              <a
                href="javascript:;"
                @click="$router.push('/index/withdraw/list')"
              >查看流水</a>
            </div>
          </div>
        </div>

        <div class="index-hd-num">
          <div class="name">管控客户数</div>
          <div class="num">{{stationInfo.customerNum}}</div>
        </div>

        <div class="index-hd-stac">
          <div class="t">
            <ve-ring
              :title="title1"
              height="290px"
              :data="chartData1"
              :settings="chartSettings"
              :legend="legend"
              :tooltip="tooltip"
              :colors="colors"
            ></ve-ring>
          </div>
          <div class="t">
            <ve-ring
              :title="title2"
              height="290px"
              :data="chartData2"
              :settings="chartSettings"
              :legend="legend"
              :tooltip="tooltip"
              :colors="colors"
            ></ve-ring>
          </div>
          <div class="t">
            <ve-ring
              :title="title3"
              height="290px"
              :data="chartData3"
              :settings="chartSettings"
              :legend="legend"
              :tooltip="tooltip"
              :colors="colors"
            ></ve-ring>
          </div>
        </div>
      </div>
      <div class="r">
        <ve-histogram
          height="559px"
          :data="chartData4"
          :settings="chartSettings"
          :legend="legend4"
          :tooltip="tooltip4"
          :colors="colors"
          :yAxis="yAxis4"
        ></ve-histogram>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">今日包裹数 {{todayPackage ? todayPackage : 0}}</div>
      <div>近15日数据 <a
          href="javascript:;"
          @click="$router.push('/index/profitTrial?searchStatus=1')"
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
      <div>近15日数据 <a
          href="javascript:;"
          @click="$router.push('/index/profitTrial?searchStatus=2')"
        >查看更多</a></div>
      <div>
        <ve-line
          :data="chartData6"
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
    this.titleCommon = {
      show: true,
      top: 25,
      left: 25
    };

    this.chartSettings = {
      radius: [30, 60],
      offsetY: 120,
      label: {
        show: false
      },
      labelLine: {
        show: false
      }
    };

    this.legend = {
      orient: "vertical",
      align: "auto",
      left: 25,
      top: 204
    };

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

    this.tooltip = {
      formatter: function(params, ticket, callback) {
        return (
          "数量<br />" + params.name.split(" ")[0] + " " + params.percent + "%"
        );
      }
    };

    this.tooltip4 = {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    };

    this.title1 = {
      text: "用户等级",
      ...this.titleCommon
    };

    this.title2 = {
      text: "商家类型",
      ...this.titleCommon
    };

    this.title3 = {
      text: "使用情况",
      ...this.titleCommon
    };

    this.legend4 = {
      show: false,
      orient: "vertical",
      align: "auto",
      left: 25,
      top: 204
    };

    this.yAxis4 = {
      // show: true,
      // axisTick: {
      //   show: true
      // }
    };

    return {
      chartData1: {
        columns: ["类型", "数量"],
        rows: [
          // { 类型: "注册用户", 数量: 37 },
          // { 类型: "VIP用户", 数量: 3 },
          // { 类型: "钻石用户 分站单独定价", 数量: 1 }
        ]
      },
      chartData2: {
        columns: ["类型", "数量"],
        rows: [
          // { 类型: "大商家 日均50单以上", 数量: 1 },
          // { 类型: "中商家 日均20-50单以上", 数量: 1 },
          // { 类型: "小商家 日均50单以上", 数量: 39 }
        ]
      },
      chartData3: {
        columns: ["类型", "数量"],
        rows: [
          // { 类型: "未使用 从未下过单", 数量: 30 },
          // { 类型: "使用中 近7日下过单", 数量: 6 },
          // { 类型: "暂停使用 使用过，近7日未下单", 数量: 5 }
        ]
      },
      chartData4: {
        columns: ["类型", "数量"],
        rows: [
          // { 类型: "未联系上", 数量: 1 },
          // { 类型: "已联系", 数量: 1 },
          // { 类型: "初步沟通", 数量: 0 },
          // { 类型: "深入沟通有意向", 数量: 1 },
          // { 类型: "确定合作", 数量: 0 },
          // { 类型: "已合作", 数量: 2 },
          // { 类型: "悔单", 数量: 0 },
          // { 类型: "放弃", 数量: 0 },
          // { 类型: "信息错误", 数量: 0 },
          // { 类型: "未联系", 数量: 36 }
        ]
      },
      chartData5: {
        columns: ["日期", "包裹数"],
        rows: []
      },
      chartData6: {
        columns: ["日期", "新增注册"],
        rows: []
      },
      todayPackage: null,
      todayRegister: null,
      stationInfo: {}
    };
  },
  methods: {
    async queryOverlordDataMap(params) {
      let res = await this.$http({
        url: "/t-station/queryOverlordDataMap",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        this.todayPackage = data.todayPackage;
        this.todayRegister = data.todayRegister;
        this.stationInfo = data.stationInfo;

        let sellerLevelVo = data.stationInfo.sellerLevelVo
          ? data.stationInfo.sellerLevelVo
          : {};
        let sellerTypeVo = data.stationInfo.sellerTypeVo
          ? data.stationInfo.sellerTypeVo
          : {};
        let sellerUseVo = data.stationInfo.sellerUseVo
          ? data.stationInfo.sellerUseVo
          : {};

        this.dealChart1(sellerLevelVo);
        this.dealChart2(sellerTypeVo);
        this.dealChart3(sellerUseVo);

        this.dealChart4(data.stationInfo);

        let packages = data.latelyFifteenDaysPackage
          ? data.latelyFifteenDaysPackage
          : [];

        this.dealChart5(packages);

        let registers = data.latelyFifteenDaysRegister
          ? data.latelyFifteenDaysRegister
          : [];

  console.log(registers)
        this.dealChart6(registers);
      }
    },
    dealChart1(data) {
      this.chartData1.rows = [
        {
          类型: "注册用户",
          数量: data.registerSeller ? data.registerSeller : 0
        },
        { 类型: "VIP用户", 数量: data.vipSeller ? data.vipSeller : 0 },
        {
          类型: "钻石用户 分站单独定价",
          数量: data.diamondSeller ? data.diamondSeller : 0
        }
      ];
    },
    dealChart2(data) {
      this.chartData2.rows = [
        {
          类型: "大商家 日均50单以上",
          数量: data.maxSeller ? data.maxSeller : 0
        },
        {
          类型: "中商家 日均20-50单以上",
          数量: data.inSeller ? data.inSeller : 0
        },
        {
          类型: "小商家 日均50单以上",
          数量: data.minSelle ? data.minSeller : 0
        }
      ];
    },
    dealChart3(data) {
      this.chartData3.rows = [
        { 类型: "未使用 从未下过单", 数量: data.notUse ? data.notUse : 0 },
        { 类型: "使用中 近7日下过单", 数量: data.useIn ? data.useIn : 0 },
        {
          类型: "暂停使用 使用过，近7日未下单",
          数量: data.suspendUse ? data.suspendUse : 0
        }
      ];
    },
    dealChart4(data) {
      this.chartData4.rows = [
        { 类型: "未联系上", 数量: data.notContactUp ? data.notContactUp : 0 },
        { 类型: "已联系", 数量: data.contacted ? data.contacted : 0 },
        {
          类型: "初步沟通",
          数量: data.initialConnect ? data.initialConnect : 0
        },
        { 类型: "深入沟通有意向", 数量: data.intention ? data.intention : 0 },
        {
          类型: "确定合作",
          数量: data.determineCooperate ? data.determineCooperate : 0
        },
        {
          类型: "已合作",
          数量: data.alreadyCooperate ? data.alreadyCooperate : 0
        },
        { 类型: "悔单", 数量: data.regrets ? data.regrets : 0 },
        { 类型: "放弃", 数量: data.giveUp ? data.giveUp : 0 },
        { 类型: "信息错误", 数量: data.infoError ? data.infoError : 0 },
        { 类型: "未联系", 数量: data.notContact ? data.notContact : 0 }
      ];
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
    },
    async getStationStatus() {
      const res = await this.$http({
        url: "/t-station/getStationStatus",
        method: "get",
      });
      if (res.code === 200 && res.data) {
        if(res.data.stationPrice != 'ok'){
          this.$alert('本分站还未设置成本价，请联系管理进行设置!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    this.queryOverlordDataMap({
      startTime: moment().add(-15, "day").$d,
      endTime: moment().$d
    });

    if(this.userInfo.stationType == 3){
        this.getStationStatus()
    }
  }
};
</script>


<style lang="less">
.index-hd {
  display: flex;
  > .l {
    flex: 1;

    > .index-hd-count {
      display: flex;

      > .t1 {
        flex: 1;
        padding: 10px;
        margin-right: 20px;
        border: 1px solid #ddd;
        text-align: center;
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
          0 2px 4px 0 rgba(232, 237, 250, 0.5);

        .t1-name {
          font-size: 20px;
        }

        .label{
          color: #666;
        }

        .t1-num {
          font-size: 24px;
          font-weight: 700;
          color: #ff3341;
        }

        .t1-go {
        }

        .t1-tip {
          font-size: 14px;
        }
      }

      > .t2 {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        text-align: center;
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
          0 2px 4px 0 rgba(232, 237, 250, 0.5);

        .t2-name {
          font-size: 20px;
        }

        .t2-num {
          font-size: 24px;
          font-weight: 700;
          color: #ff3341;
        }

        .t2-go {
        }
      }
    }

    > .index-hd-num {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);

      .name {
        font-size: 20px;
      }

      .num {
        font-size: 24px;
        font-weight: 700;
        color: #ff3341;
      }
    }

    > .index-hd-stac {
      display: flex;
      margin-top: 20px;

      .t {
        flex: 1;
        height: 290px;
        margin-right: 20px;
        border: 1px solid #ddd;
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
          0 2px 4px 0 rgba(232, 237, 250, 0.5);

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  > .r {
    width: 550px;
    height: 555px;
    margin-left: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
}
</style>

