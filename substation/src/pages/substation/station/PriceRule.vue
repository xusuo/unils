<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>站点管理</el-breadcrumb-item>
        <el-breadcrumb-item>定价策略</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-container-wrap">
      <div>
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
      </div>

      <div
        style="margin-top: 10px;"
        v-if="tableData.length > 0"
      >
        <el-table
          :data="tableData"
          stripe
          border
          v-loading="loading"
        >
          <el-table-column
            label="等级名称"
            prop="levelName"
            header-align="center"
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
            label="续重（非偏远）"
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
            label="续重（偏远）"
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
          <el-table-column
            label="操作"
            prop="customerName"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="$refs.setPirceDialog.show(scope.row, type, expressType);"
              >设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 10px;">
        * 此物流费用包含
        <span class="color-danger">快递费 + 人工操作费0.15 + 场地租金0.1 + 快递外包装0.1</span>
      </div>

      <div style="font-weight: bold;font-size: 20px;margin-top: 20px;text-align: center;">
        我的成本
      </div>

      <div style="margin-top: 10px;">
        <el-table
          :data="tableData2"
          stripe
          border
          v-loading="loading"
          v-if="tableData2[0] && !tableData2[0].isOnePrice"
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
          :data="tableData2"
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
      </div>
    </div>

    <SetPirceDialog
      ref="setPirceDialog" :costTableList="tableData2"
      @success="queryStationPriceInfo"
    />
  </div>
</template>

<script>
import SetPirceDialog from "./components/SetPriceDilaog";
export default {
  components: { SetPirceDialog },
  data() {
    return {
      type: "1",
      expressType: "1",
      loading: false,
      tableData: [],
      tableData2: [],
      expressList: []
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
    async queryStationPriceInfo() {
      // console.log(params);
      let res = await this.$http({
        url: "/t-station/queryStationPriceInfo",
        method: "get",
        params: {
          expressId: this.type
        }
      });
      const { data } = res;
      if (data) {
        this.tableData = data.sellerCost;
        this.tableData2 = data.myCost ? data.myCost : [];
      }
    },
    async switchExpress(value) {
      await this.queryStationPriceInfo();

      this.expressList.forEach(m => {
        if (m.expressId == value) {
          this.expressType = m.eType;
        }
      });
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
  async created() {
    await this.queryExpressList();
    this.queryStationPriceInfo();
          // this.$store.dispatch('app/setLanguage', lang)
    if(this.userInfo.stationType == 3){
        this.getStationStatus()
    }

  }
};
</script>
