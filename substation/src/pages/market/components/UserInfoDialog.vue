<template>
  <div>
    <el-dialog
      title="用户详情"
      width="1000px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      <div class="user-detail-base">
        <h2>用户</h2>

        <div class="top-info">
          <div class="user">
            <strong>{{form.sellerPhone ? form.sellerPhone : "--"}}</strong>
            <span>
              姓名：{{form.sellerName ? form.sellerName : "--"}}
              <i
                class="edit"
                @click="$refs.userEditInfoDialog.show(form)"
              >修改</i>
            </span>
            <span>QQ：{{form.sellerQq ? form.sellerQq : "--"}}</span>
            <span>
              微信：{{form.sellerWx ? form.sellerWx : "--"}}
            </span>
            <span>
              手机：{{form.sellerPhone ? form.sellerPhone : "--"}}
            </span>
            <span>注册时间：{{form.registerTime }}</span>
          </div>
        </div>

        <div class="middle-info">
          <div class="middle-l">
            <div class="money">
              <h6 class="title">账户余额</h6>
              <div>
                <p>
                  <span>账户余额</span>
                  <strong>{{form.balance ? form.balance : 0}}</strong>
                  <!-- <b
                    class="text-btn"
                    @click="$refs.withdrawalDialog.show(form);"
                  >提现</b> -->
                </p>
                <p>
                  <span>累计消费金额</span>
                  <strong>{{form.totalConsume ? form.totalConsume : 0}}</strong>
                  <b></b>
                </p>
              </div>
            </div>

            <div class="user-level">
              <h6 class="title">用户等级及价格</h6>
              <p>
                <strong>
                  <template v-if="form.sellerLevel === 0">未知</template>
                  <template v-if="form.sellerLevel === 1">注册用户</template>
                  <template v-if="form.sellerLevel === 2">VIP用户</template>
                  <template v-if="form.sellerLevel === 3">黄金会员</template>
                  <template v-if="form.sellerLevel === 4">钻石会员</template>
                </strong>
              </p>
              <ul
                class="price-list"
                style="margin-bottom: 10px;"
              >
                <li>
                  <span>圆通快递</span>
                  <span style="width: 180px;">信封件（固定重量）</span>
                </li>
                <li style="border-bottom: 0;">
                  <span>全国</span>
                  <span style="width: 180px;">{{form.xffirst ? form.xffirst : "--"}}</span>
                </li>
              </ul>
              <ul class="price-list">
                <li>
                  <span>申通快递</span>
                  <span>0.5kg内</span>
                  <span>0.5-1kg</span>
                  <span>续重</span>
                </li>
                <li>
                  <span>普通地区</span>
                  <span>{{form.first ? form.first : "--"}}</span>
                  <span>{{form.firstKg ? form.firstKg : "--"}}</span>
                  <span>{{form.additional ? form.additional : "--"}}</span>
                </li>
                <li>
                  <span>偏远地区</span>
                  <span>{{form.farFirst ? form.farFirst : "--"}}</span>
                  <span>{{form.farFirstKg ? form.farFirstKg : "--"}}</span>
                  <span>{{form.farAdditional ? form.farAdditional : "--"}}</span>
                </li>
              </ul>
            </div>

            <div class="user-blong">
              <h6 class="title">用户归属</h6>
              <ul class="info-list">
                <li>
                  <span>销售：</span>
                  <strong>{{form.saleName ? form.saleName : "--"}}</strong>
                </li>
                <li>
                  <span>代理人：</span>
                  <strong>{{form.agentName ? form.agentName : "--"}}</strong>
                </li>
                <li>
                  <span>邀请人：</span>
                  <strong>--</strong>
                </li>
                <li>
                  <span>所属运营：</span>
                  <strong>
                    <i>{{form.currentOperate ? form.currentOperate : "--"}}</i>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
          <div class="middle-r">
            <div class="tops-btn">
              <div class="tags">
                <!-- 商家规模标签 -->
                <el-tag
                  size="small"
                  v-if="form.sellerScope === 1"
                  style="margin-bottom: 5px;"
                >大商家</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerScope === 2"
                  style="margin-bottom: 5px;"
                >中商家</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerScope === 3"
                  style="margin-bottom: 5px;"
                >小商家</el-tag>
                <!-- 商家使用情况标签 -->
                <el-tag
                  size="small"
                  v-if="form.sellerHandle === 0"
                  style="margin-bottom: 5px;"
                >未使用</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerHandle === 1"
                  style="margin-bottom: 5px;"
                >使用中</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerHandle === 2"
                  style="margin-bottom: 5px;"
                >暂停使用</el-tag>
                <!-- 商家联系情况标签 -->
                <el-tag
                  size="small"
                  v-if="form.sellerType === 0"
                  style="margin-bottom: 5px;"
                >0类 未联系上</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 1"
                  style="margin-bottom: 5px;"
                >1类 已联系</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 2"
                  style="margin-bottom: 5px;"
                >2类 初步沟通</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 3"
                  style="margin-bottom: 5px;"
                >3类 深入沟通有意向</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 4"
                  style="margin-bottom: 5px;"
                >4类 确定合作</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 5"
                  style="margin-bottom: 5px;"
                >5类 已合作</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 6"
                  style="margin-bottom: 5px;"
                >6类 悔单</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 7"
                  style="margin-bottom: 5px;"
                >7类 无意向、放弃</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 8"
                  style="margin-bottom: 5px;"
                >8类 信息错误</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 9"
                  style="margin-bottom: 5px;"
                >9类 未联系</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerType === 10"
                  style="margin-bottom: 5px;"
                >10类 坚决不要</el-tag>
                <!-- 商家等级标签 -->
                <el-tag
                  size="small"
                  v-if="form.sellerLevel === 1"
                  style="margin-bottom: 5px;"
                >注册用户</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerLevel === 2"
                  style="margin-bottom: 5px;"
                >VIP用户</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerLevel === 3"
                  style="margin-bottom: 5px;"
                >黄金会员</el-tag>
                <el-tag
                  size="small"
                  v-if="form.sellerLevel === 4"
                  style="margin-bottom: 5px;"
                >钻石会员</el-tag>
                <!-- 商家剩余天数标签 -->
                <el-tag
                  size="small"
                  v-if="form.serviceDeadline"
                  style="margin-bottom: 5px;"
                >剩余{{form.serviceDeadline}}天激活</el-tag>
              </div>
            </div>

            <div class="title">
              <div class="active-time">
                <p>
                  激活时间：
                  <template v-if="form.activationTime">
                    {{form.activationTime | formatArrDateYMD}}
                  </template>
                  <template v-else>--</template>
                </p>
                <p>
                  用户当前类别：
                  <span class="active">
                    <template v-if="form.sellerType === 0">0类 未联系上</template>
                    <template v-if="form.sellerType === 1">1类 已联系</template>
                    <template v-if="form.sellerType === 2">2类 初步沟通</template>
                    <template v-if="form.sellerType === 3">3类 深入沟通有意向</template>
                    <template v-if="form.sellerType === 4">4类 确定合作</template>
                    <template v-if="form.sellerType === 5">5类 已合作</template>
                    <template v-if="form.sellerType === 6">6类 悔单</template>
                    <template v-if="form.sellerType === 7">7类 无意向、放弃</template>
                    <template v-if="form.sellerType === 8">8类 信息错误</template>
                    <template v-if="form.sellerType === 9">9类 未联系</template>
                    <template v-if="form.sellerType === 10">10类 坚决不要</template>
                  </span>
                </p>
              </div>

              <!-- <b
                class="add-logs"
                @click="$refs.addAllotRecordDialog.show(form);"
              >添加沟通记录</b> -->
            </div>

            <div class="tables-box">
              <template v-if="operateNoteList.length > 0">
                <div
                  class="tables-box-item"
                  v-for="(item, i) in operateNoteList"
                >
                  <p>{{item.operateName}}：{{item.noteContent}}</p>
                  <p>
                    沟通时间：{{item.createTime | formatArrDateYMD}}，
                    下次联系时间：{{item.nextTime | formatArrDateYMD}}
                  </p>
                </div>
              </template>
              <template v-else>
                <div class="no-data">暂无数据</div>
              </template>
            </div>
          </div>
        </div>

        <h2>用户放单情况分析</h2>

        <ul class="count-num-box">
          <li>
            <span>用户累计单量</span>
            <strong>{{form.totalOrderNum ? form.totalOrderNum : 0}}</strong>
          </li>
          <li>
            <span>近3日平均单量</span>
            <strong>{{form.threeDaysOrderNum ? form.threeDaysOrderNum : 0}}</strong>
          </li>
          <li>
            <span>放单日内日均单量</span>
            <strong>{{form.averageOrderNum ? form.averageOrderNum : 0}}</strong>
          </li>
        </ul>

        <div class="chart-count-box">
          <div>
            <div class="f-ib">
              <el-date-picker
                v-model="timeValues"
                class="custom-select-200"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="handleSearch"
              >
              </el-date-picker>
            </div>
            <!-- <b
              class="button-w"
              @click="$router.push('/operation/taskList?userName=' + form.sellerPhone)"
            >查看任务列表</b>
            <b
              class="button-w"
              @click="$router.push('/operation/packageList?userName=' + form.sellerPhone)"
            >查看包裹列表</b> -->
          </div>
          <div class="package-chart">
            <ve-line
              :data="chartData"
              :colors="colors"
            ></ve-line>
          </div>
        </div>

        <h2>用户活跃度</h2>

        <ul class="count-num-box active-num-box">
          <li>
            <span>未登录天数</span>
            <strong>{{form.notLoginDayNum ? form.notLoginDayNum : 0}}</strong>
          </li>
          <li>
            <span>今日登录次数</span>
            <strong>{{form.todayLoginNum ? form.todayLoginNum : 0}}</strong>
          </li>
          <li>
            <span>邀请好友数</span>
            <strong>{{form.invitationNum ? form.invitationNum : 0}}</strong>
          </li>
          <!-- <li>
            <span>绑定数</span>
            <strong>{{form.notLoginDayNum ? form.notLoginDayNum : 0}}</strong>
          </li> -->
        </ul>

        <div>
          <el-table
            :data="loginLogList"
            border
          >
            <el-table-column
              prop="loginTime"
              label="登录日期"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="loginArea"
              label="登录区域"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="loginIp"
              label="登录IP"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>

        <!-- <h2>用户常用礼品包</h2>

        <ul class="common-list">
          <li class="title flex">
            <span>礼品包名称</span>
            <span class="cont">礼品详情</span>
            <span>总价</span>
          </li>
          <li class="isEmpty">
            <span>该用户无常用礼品包</span>
          </li>
        </ul> -->
      </div>

      <!-- <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >取消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="loading"
          @click="handleSure"
        >确定</el-button>
      </div> -->
    </el-dialog>

    <UserEditInfoDialog
      ref="userEditInfoDialog"
      @success="updateChangeInfo"
    />
  </div>
