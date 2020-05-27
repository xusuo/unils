<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>渠道</el-breadcrumb-item>
        <el-breadcrumb-item>渠道列表</el-breadcrumb-item>
        <el-breadcrumb-item>成本设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item label="快递类型：">
          <el-select
            v-model="searchForm.type"
            class="custom-select-160"
            @change="switchExpress"
          >
            <el-option
              v-for="(item, i) in expressList"
              :label="item.name"
              :value="item.id"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div
      class="custom-container-wrap"
      style="margin-top: 10px;"
    >
      <el-table
        :data="tableData"
        stripe
        border
        v-loading="loading"
      >
      <el-table-column
          label="分仓"
          prop="pointName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.groupId !=7 ? scope.row.pointName :''}}
          </template>
        </el-table-column>
        <el-table-column
          label="快递类型"
          width="120px"
          prop="expressName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="首重0.5kg（非偏远）"
          prop="first"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="0.5kg-1kg (非偏远)"
          prop="firstKg"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="1kg以上续重，每0.5kg (非偏远)"
          prop="additional"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="首重0.5kg (偏远)"
          prop="farFirst"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="0.5kg---1kg (偏远)"
          prop="farFirstKg"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="1kg以上续重，每0.5kg (偏远)"
          prop="farAdditional"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="是否按单提成"
          prop="isOnePrice"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isOnePrice == 0">否</span>
            <span v-if="scope.row.isOnePrice == 1">是</span>
          </template>
        </el-table-column>
        <el-table-column
          label="每单提成"
          prop="onePrice"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              icon="el-icon-edit"
              @click="$refs.setPirceDialog.show(scope.row);"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <SetPirceDialog
      ref="setPirceDialog"
      :expressId="searchForm.type"
      :pointId="searchForm.point"
      @success="getTableData"
    />
  </div>
</template>

<script>
import SetPirceDialog from "./components/SetPriceDilaog";
export default {
  components: { SetPirceDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        type: 1,
        expressType: "1",
        point: ""
      },
      expressList: [],
    };
  },
  methods: {
    async getExpressList(params) {
      this.loading = true;
      let res = await this.$http({
        url: "/channel/getExpressList",
        method: "post",
        data: params
      });
      const { code, data } = res;
      this.loading = false;
      if (code === 200) {
        this.searchForm.type = data[0].id;
        this.expressList = data;

        if (data.length) {
          this.searchForm.type = data[0].id;
          this.searchForm.expressType = data[0].eType;
        }
      }
    },
    async getTableData() {
      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/channel/getChannelPriceSetByChannelId",
        method: "post",
        data: {
          channelId: this.$route.query.id,
          expressId: this.searchForm.type,
          pointId: this.searchForm.point
        }
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data;
        // this.pagination.total = parseInt(data.total);
      } else {
        this.tableData = [
          {
            setId: 0,
            first: 0,
            firstKg: 0,
            additional: 0,
            farFirst: 0,
            farFirstKg: 0,
            farAdditional: 0,
            isOnePrice: 0,
            onePrice: ""
          }
        ];
        // this.pagination.total = 0;
      }
    },
    async switchExpress(value) {
      this.expressList.forEach(m => {
        if (m.expressId == value) {
          this.searchForm.expressType = m.eType;
        }
      });

      this.getTableData();
    },
    switchPoint() {
      this.getTableData();
    }
  },
  async created() {
    await this.getExpressList();
    this.getTableData();
  }
};
</script>