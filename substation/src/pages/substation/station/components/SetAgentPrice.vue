<template>
  <div>
    <div class="cost-title">
      <div class="c1">
        <el-select
          v-model="expressId"
          @change="switchExpress"
        >
          <el-option
            v-for="(item, i) in expressList"
            :label="item.expressName"
            :value="item.expressId"
            :key="i"
          ></el-option>
        </el-select>
      </div>
      <div class="c2">
        <el-select
          @change="swtichType"
          v-model="type"
        >
          <el-option
            label="未设置"
            :value="1"
          ></el-option>
          <!-- <el-option
            v-if="expressType != 1"
            label="无"
            :value="2"
          ></el-option> -->
          <el-option
            v-if="expressType != 1"
            label="差额"
            :value="3"
          ></el-option>
          <el-option
            v-if="expressType == 1"
            label="一口价"
            :value="4"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <ul
        class="price"
        v-if="type === 1"
      >
        <li class="one">
          <span>未设置</span>
        </li>
      </ul>

      <ul
        class="price"
        v-if="type === 2"
      >
        <li class="one">
          <span>无</span>
        </li>
      </ul>

      <ul
        class="price"
        v-if="type === 3"
      >
        <li>
          <span>{{agentCost.first}}元</span>
          <p>普通地区0.5kg</p>
        </li>
        <li>
          <span>{{agentCost.firstKg}}元</span>
          <p>普通地区0.5-1kg</p>
        </li>
        <li>
          <span>{{agentCost.additional}}元</span>
          <p>普通地区续重</p>
        </li>
        <li>
          <span>{{agentCost.farFirst}}元</span>
          <p>偏远地区0.5kg</p>
        </li>
        <li>
          <span>{{agentCost.farFirstKg}}元</span>
          <p>偏远地区0.5-1kg</p>
        </li>
        <li>
          <span>{{agentCost.farAdditional}}元</span>
          <p>偏远地区续重</p>
        </li>
        <li class="set">
          <b
            class="text-btn"
            @click="$refs.setAgentPriceDialog.show(agentInfo, agentCost, sellerCost, sellerPrice, expressId), handleDelita();"
          >设置</b>
        </li>
      </ul>

      <ul
        class="price fixed"
        v-if="type === 4"
      >
        <li class="one">
          <span>{{agentCost.onePrice}}元</span>
        </li>
        <li class="set">
          <b
            class="text-btn"
            @click="$refs.setAgentPriceOneDialog.show(agentInfo, agentCost, sellerCost, sellerPrice, expressId), handleDelita();"
          >设置</b>
        </li>
      </ul>
    </div>

    <div style="margin-top: 40px;">
      <div style="text-align: center;font-size: 16px;">
        <strong>我的成本</strong>
      </div>
    </div>

    <div style="margin-top: 10px;">
      <!-- <div>申通快递</div> -->
      <el-table
          :data="sellerCost"
          stripe
          border
          v-loading="loading"
          v-if="sellerCost[0] && !sellerCost[0].isOnePrice"
        >
          <el-table-column
            label="分仓"
            prop="pointName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="expressType != 1"
            label="首重0.5kg（非偏远）"
            prop="first"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="expressType != 1"
            label="0.5-1kg（非偏远）"
            prop="firstKg"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="expressType != 1"
            label="普通地区续重"
            prop="additional"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="expressType != 1"
            label="首重0.5kg（偏远）"
            prop="farFirst"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="expressType != 1"
            label="0.5-1kg（偏远）"
            prop="farFirstKg"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="expressType != 1"
            label="偏远地区续重"
            prop="farAdditional"
            align="center"
          >
          </el-table-column>
          <el-table-column
            v-if="expressType == 1"
            label="一口价"
            prop="onePrice"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-table
          :data="sellerCost"
          stripe
          border
          v-loading="loading"
          v-else
        >
          <el-table-column
            label="分仓"
            prop="pointName"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="一口价"
            prop="onePrice"
            align="center"
          ></el-table-column>
        </el-table>
      <!-- <ul
        class="price"
        style="margin-top: 10px;"
        v-for="(item, i) in sellerCost"
        :key="i"
      >
        <li>
          <span>分仓名称</span>
          <p>
            <strong>{{item.pointName ? item.pointName : "--"}}</strong>
          </p>
        </li>
        <li v-if="item.isOnePrice && item.isOnePrice == 1">
          <span>{{item.onePrice}}元</span>
          <p>一口价</p>
        </li>
        <li v-if="item.isOnePrice != 1">
          <span>{{item.first}}元</span>
          <p>普通地区0.5kg</p>
        </li>
        <li v-if="item.isOnePrice != 1">
          <span>{{item.firstKg}}元</span>
          <p>普通地区0.5-1kg</p>
        </li>
        <li v-if="item.isOnePrice != 1">
          <span>{{item.additional}}元</span>
          <p>普通地区续重</p>
        </li>
        <li v-if="item.isOnePrice != 1">
          <span>{{item.farFirst}}元</span>
          <p>偏远地区0.5kg</p>
        </li>
        <li v-if="item.isOnePrice != 1">
          <span>{{item.farFirstKg}}元</span>
          <p>偏远地区0.5-1kg</p>
        </li>
        <li v-if="item.isOnePrice != 1">
          <span>{{item.farAdditional}}元</span>
          <p>偏远地区续重</p>
        </li>
      </ul> -->
      <!-- <ul
        class="price fixed"
        v-else
      >
        <li class="one">
          <span>{{item.onePrice ? item.onePrice : 0}}元</span>
        </li>
      </ul> -->
    </div>

    <SetAgentPriceDialog
      ref="setAgentPriceDialog"
      @success="updateSuccess"
    />
    <SetAgentPriceOneDialog
      ref="setAgentPriceOneDialog" :tableList="tableList"
      @success="updateSuccess"
    />
  </div>
