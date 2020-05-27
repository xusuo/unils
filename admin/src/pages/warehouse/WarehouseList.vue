<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>仓库</el-breadcrumb-item>
        <el-breadcrumb-item>分仓列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item>
          <el-input
            v-model="searchForm.pointName"
            class="custom-select-200"
            placeholder="分仓名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.provice"
            class="custom-select-160"
          >
            <el-option
              label="全部"
              :value="''"
            ></el-option>
            <el-option v-for="(item,index) in maplist" :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.expressId"
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
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-refresh"
            @click="handleReset"
          >重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            icon="el-icon-plus"
            @click="$refs.createWareHoustDialog.show();"
          >添加分仓</el-button>
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
        <!-- <el-table-column
          label="分仓编号"
          prop="setId"
          header-align="center"
          align="center"
        >
        </el-table-column> -->
        <el-table-column
          label="网点编号"
          prop="branchCode"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="仓库名称"
          prop="pointName"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="面单剩余量"
          prop="quantity"
          header-align="center"
          align="center"
          width="110"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.quantity > 50">{{scope.row.quantity}}</span>
            <span v-else class="color-red">{{scope.row.quantity}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="省份"
          prop="provice"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="城市"
          prop="city"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="详细地址"
          prop="address"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">待审核</span>
            <span
              class="color-success"
              v-if="scope.row.status == 1"
            >正常</span>
            <span
              class="color-danger"
              v-if="scope.row.status == 2"
            >禁用</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          prop="createTime" :formatter="fromadate"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="礼品数量"
          prop="giftNum"
          header-align="center"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="订单总数"
          prop="taskNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="已完成"
          prop="yesNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="待完成"
          prop="noNum"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="累计订单金额"
          prop="totalMoney"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          prop="customerName"
          header-align="center"
          align="center"
          width="120"
          fixed="right"
        >
          <template slot-scope="scope">

            <el-dropdown>
              <el-button type="primary">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><el-button
              size="small"
              v-if="scope.row.status != 2"
              icon="el-icon-remove-outline"
              @click="onDisable(scope.row)"
            >禁用</el-button></el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;"><el-button
              size="small"
              icon="el-icon-setting"
              @click="$router.push('/warehouse/list/setCost?id=' + scope.row.id + 
              '&name=' + scope.row.pointName)"
            >成本设置</el-button></el-dropdown-item>
                <el-dropdown-item><el-button
              size="small"
              icon="el-icon-edit"
              @click="$refs.editWareHoustDialog.show(scope.row);"
            >修改信息</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="custom-pagination-wrap">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="pagination.sizeList"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>

    <CreateWareHoustDialog
      ref="createWareHoustDialog"
      @success="handleSearch"
    />
    <EditWareHoustDialog
      ref="editWareHoustDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import CreateWareHoustDialog from "./components/CreateWareHoustDialog";
import EditWareHoustDialog from "./components/EditWareHoustDialog";
import { fromadate } from '@/utils/filters'
export default {
  components: { CreateWareHoustDialog, EditWareHoustDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      expressList: [],
      maplist: {},
      searchForm: {
        provice: "",
        pointName: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      }
    };
  },
  methods: {
    fromadate,
    async getTableData() {
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.provice !== "") {
        params.provice = this.searchForm.provice;
      }

      if (this.searchForm.pointName !== "") {
        params.pointName = this.searchForm.pointName;
      }

      if (this.searchForm.expressId !== "") {
        params.expressId = this.searchForm.expressId;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/point/getPointAdminListPage",
        method: "post",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        this.tableData = data.records;
        this.pagination.total = parseInt(data.total);
      } else {
        this.tableData = [];
        this.pagination.total = 0;
      }
    },
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
    async getmaplist() {
      try {
        let res = await this.$http({
          url: "/point/getPointProviceList",
          method: "get",
        });
        const { code, data } = res;
        if (code === 200) {
          this.maplist = data;
        }
      } catch (error) {}
    },
    // 修改状态
    async editRequest(params) {
      try {
        let res = await this.$http({
          url: "/point/updatePoint",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("操作成功");
          this.handleSearch();
        }
      } catch (error) {}
    },
    handleSizeChange(pageSize) {
      this.pagination.pageNum = 1;
      this.pagination.pageSize = pageSize;
      this.getTableData();
    },
    handleCurrentChange(p) {
      this.pagination.pageNum = p;
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.selectedItems = val;
    },
    handleSearch() {
      this.pagination.pageNum = 1;
      this.getTableData();
    },
    handleReset() {
      this.searchForm = {};
      this.getTableData();
    },
    // 禁用
    onDisable(item) {
      this.$confirm("是否确定禁用该分站?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //
          this.editRequest({
            id: item.id,
            pointName: item.pointName,
            provice: item.provice,
            city: item.city,
            address: item.address,
            status: 2
          });
        })
        .catch(() => {});
    }
  },
  async created() {
    await this.getTableData();
    await this.getmaplist();
    await this.getExpressList();
  }
};
</script>
<style scoped>
  .color-red{
    color: red;
    font-weight: bold;
  }
</style>