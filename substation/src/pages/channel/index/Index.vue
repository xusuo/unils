<template>
  <div>
    <div class="channel-index-hd">
      <div>
        <div class="h2">HELLO</div>
        <div class="h2">{{channelInfo.name}}渠道</div>
      </div>
      <div>
        <div class="h3">{{channelInfo.balance}}</div>
        <div class="h4">账户余额</div>
        <div class="label">（可提现余额{{channelInfo.cashBalance}}）</div>
        <div>
          <a
            href="javascript:;"
            @click="$router.push('/channel/withdraw')"
          >去提现</a>
        </div>
        <div class="h5">每月10号可申请上月奖金提现1次</div>
      </div>
      <div>
        <div class="h3">{{channelInfo.totalReward}}</div>
        <div class="h4">渠道累计奖金</div>
        <div>
          <a
            href="javascript:;"
            @click="$router.push('/channel/accountDetail')"
          >查看流水</a>
        </div>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">今日奖金 {{todayBonus}}</div>
      <div>近14日数据 <a
          href="javascript:;"
          @click="$router.push('/channel/profitTrial')"
        >查看更多</a></div>
      <div>
        <ve-line
          :data="chartData5"
          :colors="colors"
        ></ve-line>
      </div>
    </div>

    <div class="yt-common-ctn">
      <div class="name">我的成本</div>
      <div>
        <div class="logistic-set">
          <div class="log-item">
            <h4>
              <el-select
                v-model="type"
                @change="switchExpress"
              >
                <el-option
                  v-for="(item, i) in expressList"
                  :label="item.expressName"
                  :value="item.expressId"
                  :key="i"
                ></el-option>
              </el-select>
            </h4>
            <ul
              class="price"
              v-for="(item, i) in myCost"
              :key="i"
            >
              <li>
                <span>分仓名称</span>
                <p>
                  <strong>{{item.pointName ? item.pointName : "--"}}</strong>
                </p>
              </li>
              <li v-if="expressType != 1">
                <span>{{item.first}}元</span>
                <p>普通地区0.5kg</p>
              </li>
              <li v-if="expressType != 1">
                <span>{{item.firstKg}}元</span>
                <p>普通地区0.5-1kg</p>
              </li>
              <li v-if="expressType != 1">
                <span>{{item.additional}}元</span>
                <p>普通地区续重</p>
              </li>
              <li v-if="expressType != 1">
                <span>{{item.farFirst}}元</span>
                <p>偏远地区0.5kg</p>
              </li>
              <li v-if="expressType != 1">
                <span>{{item.farFirstKg}}元</span>
                <p>偏远地区0.5-1kg</p>
              </li>
              <li v-if="expressType != 1">
                <span>{{item.farAdditional}}元</span>
                <p>偏远地区续重</p>
              </li>
              <li v-if="expressType == 1">
                <span>{{item.onePrice}}元</span>
                <p>一口价</p>
              </li>
            </ul>
          </div>
        </div>
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
      channelInfo: {},
      myCost: {},
      todayBonus: 0,
      chartData5: {
        columns: ["日期", "数量"],
        rows: []
      },
      expressList: [],
      type: "1",
      expressType: "1"
    };
  },
  methods: {
    async queryExpressList(params) {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryExpressList",
        method: "get",
        params
      });
      const { data } = res;
      if (data) {
        this.expressList = data;

        if (data.length) {
          this.type = data[0].expressId;
          this.expressType = data[0].eType;
        }
      }
    },
    async queryOverlordDataMap(params) {
      let res = await this.$http({
        url: "/channel/queryOverlordDataMap",
        method: "get",
        params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        console.log(data);
        this.channelInfo = data.channelInfo;
        this.myCost = data.myCost ? data.myCost : [];
        this.todayBonus = data.todayBonus ? data.todayBonus : 0;

        let arr = [];
        let bonus = data.latelyFifteenDaysBonus
          ? data.latelyFifteenDaysBonus
          : [];

        bonus.forEach(m => {
          arr.push({
            日期: moment(m.statisticsTime).format("YYYYMMDD"),
            数量: m.channelBonus
          });
        });

        this.chartData5.rows = arr;
      }
    },
    async switchExpress(value) {
      await this.queryOverlordDataMap({
        startTime: moment()
          .add(-14, "day")
          .format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD"),
        expressId: this.type
      });

      this.expressList.forEach(m => {
        if (m.expressId == value) {
          this.expressType = m.eType;
        }
      });
    }
  },
  async created() {
    await this.queryExpressList();
    this.queryOverlordDataMap({
      startTime: moment()
        .add(-14, "day")
        .format("YYYY-MM-DD"),
      endTime: moment().format("YYYY-MM-DD"),
      expressId: this.type
    });
  }
};
</script>


<style lang="less" scoped>
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