</template>

<script>
import SetAgentPriceDialog from "./SetAgentPriceDialog";
import SetAgentPriceOneDialog from "./SetAgentPriceOneDialog";
export default {
  components: { SetAgentPriceDialog, SetAgentPriceOneDialog },
  data() {
    return {
      type: 1,
      expressId: "1",
      expressType: "1",
      expressList: [],
      tableList: [],
      agentInfo: {},
      agentCost: {},
      sellerCost: [],
      sellerPrice: []
    };
  },
  methods: {
    // 获取详细信息
    async queryAgentDetailInfo() {
      let res = await this.$http({
        url: "/t-station/queryAgentDetailInfo",
        method: "get",
        params: {
          agentId: this.$route.query.id,
          // 使用圆通快递的获取方法
          expressId: this.expressId
        }
      });
      const { data } = res;
      if (data) {
        this.agentInfo = data.agentInfo;
        this.agentCost = data.agentCost;
        this.sellerCost = data.sellerCost;
        this.sellerPrice = data.sellerPrice;
        console.log(this.sellerPrice)

        // 这里应该缺少一些显示的逻辑，但是目前不知道是根据什么字段来判断。
        if (!this.agentCost) {
          this.type = 1;
          this.agentCost = {};
          this.agentCost.first = 0;
          this.agentCost.firstKg = 0;
          this.agentCost.additional = 0;
          this.agentCost.farFirst = 0;
          this.agentCost.farFirstKg = 0;
          this.agentCost.farAdditional = 0;
          this.agentCost.isOnePrice = 0;
          this.agentCost.onePrice = 0;
        } else {
          if (this.agentCost.isOnePrice) {
            this.type = 4;
          } else {
            if (
              this.agentCost.first === 0 &&
              this.agentCost.firstKg === 0 &&
              this.agentCost.additional === 0 &&
              this.agentCost.farFirst === 0 &&
              this.agentCost.farFirstKg === 0 &&
              this.agentCost.farAdditional === 0
            ) {
              this.type = 2;
            } else {
              this.type = 3;
            }
          }
        }
      }
    },
    // 获取快递信息。
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
          this.expressId = data[0].expressId;
          this.expressType = data[0].eType;
        }
      }
    },
    async updateOperatePriceSet(params) {
      let res = await this.$http({
        url: "/t-station/updateAgentPriceSet",
        method: "post",
        data: params
      });
      const { code, data } = res;
      if (code === 200) {
        this.$message.success("修改成功");
      }
    },
    swtichType(value) {
      // 设置成无（这里后台有问题，不能设置为空。）
      if (value === 2) {
        if (!this.agentCost) {
          return false;
        }

        // this.updateOperatePriceSet({
        //   setId: this.agentCost.setId,
        //   agentId: this.agentInfo.agentId,
        //   first: "",
        //   firstKg: "",
        //   additional: "",
        //   farFirst: "",
        //   farFirstKg: "",
        //   farAdditional: "",
        //   isOnePrice: 0,
        //   onePrice: ""
        // });
      }
    },
    switchExpress(value) {
      this.expressList.forEach(m => {
        if (m.expressId == value) {
          this.expressType = m.eType;
        }
      });

      this.queryAgentDetailInfo();
    },
    updateSuccess() {
      this.queryAgentDetailInfo();
    },
    async handleDelita(){
      try {
        const res = await this.$http({
          url: "/t-station/getAuthMinPriceByAdmin",
          method: "get",
          params: {
            agentId: this.$route.query.id
          }
        });
        this.tableList = res.data;

        if(this.userInfo.stationType == 3){

          const getdata = await this.$http({
            url: "/t-station/getStationStatus",
            method: "get",
          });

          if(getdata.data.stationPrice != 'ok'){
            this.$alert('本分站还未设置成本价，请联系管理进行设置!', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/substation/index')
              }
            });
            return false;
          }

          if(getdata.data.stationPrice == 'ok' && getdata.data.sellerPrice != 'ok'){
            this.$alert('请先设置商家成本价! 点击确认跳转菜单 定价策略!', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/station/priceRule')
              }
            });
          }
        }

      } catch (error) {
        this.loading = false;
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  async created() {
    await this.queryExpressList();
    await this.queryAgentDetailInfo();
  }
};
</script>

<style lang="less" scoped>
.cost-title {
  display: flex;

  > .c1 {
    flex: 1;
  }

  > .c2 {
    width: 200px;
  }
}

.price {
  display: flex;
  border: 1px solid #979797;
  border-radius: 4px;

  &.fixed {
    li {
      -webkit-box-flex: 0;
      -ms-flex: none;
      flex: none;
    }
    .one {
      flex: 1;
    }
  }

  li {
    flex: 1;
    border-right: 1px solid #979797;
    font-size: 16px;
    color: #303133;
    line-height: 22px;
    padding: 24px;
    text-align: center;
    align-self: center;

    &:last-child {
      border: none;
    }

    span {
      margin-bottom: 10px;
    }

    p {
      font-size: 14px;
    }
  }

  .one {
    flex: 1;
  }

  .set {
    width: 200px;
  }
}
</style>