</template>

<script>
import moment from "dayjs";
import UserEditInfoDialog from "./UserEditInfoDialog";

// import UserEditMarketDialog from "./UserEditMarketDialog";
export default {
  components: {
    UserEditInfoDialog
  },
  props: ["operateList", "saleList"],
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
      visible: false,
      loading: false,
      form: {},
      rules: {
        shopName: [
          {
            whitespace: true,
            required: true,
            message: "请输入店铺名",
            trigger: "blur"
          }
        ]
      },
      loginLogList: [],
      oftenGoodsList: [],
      operateNoteList: [],
      packageList: [],
      chartData: {
        columns: ["日期", "发包量"],
        rows: []
      },
      timeValues: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    show(item) {
      console.log(item);
      this.reset(item);
      this.querySellerDetail({
        stationId: this.userInfo.stationId,
        sellerId: item.sellerId
      });
      this.visible = true;
    },
    reset(item) {
      // console.log(item);
      // this.form = item;
      this.loginLogList = [];
      this.oftenGoodsList = [];
      this.operateNoteList = [];
      this.packageList = [];
      this.timeValues = [];
    },
    updateChangeInfo(o) {
      if (o.type === 1) {
        // 修改姓名
        this.form.sellerName = o.sellerName;
      } else if (o.type === 2) {
        // 修改微信
        this.form.sellerWx = o.sellerWx;
      } else if (o.type === 3) {
        // 新增运营记录
        this.querySellerDetail({
          stationId: this.form.stationId,
          sellerId: this.form.sellerId
        });
      }
    },
    async querySellerDetail(params) {
      let res = await this.$http({
        url: "/t-sale/querySellerDetail",
        method: "get",
        params
      });
      const { code, data } = res;
      if (code === 200) {
        // 字段太多，直接赋值了。
        this.form = data.sellerInfo;
        this.form.sellerId = params.sellerId;
        this.form.stationId = params.stationId;
        this.loginLogList = data.loginLogList;
        this.oftenGoodsList = data.loginLogList;
        this.operateNoteList = data.operateNoteList;
        this.packageList = data.packageList;

        let arr = [];
        data.packageList.forEach(m => {
          arr.push({
            日期: moment(m.today).format("YYYYMMDD"),
            发包量: m.packageNum
          });
        });
        console.log(arr);
        this.chartData.rows = arr;
      }
    },
    handleSearch() {
      // 按时间搜索条件
      if (this.timeValues && this.timeValues.length === 2) {
        this.querySellerDetail({
          stationId: this.form.stationId,
          sellerId: this.form.sellerId,
          startTime: this.timeValues[0],
          endTime: this.timeValues[1]
        });
      }
    },
    async editRequest(params) {
      let res = await this.$http({
        url: "/t-sale/updateSellerInfo",
        method: "post",
        data: params
      });
      const { code, data } = res;
      if (code === 200) {
        this.$message.success("操作成功");
        this.form.alertType = 1;
      }
    },
    onSetPyg() {
      this.$confirm("确认设置为偏远高价格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editRequest({
            sellerId: this.form.sellerId,
            alertType: 1
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.user-detail-base {
  padding: 0 20px;

  > h2 {
    font-size: 16px;
    color: #000;
    background: #dedede;
    line-height: 30px;
    text-align: center;
    margin-bottom: 20px;
  }

  > .top-info {
    display: flex;
    justify-content: space-between;

    .user {
      > strong {
        font-size: 20px;
        color: #ff3341;
        line-height: 1;
        font-weight: 700;
      }

      > span {
        font-size: 14px;
        color: #000;
        line-height: 1;
        font-weight: 400;
        margin-left: 20px;

        .edit {
          font-size: 14px;
          line-height: 20px;
          color: #40b6ff;
          cursor: pointer;
        }
      }
    }
  }

  > .middle-info {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 40px;

    > .middle-l {
      border: 1px solid #999;
      margin-right: 20px;

      .money {
        > div {
          display: flex;
          > p {
            flex: 1;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            > span {
              font-size: 14px;
              color: #000;
              line-height: 30px;
              font-weight: 400;
            }

            > strong {
              font-size: 22px;
              color: #ff3341;
              line-height: 30px;
              font-weight: 700;
            }
          }
        }
      }

      .user-level {
        > p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;

          strong {
            font-size: 16px;
            color: #ff3341;
            line-height: 30px;
            font-weight: 400;
          }

          b {
            font-size: 14px;
            line-height: 20px;
            color: #40b6ff;
            cursor: pointer;
          }
        }

        > .price-list {
          border-top: 1px solid #999;
          border-bottom: 1px solid #999;

          > li {
            border-bottom: 1px solid #999;
            display: flex;
            justify-content: space-between;

            > span {
              border-right: 1px solid #999;
              text-align: center;
              width: 60px;
              font-size: 14px;
              color: #000;
              line-height: 30px;
              font-weight: 400;

              &:last-child {
                border-right: 0;
              }
            }
          }
        }
      }

      .info-list {
        padding: 0 20px;

        li {
          font-size: 14px;
          color: #000;
          line-height: 30px;
          font-weight: 400;
          display: flex;
          justify-content: center;

          > span {
            width: 85px;
          }

          > strong {
            flex: 1;
            display: flex;
            flex-direction: column;
            font-weight: normal;
          }

          .operate-log {
            font-size: 14px;
            line-height: 20px;
            color: #40b6ff;
            cursor: pointer;
          }
        }
      }

      .title {
        font-size: 14px;
        color: #fff;
        line-height: 30px;
        font-weight: 400;
        background: rgba(20, 60, 90, 0.4);
        text-align: center;
      }
    }

    > .middle-r {
      display: flex;
      justify-content: space-between;
      flex: 1;
      flex-direction: column;
      height: 550px;

      .tops-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .tags {
          > .tag {
            margin-right: 12px;
          }
        }
      }

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .active-time {
          font-size: 14px;

          > p {
            margin: 10px 0;

            > span {
              font-size: 16px;
              color: #000;
              font-weight: 700;
              margin: 0 10px;
              &.active {
                font-size: 20px;
                color: #ff3341;
              }
            }
          }
        }

        .add-logs {
          display: inline-block;
          padding: 0 15px;
          line-height: 20px;
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          border-radius: 4px;
          line-height: 40px;
          padding: 0 30px;
          background: #ff3341;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      .tables-box {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow: auto;
        border: 1px solid #ddd;

        .tables-box-item {
          padding: 5px 10px;
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }

  .count-num-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    li {
      display: flex;
      align-items: center;
      flex: 1;
      margin-right: 20px;
      padding: 20px;
      flex-direction: column;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(50, 60, 70, 0.4);

      &:last-child {
        margin-right: 0;
      }

      span {
        font-size: 14px;
        color: #000;
        line-height: 20px;
      }

      strong {
        font-size: 20px;
        line-height: 30px;
        color: #ff3341;
      }
    }
  }

  .chart-count-box {
    box-shadow: 0 2px 6px rgba(50, 60, 70, 0.4);
    padding: 20px 30px;
    margin-bottom: 40px;
  }

  .common-list {
    border: 1px solid #dedede;

    li {
      border-bottom: 1px solid #dedede;

      &:last-child {
        border-bottom: none;
      }
    }

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        width: 150px;
      }
    }

    .title {
      span {
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        border-right: 1px solid #dedede;

        &:last-child {
          border-right: none;
        }
      }

      .cont {
        flex: 1;
      }
    }

    .isEmpty {
      text-align: center;
      padding: 20px;

      span {
        flex: 1;
        color: #999;
      }
    }
  }
}
</style>
