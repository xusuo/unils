<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分仓</el-breadcrumb-item>
        <el-breadcrumb-item>分仓列表</el-breadcrumb-item>
        <el-breadcrumb-item>分仓成本设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="分仓名称">
          <el-input
            v-model="searchForm.pointName"
            class="custom-select-160"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item>
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
              @click="$refs.setPriceDialog.show(scope.row);"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <SetPriceDialog
      ref="setPriceDialog"
      :expressId="searchForm.type"
      @success="getTableData"
    />
  </div>
</template>

<script>
import SetPriceDialog from "./components/SetPriceDialog";
export default {
  components: { SetPriceDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        pointName: "",
        type: 1
      },
      expressList: []
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
      }
    },
    async getTableData() {
      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/point/getPointPointPriceSet",
        method: "post",
        data: {
          pointId: this.$route.query.id,
          expressId: this.searchForm.type
        }
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = [data];
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
    switchExpress() {
      this.getTableData();
    }
  },
  async created() {
    this.searchForm.pointName = this.$route.query.name;
    await this.getExpressList();
    this.getTableData();
  }
};
</script>