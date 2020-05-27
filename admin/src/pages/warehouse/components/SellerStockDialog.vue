<template>
  <div>
    <el-dialog
      title="绑定商家"
      width="1100px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
    >

      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="140px"
      >

        <el-form-item
          label="商家手机号码："
          prop="mobile"
        >
          <el-input
            v-model="form.mobile"
            class="custom-select-260"
            placeholder="请输入商家手机号码"
            maxlength="11"
          ></el-input>
          <el-button type="primary" @click="getTableData">查询</el-button>
        </el-form-item>
      </el-form>

      <div
      class="custom-container-wrap"
      style="margin-top: 10px;"
    >
      <p style="margin: 10px 0;">申请记录：</p>
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
          label="商品规格（长*宽*高）"
          align="center"
          width="104"
        >
          <template slot-scope="scope">
            {{scope.row.goodsLong}}*{{scope.row.goodsWeight}}*{{scope.row.goodsHigh}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="goodsWeight"
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
          width="90"
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

        <el-table-column
          prop="isSucceed"
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
          width="100"
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
          width="100"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
                size="small"
                icon="el-icon-bottom"
                @click="onSelectGift(scope.row)"
              >选择</el-button>
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

      <div
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mobileReg } from "@/utils/regular";
export default {
  data() {
    return {
      visible: false,
      loading: false,
      tableData: [],
      pagination: {
        pageNum: 1,
        sizeList: [5, 10, 15, 20, 25, 30],
        pageSize: 20,
        total: 0
      },
      form: {
        goodsId: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入商家手机号码",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    show(item) {
      this.reset(item);
      this.visible = true;
      this.tableData = [];
    },
    reset(item) {
      this.form = {
        goodsId: item.goodsId,
        mobile: item.sellerMobile
      };
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            mobile: this.form.mobile,
            goodsId: this.form.goodsId
          };
          this.updateRequest(params);
        } else {
          console.log("表单验证失败!!");
          return false;
        }
      });
    },
    handleSure() {
      this.submitForm("form");
    },
    async updateRequest(params) {
      this.loading = true;

      try {
        let res = await this.$http({
          url: "/seller/bindGiftForSeller",
          method: "post",
          data: params
        });
        const { code, data } = res;
        this.loading = false;
        if (code === 200) {
          this.$message.success("修改库存成功");
          this.visible = false;
          // 调用钩子，刷新主界面的数据
          this.$emit("success");
        }
      } catch (error) {
        this.loading = false;
      }
    },

    async getTableData() {

      if (this.form.mobile == "") {
        this.$message.error("请输入手机号码");
        return false;
      }
      if (!mobileReg.test(this.form.mobile)) {
        this.$message.error("手机号码格式错误，请重新输入");
        return false;
      }

      let params = {
        _index: this.pagination.pageNum,
        _size: this.pagination.pageSize
      };

      if (this.form.mobile !== "") {
        params.mobile = this.form.mobile;
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

      console.log(item,'item')
      this.$confirm("确定为该商家添加该代发礼品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.bindReplaceShipGiftToSeller({
            goodsId: this.form.goodsId,
            replaceShipId: item.replaceShipId
          });
        })
        .catch(() => {});
    }
  }
};
</script>