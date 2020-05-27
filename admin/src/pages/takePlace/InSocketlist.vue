<template>
  <div>
    <div class="custom-bread-wrap">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>代采代发供货</el-breadcrumb-item>
        <el-breadcrumb-item>代发申请列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="custom-search-wrap">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        label-width="150px"
      >
        <el-form-item label="是否联系过供应商：">
          <el-select
            @change="handleSearch"
            class="filterInput"
            placeholder="按是否联系过供应"
            v-model="searchForm.isContactSupplier"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="0"
              label="未联系"
            ></el-option>
            <el-option
              :value="1"
              label="已联系"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否绑定代发礼品：">
          <el-select
            @change="handleSearch"
            class="filterInput"
            placeholder="按是否可采购"
            v-model="searchForm.isBind"
          >
            <el-option
              :value="''"
              label="全部"
            ></el-option>
            <el-option
              :value="0"
              label="未绑定"
            ></el-option>
            <el-option
              :value="1"
              label="已绑定"
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
          label="商品名称"
          prop="goodsName"
          header-align="center"
          align="center"
          width="75"
        >
        </el-table-column>
        <el-table-column
          prop="goodsUrl"
          align="center"
          min-width="104"
          label="商品规格（长*宽*高）"
        >
          <template slot-scope="scope">
            {{scope.row.goodsLong}}*{{scope.row.goodsWeight}}*{{scope.row.goodsHigh}}
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsWeight"
          align="center"
          label="商品重量（kg）"
        >
        </el-table-column>
        <el-table-column
          prop="goodsNums"
          align="center"
          label="预计发货量"
        >
        </el-table-column>
        <el-table-column
          prop="sellerName"
          align="center"
          label="联系人"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="sellerMobile"
          align="center"
          label="联系人电话"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="isServiceFee"
          label="是否接受服务费"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <span
              class="color-danger"
              v-if="scope.row.isServiceFee == 0"
            >否</span>
            <span
              class="color-success"
              v-if="scope.row.isServiceFee == 1"
            >是</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isContactSupplier"
          align="center"
          label="是否联系过供应商"
        >
          <template slot-scope="scope">
            <span
              class="color-danger"
              v-if="scope.row.isContactSupplier == 0"
            >未联系</span>
            <span
              class="color-success"
              v-if="scope.row.isContactSupplier == 1"
            >已联系</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="waybillNo"
          align="center"
          label="物流单号"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="daohuoStatus"
          align="center"
          label="是否到货"
          width="100"
        >
          <template slot-scope="scope">
            <span
              class="color-danger"
              v-if="scope.row.daohuoStatus == 0 || scope.row.daohuoStatus == null"
            >未到货</span>
            <span
              class="color-success"
              v-if="scope.row.daohuoStatus == 1"
            >已到货</span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="isSucceed"
          label="是否可采购"
        >
          <template slot-scope="scope">
            <span
              class="color-success"
              v-if="scope.row.isSucceed == null"
            >--</span>
            <span
              class="color-success"
              v-if="scope.row.isSucceed == 1"
            >可采购</span>
            <span
              class="color-danger"
              v-if="scope.row.isSucceed == 2"
            >不可采购</span>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="isSucceed"
          align="center"
          label="是否绑定代发礼品"
        >
          <template slot-scope="scope">
            <span
              class="color-danger"
              v-if="scope.row.isBind == 0"
            >未绑定</span>
            <span
              class="color-success"
              v-if="scope.row.isBind == 1"
            >已绑定</span>
          </template>
        </el-table-column>

        <el-table-column
          label="申请日期"
          prop="createTime"
          header-align="center"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
          header-align="center"
          align="center"
          width="150"
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
            
            
            <!-- <el-button
              size="small"
              v-if="scope.row.isSucceed == 2 || scope.row.isSucceed == null"
              @click="onSetSuccess(scope.row)"
            >设为可采购</el-button> -->

            <el-dropdown>
              <el-button type="primary">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
            <el-button
              size="small"
              @click="$refs.editInSocketRemarkDialog.show(scope.row)"
            >修改物流和备注</el-button>
                </el-dropdown-item>
                <el-dropdown-item style="margin: 5px 0;">
              <el-button
              size="small"
              v-if="scope.row.isContactSupplier == 0"
              @click="onSetContact(scope.row)"
            >设为已联系</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
              size="small"
              v-if="scope.row.isBind == 0"
              @click="$refs.selectGiftDialog.show(scope.row)"
            >关联代发礼品</el-button>
                </el-dropdown-item>
                
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

    <EditInSocketRemarkDialog
      ref="editInSocketRemarkDialog"
      @success="handleSearch"
    />

    <SelectGiftDialog
      ref="selectGiftDialog"
      @success="handleSearch"
    />
  </div>
</template>

<script>
import EditInSocketRemarkDialog from "./components/EditInSocketRemarkDialog";
import SelectGiftDialog from "./components/SelectGiftDialog";
export default {
  components: { EditInSocketRemarkDialog, SelectGiftDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      searchForm: {
        isContactSupplier: "",
        isSucceed: "",
        isBind: ""
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      selectedItems: []
    };
  },
  methods: {
    async updateReplaceShipApply(params) {
      let res = await this.$http({
        url: "/seller/updateReplaceShipApply",
        method: "post",
        data: params
      });

      const { code, data } = res;
      if (code == 200 && data) {
        this.$message.success("操作成功");
        this.handleSearch();
      }
    },
    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.isContactSupplier !== "") {
        params.isContactSupplier = this.searchForm.isContactSupplier;
      }

      if (this.searchForm.isSucceed !== "") {
        params.isSucceed = this.searchForm.isSucceed;
      }

      if (this.searchForm.isBind !== "") {
        params.isBind = this.searchForm.isBind;
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/seller/selectReplaceShipApplyList",
        method: "get",
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
    // 设为已联系
    onSetContact(item) {
      this.$confirm("是否确定设为已联系？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateReplaceShipApply({
            replaceShipId: item.replaceShipId,
            isContactSupplier: 1,
            isSucceed: 1
          });
        })
        .catch(() => {});
    }
    // 设为可采购
    // onSetSuccess(item) {
    //   this.$confirm("是否确定设为可采购？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.updateReplaceShipApply({
    //         replaceShipId: item.replaceShipId,
    //         isSucceed: 1
    //       });
    //     })
    //     .catch(() => {});
    // },
    // 设为不可采购
    // onSetError(item) {
    //   this.$confirm("是否确定设为不可采购？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.updateReplaceShipApply({
    //         replaceShipId: item.replaceShipId,
    //         isSucceed: 2
    //       });
    //     })
    //     .catch(() => {});
    // }
  },
  created() {
    this.handleSearch();
  }
};
</script>