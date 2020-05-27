<template>
  <div>
    <el-dialog
      title="选择礼品"
      width="1100px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >
      <div>
        <el-form
          :inline="true"
          :model="searchForm"
          class="demo-form-inline"
          label-width="80px"
        >
          <!-- <el-form-item>
            <el-select
              v-model="searchForm.pointId"
              class="custom-select-160"
              placeholder="按仓库"
              @change="handleSearch"
            >
              <el-option
                label="全部"
                :value="''"
              ></el-option>
              <el-option
                v-for="(item, i) in pointList"
                :label="item.pointName"
                :value="item.id"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchForm.categoryId"
              class="custom-select-160"
              placeholder="按分类"
              @change="handleSearch"
            >
              <el-option
                label="全部"
                :value="''"
              ></el-option>
              <el-option
                v-for="(item, i) in cateList"
                :label="item.name"
                :value="item.id"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item>
            <el-select
              v-model="searchForm.giftType"
              placeholder="按礼品类型"
              @change="handleSearch"
            >
              <el-option
                label="普通礼品"
                :value="0"
              ></el-option>
              <el-option
                label="信封礼品"
                :value="1"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item>
            <el-select
              v-model="searchForm.edmType"
              placeholder="按礼品用途"
              @change="handleSearch"
            >
              <el-option
                label="普通礼品"
                :value="0"
              ></el-option>
              <el-option
                label="代发礼品"
                :value="1"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-input
              v-model="searchForm.giftName"
              class="custom-select-200"
              placeholder="礼品名称关键词"
            ></el-input>
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

      <div>
        <el-table
          :data="tableData"
          stripe
          border
          v-loading="loading"
        >
          <el-table-column
            label="主图"
            prop="setId"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.picList.length > 0">
                <div style="text-align: center;">
                  <img
                    :src="$baseImageUrl + scope.row.picList[0] +
                 '?imageView2/2/w/100/h/70'"
                    alt=""
                    style="display: inline;
                  max-width: 100% !important;
                  border: 0;
                  outline-width: 0;
                  vertical-align: top;"
                  >
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="礼品类型"
            prop="giftType"
            header-align="center"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.giftType == 0">普通礼品</span>
              <span
                class="color-success"
                v-if="scope.row.giftType == 1"
              >信封礼品</span>
            </template>
          </el-table-column>
          <el-table-column
            label="礼品用途"
            prop="edmType"
            header-align="center"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.edmType == 0">普通礼品</span>
              <span
                class="color-success"
                v-if="scope.row.edmType == 1"
              >代发礼品</span>
            </template>
          </el-table-column>
          <el-table-column
            label="礼品名称"
            prop="giftName"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="所在仓库"
            prop="pointName"
            header-align="center"
            align="center"
            width="120"
          >
          </el-table-column>
          <!-- <el-table-column
          label="所属分类"
          prop="categoryId"
          header-align="center"
          align="center"
        >
        </el-table-column> -->
          <el-table-column
            label="价格"
            prop="price"
            header-align="center"
            align="center"
            width="70"
          >
          </el-table-column>
          <el-table-column
            label="淘宝价格"
            prop="taobaoPrice"
            header-align="center"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            label="重量kg"
            prop="weight"
            header-align="center"
            align="center"
            width="80"
          >
          </el-table-column>

          <el-table-column
            label="库存"
            prop="stock"
            header-align="center"
            align="center"
            width="80"
          >
          </el-table-column>
          <!-- <el-table-column
            label="单位"
            prop="unit"
            header-align="center"
            align="center"
            width="80"
          >
          </el-table-column> -->
          <el-table-column
            label="状态"
            prop="isOnline"
            header-align="center"
            align="center"
            width="80"
          >
            <template slot-scope="scope">
              <span
                class="color-success"
                v-if="scope.row.isOnline == 1"
              >已上架</span>
              <span
                class="color-danger"
                v-if="scope.row.isOnline == 2"
              >已下架</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="customerName"
            header-align="center"
            align="right"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                v-if="scope.row.isOnline == 1"
                icon="el-icon-bottom"
                @click="onSelectGift(scope.row)"
              >选择此礼品</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="text-align: right;margin-top: 10px;">
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

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="visible = false"
        >关闭</el-button>
        <!-- <el-button
          type="primary"
          size="small"
          :loading="loading"
          @click="handleSure"
        >确定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [],
      searchForm: {
        pointId: "",
        categoryId: "",
        giftName: "",
        giftType: 0,
        // 直接查代发礼品
        edmType: 1
      },
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      sellerId: "",
      replaceShipId: ""
    };
  },
  methods: {
    show(item) {
      this.reset(item);
      this.handleSearch();
      this.visible = true;
    },
    reset(item) {
      // console.log(item);
      // 用商家ID来绑定
      this.sellerId = item.sellerId;
      this.replaceShipId = item.replaceShipId;
      // this.form = {
      //   mobile: ""
      // };
    },
    handleSure() {
      this.submitForm("form");
    },
    select(gift) {
      this.visible = false;
      this.$emit("select", gift);
    },

    async getTableData() {
      // console.log(this.searchForm);
      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.searchForm.categoryId !== "") {
        params.categoryId = this.searchForm.categoryId;
      }

      if (this.searchForm.pointId !== "") {
        params.pointId = this.searchForm.pointId;
      }

      if (this.searchForm.giftName !== "") {
        params.giftName = this.searchForm.giftName;
      }

      params.edmType = this.searchForm.edmType;

      // 按时间搜索条件
      if (
        this.searchForm.timeValues &&
        this.searchForm.timeValues.length === 2
      ) {
        params.startTime = this.searchForm.timeValues[0];
        params.endTime = this.searchForm.timeValues[1];
      }

      this.loading = true;
      // console.log(params);
      let res = await this.$http({
        url: "/point/getGiftAdminListPage",
        method: "post",
        params
      });
      const { data } = res;
      this.loading = false;
      if (data) {
        let arr = [];
        data.records.forEach(m => {
          if (m.picList) {
            m.picList = JSON.parse(m.picList);
          } else {
            m.picList = [];
          }

          arr.push(m);
        });
        this.tableData = arr;

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
      this.searchForm = {
        giftType: 0,
        edmType: 0
      };
      this.getTableData();
    },
    // 绑定
    async bindReplaceShipGiftToSeller(params) {
      let res = await this.$http({
        url: "/seller/bindReplaceShipGiftToSeller",
        method: "post",
        data: params
      });
      const { code, data } = res;
      if (code === 200) {
        this.$message.success("操作成功");
        this.visible = false;
        this.$emit("success");
      }
    },
    onSelectGift(item) {
      this.$confirm("确定为该商家添加该代发礼品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.bindReplaceShipGiftToSeller({
            goodsId: item.goodsId,
            sellerId: this.sellerId,
            replaceShipId: this.replaceShipId
          });
        })
        .catch(() => {});
    }
  }
};
</script>